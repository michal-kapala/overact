import Head from 'next/head'
import Layout from '../src/components/global/Layout';
import CTA from '../src/components/homepage/CTA'
import PageHeader from '../src/components/homepage/PageHeader'
import ProductCategoriesGrid from '../src/components/homepage/ProductCategoriesGrid'
import ProductRow from '../src/components/homepage/ProductRow'
import { ProductsResult, queryProducts } from '../src/graphql/queries/Product/products';
import { UseQueryResult, useQuery } from 'react-query';

interface HomeProps {
  /**
   * Query result with product list.
   */
  result: ProductsResult;
  /**
   * CDN base url for image loader.
   */
  url: string
}

/**
 * Server-side product fetching for SEO using `initialData` approach.
 * @param ctx 
 */
export async function getServerSideProps(ctx: any) {
  const result = await queryProducts();
  return {
    props: { 
      // products
      result,
      // storage url
      url: process.env.NEXT_PUBLIC_SUPABASE_URL }
  };
}

export default function Home({ result, url }: HomeProps) {
  // initial data passed
  const { data: prodResult }: UseQueryResult<ProductsResult, unknown> = useQuery({
    queryKey: ['products'],
    queryFn: queryProducts,
    initialData: result,
  });

  return (
    <Layout>
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
          <ProductRow 
            rowName='Trending'
            products={prodResult?.products ?? []}
            url={url}
          />
        </div>
      </main>
    </Layout>
  )
}
