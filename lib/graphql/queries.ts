import { gql } from "@apollo/client"

// Product queries
export const GET_PRODUCTS = gql`
  query GetProducts($filter: ProductFilter, $sort: ProductSort, $limit: Int, $offset: Int) {
    products(filter: $filter, sort: $sort, limit: $limit, offset: $offset) {
      id
      name
      price
      originalPrice
      image
      images
      category
      season
      series
      description
      features
      specifications {
        material
        fit
        care
        origin
      }
      variants {
        colors {
          name
          value
        }
        sizes
      }
      badges
      inStock
      quantity
    }
  }
`

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      name
      price
      originalPrice
      image
      images
      category
      season
      series
      description
      features
      specifications {
        material
        fit
        care
        origin
      }
      variants {
        colors {
          name
          value
        }
        sizes
      }
      badges
      inStock
      quantity
    }
  }
`

// User queries
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      email
      name
      phone
      address {
        street
        city
        state
        zipCode
        country
      }
      createdAt
    }
  }
`

// Order queries
export const GET_USER_ORDERS = gql`
  query GetUserOrders($userId: ID!) {
    orders(userId: $userId) {
      id
      status
      total
      createdAt
      items {
        id
        productId
        name
        price
        quantity
        color
        size
      }
    }
  }
`
