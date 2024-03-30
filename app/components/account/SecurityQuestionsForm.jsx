"use client";

import GenericSelectField from "../forms/branded/GenericSelectField";
import SwitchField from "../forms/branded/SwitchField";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
	fetchUtil,
	makeUrl,
	extractErrorMessage,
} from "../../utils/fetchUtils";
import { useNotifyStore } from "../../utils/store";
import { securityQuestions } from "../../utils/constants";
import { useMutation, useQueryClient } from "react-query";
import queryKeys from "../../utils/queryKeys";
import config from "../../utils/config";
import Spinner from "../Spinner";

const SecurityQuestionsForm = ({ user, token, closeParent }) => {
	const setNotify = useNotifyStore((state) => state.setNotify);
	const queryClient = useQueryClient();

	function onSuccess(data) {
		closeParent();

		queryClient.invalidateQueries({ queryKey: [queryKeys.getSession] });

		setNotify({
			show: true,
			content: "Your security questions have been set.",
			allowClose: false,
			onAcceptText: "Ok",
			onAccept: () => {},
		});
	}

	function onError(err) {
		closeParent();

		setNotify({
			show: true,
			content: err.message,
			allowClose: true,
		});
	}

	const { mutate, isLoading } = useMutation({
		onSuccess,
		onError,
		mutationFn: async function (body) {
			const res = await fetchUtil({
				url: makeUrl(config.apiPaths.setSecurityQuestions),
				method: "POST",
				body,
				auth: token,
			});

			if (!res.success) {
				throw new Error(extractErrorMessage(res));
			}

			return res.data;
		},
		mutationKey: [queryKeys.setSecurityQuestions, token],
	});

	async function handleSubmit(values) {
		if (isLoading) return;

		const body = {
			question1: values.question1,
			answer1: values.answer1,
			question2: values.question2,
			answer2: values.answer2,
			replace: values.allowEdits,
		};

		mutate(body);
	}

	return (
		<div className="py-6 bg-white font-medium w-full ">
			<Formik
				initialValues={{
					question1: user.securityQuestions?.question1 || "",
					answer1: "",
					question2: user.securityQuestions?.question2 || "",
					answer2: "",
					allowEdits: !!user.securityQuestions ? false : true,
				}}
				onSubmit={handleSubmit}
				initialTouched={{
					question1: true,
					question2: true,

					allowEdits: true,
				}}
				validationSchema={Yup.object().shape({
					question1: Yup.string()
						.required("Please select a security question")
						.oneOf(
							securityQuestions.map((q) => q.value),
							"Invalid question"
						),
					answer1: Yup.string()
						.required("Please provide an answer")
						.min(3, "Answer must be at least 3 characters"),

					question2: Yup.string()
						.required("Please select a security question")
						.oneOf(
							securityQuestions.map((q) => q.value),
							"Invalid question"
						)
						.test("notSame", "Questions must be different", function (value) {
							if (!this.parent.question1) return true;
							return this.parent.question1 !== value;
						}),

					answer2: Yup.string()
						.required("Please provide an answer")
						.min(3, "Answer must be at least 3 characters"),
				})}
			>
				{({ isValid, setFieldValue, values }) => {
					const disableForm = !values.allowEdits;

					return (
						<Form className="w-full relative  px-6 space-y-6">
							<div className="grid grid-cols-1 gap-5 md:gap-7 w-full  max-w-[500px] ">
								<div className="pt-2">
									<p className="account-form-text">Security Question 1</p>

									<div className="relative">
										<GenericSelectField
											disabled={disableForm}
											defaultSelectedItem={
												user.securityQuestions?.question1
													? securityQuestions.find(
															(q) =>
																q.value === user.securityQuestions.question1
													  )
													: null
											}
											name="question1"
											items={securityQuestions}
											handleChange={({ selectedItem }) => {
												setFieldValue("question1", selectedItem.value, true);
											}}
										/>

										<ErrorMessage
											name="question1"
											component="div"
											className="absolute -bottom-[40%] left-0 text-[--text-danger] text-xs text-left"
										/>
									</div>
								</div>

								{((user.securityQuestions && values.allowEdits) ||
									!user.securityQuestions) && (
									<div>
										<p className="account-form-text">Answer</p>
										<div className="account-form-icon-container relative">
											<Field
												disabled={disableForm}
												type="text"
												placeholder=""
												className="disabled:opacity-40 disabled:pointer-events-none"
												name="answer1"
											/>

											<ErrorMessage
												name="answer1"
												component="div"
												className="absolute -bottom-[40%] left-0 text-[--text-danger] text-xs text-left"
											/>
										</div>
									</div>
								)}

								<div className="">
									<p className="account-form-text">Security Question 2</p>

									<div className="relative">
										<GenericSelectField
											disabled={disableForm}
											defaultSelectedItem={
												user.securityQuestions?.question2
													? securityQuestions.find(
															(q) =>
																q.value === user.securityQuestions.question2
													  )
													: null
											}
											name="question2"
											items={securityQuestions}
											handleChange={({ selectedItem }) => {
												setFieldValue("question2", selectedItem.value, true);
											}}
										/>

										<ErrorMessage
											name="question2"
											component="div"
											className="absolute -bottom-[40%] left-0 text-[--text-danger] text-xs text-left"
										/>
									</div>
								</div>

								{((user.securityQuestions && values.allowEdits) ||
									!user.securityQuestions) && (
									<div>
										<p className="account-form-text">Answer</p>
										<div className="account-form-icon-container relative">
											<Field
												disabled={disableForm}
												type="text"
												className="disabled:opacity-40 disabled:pointer-events-none"
												placeholder=""
												name="answer2"
											/>

											<ErrorMessage
												name="answer2"
												component="div"
												className="absolute -bottom-[40%] left-0 text-[--text-danger] text-xs text-left"
											/>
										</div>
									</div>
								)}

								{user.securityQuestions && (
									<div className="mt-4">
										<p className="account-form-text"> Allow Edits </p>
										<div className="">
											<SwitchField
												color="#1E0700"
												defaultChecked={values.allowEdits}
												handleChange={(v) => setFieldValue("allowEdits", v)}
											/>
										</div>
									</div>
								)}
							</div>
							<div className="py-10 text-center flex flex-col justify-center items-center w-full">
								<button
									type="submit"
									disabled={!isValid || isLoading}
									className="btn-1 w-full max-w-[400px] px-5 py-3 text-white bg-[--button] rounded text-lg"
								>
									{isLoading ? <Spinner /> : "Save"}
								</button>
							</div>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

export default SecurityQuestionsForm;
