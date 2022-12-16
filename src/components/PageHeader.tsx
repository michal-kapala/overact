import { FC } from 'react'

type PageHeaderProps = {
  title: string,
  subtitle: string
}

export const PageHeader: FC<PageHeaderProps> = ({title, subtitle}) => {
  return (
    <div className="bg-gray-50">
      <div className="space-y-16 container xl:max-w-7xl mx-auto px-4 py-8 lg:px-8 lg:py-0 lg:pt-16 lg:pb-8">
        <div className="text-center">
          <h2 className="text-3xl text-black md:text-6xl font-extrabold mb-4">
            {title}
          </h2>
          <h3 className="text-lg md:text-xl md:leading-relaxed font-medium text-gray-600 lg:w-1/2 mx-auto">
            {subtitle}
          </h3>
        </div>
      </div>
    </div>
  )
}
