import { createContext, useState } from 'react'
import { PropTypes } from 'prop-types'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    // check if product is in cart
    const productInCartIndex = cart.findIndex(item => item.id === product.id)

    if (productInCartIndex >= 0) {
      // manera clonando el array
      const newCart = structuredClone(cart)
      newCart[productInCartIndex].quantity += 1
      return setCart(newCart)
    }
    setCart(prevState => [...prevState, { ...product, quantity: 1 }])
  }

  const removeFromCart = (product) => {
    setCart(prevState => prevState.filter(item => item.id !== product.id))
  }

  const cleanCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, cleanCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
}
