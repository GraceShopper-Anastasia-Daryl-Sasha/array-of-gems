import axios from 'axios'

//Action Type
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_SELECTED_CATEGORIES = 'GET_SELECTED_CATEGORIES'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const UPDATE_PHOTO = 'UPDATE_PHOTO'
export const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
export const GET_REVIEWS = 'GET_REVIEWS'
export const ADD_TO_CART = 'ADD_TO_CART'
export const GET_CART = 'GET_CART'
export const UPDATE_CART = 'UPDATE_CART'
export const CREATE_REVIEW = 'CREATE_REVIEW'
export const GET_USERS = 'GET_USERS'
export const GET_ORDERS = 'GET_ORDERS'
export const GET_ORDER = 'GET_ORDER'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'
// export const CLEAR_CATEGORIES = 'CLEAR_CATEGORIES'

//Action Creators
const getProducts = products => {
	return { type: GET_PRODUCTS, products }
}

export const getCategories = categories => {
	return { type: GET_SELECTED_CATEGORIES, categories }
}
// export const removeCategories = () => {
// 	return {type: }
// }

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

export const createReview = review => {
	return { type: CREATE_REVIEW, review }
}

export const addToCart = product => {
	return { type: ADD_TO_CART, product }
}

export const updateCart = product => {
	return { type: UPDATE_CART, product }
}

export const removeFromCart = productId => {
	return { type: REMOVE_FROM_CART, productId }
}
export const clearCart = () => {
	return { type: CLEAR_CART }
}

const getUsers = users => ({
	type: GET_USERS,
	users
})

const getOrders = orders => ({
	type: GET_ORDERS,
	orders
})

const getOrder = order => ({
	type: GET_ORDER,
	order
})

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
			console.log('Data', data)
			dispatch(createProduct(data))
			history.push('/admin-manage-products')
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
			history.push('/admin-manage-products')
		} catch (err) {
			console.log('There was an error removing product', err)
		}
	}
}

export const postReview = review => {
	return async dispatch => {
		try {
			const { data } = await axios.post(
				`/api/products/${review.productId}/reviews`,
				review
			)
			dispatch(createReview(data))
		} catch (err) {
			console.log('Review was not added...', err)
		}
	}
}

// export const addToOrder = product => {
// 	return async dispatch => {
// 		try {
// 			const newProduct = await axios.post('/api/order')
// 			console.log('hello')
// 		} catch (err) {
// 			console.log('There was an error adding to order', err)
// 		}
// 	}
// }

// export const removeFromOrder = product => {
// 	return async dispatch => {
// 		try {
// 			console.log('hello')
// 		} catch (err) {
// 			console.log('There was an error adding to order', err)
// 		}
// 	}
// }

export const editPhoto = (photo, history) => {
	return async dispatch => {
		try {
			const { data } = await axios.put(`/api/photos/${photo.id}`, {
				image: photo.image
			})
			console.log('updatedPhoto', data)
			dispatch(updatePhoto(data))
			history.push(`/admin-single-product/${data.productId}`)
		} catch (err) {
			console.log('Product was not updated...', err)
		}
	}
}

export const fetchUsers = () => {
	return async dispatch => {
		try {
			const { data } = await axios.get('/api/users/admin')
			dispatch(getUsers(data))
		} catch (err) {
			console.log('Something went wrong...', err)
		}
	}
}

export const fetchOrders = () => {
	return async dispatch => {
		try {
			const { data } = await axios.get('/api/orders')
			dispatch(getOrders(data))
		} catch (err) {
			console.log('Something went wrong...', err)
		}
	}
}

export const fetchOrder = orderId => {
	return async dispatch => {
		try {
			const { data } = await axios.get(`/api/orders/${orderId}`)
			dispatch(getOrder(data))
		} catch (err) {
			console.log('Could not find order', err)
		}
	}
}
