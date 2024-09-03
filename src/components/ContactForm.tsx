"use client";

import React from "react";
import { contact } from "@/app/actions/contact";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, IContact } from "@/lib/types/contact";
import styles from "./ContactForm.module.scss";
import { AppError } from "@/lib/errors";

const defaultValues = {
	name: "",
	email: "",
	phone: "",
	message: "",
};

export const ContactForm = () => {
	const [submitted, setSubmitted] = React.useState(false);
	const {
		control,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues,
		resolver: zodResolver(contactSchema),
	});
	const onSubmit = async (data: IContact) => {
		try {
			const result = await contact({ ...data, message: "" });
			if (result?.ok) {
				setSubmitted(true);
				return;
			}

			const {
				error,
				info: { errors },
			} = result;
			setError("root.serverError", {
				message: error || "Error submitting form",
			});
			Object.keys(errors).forEach((key) => {
				console.error("ContactForm Error:", key, errors[key]);
				setError(key as keyof IContact, { message: errors[key] });
			});
		} catch (error: AppError | any) {
			console.error("ContactForm Error:", error);
			setError("root.serverError", {
				message: error?.message || "Error submitting form",
			});
		}
	};

	console.log(errors);

	return (
		<div className={styles.wrap}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Controller
					control={control}
					name="name"
					render={({ field, fieldState: { error } }) => (
						<TextField
							variant="outlined"
							error={Boolean(error)}
							helperText={error?.message}
							{...field}
						/>
					)}
				/>
				<Controller
					control={control}
					name="email"
					render={({ field, fieldState: { error } }) => (
						<TextField
							variant="outlined"
							error={Boolean(error)}
							helperText={error?.message}
							{...field}
						/>
					)}
				/>
				<Controller
					control={control}
					name="phone"
					render={({ field, fieldState: { error } }) => (
						<TextField
							variant="outlined"
							error={Boolean(error)}
							helperText={error?.message}
							{...field}
						/>
					)}
				/>
				<Controller
					control={control}
					name="message"
					render={({ field, fieldState: { error } }) => (
						<TextField
							variant="outlined"
							error={Boolean(error)}
							helperText={error?.message}
							{...field}
						/>
					)}
				/>
				<Button variant="contained" type="submit" data-testid="submit-button">
					Submit
				</Button>
			</form>
		</div>
	);
};
