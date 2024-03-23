"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import BarLoader from "../BarLoader";
import config from "../../utils/config";
import {
	fetchUtil,
	makeUrl,
	extractErrorMessage,
} from "../../utils/fetchUtils";
import queryKeys from "../../utils/queryKeys";
import { useState } from "react";
import { useNotifyStore } from "../../utils/store";

function ResetPassword() {
	const setNotify = useNotifyStore((state) => state.setNotify);

	const [showPassword, setShowPassword] = useState(false);

	function toggleShowPassword() {
		setShowPassword(!showPassword);
	}

	const { isLoading, isSuccess, reset, mutate } = useMutation({
		mutationKey: [queryKeys.resetPassword],
		mutationFn: async function (values) {
			const body = {
				email: values.email,
				newPassword: values.password,
				channel: "EMAIL",
			};
			const url = makeUrl(config.apiPaths.resetPassword);

			const res = await fetchUtil({
				method: "POST",
				url,
				body,
			});

			if (res.success) {
				return res.data;
			} else {
				throw {
					message: extractErrorMessage(res),
					statusCode: res.statusCode,
				};
			}
		},

		onError(err) {
			setNotify({
				show: true,
				title: "Something went wrong",
				content: err.message,
			});
		},

		onSuccess() {
			setNotify({
				show: true,
				allowClose: false,
				title: "Reset Password",
				content: "The reset confirmation link has been sent to your inbox",
			});
			reset();
		},
	});

	async function handleSubmit(values) {
		if (isLoading) return;

		mutate(values);
	}

	return (
		<Formik
			initialValues={{
				email: "",
				password: "",
				cpassword: "",
			}}
			validationSchema={Yup.object().shape({
				email: Yup.string().email("Invalid email address").required("Required"),

				password: Yup.string()
					.min(8, "Must be 8 characters or more")
					.max(25, "Too long")
					.required("Required"),

				cpassword: Yup.string()
					.min(8, "Must be 8 characters or more")
					.max(25, "Too long")
					.required("Required")
					.test("passwords-match", "Passwords must match", function (value) {
						return this.parent.password === value;
					}),
			})}
			onSubmit={handleSubmit}
		>
			{({ isSubmitting, isValid }) => (
				<Form className="space-y-6 w-full">
					<BarLoader v={0} active={isLoading} />

					<div className="w-full  relative flex flex-col justify-center items-start space-y-2">
						<label htmlFor="email" className="text-sm text-left">
							Email Address
						</label>
						<Field
							name="email"
							type="email"
							className="field-1"
							placeholder="Email Address"
						/>

						<ErrorMessage
							name="email"
							component="div"
							className="absolute  -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
						/>
					</div>

					<div className="w-full relative flex flex-col justify-center items-start space-y-2">
						<label htmlFor="password" className="text-sm text-left">
							Enter New Password
						</label>

						<div className="relative w-full">
							<Field
								name="password"
								type={showPassword ? "text" : "password"}
								className="field-1"
								placeholder="Password"
							/>

							<div
								className="absolute top-[50%] -translate-y-[50%] right-[5%]  text-right cursor-pointer text-xl"
								onClick={toggleShowPassword}
							>
								{showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
							</div>
						</div>

						<ErrorMessage
							name="password"
							component="div"
							className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
						/>
					</div>

					<div className="w-full relative flex flex-col justify-center items-start space-y-2">
						<label htmlFor="password" className="text-sm text-left">
							Confirm New Password
						</label>

						<div className="relative w-full">
							<Field
								name="cpassword"
								type={showPassword ? "text" : "password"}
								className="field-1"
								placeholder="Password"
							/>

							<div
								className="absolute top-[50%] -translate-y-[50%] right-[5%]  text-right cursor-pointer text-xl"
								onClick={toggleShowPassword}
							>
								{showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
							</div>
						</div>

						<ErrorMessage
							name="password"
							component="div"
							className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
						/>
					</div>

					<div className="pt-6">
						<button
							type="submit"
							disabled={!isValid || isLoading}
							className="btn-1"
						>
							<span> Submit </span>
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
}

export default ResetPassword;
