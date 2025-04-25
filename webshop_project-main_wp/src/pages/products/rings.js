import React from 'react';
import ProductList from '@/components/ProductList';


export async function getServerSideProps() {
  const productsRef = collection(db, 'products');
  const q = query(productsRef, where('category', '==', 'rings'));
  const snapshot = await getDocs(q);
  const products = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    props: {
      products,
    },
  };
}

export default function ProductPage({ products }) {
  return <ProductList products={products} title="Rings" />;
}
