import axios from 'axios'

//Action Type
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
export const GET_SELECTED_CATEGORIES = "GET_SELECTED_CATEGORIES"

//Action Creators
const getProducts = products => {
	return { type: GET_PRODUCTS, products }
}

const getSingleProduct = product => {
	return { type: GET_SINGLE_PRODUCT, product}
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

export const fetchProduct = (productId) => {
	return async dispatch => {
		try {
			const response = await axios.get(`/api/products/${productId}`)
			const product = response.data
			const action = getSingleProduct(product)
			dispatch(action)
		} catch (err) {
			console.log(err)
		}
	}
}

