import { useId } from 'react'
import PropTypes from 'prop-types'
import './Cart.css'
import { CartIcon, ClearCartIcon } from './Icons'
import { useCart } from '../hooks/useCart'

function CartItem ({ thumbnail, price, title, quantity, addToCart }) {
  return (
    <li>
      <img src={thumbnail} alt={title} />
      <div>
        <strong>{title}</strong> - ${price}
      </div>
      <footer>
        <small>
          Qty: {quantity}
        </small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  )
}

CartItem.propTypes = {
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  title: PropTypes.string,
  quantity: PropTypes.number,
  addToCart: PropTypes.func
}

export function Cart () {
  const cartCheckboxId = useId()
  const { cart, cleanCart, addToCart } = useCart()

  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />
      <aside className='cart'>
        <ul>
          {cart.map(product => (
            <CartItem key={product.id} addToCart={() => addToCart(product)} {...product} />
          ))}
        </ul>
        <button onClick={cleanCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  )
}
