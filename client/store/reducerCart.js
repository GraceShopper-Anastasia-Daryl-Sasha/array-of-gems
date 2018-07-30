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
            console.log('CART', cart)
            let updatedProducts = [...cart.products],
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
                action.product.quantity =
                    productToUpdate.quantity + action.product.quantity
                action.product.subtotal = (action.product.quantity * action.product.price).toFixed(2)
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
            state.products.map(product => {
                if (product.productId !== action.productId) {
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
                        orderTotal: total.toFixed(2)
                    })
                )
            }
            return {
                ...state,
                products: updatedProducts,
                orderTotal: total.toFixed(2)
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
            console.log("ORIGINAL TOTAL", cart.orderTotal, "newTotal", newTotal)
            return {
                ...state,
                orderTotal: newTotal,
                code: action.code
            }
        }
        default: {
            return state
        }
    }
}
