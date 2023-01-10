import { Dialog } from "@headlessui/react";
import Box from "@mui/material/Box";
import { DataGrid } from '@mui/x-data-grid';
import AddProductForm from "../forms/AddProductForm";
import { Category, Color, Product, Size } from "../../../../prisma/generated/type-graphql";
import { productColumns } from "../../mui/columns";
import { ThemeProvider } from "@mui/system";
import { theme } from "../../mui/theme";
import { ProductsResult, useProducts } from "../../../graphql/queries/Product/products";

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
        image: `${url}/storage/v1/object/public/product-images/${q.image}`}
    );
  });

  return products;
}

interface ProductsPanelProps {
  categories: Category[];
  colors: Color[];
  sizes: Size[];
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  storageUrl: string;
}

export default function ProductPanel(
  { categories, colors, sizes, setModalOpen, modalOpen, storageUrl }: ProductsPanelProps
) {

  // products
  const {isLoading, data: products} = useProducts();

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
              isLoading
                ?
                <h1>Data loading...</h1>
                :
                <ThemeProvider theme={theme}>
                  <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                      rows={transformProducts(products ?? null, storageUrl)}
                      columns={productColumns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      checkboxSelection
                      disableSelectionOnClick
                      getRowHeight={() => 'auto'}
                      sx={{ 
                        color: 'text.primary',
                        bgcolor: 'background.paper'
                      }}
                    />
                  </Box>
                </ThemeProvider>
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
                categories={categories}
                colors={colors}
                sizes={sizes}
                setModalOpen={setModalOpen}
              />
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
