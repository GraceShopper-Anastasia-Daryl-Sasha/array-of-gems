import { combineReducers } from 'redux'
import user from './user'
import {
	GET_PRODUCTS,
	GET_SELECTED_CATEGORIES,
	CREATE_PRODUCT,
	UPDATE_PRODUCT,
	DELETE_PRODUCT,
	GET_SINGLE_PRODUCT,
	CREATE_REVIEW,
	UPDATE_PHOTO,
	GET_USER_INFO,
	DELETE_REVIEW,
	UPDATE_ROLE,
	GET_USERS,
	GET_ORDERS,
	GET_ORDER,
	UPDATE_ORDER
} from './action-creators'
import { orderReducer } from './reducerCart'

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
			const index = state.photos.findIndex(elem => {
				if (elem.id === action.photo.id) return elem.id
			})
			return { ...state, ...state.photos.splice(index, 1, action.photo) }
		}
		default:
			return state
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
		case UPDATE_ORDER:
			return { ...state, ...action.order }
		default:
			return state
	}
}

const singleUserReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_USER_INFO:
			return action.user
		case DELETE_REVIEW: {
			const index = state.reviews.findIndex(elem => {
				if (elem.id === action.id) return elem.id
			})
			return {
				...state,
				reviews: [
					...state.reviews.slice(0, index),
					...state.reviews.slice(index + 1)
				]
			}
		}
		case UPDATE_ROLE: {
			console.log('Action', action.user)
			return { ...state, ...action.user }
		}

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
	orderview: singleOrderReducer,
	userInfo: singleUserReducer
})

export default rootReducer
