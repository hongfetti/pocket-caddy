import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation signup($input: UserInput!) {
    signup(input: $input) {
      user {
        _id
        username
        name
        email
        password
      }
    }
  }
`

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;