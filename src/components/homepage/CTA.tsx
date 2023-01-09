import { FC } from 'react'

export const CTA: FC<any> = () => {
  return (
    <>
      <div className="bg-gray-50 items-center mx-auto">
        <div className="mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl xl:ml-32">
            <span className="block">Spare funds?</span>
            <span className="block text-blue-600">Buy our products now.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 xl:mr-32">
            <div className="inline-flex rounded-md shadow">
              <a href="#" className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-3 text-base font-medium text-white hover:bg-blue-700">Get started</a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a href="#" className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-blue-600 hover:bg-blue-50">Learn more</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
