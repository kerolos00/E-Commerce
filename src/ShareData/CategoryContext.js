import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let categoryData = createContext(null)

export default function CategoryContextProvider(props) {
	let baseUrl = "https://route-ecommerce.onrender.com";
	let [CategoriesList, setCategories] = useState([])

	async function getAllProducts() {
		let { data } = await axios.get(`${baseUrl}/api/v1/Categories`)
		setCategories(data.data)
	}

	useEffect(() => {
		getAllProducts()
	}, [])


	return <categoryData.Provider value={{ CategoriesList }}>
		{props.children}
	</categoryData.Provider>
}