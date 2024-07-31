import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import { formatToRupiah } from '../utils/formatCurrency';

const CartPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <div>
                <h2>{item.name}</h2>
                <p>Price: {formatToRupiah(item.price)}</p>
                <p>Quantity: 
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  />
                </p>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h2>Total: {formatToRupiah(totalAmount)}</h2>
      <button>Checkout</button>
    </div>
  );
};

export default CartPage;
