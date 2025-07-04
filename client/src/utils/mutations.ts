import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        name
      }
    }
  }
`;

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

export const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      _id
      username
      name
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      _id
      username
      name
      email
    }
  }
`;