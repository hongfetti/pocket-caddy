import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  {
    currentUser {
      _id
      username
      name
      email
      password
      bag {
        _id
        clubType
        distance
      }
      scores {
        _id
        courseName
        par
        totalScore
      }
    }
  }
`;

export const GET_CLUBS = gql`
  query GetClubs {
    club {
        _id
        clubType
        distance
    }
  }
`;

export const GET_CLUB_BY_ID = gql`
  query GetClubById($clubId: ID!) {
    club (id: $clubId) {
        _id
        clubType
        distance
    }
  }
`;