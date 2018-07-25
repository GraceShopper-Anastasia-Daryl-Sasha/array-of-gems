import axios from 'axios'


// //Action Type
const GET_PRODUCTS = 'GET_PRODUCTS'
// const GET_PRODUCT = 'GET_PRODUCT'
const GET_CATEGORIES = 'GET_CATEGORIES'

//Initial State
const initialState = {
  allProducts: [],
  selectedCategories: {}
}

// //Action Creators
// export const getProduct = (product) => {
//   return { type: GET_PRODUCT, product}
// }

export const getProducts = (products) => {
  return { type: GET_PRODUCTS, products }
}

export const getCategories = (categories) => {
  return { type: GET_CATEGORIES, categories }
}

// //Thunk Creator
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/products');
      const products = response.data;
      const action = getProducts(products)
      dispatch(action);
    }
    catch (err) {
      console.log(err)
    }
  }
}

//Reducer
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      return { ...state, allProducts: action.products }
    }
    case GET_CATEGORIES: {
      return { ...state, selectedCategories: action.categories }
    }
    default:
      return state
  }
}

export default productsReducer
