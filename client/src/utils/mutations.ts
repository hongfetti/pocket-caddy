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

export const ADD_CLUB = gql `
  mutation addClub($input: ClubInput!) {
    addClub(input: $input) {
      _id
      clubType
      distance
    }
  }
`

export const UPDATE_CLUB = gql `
  mutation updateClub($input: UpdateClubInput!) {
    updateClub(input: $input) {
      _id
      clubType
      distance
    }
  }
`

export const DELETE_CLUB = gql `
  mutation deleteClub($input: DeleteClubInput!) {
    deleteClub(input: $input) {
      _id
      clubType
      distance
    }
  }
`

export const ADD_SCORE = gql `
  mutation addScore($input: ScoreInput!) {
    addScore(input: $input) {
      _id
      courseName
      par
      totalScore
    }
  }
`

export const UPDATE_SCORE = gql `
  mutation updateScore($input: UpdateScoreInput!) {
    updateScore(input: $input) {
      _id
      courseName
      par
      totalScore
    }
  }
`

export const DELETE_SCORE = gql `
  mutation deleteScore($input: DeleteScoreInput!) {
    deleteScore(input: $input) {
      _id
      courseName
      par
      totalScore
    }
  }
`