import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrugs } from '../store/drugsSlice';
import { RootState, AppDispatch } from '../store';

const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const drugs = useSelector((state: RootState) => state.drugs.drugs);
  const loading = useSelector((state: RootState) => state.drugs.loading);

  useEffect(() => {
    dispatch(fetchDrugs());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='catalog-body'>
      <div className='catalog-container'>
      <h1>Drug Catalog</h1>
      <ul>
        {drugs.map((drug) => (
          <li key={drug.id}>
            <a href={`/drug/${drug.id}`}>{drug.name}</a>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default HomePage;
