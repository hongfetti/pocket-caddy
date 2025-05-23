import gql from "graphql-tag";

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        name: String!
        email: String!
        password: String!
        bag: [Club]
        scores: [Score]
    }

    type Score {
        _id: ID!
        courseName: String!
        par: Number!
        date: Date!
        totalScore: Number!
    } 

    type Club {
        _id: ID!
        clubType: ClubType!
        distance: Number!
    }

    enum ClubType {
        Driver
        3_WOOD
        5_WOOD
        7_WOOD
        3_HYBRID
        4_HYBRID
        5_HYBRID
        6_HYBRID
        7_HYBRID
        2_IRON
        3_IRON
        4_IRON
        5_IRON
        6_IRON
        7_IRON
        8_IRON
        9_IRON
        PITCHING_WEDGE
        64
        62
        60
        58
        56
        54
        52
        50
        48
        PUTTER
    }

    input UserInput {
        username: String!
        name: String!
        email: String!
        password: String!
        bag: [Club]
        scores: [Score]
    }

    input UpdateUserInput {
        username: String
        name: String
        email: String
        password: String
        bag: [Club]
        scores: [Score]
    }

    input DeleteUserInput {
        id: ID!
    }

    input ClubInput {
        id: ID!
        clubType: ClubType!
        distance: Number
    }

    input UpdateClubInput {
        clubType: ClubType
        distance: Number
    }

    input DeleteClubInput {
        id: ID!
    }

    input ScoreInput {
        id: ID!
        courseName: String!
        par: Number!
        date: Date!
        totalScore: Number!
    }

    input UpdateScoreInput {
        courseName: String
        par: Number
        date: Date
        totalScore: Number
    }

    input DeleteScoreInput {
        id: ID!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        currentUser: User
        myBag: [Club]
        club(id: ID!): Club
        myScores: [Score]
        score(id: ID!): Score
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(input: UserInput!): Auth
        updateUser(input: UpdateUserInput): User
        deleteUser(input: DeleteUserInput): User

        addClub(input: ClubInput!): Club
        updateClub(input: UpdateClubInput!): Club
        deleteClub(input: DeleteClubInput!): Club

        addScore(input: ScoreInput!): Score
        updateScore(input: UpdateScoreInput!): Score
        deleteScore(input: DeleteScoreInput!): Score
    }
`;

export default typeDefs;