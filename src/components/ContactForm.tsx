"use client";

import React from "react";
import { contact } from "@/app/actions/contact";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, IContact } from "@/lib/types/contact";
import { AppError, ExternalError } from "@/lib/errors";

const defaultValues = {
	name: "",
	email: "",
	phone: "",
	message: "",
};

export const ContactForm = () => {
	const [success, setSuccess] = React.useState(false);
	const {
		control,
		handleSubmit,
		reset,
		setError,
		formState: { isSubmitting, isDirty },
	} = useForm({
		defaultValues,
		resolver: zodResolver(contactSchema),
	});
	const onSubmit = async (data: IContact) => {
		try {
			const result = await contact(data);
			if (!result) {
				throw new ExternalError("No response from server", { result });
			}
			if (!!result?.ok) {
				setSuccess(true);
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

	return (
		<>
			{success ? (
				<Box
					sx={{ display: "flex", flexDirection: "column", gap: 2 }}
					data-testid="success-message"
				>
					<Typography sx={{ color: "primary.main", fontWeight: "bold" }}>
						{`Thank you for your message.`}
					</Typography>
					<Typography sx={{ color: "primary.main" }}>
						{`I'll get back to you shortly.`}
					</Typography>
					<Button
						variant="contained"
						onClick={() => {
							reset();
							setSuccess(false);
						}}
					>
						Send another message
					</Button>
				</Box>
			) : (
				<form onSubmit={handleSubmit(onSubmit)} data-testid="contact-form">
					<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
						<Controller
							control={control}
							name="name"
							render={({ field, fieldState: { error } }) => (
								<TextField
									label="Name"
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
									label="Email"
									type="email"
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
									label="Phone"
									type="phone"
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
									label="Message"
									variant="outlined"
									error={Boolean(error)}
									helperText={error?.message}
									{...field}
								/>
							)}
						/>
						<Box sx={{ textAlign: "right" }}>
							<Typography sx={{ color: "primary.main" }}>
								{isSubmitting && isDirty && "Submitting..."}
							</Typography>
							<Button
								disabled={isSubmitting && isDirty}
								variant="contained"
								type="submit"
								data-testid="submit-button"
							>
								Submit
							</Button>
						</Box>
					</Box>
				</form>
			)}
		</>
	);
};
