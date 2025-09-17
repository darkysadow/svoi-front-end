import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

// Create HTTP link for GraphQL endpoint
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "https://shining-cat-a6759516a6.strapiapp.com/graphql",
})

// Auth link to add authorization headers
const authLink = setContext((_, { headers }) => {
  // Get auth token from localStorage or Zustand store
  const token = typeof window !== "undefined" ? localStorage.getItem("svoi-auth-token") : null

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

// Create Apollo Client instance
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Product: {
        fields: {
          // Cache products by ID for efficient updates
          variants: {
            merge: true,
          },
          images: {
            merge: false,
          },
        },
      },
      Query: {
        fields: {
          products: {
            // Merge incoming products with existing cache
            merge(existing = [], incoming) {
              return [...existing, ...incoming]
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    },
  },
})
