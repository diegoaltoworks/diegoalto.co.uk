"use client"

import React from "react";
import { contact } from "@/app/actions/contact";
import { useForm } from "react-hook-form";
import styles from "./ContactForm.module.css";

export const ContactForm = () => {
	const { register, handleSubmit } = useForm();

	const onSubmit = async (data: any) => {
		console.info("ContactForm Sending", data);
		try{
			const result = await contact(data);
			console.info("ContactForm Result", result);
		}
		catch(e){
			console.error("ContactForm Error", e);
		}
		// Handle form submission logic here
	};

	return (
		<div className={styles.wrap}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<label data-testid="name-label" htmlFor="name">Name</label>
				<input type="text" id="name" data-testid="name-input" className={styles.name} {...register("name")} />

				<label data-testid="phone-label" htmlFor="phone">Phone</label>
				<input type="text" id="phone" data-testid="phone-input" className={styles.phone} {...register("phone")} />

				<label data-testid="email-label" htmlFor="email">Email</label>
				<input type="email" id="email" data-testid="email-input" className={styles.email} {...register("email")} />

				<label data-testid="message-label" htmlFor="message">Message</label>
				<textarea className={styles.message} id="message" data-testid="message-input" {...register("message")} />

				<button className={styles.submit} type="submit">Submit</button>
			</form>
		</div>
	);
}
