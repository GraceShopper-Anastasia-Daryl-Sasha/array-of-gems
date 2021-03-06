import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import history from '../../history'

const STRIPE_PUBLISHABLE =
	process.env.NODE_ENV === 'production'
		? 'pk_test_3CAkjQwBIR4tbvA3RsnG2n4q'
		: 'pk_test_3CAkjQwBIR4tbvA3RsnG2n4q'

const currency = 'USD'
const fromDollarToCents = amount => Number(amount) * 100

const successPayment = data => {
	alert('Payment Successful')
}

const errorPayment = data => {
	alert('Unsuccessful Payment')
}

const onToken = (amount, description, clearCart) => token =>
	axios
		.post('/api/stripe', {
			description,
			source: token.id,
			currency,
			amount: fromDollarToCents(amount)
		})
		// .then(successPayment)
		.then(clearCart())
		.then(history.push('/home'))
		.catch(errorPayment)

const CheckoutForm = ({ name, description, amount, clearCart }) => (
	<StripeCheckout
		name={name}
		description={description}
		amount={fromDollarToCents(amount)}
		token={onToken(amount, description, clearCart)}
		currency={currency}
		stripeKey={STRIPE_PUBLISHABLE}
	/>
)

export default CheckoutForm
