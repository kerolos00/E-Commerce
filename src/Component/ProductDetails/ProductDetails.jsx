import axios from 'axios';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductDetails() {
	let [ProductDetail, setProductDetail] = useState(undefined)
	let Navigate = useNavigate()
	let { id } = useParams()
	let baseUrl = "https://route-ecommerce.onrender.com";
	useEffect(() => {
		getProductDetails()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	async function getProductDetails() {
		let { data } = await axios.get(`${baseUrl}/api/v1/products/${id}`)
		setProductDetail(data.data)
		console.log(data.data);
	}

	async function addItemCart(id) {
		let body = {
			productId: id
		}
		let headers = {
			token: localStorage.getItem('token')
		}
		let { data } = await axios.post(`${baseUrl}/api/v1/cart`, body, {
			headers
		})
		if (data.status === "success") {
			Navigate('/CartDetails')
		}
	}

	return (
		<div>
			{ProductDetail ?
				<div className='row align-items-center'>
					<div className="col-md-4 ">
						{/* <img className='w-100' src={ProductDetail.imageCover} alt="PS5" srcSet={ProductDetail.imageCover} /> */}
						<OwlCarousel className='owl-theme mt-5' autoplay={true} loop items={1} >
							{ProductDetail.images.map((el) => {
								return <div className='text-center  '>
									<img alt='Product' src={el} srcSet={el} />
								</div>
							})}
						</OwlCarousel>
					</div>
					<div className="col-md-8 text-center ">
						<h2>{ProductDetail.title}</h2>
						<p className='text-muted'>{ProductDetail.description}</p>
						<span className='text-success h5'>{ProductDetail.category.name}</span>
						<div className='d-flex text-success justify-content-between '>
							<p>{ProductDetail.price} EGP</p>
							<div>
								<i className='fa-solid fa-star text-warning'></i>{ProductDetail.ratingsAverage}
							</div>
						</div>
						<button onClick={() => addItemCart(ProductDetail._id)} className='btn btn-success w-100' type='submit'>+ add Cart</button>
					</div>
				</div> : ""}



		</div>

	)
}
