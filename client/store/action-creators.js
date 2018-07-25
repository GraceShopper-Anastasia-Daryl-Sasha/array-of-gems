import axios from 'axios'

//Action Type
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_SELECTED_CATEGORIES = "GET_SELECTED_CATEGORIES"

//Action Creators
const getProducts = products => {
	return { type: GET_PRODUCTS, products }
}

export const getCategories = (categories) => {
	return { type: GET_SELECTED_CATEGORIES, categories }
}

// Thunk Creators
export const fetchProducts = () => {
	return async dispatch => {
		try {
			const response = await axios.get('/api/products')
			const products = response.data
			const action = getProducts(products)
			dispatch(action)
		} catch (err) {
			console.log(err)
		}
	}
}
