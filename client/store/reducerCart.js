import {
	ADD_TO_CART,
	CLEAR_CART,
	REMOVE_FROM_CART,
	APPLY_DISCOUNT
} from './action-creators'

export const orderReducer = (state = {}, action) => {
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

			let updatedProducts = cart.products,
				isIncluded = false,
				productToUpdate,
				total = 0

			cart.products.map(product => {
				if (product.productId === action.product.productId) {
					isIncluded = true
					productToUpdate = product
				}
			})

			if (cart.products.length > 0 && isIncluded === true) {
				productToUpdate.quantity =
					productToUpdate.quantity + action.product.quantity
				productToUpdate.subtotal = (
					productToUpdate.quantity * productToUpdate.price
				).toFixed(2)
				updatedProducts.splice(
					updatedProducts.indexOf(productToUpdate),
					1,
					productToUpdate
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
					orderTotal: total.toFixed(2)
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

			const cart = JSON.parse(localStorage.getItem('cart'))
			JSON.parse(localStorage.getItem('cart')).products.map(product => {
				if (product.productId !== action.productId) {
					updatedProducts.push(product)
					total = Number(total) + Number(product.subtotal)
				}
			})

			localStorage.removeItem('cart')
			// total = total.toFixed(2)
			if (cart.products.length > 0) {
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
				products: JSON.parse(localStorage.getItem('cart')).products,
				orderTotal: JSON.parse(localStorage.getItem('cart')).orderTotal
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
		case APPLY_DISCOUNT: {
			const cart = JSON.parse(localStorage.getItem('cart'))
			const newTotal = (cart.orderTotal / 2).toFixed(2)

			localStorage.removeItem('cart')
			localStorage.setItem(
				'cart',
				JSON.stringify({
					products: cart.products,
					orderTotal: newTotal,
					code: action.code
				})
			)

			return {
				...state,
				orderTotal: JSON.parse(localStorage.getItem('cart')).orderTotal
			}
		}
		default: {
			return state
		}
	}
}
