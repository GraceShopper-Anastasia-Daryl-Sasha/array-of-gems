import { combineReducers } from 'redux'
import user from './user'
import { GET_PRODUCTS } from './action-creators'

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

const singleProductReducer = (state = {}, action) => {
	return state
}

const rootReducer = combineReducers({
	products: productsReducer,
	user: user,
	product: singleProductReducer
})

export default rootReducer
