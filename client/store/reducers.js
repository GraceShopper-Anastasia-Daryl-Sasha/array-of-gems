import { combineReducers } from 'redux'
import user from './user'
import {
	GET_PRODUCTS,
	GET_SELECTED_CATEGORIES,
	// CLEAR_CATEGORIES,
	CREATE_PRODUCT,
	UPDATE_PRODUCT,
	DELETE_PRODUCT,
	GET_SINGLE_PRODUCT,
	ADD_TO_CART,
	CLEAR_CART,
	REMOVE_FROM_CART,
	UPDATE_CART,
	CREATE_REVIEW,
	UPDATE_PHOTO,
	GET_USERS,
	GET_ORDERS,
	GET_ORDER
} from './action-creators'

//Reducer
const productsReducer = (state = [], action) => {
	switch (action.type) {
		case GET_PRODUCTS:
			return action.products
		case DELETE_PRODUCT: {
			const index = state.findIndex(elem => elem.id === action.id)
			return [...state.slice(0, index), ...state.slice(index + 1)]
		}
		default:
			return state
	}
}

const categoriesReducer = (state = [], action) => {
	switch (action.type) {
		case GET_SELECTED_CATEGORIES:
			return action.categories
		default:
			return state
	}
}

const singleProductReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_PRODUCT:
			return { ...state, ...action.product }
		case UPDATE_PRODUCT:
			return { ...state, ...action.product }
		case GET_SINGLE_PRODUCT:
			return action.product
		case CREATE_REVIEW:
			return { ...state, reviews: [...state.reviews, action.review] }
		case UPDATE_PHOTO: {
			console.log('Action id', action.photo.id)
			const index = state.photos.findIndex(elem => {
				if (elem.id === action.photo.id) return elem.id
			})
			console.log('Index', index)
			return { ...state, ...state.photos.splice(index, 1, action.photo) }
		}
		default:
			return state
	}
}

const orderReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_TO_CART: {
			if (!localStorage.getItem('cart')) {
				localStorage.setItem(
					'cart',
					JSON.stringify({
						products: [],
						orderTotal: 0
					})
				)
			}
			const cart = JSON.parse(localStorage.getItem('cart'))
			console.log('CART', cart)
			let updatedProducts = cart.products
			let isIncluded = false,
				productToUpdate
			let total = 0

			cart.products.map(product => {
				if (product.id === action.product.id) {
					isIncluded = true
					productToUpdate = product
				}
			})

			if (cart.products.length > 0 && isIncluded === true) {
				action.product.quantity =
					productToUpdate.quantity + action.product.quantity
				action.product.subtotal = action.product.quantity * action.product.price
				updatedProducts.splice(
					updatedProducts[productToUpdate],
					1,
					action.product
				)
			} else {
				updatedProducts.push(action.product)
			}

			updatedProducts.map(product => {
				total = total + Number(product.subtotal)
			})

			localStorage.removeItem('cart')
			localStorage.setItem(
				'cart',
				JSON.stringify({
					products: updatedProducts,
					orderTotal: total
				})
			)

			return {
				...state,
				products: JSON.parse(localStorage.getItem('cart')).products,
				orderTotal: JSON.parse(localStorage.getItem('cart')).orderTotal
			}
		}
		case REMOVE_FROM_CART: {
			let updatedProducts = [],
				total = 0
			state.products.map(product => {
				if (product.id !== action.productId) {
					updatedProducts.push(product)
					total = total + product.subtotal
				}
			})

			localStorage.removeItem('cart')
			if (updatedProducts.length > 0) {
				localStorage.setItem(
					'cart',
					JSON.stringify({
						products: updatedProducts,
						orderTotal: total
					})
				)
			}

			return {
				...state,
				products: updatedProducts,
				orderTotal: total
			}
		}
		case CLEAR_CART: {
			localStorage.removeItem('cart')
			localStorage.setItem(
				'cart',
				JSON.stringify({
					products: [],
					orderTotal: 0
				})
			)

			return {
				...state,
				products: [],
				orderTotal: 0
			}
		}
		default: {
			return state
		}
	}
}

const usersReducer = (state = [], action) => {
	switch (action.type) {
		case GET_USERS:
			return action.users
		default:
			return state
	}
}

const ordersReducer = (state = [], action) => {
	switch (action.type) {
		case GET_ORDERS:
			return action.orders
		default:
			return state
	}
}

const singleOrderReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_ORDER:
			return action.order
		default:
			return state
	}
}

const rootReducer = combineReducers({
	products: productsReducer,
	user: user,
	product: singleProductReducer,
	categories: categoriesReducer,
	order: orderReducer,
	users: usersReducer,
	orders: ordersReducer,
	orderview: singleOrderReducer
})

export default rootReducer
