import Image from 'next/image';
import { Color, Product } from '../../../prisma/generated/type-graphql';

interface ProductTileProps {
  product: Product;
  url: string;
}

export default function ProductTile({product, url}: ProductTileProps) {
  return (
    <div key={product.id} className="relative rounded">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none ">
        <Image
          loader={({ src, width, quality }) => {
            return `${url}/storage/v1/object/public/product-images/${src}`
          }}
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
        />
      </div>
      <div className="flex justify-between p-2">
        <div>
          <h3 className="text-sm text-gray-700">
            {/** Link takes the user to the image source, should be replaced by a product details page */}
            <a href={`${url}/storage/v1/object/public/product-images/${product.image}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {
              product.colors !== undefined && product.colors.length > 0
                ? (product.colors as Color[])[0].name
                : ''
            }
          </p>
        </div>
        <p className="text-sm font-medium text-gray-900">${product.price}</p>
      </div>
    </div>
  );
}
