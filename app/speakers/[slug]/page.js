import React from 'react'
import data from '../../../data.json'
import ProductDetails from '@/app/components/ProductDetails/ProductDetails'
const ProductDetailPage = async ({ params }) => {
  const product = data.filter((p) => p.slug === params.slug);
  return (
    <div>
      <ProductDetails products={product} />
    </div>
  );
};

export default ProductDetailPage