import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext(null)
export function CartContextProvider(props) {
	let baseUrl = "https://route-ecommerce.onrender.com";

	let [cartData, setCartData] = useState()

	useEffect(() => {
		getAllCartData()
	}, [])

	async function getAllCartData() {
		let headers = {
			token: localStorage.getItem('token')
		}
		let { data } = await axios.get(`${baseUrl}/api/v1/cart`, { headers })
		setCartData(data)
	}

	async function removeItem(id) {
		let headers = {
			token: localStorage.getItem('token')
		}
		let { data } = await axios.delete(`${baseUrl}/api/v1/cart/${id}`, { headers })
		setCartData(data)
	}

	async function updateQuantity(id, count) {
		let headers = {
			token: localStorage.getItem('token')
		}
		let body = {
			count: count
		}
		let { data } = await axios.put(`${baseUrl}/api/v1/cart/${id}`, body, { headers })
		setCartData(data)
	}


	return <CartContext.Provider value={{ cartData, getAllCartData, removeItem, updateQuantity }}>
		{props.children}
	</CartContext.Provider>
}