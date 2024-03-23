import { createFetcher } from "../../utils/fetchUtils";
import queryKeys from "../../utils/queryKeys";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useNotifyStore } from "../../utils/store";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import config from "../../utils/config";
import Spinner from "../Spinner";
import GenericComboField from "../forms/branded/GenericComboxField";
import { useEffect } from "react";
import LoadingView from "../LoadingView";
import ErrorMessageView from "../ErrorMessageView";

const AddBank = ({ closeFunc, token }) => {
	const queryClient = useQueryClient();
	const setNotify = useNotifyStore((state) => state.setNotify);

	const {
		isLoading: getSupportedBanksLoading,
		isError: getSupportedBanksError,
		refetch: getSupportedBanksRefetch,
		data: getSupportedBanksData,
		isSuccess: getSupportedBanksSuccess,
	} = useQuery({
		queryKey: [queryKeys.getSupportedBanks, token],
		queryFn: createFetcher({
			url: config.apiPaths.getSupportedBanks,
			method: "GET",
			auth: token,
		}),

		enabled: !!token,
	});

	const { mutate, isLoading: addBankLoading } = useMutation({
		mutationKey: [queryKeys.addBankAccount, token],
		mutationFn: createFetcher({
			url: config.apiPaths.addBankAccount,
			method: "POST",
			auth: token,
		}),

		onError(err) {
			setNotify({
				show: true,
				content: err.message,
				allowClose: true,
			});
		},

		onSuccess(data) {
			queryClient.invalidateQueries({
				queryKey: [queryKeys.getBankAccounts, token],
			});

			closeFunc();

			setNotify({
				show: true,
				content: "Bank added successfully",
				allowClose: true,
			});
		},
	});

	function handleSubmit(values) {
		if (!addBankLoading) {
			mutate({
				accountNumber: values.accountNumber,
				bankCode: values.bankCode,
			});
		}
	}

	return (
		<div className="px-8 pb-5 space-y-5 text-[--primary]">
			{getSupportedBanksLoading && (
				<div className="flex h-[50vh] justify-center items-center  w-full">
					<LoadingView />
				</div>
			)}

			{getSupportedBanksError && (
				<div className="flex h-[50vh] justify-center items-center  w-full">
					<ErrorMessageView
						message="Unable to load supported banks. Please try again"
						refetch={getSupportedBanksRefetch}
					/>
				</div>
			)}

			{getSupportedBanksSuccess && (
				<div>
					<Formik
						onSubmit={handleSubmit}
						validationSchema={Yup.object().shape({
							bankCode: Yup.string()
								.required("Required")
								.oneOf(getSupportedBanksData.map((bank) => bank.code)),

							accountName: Yup.string().required("Required"),
							accountNumber: Yup.string()
								.required("Required")
								.test(
									"test-is-numbers-only",
									"Account number must be numbers only",
									(value) => {
										if (!value) return true;
										return /^\d+$/.test(value);
									}
								)
								.length(10, "Account number must be 10 digits"),
						})}
						initialValues={{
							bankCode: getSupportedBanksData[0].code,
							accountNumber: "",
							accountName: "",
						}}
						initialTouched={{
							bankCode: false,
						}}
					>
						{({ isValid, values, setFieldValue }) => {
							return (
								<Form className="space-y-5">
									<div className="relative">
										<p className="form-text">Bank Name</p>
										<GenericComboField
											defaultSelectedItem={getSupportedBanksData[0]}
											items={getSupportedBanksData.map((bank) => ({
												name: bank.name,
												value: bank.code,
											}))}
											handleChange={({ selectedItem }) => {
												setFieldValue("bankCode", selectedItem.value);
											}}
											type="text"
											placeholder="Select Bank"
											className="field-1"
										/>

										<ErrorMessage
											name="bankCode"
											component="div"
											className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
										/>
									</div>
									<AccountNumberField
										token={token}
										setFieldValue={setFieldValue}
										bankCode={values.bankCode}
										accountName={values.accountName}
									/>

									{values.accountName && (
										<div>
											<p className="form-text">Account Number</p>
											<Field
												name="accountName"
												readOnly
												type="text"
												className="field-1"
											/>
										</div>
									)}

									<div className="space-y-4 w-full pt-8 pb-3">
										<button
											disabled={!isValid || addBankLoading}
											className="btn-1 block w-full py-3 px-5 rounded text-white bg-[--color-brand] border border-[--color-brand]"
										>
											{addBankLoading ? <Spinner /> : "Add Bank"}
										</button>
										<button
											className="btn-2 block w-full py-3 px-5 rounded text-[--header] border border-[--color-brand]"
											onClick={() => closeFunc()}
										>
											Close
										</button>
									</div>
								</Form>
							);
						}}
					</Formik>
				</div>
			)}
		</div>
	);
};

export default AddBank;

function AccountNumberField({ token, setFieldValue, bankCode, accountName }) {
	const field = useField("accountNumber");

	const value = field[0].value;

	const error = field[1].error;
	const setError = field[2].setError;

	useEffect(() => {
		if (error && value && accountName !== "") {
			setFieldValue("accountName", "");
		}
	}, [value, error]);

	const {
		isLoading: resolveBankAccountLoading,
		refetch: resolveBankAccountRefetch,
	} = useQuery({
		queryKey: [queryKeys.resolveBankAccount, token],
		queryFn: createFetcher({
			url: config.apiPaths.resolveBankAccount,
			method: "POST",
			auth: token,
			body: {
				accountNumber: value,
				bankCode,
			},
		}),

		enabled: Boolean(token && !error && value && !accountName),
		onError(err) {
			setError(err.message);
		},

		onSuccess(data) {
			setFieldValue("accountName", data.accountName);
		},
	});

	return (
		<div className="relative">
			<p className="form-text">Account Number</p>
			<Field
				name="accountNumber"
				type="text"
				placeholder="Enter Account Number"
				className="field-1"
			/>

			{resolveBankAccountLoading ? (
				<div className="absolute -bottom-[30%] left-0   flex flex-row justify-start items-center">
					<Spinner size="tiny" />
				</div>
			) : (
				<ErrorMessage
					name="accountNumber"
					component="div"
					className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
				/>
			)}
		</div>
	);
}
