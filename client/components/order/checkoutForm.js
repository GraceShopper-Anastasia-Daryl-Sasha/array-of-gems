import React from 'react';
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout';

const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
? 'pk_live_HSz1ohl8wTtwMuqIosX4Tyg8'
: 'pk_test_HSz1ohl8wTtwMuqIosX4Tyg8'

const currency = 'USD'
const fromDollarToCents = amount => Number(amount) * 100;

const successPayment = data => {
    alert('Payment Successful')
}

const errorPayment = data => {
    alert('Unsuccessful Payment')
}

const onToken = (amount, description) =>
    token =>
    axios.post('/api/stripe',
    {
        description,
        source: token.id,
        currency,
        amount: fromDollarToCents(amount)
    })
    .then(successPayment)
    .catch(errorPayment)

const CheckoutForm = ({name, description, amount}) =>
   <StripeCheckout
    name={name}
    description={description}
    amount={fromDollarToCents(amount)}
    token={onToken(amount, description)}
    currency={currency}
    stripeKey={STRIPE_PUBLISHABLE}
   />


export default CheckoutForm
