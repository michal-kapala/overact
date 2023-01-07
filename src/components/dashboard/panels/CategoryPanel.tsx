import { Dialog } from "@headlessui/react";
import AddCategoryForm from "../forms/AddCategoryForm";

interface CategoryPanelProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CategoryPanel({ modalOpen, setModalOpen }: CategoryPanelProps) {
  return (
    <>
      <div className="py-6">
        <div className="flex flex-row max-w-7xl mx-auto px-4 sm:px-6 md:px-16 w-full">
          <div className="flex flex-row w-full">
            <h1 className="text-5xl font-semibold text-gray-300">Categories</h1>
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
          {/* Replace with your content */}
          <div className="py-4">
            <div className="border-4 border-dashed border-gray-300 rounded-lg h-96" />
          </div>
          {/* End replace */}
        </div>
      </div>

      {/* Add category modal*/}
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
                <Dialog.Title>Add new Category</Dialog.Title>
              </div>
              {/* Add category form */}
              <AddCategoryForm setModalOpen={setModalOpen} />
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
