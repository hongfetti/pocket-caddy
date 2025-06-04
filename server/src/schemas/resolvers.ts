import { User, Club, Score } from "../models/index.js"
import { signToken, AuthenticationError } from "../utils/auth.js";

interface UserDocument {
    username: string;
    email: string;
    password: string;
}

interface UserContext {
    user: {
        _id: string;
        username: string;
        email: string;
        password: string;
    }
}

interface AddUserArgs {
    input: {
        username: string;
        name: string;
        email: string;
        password: string;
    }
}

interface UpdateUserArgs {
    input: {
        id: string;
        username?: string;
        name?: string;
        email?: string;
        password?: string;
    }
}

interface DeleteUserArgs {
    input: {
        id: string;
    }
}

interface LoginUserArgs {
    input: {
        username: string;
        password: string;
    }
}

interface AddClubArgs {
    input: {
        clubType: string;
        distance: number;
    }
}

interface UpdateClubArgs {
    input: {
        id: string;
        distance?: number;
    }
}

interface DeleteClubArgs {
    input: {
        id: string;
    }
}

interface AddScoreArgs {
    input: {
        courseName: string;
        par: number;
        date: Date;
        totalScore: number;
    }
}

interface UpdateScoreArgs {
    input: {
        id: string;
        courseName?: string;
        par?: number;
        date?: Date;
        totalScore?: number;
    }
}

interface DeleteScoreArgs {
    input: {
        id: string;
    }
}

const resolvers = {
    Query: {
        currentUser: async (_parent: any, _args: any, context: UserContext) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id })
                .populate("bag")
                .populate("scores")

                return user;
            }
            throw new AuthenticationError("Could not authenticate user.")
        },

        myBag: async (_parent: any, _args: any, context: any) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id })
                .populate("bag")

                return user ? user.bag : [];
            }
            throw new AuthenticationError("Could not authenticate user.")
        },

        myScores: async (_parent: any, _args: any, context: any) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id })
                .populate("scores")

                return user ? user.scores : [];
            }
            throw new AuthenticationError("Could not authenticate user.")
        }
    },

    Mutation: {

    },
};

export default resolvers;