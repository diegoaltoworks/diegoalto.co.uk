"use client"

import { contact } from "@/app/actions/contact";
import { FormItem } from "react-hook-form-antd";

import { Button, Form, Input } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import styles from "./ContactForm.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import TextArea from "antd/es/input/TextArea";
import { schema } from "./ContactForm.schema";

const defaultValues = {
	name: "",
	email: "",
	phone: "",
	message: "",
}

export const ContactForm = () => {
	const { control, handleSubmit } = useForm({
		defaultValues,
		resolver: zodResolver(schema)
	});


	return (
		<div className={styles.wrap}>
			<Form className={styles.form} onFinish={handleSubmit(
				data => {
					console.log(data);
					contact(data);
				}, 
				errors=>{
					console.error(errors)
				}
			)}>
				<FormItem control={control}
					label="Name"
					name="name"
				>
					<Input />
				</FormItem>

				<FormItem control={control}
					label="Email"
					name="email"
				>
					<Input />
				</FormItem>

				<FormItem control={control}
					label="Phone"
					name="phone"
				>
					<Input />
				</FormItem>

				<FormItem control={control}
					label="Message"
					name="message"
				>
					<TextArea
						autoSize={{ minRows: 3, maxRows: 6 }}
						showCount
						maxLength={500}
					/>
				</FormItem>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
