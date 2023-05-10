import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function ResetPassword() {
	let [loading, setLoading] = useState(false)
	let [errMsg, setErrMsg] = useState('')
	let navigate = useNavigate();
	let baseUrl = "https://route-ecommerce.onrender.com";

	let validationSchema = Yup.object({
		email: Yup.string().required().matches(/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/, 'enter valid email'),
		newPassword: Yup.string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/, 'enter valid password'),
	})

	let formik = useFormik({
		initialValues: {
			email: "",
			newPassword: "",
		},
		onSubmit: (values) => {
			resetPasswordApi(values)
		}, validationSchema,
	})

	async function resetPasswordApi(objData) {
		setLoading(true)
		let { data } = await axios.put(`${baseUrl}/api/v1/auth/resetPassword`, objData).catch((error) => {
			setErrMsg(error.response.data.message);
			setLoading(false)
		})
		setLoading(false)
		if (data.token) {
			navigate('/login')
		}
	}

	return (
		<div>
			<form onSubmit={formik.handleSubmit}>

				<div className='my-3'>
					<label className='py-1' htmlFor='email'>email </label>
					<input onChange={formik.handleChange} className='form-control w-75' type="email" name="email" id="email" />
					<p className='text-danger pt-1'>{formik.errors.email}</p>
				</div>

				<div className='my-3'>
					<label className='py-1' htmlFor='newPassword'>New Password </label>
					<input onChange={formik.handleChange} className='form-control w-75' type="newPassword" name="newPassword" id="newPassword" />
					<p className='text-danger pt-1'>{formik.errors.newPassword}</p>
				</div>
				{errMsg !== "" ? <p className='alert alert-danger text-center p-1 w-25 text-danger '>{errMsg}</p> : ""}

				{loading ?
					<button className='btn btn-success ' type='button'>
						<i className='fa-solid fa-spinner fa-spin  fs-5 '></i>
					</button>
					:
					<button disabled={!formik.isValid} type='submit' className='btn btn-success'>Update Password</button>
				}

			</form >
		</div>
	)
}
