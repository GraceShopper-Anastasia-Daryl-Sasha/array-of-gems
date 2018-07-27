import { combineReducers } from 'redux'
import user from './user'
import {
	GET_PRODUCTS,
	GET_SELECTED_CATEGORIES,
	CREATE_PRODUCT,
	UPDATE_PRODUCT,
	DELETE_PRODUCT,
	GET_SINGLE_PRODUCT,
	GET_REVIEWS,
	ADD_TO_CART,
	GET_CART
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
		case GET_SELECTED_CATEGORIES: {
			return action.categories
		}
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
		case GET_SINGLE_PRODUCT: {
			return action.product
		}
		default:
			return state
	}
}

const reviewReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_REVIEWS: {
			return action.reviews
		}
		default:
			return state
	}
}
const orderProducts = {
	products: []
};

const orderReducer = (state = orderProducts, action) => {
	switch (action.type) {
		case GET_CART: {
			return state
		}
		case ADD_TO_CART: {
			return {
				...state,
				products: [...state.products, action.product]
			}
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
	reviews: reviewReducer,
	order: orderReducer
})

export default rootReducer
