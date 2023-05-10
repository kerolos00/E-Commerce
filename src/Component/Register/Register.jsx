/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function Register() {
  let [errMsg, setErrMsg] = useState('')
  let [loading, setLoading] = useState(false)
  let navigate = useNavigate();
  let baseUrl = "https://route-ecommerce.onrender.com";
  let validationSchema = Yup.object({
    name: Yup.string().required().min(3, 'minimum character 3').max(15, 'maxmem character 15'),
    email: Yup.string().required().matches(/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/, 'enter valid email'),
    phone: Yup.string().required().matches(/^(010|011|012|015)[0-9]{8}$/, 'enter valid phone'),
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    password: Yup.string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/, 'enter valid password'),
    rePassword: Yup.string().required().oneOf([Yup.ref("password")], 'Re Password not Match')
  })

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: ""
    },
    onSubmit: (values) => {
      sendDataRegister(values)
    }, validationSchema,
  })

  async function sendDataRegister(objData) {
    setLoading(true);
    let { data } = await axios.post(`${baseUrl}/api/v1/auth/signup`, objData).catch((error) => {
      setErrMsg(error.response.data.message)
      setLoading(false)
    })
    setLoading(false)

    if (data.message === 'success') {
      navigate('/login')
    }
  }

  return (
    <div className='my-3'>
      <h2>Register Now</h2>
      <form onSubmit={formik.handleSubmit}>

        <div className='my-3'>
          <label className='py-1' htmlFor='name'>name </label>
          <input onChange={formik.handleChange} className='form-control w-75' type="text" name="name" id="name" />
          <p className='text-danger pt-1'>{formik.errors.name}</p>
        </div>

        <div className='my-3'>
          <label className='py-1' htmlFor='email'>email </label>
          <input onChange={formik.handleChange} className='form-control w-75' type="email" name="email" id="email" />
          <p className='text-danger pt-1'>{formik.errors.email}</p>
        </div>

        <div className='my-3'>
          <label className='py-1' htmlFor='password'>password </label>
          <input onChange={formik.handleChange} className='form-control w-75' type="password" name="password" id="password" />
          <p className='text-danger pt-1'>{formik.errors.password}</p>
        </div>

        <div className='my-3'>
          <label className='py-1' htmlFor='rePassword'>rePassword </label>
          <input onChange={formik.handleChange} className='form-control w-75' type="password" name="rePassword" id="rePassword" />
          <p className='text-danger pt-1'>{formik.errors.rePassword}</p>
        </div>

        <div className='my-3'>
          <label className='py-1' htmlFor='phone'>phone </label>
          <input onChange={formik.handleChange} className='form-control w-75' type="text" name="phone" id="phone" />
          <p className='text-danger pt-1'>{formik.errors.phone}</p>
        </div>

        {errMsg !== "" ? <div className='alert alert-danger w-25 text-center p-1'>{errMsg}</div> : ''}

        {loading ? <button className='btn btn-success ' type='button'>
          <i className='fa-solid fa-spinner fa-spin  fs-5 '></i>
        </button> : <button type='submit' disabled={!formik.isValid} className='btn btn-success'>Register</button>
        }

      </form>
    </div>
  )
}
