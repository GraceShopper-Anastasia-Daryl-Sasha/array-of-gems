import axios from 'axios'

//Action Type
export const GET_PRODUCTS = 'GET_PRODUCTS'

//Action Creators
const getProducts = products => {
	return { type: GET_PRODUCTS, products }
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
