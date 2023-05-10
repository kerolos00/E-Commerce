import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
export default function ForgetPassword() {
	let [resetCode, setResetCode] = useState("")
	let [errorPass, setErrorPass] = useState("")
	let [CodeFlag, setCode] = useState(true)
	let [loading, setLoading] = useState(false)
	let navigate = useNavigate()
	let baseUrl = "https://route-ecommerce.onrender.com"
	let validationSchema = Yup.object({
		email: Yup.string().required().matches(/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/, 'enter valid email')
	})
	let formGetPassword = useFormik({
		initialValues: {
			email: ''
		},
		onSubmit: (values) => {
			forgetPasswordApi(values)
			console.log(values);

		},
		validationSchema
	})

	async function forgetPasswordApi(values) {
		setLoading(true)
		let { data } = await axios.post(`${baseUrl}/api/v1/auth/forgotPasswords`, values).catch((error) => {
			setErrorPass(error.response.data.message);
			setLoading(false);
		})
		setLoading(false);
		if (data.statusMsg === "success") {
			setCode(false)
		}
	}



	let formResetCode = useFormik({
		initialValues: {
			resetCode: ''
		},
		onSubmit: (values) => {
			resetCodeApi(values)
			console.log(values);

		}
	})

	async function resetCodeApi(values) {
		setLoading(true)
		let { data } = await axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`, values).catch((error) => {
			setResetCode(error.response.data.message);
			setLoading(false)
		})
		setLoading(false)
		if (data.status === "Success") {
			navigate('/ResetPassword')
		}
	}

	return (
		<div className='my-3'>

			{CodeFlag ?
				<form onSubmit={formGetPassword.handleSubmit}>
					<div>
						<label className='py-2 h4' htmlFor='email'>email </label>
						<input onChange={formGetPassword.handleChange} className='form-control w-75' type="email" name="email" id="email" />
						<p className='text-danger pt-1'>{formGetPassword.errors.email}</p>
					</div>

					{errorPass !== "" ? <p className='alert alert-danger w-50 card p-1 my-1'>{errorPass}</p> : ""}

					{loading ?
						<button className='btn btn-success'>
							<i className='fa-solid fa-spinner fa-spin  fs-5 '></i>
						</button>
						:
						<button type='submit' className='btn btn-success '>Send Message</button>}


				</form>
				:
				<form onSubmit={formResetCode.handleSubmit}>
					<div>
						<label className='py-2 h4' htmlFor='resetCode'>Reset Code </label>
						<input onChange={formResetCode.handleChange} className='form-control w-75' type="text" name="resetCode" id="resetCode" />
					</div>

					{resetCode !== "" ? <p className='alert alert-danger w-50 p-1 my-1'>{resetCode}</p> : ""}
					<br />

					{loading ? <button className='btn btn-success'>
						<i className='fa-solid fa-spinner fa-spin  fs-5 '></i>
					</button>
						:
						<button type='submit' className='btn btn-success '>Verify Code</button>
					}


				</form>
			}

		</div>
	)
}
