import axios from 'axios'

//Action Type
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_SELECTED_CATEGORIES = 'GET_SELECTED_CATEGORIES'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const UPDATE_PHOTO = 'UPDATE_PHOTO'
export const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
export const ADD_TO_CART = 'ADD_TO_CART'
export const GET_CART = 'GET_CART'
export const UPDATE_CART = 'UPDATE_CART'
export const CREATE_REVIEW = 'CREATE_REVIEW'

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
	id: +productId
})

const updatePhoto = photo => ({
	type: UPDATE_PHOTO,
	photo
})

const getSingleProduct = product => {
	return { type: GET_SINGLE_PRODUCT, product }
}

export const getCart = () => {
	return { type: GET_CART }
}

export const addToCart = product => {
	return { type: ADD_TO_CART, product }
}

export const updateCart = product => {
	return { type: UPDATE_CART, product }
}

const createReview = review => {
	console.log('ACTION CREATOR', review)
	return { type: CREATE_REVIEW, review }
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

export const fetchProduct = productId => {
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

export const postProduct = (product, history) => {
	return async dispatch => {
		try {
			const { data } = await axios.post('/api/products', product)
			dispatch(createProduct(data))
			history.push('/admin-mange-products')
		} catch (err) {
			console.log('Product was not created...', err)
		}
	}
}

export const editProduct = (product, history) => {
	return async dispatch => {
		try {
			const updatedProduct = await axios.put(
				`/api/products/${product.id}`,
				product
			)
			dispatch(updateProduct(updatedProduct))
			history.push(`/admin-single-product/${product.id}`)
		} catch (err) {
			console.log('Product was not updated...', err)
		}
	}
}

export const removeProduct = (productId, history) => {
	return async dispatch => {
		try {
			await axios.delete(`/api/products/${productId}`)
			dispatch(deleteProduct(productId))
			history.push('/admin-mange-products')
		} catch (err) {
			console.log('There was an error removing product', err)
		}
	}
}

export const postReview = (review) => {
	return async dispatch => {
		try {
			const { data } = await axios.post(`/api/products/${review.productId}/reviews`, review)
			dispatch(createReview(data))
		} catch (err) {
			console.log('Review was not added...', err)
		}
	}
}
