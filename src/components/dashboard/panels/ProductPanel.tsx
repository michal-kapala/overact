import { Dialog } from "@headlessui/react";
import AddProductForm from "../forms/AddProductForm";
import { Color, Product, Size } from "../../../../prisma/generated/type-graphql";
import { productColumns } from "../../mui/columns";
import { ProductsResult, useProducts } from "../../../graphql/queries/Product/products";
import { useCategories } from "../../../graphql/queries/Category/categories";
import DataTable from "../../global/controls/DataTable";

/**
 * Transforms products for table display.
 * @param result `products` GraphQL query result
 * @param url CDN base URL
 * @returns 
 */
function transformProducts(result: ProductsResult | null, url: string): Product[] {
  if(!result)
    return [];

  let queried = result.products ?? [];
  let products: Product[] = [];
  // build full image urls
  queried.forEach((q) => {
    products.push(
      {
        ...q,
        image: `${url}/storage/v1/object/public/product-images/${q.image}`
      }
    );
  });

  return products;
}

interface ProductsPanelProps {
  colors: Color[];
  sizes: Size[];
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  storageUrl: string;
  apiUrl: string;
}

export default function ProductPanel(
  { colors, sizes, setModalOpen, modalOpen, storageUrl, apiUrl }: ProductsPanelProps
) {

  // products
  const {isLoading: isProductsLoading, data: products} = useProducts(apiUrl);

  // product categories
  const { isLoading: isCategoriesLoading, data: categories } = useCategories(apiUrl);

  return (
    <>
      <div className="py-6">
        <div className="flex flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:py-6 md:px-16 w-full">
          <div className="flex flex-row w-full">
            <h1 className="text-5xl font-semibold text-gray-300">Products</h1>
          </div>
          <div className="flex flex-row w-full justify-end items-center">
            <div className="rounded-md shadow">
              <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-2 text-base font-medium text-white hover:bg-blue-700"
                onClick={() => setModalOpen(!modalOpen)}
              >
                Add
              </button>
            </div>
          </div>
          
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Data table */}
          <div className="py-4 text-white">
            {
              isProductsLoading || isCategoriesLoading
                ?
                <h1>Data loading...</h1>
                :
                <DataTable
                  rows={transformProducts(products ?? null, storageUrl)}
                  columns={productColumns}
                />
            }
          </div>
          {/* End replace */}
        </div>
      </div>

      {/* Add product modal*/}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen scrollable container */}
        <div className="fixed inset-0 overflow-y-auto">
          {/* Container to center the panel */}
          <div className="flex min-h-full items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <Dialog.Panel className="mx-auto max-w-sm rounded p-5 bg-white text-black">
              <div className="flex justify-center">
                <Dialog.Title>Add new product</Dialog.Title>
              </div>
              {/* Add product form */}
              <AddProductForm 
                categories={categories?.categories ?? []}
                colors={colors}
                sizes={sizes}
                setModalOpen={setModalOpen}
                apiUrl={apiUrl}
              />
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
