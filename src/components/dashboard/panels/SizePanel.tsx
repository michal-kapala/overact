import { Dialog } from "@headlessui/react";
import AddSizeForm from "../forms/AddSizeForm";
import { useCategories } from "../../../graphql/queries/Category/categories";
import DataTable from "../../global/controls/DataTable";
import { sizeColumns } from "../../mui/columns";
import { Size } from "../../../../prisma/generated/type-graphql";

interface SizePanelProps {
  sizes: Size[];
  isLoading: boolean;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  apiUrl: string;
}

export default function SizePanel(
  { sizes, isLoading, modalOpen, setModalOpen, apiUrl }: SizePanelProps
) {
  
  // product categories
  const { isLoading: isCategoriesLoading, data: categories } = useCategories(apiUrl);

  return (
    <>
      <div className="py-6">
        <div className="flex flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:py-6 md:px-16 w-full">
          <div className="flex flex-row w-full">
            <h1 className="text-5xl font-semibold text-gray-300">Sizes</h1>
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
              isLoading || isCategoriesLoading
                ?
                <h1>Data loading...</h1>
                :
                <DataTable
                  rows={sizes}
                  columns={sizeColumns}
                />
            }
          </div>
        </div>
      </div>

      {/* Add color modal*/}
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
                <Dialog.Title>Add new Size</Dialog.Title>
              </div>
              {/* Add size form */}
              <AddSizeForm 
                setModalOpen={setModalOpen}
                categories={categories?.categories ?? []}
                apiUrl={apiUrl}
              />
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
