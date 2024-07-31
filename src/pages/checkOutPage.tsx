import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { checkoutCart } from '../store/checkoutSlice';
import { clearCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { formatToRupiah } from '../utils/formatCurrency';

const CheckoutPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {;
      if (cart){
        dispatch(checkoutCart(cart[0]))

        dispatch(clearCart());
        alert('Order successfully!');
        navigate("/home")
        
      }


    } catch (error) {
      console.error('Failed to place order:', error);
      setIsError(true)
    }
  };

  return (
    <div className='checkout'>
      <h1>Checkout</h1>
      {isError && <p style={{ color: 'red' }}>There is error</p>}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <h2>Order Summary</h2>
          <ul>
            {cart.map((item:any) => (
              <li key={item.id}>
                {item.name} - {formatToRupiah(item.price)}
              </li>
            ))}
          </ul>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCheckout();
            }}
          >
            <button type="submit">
                submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
