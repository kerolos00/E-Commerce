import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let baseUrl = "https://route-ecommerce.onrender.com";


export let getCategoryData = createAsyncThunk('category/getCategoryData', async (type) => {
	let { data } = await axios.get(`${baseUrl}/api/v1/${type}`)
	return data.data
})

let CategorySlice = createSlice({
	name: "category",
	initialState: { CategoriesList: [] },
	extraReducers: (builder) => {
		builder.addCase(getCategoryData.fulfilled, (state, action) => {
			state.CategoriesList = action.payload
		})
	}
})

export default CategorySlice.reducer