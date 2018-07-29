import { combineReducers } from 'redux'
import user from './user'
import {
	GET_PRODUCTS,
	GET_SELECTED_CATEGORIES,
	CREATE_PRODUCT,
	UPDATE_PRODUCT,
	DELETE_PRODUCT,
	GET_SINGLE_PRODUCT,
	ADD_TO_CART,
	GET_CART,
	UPDATE_CART,
	CREATE_REVIEW
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
		case CREATE_REVIEW: {
			return {...state, reviews: [...state, action.review]}
		}
		default:
			return state
	}
}

// const reviewReducer = (state = {}, action) => {
// 	switch (action.type) {

// 		default:
// 			return state
// 	}
// }

const orderProducts = {
	products: [],
	orderTotal: 0
};

const orderReducer = (state = orderProducts, action) => {
	switch (action.type) {
		// case GET_CART: {
		// 	return state
		// }
		case ADD_TO_CART: {
			let updatedProducts = [...state.products];
			let isIncluded = false, productToUpdate;

			state.products.map(product => {
				if (product.id === action.product.id) {
					isIncluded = true;
					productToUpdate = product
				}
			})

			if (state.products.length > 0 && isIncluded === true) {
				action.product.quantity = productToUpdate.quantity + action.product.quantity
				action.product.subtotal = action.product.quantity * action.product.price
				updatedProducts.splice(updatedProducts[productToUpdate], 1, action.product)
			} else {
				updatedProducts.push(action.product)
			}
			let total = 0;
			updatedProducts.map(product => {
				total = total + Number(product.subtotal)
			})

			return {
				...state,
				products: updatedProducts,
				orderTotal: total
			}
		}
		// case UPDATE_CART: {
		// 	const updatedProducts = state.products.map(product => {
		// 		if (product.id !== action.product.id) {
		// 			console.log("if", product)
		// 			updatedProducts.push(product)
		// 		} else {
		// 			product.quantity = action.product.quantity
		// 		}
		// 	})
		// 	return {
		// 		...state,
		// 		products: updatedProducts
		// 	}
		// }
		default:
			return state
	}
}

const rootReducer = combineReducers({
	products: productsReducer,
	user: user,
	product: singleProductReducer,
	categories: categoriesReducer,
	order: orderReducer
})

export default rootReducer
