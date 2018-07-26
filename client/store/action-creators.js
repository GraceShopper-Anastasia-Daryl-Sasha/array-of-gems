import axios from 'axios'

//Action Type
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_SELECTED_CATEGORIES = 'GET_SELECTED_CATEGORIES'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'


//Action Creators
const getProducts = products => {
	return { type: GET_PRODUCTS, products }
}


export const getCategories = categories => {
	return { type: GET_SELECTED_CATEGORIES, categories }
}


const createProduct = product => ({
	type: CREATE_PRODUCT,
	product
})

const updateProduct = product => ({
	type: UPDATE_PRODUCT,
	product
})

const deleteProduct = productId => ({
	type: DELETE_PRODUCT,
	id: productId
})

const getSingleProduct = product => {
	return { type: GET_SINGLE_PRODUCT, product}
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


export const postProduct = (product, history) => {
	return async dispatch => {
		try {
			const { data } = await axios.post('/api/products', product)
			console.log('Data', data)
			dispatch(createProduct(data))
			history.push('/admin')
		} catch (err) {
			console.log('Product was not created...', err)
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

