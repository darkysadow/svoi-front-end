import { graphqlFetch } from "@/lib/graphql-client"

export const GET_FILTERED_PRODUCTS = `
    query GetProducts($filters: ProductFiltersInput, $pagination: PaginationArg, $sort: [String]) {
        products(filters: $filters, pagination: $pagination, sort: $sort) {
            name
        }
    }
`

export async function fetchProducts(filters: any, page = 1, pageSize = 12, sort = ["createdAt:desc"]) {
  const res = await graphqlFetch<{
    products: {
      data: any[]
      meta: { pagination: { total: number; page: number; pageSize: number; pageCount: number } }
    }
  }>(GET_FILTERED_PRODUCTS, {
    filters,
    pagination: { page, pageSize },
    sort,
  })

  if (res.errors) {
    console.error("GraphQL errors:", res.errors)
    return { data: [], meta: { pagination: { total: 0, page: 1, pageSize, pageCount: 0 } } }
  }

  return res.data?.products ?? { data: [], meta: { pagination: { total: 0, page: 1, pageSize, pageCount: 0 } } }
}