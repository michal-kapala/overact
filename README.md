# Overview
Overact is an e-commerce platform built with Next.js and Supabase.

This is Vercel production branch of the repo. You can deploy your own instance using the button below.


[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmichal-kapala%2Foveract&env=DATABASE_URL,SHADOW_DATABASE_URL,NEXTAUTH_SECRET,GITHUB_ID,GITHUB_SECRET,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY&envDescription=Environment%20variable%20needed%20to%20run%20the%20application%20with%20the%20implemented%20intergrations%20(Prisma%2C%20NextAuth%20GitHub%2BGoogle%2C%20Supabase)&envLink=https%3A%2F%2Fgithub.com%2Fmichal-kapala%2Foveract)

# Configuration

## Database
Overact uses [Prisma](https://www.prisma.io/docs/getting-started) to manage the database, as well as [Supabase API](https://supabase.com/docs/reference/javascript/installing) for CDN storage management.

It is recommended to use Supabase and pair storage with the database service, but if you want to use a different database provider you should either create additional Supabase project for storage or make changes in storage code to support the CDN of choice.

To configure Prisma ORM:
1. Copy your connection string URI, e.g. from Supabase project (`Project Settings/Database`)
2. Create `prisma/.env` file; remember to fill in your Supabase password
```
# Prisma URLs
DATABASE_URL=<connection string URI>
SHADOW_DATABASE_URL=<connection string URI>
```
3. Generate [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client) and [GraphQL types](https://prisma.typegraphql.com/docs/intro)
```
npx prisma generate
```
4. Sync your Prisma schema with the database
```
# use `npx prisma migrate` when needed
npx prisma db push
```

You should generate and sync changes with the database everytime you want changes from [`schema.prisma`](https://github.com/michal-kapala/overact/blob/main/prisma/schema.prisma) to apply

## Storage
Overact uses [Supabase Storage](https://supabase.com/docs/guides/storage) for CDN services.

To interact with content stored in Supabase Storage Overact:
- loads resource URIs from database queries (download)
    - with `getServerSideProps` (front-office)
    - with client-side fetching (dashboard)
- mutates the resources with anonymous user Supabase Storage API calls
    - `api/supabase/storage` lookup retrieves `anon` API key and CDN base URL
    - after the resource gets updated
        - its URI is reflected in the database (upload)
        - the owning object is removed from the database (deletion)

This way protected pages like dashboard can interact with Supabase Storage while your API key is stored securely on the server.

To configure Supabase Storage:

1. Go to 'Storage' in your Supabase project and create a **public** `product-images` [bucket](https://supabase.com/docs/guides/storage#buckets).

2. Create the following policy for `storage.objects` table, which enables all operations for `anon` role:

```sql
CREATE POLICY "allow all for anon" ON "storage"."objects"
AS PERMISSIVE FOR ALL
TO anon
USING (bucket_id = 'product-images'::text)
```
3. Copy `anon` API key and project URL from `API/Settings` and add them as variables to `.env.local`:
```
# Supabase API
NEXT_PUBLIC_SUPABASE_URL=<your Supabase URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your anon API key>
```
These will be passed as props to the protected pages by `getServerSideProps` to create a client-side [Supabase Client](https://github.com/supabase/supabase-js#usage).

4. Generate [Supabase types](https://supabase.com/docs/guides/api/generating-types) for Typescript:
- make sure you installed the dependencies
```
npm install
```
- init Supabase config and create `supabase/types` folder
```
npx supabase init
mkdir "supabase/types"
```
- log into your Supabase project
```
npx supabase login
```
- generate types
```
npx supabase gen types typescript --project-id "<your project ID>" --schema public > supabase/types/supabase.ts
```

## API

### Auth
User authentication is based on [3rd party OAuth providers](https://next-auth.js.org/providers/) available with [NextAuth.js](https://next-auth.js.org/getting-started/introduction). Session data is saved in your database using [Prisma adapter for NextAuth.js](https://next-auth.js.org/adapters/prisma).

Please note Overact does not support [account linking](https://github.com/nextauthjs/next-auth/discussions/2808), which means a user can only have 1 account per email address.

Standard [NextAuth.js REST API](https://next-auth.js.org/getting-started/rest-api) endpoints are available under `api/auth/*`.

The template uses [GitHub](https://next-auth.js.org/providers/github) and [Google](https://next-auth.js.org/providers/google) OAuth providers. You can change OAuth provider configuration in [`pages/api/auth/[...nextauth].js`](https://github.com/michal-kapala/overact/blob/main/pages/api/auth/%5B...nextauth%5D.js).

To set up the template's providers:
1. Create and configure OAuth application for each provider:
- [GitHub OAuth](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)
- [Google OAuth](https://support.google.com/cloud/answer/6158849?hl=en)
2. Copy and add OAuth client ID and secret of each OAuth app to `.env.local`:
```
# NextAuth

# Supply a secret to suppress [next-auth][NO_SECRET] warning
NEXTAUTH_SECRET=your_nextauth_secret

## Github
GITHUB_ID=<your GitHub OAuth ID>
GITHUB_SECRET=<your GitHub OAuth secret>

## Google
GOOGLE_CLIENT_ID=<your Google OAuth ID>
GOOGLE_CLIENT_SECRET=<your Google OAuth secret>
```

### GraphQL
Overact exposes [GraphQL Apollo Server](https://www.apollographql.com/docs/) with [GraphQL Shield](https://the-guild.dev/graphql/shield) for API access permissions under `api/graphql`.

GraphQL types and resolvers are autogenerated with `npx prisma generate`.

Customizable GraphQL configuration is located at [`src/graphql/*`](https://github.com/michal-kapala/overact/tree/main/src/graphql)
- [API access permissions](https://github.com/michal-kapala/overact/blob/main/src/graphql/permissions.ts)
- [available resolvers](https://github.com/michal-kapala/overact/blob/main/src/graphql/resolvers.ts)

### Supabase
While GraphQL API integrates with Prisma for database access, Supabase Storage API needs direct interaction. To avoid unnecessary file transfer, content uploading and deletion happens client-side.

Protected pages can retrieve `anon` API key and CDN base URL needed for [Supabase JS API](https://supabase.com/docs/reference/javascript/introduction) calls using `getServerSideProps`.

Note that this approach utilizes anonymous user authentication to Supabase and therefore is not intended for regular users' file access.

## Next.js app

### Run (dev-mode)
```
npm run dev
```

### Build for production
```
npm run build
```

### Run (prod)
```
npm run start
```

### Run ESLint check
```
npm run lint
```
