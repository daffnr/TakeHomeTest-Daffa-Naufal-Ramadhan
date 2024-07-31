import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { useNavigate } from "react-router-dom";
import { formatToRupiah } from '../utils/formatCurrency';


interface Drug {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const DrugDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [drug, setDrug] = useState<Drug | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  console.log(cart)

  const fetchDrug = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/drugs/${id}`);
      setDrug(response.data);
    } catch (err) {
      setError('Failed to fetch drug details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrug();
  }, [id]);

  const handleCart = () => {
    if(drug){
        dispatch(addToCart(drug))
        alert('Item added to cart')
        navigate("/checkout")
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      {drug && (
        <>
          <h1>{drug.name}</h1>
          <img src={drug.imageUrl} alt={drug.name} style={{ width: '200px', height: 'auto' }} />
          <p>{drug.description}</p>
          <p>Price: {formatToRupiah(drug.price)}</p>
          <button onClick={handleCart}>Add to Cart</button>
        </>
      )}
    </div>
  );
};

export default DrugDetailPage;
