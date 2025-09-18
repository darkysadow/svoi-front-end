"use client"

import { useProduct } from "@/hooks/use-product"
import { ProductGallery } from "./product-gallery"
import { ProductInfo } from "./product-info"

interface SingleProductProps {
  productSlug: string
}

export function SingleProduct({ productSlug }: SingleProductProps) {
  const { product, loading, error } = useProduct(productSlug)

  console.log("product", product);
  

  if (!product) return

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <ProductGallery images={[product.photo]} productName={product.name} />
        <ProductInfo product={product} />
    </div>
  )
}