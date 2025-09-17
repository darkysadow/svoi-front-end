interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{ message: string }>
}

export async function graphqlFetch<T>(query: string, variables?: Record<string, any>): Promise<GraphQLResponse<T>> {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "https://shining-cat-a6759516a6.strapiapp.com/graphql"

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    return {
      errors: [{ message: error instanceof Error ? error.message : "Unknown error" }],
    }
  }
}
