"use client";

import React from "react";
import Overlay2 from "../../Overlay2";
import { BiX } from "react-icons/bi";
import Image from "next/image";
import GoalImage from "../../../../assets/images/savings_cover.jpeg";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useDropzone } from "react-dropzone";
import { FaNairaSign } from "react-icons/fa6";
import { useCallback, useState } from "react";
import cn from "classnames";
import GenericSelectFieldVariant1 from "../../forms/branded/GenericSelectFieldVariant1";
import FormattingField from "../../forms/branded/FormattingField";
import { useRef } from "react";
import useOutsideClickDetector from "../../../utils/hooks/useOutsideClickDetector";
import * as Yup from "yup";
import { useMutation } from "react-query";
import queryKeys from "../../../utils/queryKeys";
import { createFetcher } from "../../../utils/fetchUtils";
import config from "../../../utils/config";
import Spinner from "../../Spinner";
import { savingsPrefs } from "../../../utils/constants";

const validationSchema = Yup.object().shape({
	goalTitle: Yup.string()
		.required("Required")
		.min(3, "Too short")
		.max(64, "Too long"),
	goalPurpose: Yup.string()
		.required("Required")
		.min(8, "Too short")
		.max(256, "Too long"),
	goalAmount: Yup.number()
		.required("Required")
		.min(1000, "Too low")
		.typeError("Invalid amount"),
	savingsPreference: Yup.string()
		.required("Required")
		.oneOf(
			savingsPrefs.map((v) => v.value),
			"Invalid payment method"
		),
	paymentMode: Yup.string()
		.required("Required")
		.oneOf(["manual", "auto"], "Invalid saving preference"),
});

