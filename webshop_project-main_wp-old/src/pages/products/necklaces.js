import React from 'react'; // Ensure React is imported
import ProductList from '@/components/ProductList'; // Ensure this is a default import


export async function getServerSideProps() {
  const productsRef = collection(db, 'products');
  const q = query(productsRef, where('category', '==', 'necklaces'));
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
  return <ProductList products={products} title="Necklaces" />;
}
