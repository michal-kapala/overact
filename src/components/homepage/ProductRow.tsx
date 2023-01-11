import { Product } from "../../../prisma/generated/type-graphql"
import ProductTile from "./ProductTile";

interface ProductRowProps {
  rowName: string;
  products: Product[];
  url: string;
}

export default function ProductRow({ rowName, products, url, }: ProductRowProps) {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl pb-8 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{rowName}</h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((p) => (
            <ProductTile
              key={p.id}
              product={p}
              url={url}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