function GoalCreation({
	show = false,
	toggleShow,
	handleSubmit,
	formData,
	token,
}) {
	const ref = useRef(null);

	useOutsideClickDetector(ref, () => {
		if (show) toggleShow();
	});

	const [imageFile, setImageFile] = useState(
		formData.coverImageFile
			? URL.createObjectURL(formData.coverImageFile)
			: null
	);
	const [rawFile, setRawFile] = useState(formData.coverImageFile || null);
	const [fileUrl, setFileUrl] = useState(formData.goalImageUrl || null);

	const onDrop = useCallback((acceptedFiles) => {
		const file = acceptedFiles[0];
		setRawFile(file);
		setImageFile(URL.createObjectURL(file));
		uploadCoverImage({
			file,
		});
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/png": [".png"],
			"image/jpg": [".jpeg", ".jpg"],
		},
		maxFiles: 1,
		maxSize: 1024 * 1024 * 2,
		disabled: true,
	});

	// mutation to upload cover image if it exists
	const { mutate: uploadCoverImage, isLoading, isError } = useMutation({
		mutationKey: [queryKeys.uploadImage, token],
		mutationFn: createFetcher({
			url: config.apiPaths.uploadImage,
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data",
			},
			formEncoded: true,
			auth: token,
		}),

		onSuccess: (data) => {
			setFileUrl(data.secureUrl);
		},

		onError: (error) => {
			setRawFile(null);
			setImageFile(null);
		},
	});

	function handleSubmitClick(values) {
		handleSubmit({ ...values, goalImageUrl: fileUrl });
	}

	return (
		<Overlay2 z={3}>
			<section
				ref={ref}
				className={
					"w-full md:max-w-[493px]  bg-white  md:h-[100vh] h-[100vh] z-40 popup-px py-6"
				}
			>
				<div className="flex flex-row justify-end items-center">
					<div
						onClick={toggleShow}
						className="border rounded-full p-1 border-[--lines] hover:cursor-pointer hover:bg-[--b1] transitioning"
					>
						<BiX className="text-[--text] text-3xl" />
					</div>
				</div>

				<div className="space-y-4 mt-6 max-h-[85vh] md:max-h-[85vh] overflow-y-scroll no-scrollbar pb-16">
					<h1 className="popup-header"> Create a Goal </h1>
					<p className="form-label">
						Reach yours personal goals faster
						<span className="text-xs block text-[--placeholder]">
							Max. 2MB. JPG or PNG.
						</span>
					</p>

					{/* Uploaded image view  */}
					{!!imageFile && (
						<div className="bg-[--b1] relative w-full   flex flex-col justify-center items-center">
							<div className="absolute text-white bg-black/60 inset-0  flex flex-col justify-center items-center">
								{isLoading && <Spinner size="small" />}
							</div>

							{!isLoading && (
								<div
									onClick={() => {
										setRawFile(null);
										setImageFile(null);
									}}
									title="Remove"
									className="absolute right-0 bottom-0 p-2 hover:cursor-pointer bg-[--text-brand-2] text-white   opacity-60 hover:opacity-80 transitioning z-10"
								>
									<BiX className=" text-2xl"></BiX>
								</div>
							)}

							<Image
								height="210"
								width="429"
								src={imageFile}
								className="w-full h-[210px] object-cover"
								alt="Goal image"
							/>
						</div>
					)}

					{/* Uploaded image ends  */}

					<div
						className={
							"relative h-[210px]  w-full" +
							cn({
								" hidden ": !!imageFile,
							})
						}
						{...getRootProps()}
					>
						<Image
							src={GoalImage}
							alt="goal image"
							className="object-cover h-[210px] w-full"
						/>
						<div className="absolute bg-black/60 inset-0  flex flex-col justify-center items-center">
							<input {...getInputProps()} />
							{isDragActive ? (
								<span className="text-white text-center">
									{" "}
									Drag the files here{" "}
								</span>
							) : (
								<span className="text-white text-center">Save Now</span>
							)}
						</div>
					</div>

					{/* Form now  */}

					<div>
						<Formik
							validationSchema={validationSchema}
							initialValues={{
								goalTitle: formData.goalTitle || "",
								goalPurpose: formData.goalPurpose || "",
								goalAmount: formData.goalAmount || "",
								savingsPreference:
									formData.savingsPreference || savingsPrefs[0].value,
								paymentMode: formData.paymentMode || "manual",
							}}
							initialTouched={{
								savingsPreference: true,
								paymentMode: true,
							}}
							onSubmit={handleSubmitClick}
						>
							{({ isValid, setFieldValue }) => {
								return (
									<Form className="space-y-6">
										<div className="w-full relative flex flex-col justify-center items-start space-y-2">
											<label htmlFor="goalTitle" className="form-label">
												Goal Title
											</label>

											<Field
												name="goalTitle"
												type="text"
												className="field-1"
												placeholder="Title of your goal"
											/>

											<ErrorMessage
												name="goalTitle"
												component="div"
												className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
											/>
										</div>

										<div className="w-full relative flex flex-col justify-center items-start space-y-2">
											<label htmlFor="goalPurpose" className="form-label">
												Purpose of Goal
											</label>

											<Field
												name="goalPurpose"
												type="text"
												className="field-1"
												placeholder="Purpose of your goal"
											/>

											<ErrorMessage
												name="goalPurpose"
												component="div"
												className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
											/>
										</div>

										<div className="w-full relative flex flex-col justify-center items-start space-y-2">
											<label htmlFor="goalAmount" className="form-label">
												Overall Goal Amount
											</label>

											<FormattingField
												icon={FaNairaSign}
												name="goalAmount"
												type="text"
												inputMode="numeric"
												className="field-1"
												placeholder="Amount"
												extraClasses="field-1"
											/>

											<ErrorMessage
												name="goalAmount"
												component="div"
												className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
											/>
										</div>

										<div className="w-full relative flex flex-col justify-center items-start space-y-2">
											<label htmlFor="paymentMode" className="form-label">
												How do you prefer to save?
											</label>

											<GenericSelectFieldVariant1
												defaultSelectedItem="manual"
												handleChange={({ selectedItem }) => {
													setFieldValue(
														"paymentMode",
														selectedItem.value,
														true
													);
												}}
												items={[
													{
														name: "Manual",
														value: "manual",
													},
													{
														name: "Auto",
														value: "auto",
													},
												]}
											/>

											<ErrorMessage
												name="savingPreference"
												component="div"
												className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
											/>
										</div>

										<div className="w-full relative flex flex-col justify-center items-start space-y-2">
											<label htmlFor="savingPreference" className="form-label">
												Payment Method
											</label>

											<GenericSelectFieldVariant1
												defaultSelectedItem={savingsPrefs[0]}
												handleChange={({ selectedItem }) => {
													setFieldValue(
														"savingsPreference",
														selectedItem.value,
														true
													);
												}}
												items={savingsPrefs}
											/>

											<ErrorMessage
												name="savingPreference"
												component="div"
												className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
											/>
										</div>

										<div className="pt-4 flex flex-col justify-center items-center space-y-4">
											<button
												disabled={!isValid}
												type="submit"
												className="btn-1"
											>
												Next
											</button>
											<button
												type="button"
												onClick={toggleShow}
												className="btn-2"
											>
												Cancel
											</button>
										</div>
									</Form>
								);
							}}
						</Formik>
					</div>
				</div>
			</section>
		</Overlay2>
	);
}

export default GoalCreation;
