import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { CTA } from '../src/components/CTA'
import { PageHeader } from '../src/components/PageHeader'
import ProductCategoriesGrid from '../src/components/ProductCategoriesGrid'
import ProductRow from '../src/components/ProductRow'

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Overact</title>
      </Head>
      <main id="page-content" className="flex flex-auto flex-col max-w-full">
        <div className="">
          <PageHeader 
            title="Bored with WordPress?" 
            subtitle="Easily extensible ecommerce platform made with Next."
          />
          <ProductCategoriesGrid />
          <CTA />
          <ProductRow />
        </div>
      </main>
    </>
  )
}

export default Home
