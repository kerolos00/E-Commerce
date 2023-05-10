import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../ShareData/CartContext'

export default function CartDetails() {

	let { getAllCartData, cartData, removeItem, updateQuantity } = useContext(CartContext)

	useEffect(() => {
		getAllCartData()
	}, [])

	return (
		<div className="row">
			<div className='col-md-12'>
				{cartData ?
					<>
						<table style={{ verticalAlign: 'middle' }} className='table table-striped table-bordered my-4 text-center'>
							<thead>
								<tr>
									<th>image</th>
									<th>name</th>
									<th>quantity</th>
									<th>price</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{cartData.data.products.map((el) => {
									return <tr>
										<td>
											<img src={el.product.imageCover} className='w-150' height={100} width={100} alt="imageProduct" srcSet={el.product.imageCover} />
										</td>
										<td>{el.product.title}</td>
										<td width={150}>
											<button className='btn btn-sm btn-danger rounded pointer' onClick={() => {
												updateQuantity(el.product._id, el.count -= 1)
											}}>-</button>
											<span className='mx-2 '>{el.count}</span>
											<button className='btn btn-sm btn-success rounded pointer' onClick={() => {
												updateQuantity(el.product._id, el.count += 1)
											}}>+</button>
										</td>
										<td width={150}>{el.price} EGP</td>
										<td>
											<i onClick={() => removeItem(el.product._id)} className='pointer fa-solid fa-trash-alt text-danger'></i>
										</td>
									</tr>
								})}
								<tr className='table-success '>
									<td colSpan={4}>Total</td>
									<td width={150}>{cartData.data.totalCartPrice} EGP</td>
								</tr>
							</tbody>
						</table>
						<Link to={"/checkout/" + cartData.data._id} className='btn btn-success'>CheckOut Payment</Link>
					</>

					: ""}

			</div>
		</div>
	)
}
