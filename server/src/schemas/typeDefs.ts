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
        par: Int!
        totalScore: Int!
    } 

    type Club {
        _id: ID!
        clubType: ClubType!
        distance: Int!
    }

    enum ClubType {
        DRIVER
        THREE_WOOD
        FIVE_WOOD
        SEVEN_WOOD
        THREE_HYBRID
        FOUR_HYBRID
        FIVE_HYBRID
        SIX_HYBRID
        SEVEN_HYBRID
        TWO_IRON
        THREE_IRON
        FOUR_IRON
        FIVE_IRON
        SIX_IRON
        SEVEN_IRON
        EIGHT_IRON
        NINE_IRON
        PITCHINGWEDGE
        SIXTYFOUR
        SIXTYTWO
        SIXTY
        FIFTYEIGHT
        FIFTYSIX
        FIFTYFOUR
        FIFTYTWO
        FIFTY
        FORTYEIGHT
        PUTTER
    }

    input UserInput {
        username: String!
        name: String!
        email: String!
        password: String!
        bag: [ID!]
        scores: [ID!]
    }

    input UpdateUserInput {
        username: String
        name: String
        email: String
        password: String
        bag: [ID!]
        scores: [ID!]
    }

    input DeleteUserInput {
        id: ID!
    }

    input ClubInput {
        clubType: ClubType!
        distance: Int
    }

    input UpdateClubInput {
        clubType: ClubType
        distance: Int
    }

    input DeleteClubInput {
        id: ID!
    }

    input ScoreInput {
        courseName: String!
        par: Int!
        totalScore: Int!
    }

    input UpdateScoreInput {
        courseName: String
        par: Int
        totalScore: Int
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