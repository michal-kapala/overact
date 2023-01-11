import Image from 'next/image';

export default function ProductCategoriesGrid() {
  return (
    <>
      {/* Product List Section: Categories Grid */}
      <div className="bg-gray-50">
        <div className="container xl:max-w-4xl mx-auto px-4 py-4 lg:px-8 lg:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <a href="#" className="sm:col-span-2 md:col-span-1 block group relative transition ease-out opacity-100 active:opacity-75 overflow-hidden">
              <Image 
                loader={({src, width, quality}) => {
                  return `https://source.unsplash.com/PDX_a_82obo/700x700`;
                }}
                src="Electronics"
                alt="Electronics"
                className="transform transition ease-out group-hover:scale-110"
                width={700}
                height={700}
              />
              
              <div className="absolute inset-0 transition ease-out group-hover:bg-opacity-0" />
              <div className="p-4 flex items-center justify-center absolute inset-0">
                <div className="py-3 px-4 bg-white text-black bg-opacity-95 rounded-3xl text-sm font-semibold uppercase tracking-wide transition ease-out group-hover:text-white group-hover:bg-blue-600">
                  Electronics
                </div>
              </div>
            </a>
            <a href="#" className="block group relative transition ease-out active:opacity-75 overflow-hidden">
              <Image 
                loader={({src, width, quality}) => {
                  return `https://source.unsplash.com/1SAnrIxw5OY/700x700`;
                }}
                src="Computers"
                alt="Computers"
                className="transform transition ease-out group-hover:scale-110"
                width={700}
                height={700}
              />
              <div className="absolute inset-0 transition ease-out group-hover:bg-opacity-0" />
              <div className="p-4 flex items-center justify-center absolute inset-0">
                <div className="py-3 px-4 bg-white text-black bg-opacity-95 rounded-3xl text-sm font-semibold uppercase tracking-wide transition ease-out group-hover:text-white group-hover:bg-blue-600">
                  Computers
                </div>
              </div>
            </a>
            <a href="#" className="block group relative transition ease-out active:opacity-75 overflow-hidden">
              <Image 
                loader={({src, width, quality}) => {
                  return `https://source.unsplash.com/gUPiTDBdRe4/700x700`;
                }}
                src="Clothes"
                alt="Clothes"
                className="transform transition ease-out group-hover:scale-110"
                width={700}
                height={700}
              />
              <div className="absolute inset-0 transition ease-out group-hover:bg-opacity-0" />
              <div className="p-4 flex items-center justify-center absolute inset-0">
                <div className="py-3 px-4 bg-white text-black bg-opacity-95 rounded-3xl text-sm font-semibold uppercase tracking-wide transition ease-out group-hover:text-white group-hover:bg-blue-600">
                  Clothes
                </div>
              </div>
            </a>
            <a href="#" className="sm:col-span-2 md:col-span-1 block group relative transition ease-out active:opacity-75 overflow-hidden">
              <Image 
                loader={({src, width, quality}) => {
                  return `https://source.unsplash.com/ALpEkP29Eys/700x700`;
                }}
                src="Smart Home"
                alt="Smart Home"
                className="transform transition ease-out group-hover:scale-110"
                width={700}
                height={700}
              />
              <div className="absolute inset-0 transition ease-out group-hover:bg-opacity-0" />
              <div className="p-4 flex items-center justify-center absolute inset-0">
                <div className="py-3 px-4 bg-white text-black bg-opacity-95 rounded-3xl text-sm font-semibold uppercase tracking-wide transition ease-out group-hover:text-white group-hover:bg-blue-600">
                  Smart Home
                </div>
              </div>
            </a>
            <a href="#" className="block group relative transition ease-out active:opacity-75 overflow-hidden">
              <Image 
                loader={({src, width, quality}) => {
                  return `https://source.unsplash.com/164_6wVEHfI/700x700`;
                }}
                src="Shoes"
                alt="Shoes"
                className="transform transition ease-out group-hover:scale-110"
                width={700}
                height={700}
              />
              <div className="absolute inset-0 transition ease-out group-hover:bg-opacity-0" />
              <div className="p-4 flex items-center justify-center absolute inset-0">
                <div className="py-3 px-4 bg-white text-black bg-opacity-95 rounded-3xl text-sm font-semibold uppercase tracking-wide transition ease-out group-hover:text-white group-hover:bg-blue-600">
                  Shoes
                </div>
              </div>
            </a>
            <a href="#" className="block group relative transition ease-out active:opacity-75 overflow-hidden">
              <Image 
                loader={({src, width, quality}) => {
                  return `https://source.unsplash.com/wW7XbWYoqK8/700x700`;
                }}
                src="Wearables"
                alt="Wearables"
                className="transform transition ease-out group-hover:scale-110"
                width={700}
                height={700}
              />
              <div className="absolute inset-0 transition ease-out group-hover:bg-opacity-0" />
              <div className="p-4 flex items-center justify-center absolute inset-0">
                <div className="py-3 px-4 bg-white text-black bg-opacity-95 rounded-3xl text-sm font-semibold uppercase tracking-wide transition ease-out group-hover:text-white group-hover:bg-blue-600">
                  Wearables
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      {/* END Product List Section: Categories Grid */}
    </>
  )
}
