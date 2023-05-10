/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function Login({ saveUserData }) {
  let [errMsg, setErrMsg] = useState('')
  let [loading, setLoading] = useState(false)
  let navigate = useNavigate();
  let baseUrl = "https://route-ecommerce.onrender.com";

  let validationSchema = Yup.object({
    email: Yup.string().required().matches(/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/, 'enter valid email'),
    password: Yup.string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/, 'enter valid password'),
  })

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      sendDataLogin(values)
    }, validationSchema,
  })

  async function sendDataLogin(objData) {
    setLoading(true);
    let { data } = await axios.post(`${baseUrl}/api/v1/auth/signin`, objData).catch((error) => {
      setErrMsg(error.response.data.message)
      setLoading(false)
    })

    setLoading(false)

    if (data.message === 'success') {
      navigate('/home')
      saveUserData(data.user)
      localStorage.setItem("token", data.token)
    }
  }

  return (
    <div className='my-3'>
      <h2>Login Now</h2>
      <form onSubmit={formik.handleSubmit}>

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

        {errMsg !== "" ? <div className='alert alert-danger w-25 text-center p-1'>{errMsg}</div> : ''}

        <p>
          <Link className='nav-link text-primary' to="/ForgetPassword">Forget Password...?</Link>
        </p>

        {loading ? <button className='btn btn-success ' type='button'>
          <i className='fa-solid fa-spinner fa-spin  fs-5 '></i>
        </button>
          :
          <button type='submit' disabled={!formik.isValid} className='btn btn-success'>Login</button>
        }

      </form>
    </div>
  )
}
