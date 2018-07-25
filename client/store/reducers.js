import { combineReducers } from 'redux'
import user from './user'
import { GET_PRODUCTS, GET_SELECTED_CATEGORIES, GET_SINGLE_PRODUCT } from './action-creators'

//Reducer
const productsReducer = (state = [], action) => {
	switch (action.type) {
		case GET_PRODUCTS: {
			return action.products
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
		case GET_SINGLE_PRODUCT: {
			return action.product
		}
		default:
			return state
	}
}

const rootReducer = combineReducers({
	products: productsReducer,
	user: user,
	product: singleProductReducer,
	categories: categoriesReducer
})

export default rootReducer
