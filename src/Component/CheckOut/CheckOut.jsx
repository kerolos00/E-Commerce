import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function CheckOut() {
	let baseUrl = "https://route-ecommerce.onrender.com";
	let { cartId } = useParams()

	let Formik = useFormik({
		initialValues: {
			details: "",
			phone: "",
			city: ""
		},
		onSubmit: (values) => {
			checkOut(values, cartId)

		}
	})

	async function checkOut(values, id) {
		let body = {
			shippingAddress: values
		}
		let headers = {
			token: localStorage.getItem('token')
		}
		let { data } = await axios.post(`${baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:3000/#/`
			, body, { headers })
		if (data.status === "success") {
			// window.open(data.session.url, "_self")
			window.location.href = data.session
		}
	}

	return (
		<div>
			<form onSubmit={Formik.handleSubmit}>
				<div className='my-2'>
					<label htmlFor="details">details</label>
					<input onChange={Formik.handleChange} className='form-control' type="text" name="details" id="details" />
				</div>
				<div className='my-2'>
					<label htmlFor="phone">phone</label>
					<input onChange={Formik.handleChange} className='form-control' type="tel" name="phone" id="phone" />
				</div>
				<div className='my-2'>
					<label htmlFor="city">city</label>
					<input onChange={Formik.handleChange} className='form-control' type="text" name="city" id="city" />
				</div>
				<button type='submit' className='btn btn-success'>Pay</button>
			</form>
		</div>
	)
}
