import { gql } from "@apollo/client"

// Auth mutations
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
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
  }
`

export const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!, $name: String!) {
    register(email: $email, password: $password, name: $name) {
      token
      user {
        id
        email
        name
        createdAt
      }
    }
  }
`

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $input: UserUpdateInput!) {
    updateUser(id: $id, input: $input) {
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
    }
  }
`

// Order mutations
export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($input: OrderCreateInput!) {
    createOrder(input: $input) {
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
