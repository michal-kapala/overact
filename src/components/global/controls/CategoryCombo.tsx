import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import { Category } from '../../../../prisma/generated/type-graphql'

interface CategoryComboProps {
  categories: Category[],
  setCategory: Function,
}

export default function CategoryCombo({categories, setCategory}: CategoryComboProps) {
  
  // Only used if there are no categories in the db
  const stubCat = {
    id: "stub",
    name: "Default category",
    tags: [],
    sizeable: false,
    colorable: false
  } as Category;
  
  // UI state
  const [selected, setSelected] = useState(categories[0] ?? stubCat);

  return (
    <div className="w-72">
      <Listbox value={selected} onChange={(cat) => {setSelected(cat); setCategory(cat)}}>
        {({open}) => (
          <div className="relative mt-1">
            <Listbox.Label>Category</Listbox.Label>
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                {open 
                  ?
                  <ChevronUpIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  :
                  <ChevronDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                }
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {categories.map((cat, catIdx) => (
                  <Listbox.Option
                    key={catIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={cat}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {cat.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  )
}
