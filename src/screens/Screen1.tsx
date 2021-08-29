import React, { useEffect, useContext } from 'react';
import StoreContext, { StoreContextType } from '../store/StoreContext';

const productExample = {
  id: Math.random() * 100,
  name: 'Cheese',
  price: 2.5,
  location: 'Refrigerated foods',
};

const Screen1: React.FC = () => {
  const { productRepository } = useContext<StoreContextType>(StoreContext);
  const { state } = productRepository;

  const initOnMounted = () => {
    productRepository.fetchAll();
  };

  useEffect(() => {
    initOnMounted();
  }, []);

  return (
    <>
      {state.products.map((product) => (
        <div
          key={product.id}
          style={{ border: '1px solid black', marginBottom: '17px' }}
        >
          {JSON.stringify(product)}
        </div>
      ))}
      <button onClick={() => productRepository.add(productExample)}>
        Add product
      </button>
      {state.loading ? <span>Loading...</span> : <></>}
      {state.error ? <span>{state.error}</span> : <></>}
    </>
  );
};

export default Screen1;
