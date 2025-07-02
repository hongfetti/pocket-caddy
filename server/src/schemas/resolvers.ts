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
    email: string;
    password: string;
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
        totalScore: number;
    }
}

interface UpdateScoreArgs {
    input: {
        id: string;
        courseName?: string;
        par?: number;
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
        },

        //Query to get a specific club to update distance/remove from bag
        club: async (_parent: any, { id }: { id: string }) => {
            const item = await Club.findById(id);

            if (!item) {
                throw new Error("Club not found");
            }

            return item;
        },

        //Query to get a specific round score to update/delete
        score: async (_parent: any, { id }: { id: string }) => {
            const item = await Score.findById(id);

            if (!item) {
                throw new Error("Score not found");
            }

            return item;
        }
    },

    Mutation: {
        addUser: async (_parent: any, { input }: AddUserArgs) => {
            // Check to see if user being created already exists
            const existingUser = await User.findOne({
                $or: [{ username: input.username }, { email: input.email }],
            });

            if (existingUser) {
                throw new AuthenticationError("Username or email already exists");
            }

            // Create a new user with the provided username, email, and password
            const user = await User.create({ ...input });

            // Sign a token with the user's information
            const token = signToken(user.username, user.email, user.name, user._id);

            // Return the token and the user
            return { token, user };
        },

        updateUser: async (
            _parent: any, 
            { input }: UpdateUserArgs, 
            context: any
        ) => {
            if (!context.user) {
                throw new AuthenticationError("You must be logged in to update your profile.");
            }

            if (context.user._id.toString() !== input.id) {
                throw new AuthenticationError("You can only update your own profile.");
            }

            const user = await User.findById(input.id);
            if (!user) {
                throw new Error("User not found.");
            }

            // Only update the password if it's provided, triggering the pre-save hook
            if (input.password) {
                user.password = input.password;  // The pre-save hook will hash it automatically
            }

            // Update other fields
            Object.assign(user, input);

            // Save the updated user
            await user.save();

            return user;
        },

        deleteUser: async (
            _parent: any, 
            { input }: DeleteUserArgs, 
            context: any
        ) => {
            if (!context.user || context.user._id.toString() !== input.id) {
                throw new AuthenticationError("You can only delete your own account.");
            }

            const user = await User.findById(input.id);
            if (!user) {
                throw new Error("User not found.");
            }

            // Delete associated clubs and scores
            await Club.deleteMany({ _id: { $in: user.bag } });
            await Score.deleteMany({ _id: { $in: user.scores } });

            // Delete the user
            await User.findByIdAndDelete(input.id);

            return { message: "User successfully deleted." };
        },

        login: async (_parent: any, { email, password }: LoginUserArgs) => {
            // Find a user with the provided email
            const user = await User.findOne({ email });

            // If no user is found, throw an AuthenticationError
            if (!user) {
                throw new AuthenticationError("Could not authenticate user.");
            }

            // Check if the provided password is correct
            const correctPw = await user.isCorrectPassword(password);

            // If the password is incorrect, throw an AuthenticationError
            if (!correctPw) {
                throw new AuthenticationError("Could not authenticate user.");
            }

            // Sign a token with the user's information
            const token = signToken(user.username, user.email, user.name, user._id);

            // Return the token and the user
            return { token, user };
        },

        addClub: async (
            _parent: any, 
            { input }: AddClubArgs, 
            context: any
        ) => {
            if (!context.user) {
                throw new AuthenticationError("You must be logged in to add a new club")
            }

            // create club
            const club = await Club.create({
                clubType: input.clubType,
                distance: input.distance,
            });

            await User.findByIdAndUpdate(
                context.user._id,
                { $push: { bag: club._id } },
                { new: true }
            );

            return club
        },

        updateClub: async (
            _parent: any, 
            { input }: UpdateClubArgs, 
            context: any
        ) => {
            if (!context.user) {
                throw new AuthenticationError("You must be logged in to update a club")
            }

            // Find Club
            const club = await Club.findById(input.id);
            if (!club) {
                throw new Error("Club not found")
            }

            // Update Club
            const updatedClub = await Club.findByIdAndUpdate(
                input.id,
                { $set: input },
                { new: true, runValidators: true }
            );

            return updatedClub;
        },

        deleteClub: async (
            _parent: any, 
            { input }: DeleteClubArgs, 
            context: any
        ) => {
            if (!context.user) {
                throw new AuthenticationError("You must be logged in to delete a club")
            }

            // Find the club
            const club = await Club.findById(input.id);
            if (!club) {
                throw new Error("Club not found")
            }

            await User.findByIdAndUpdate(
                context.user._id,
                { $pull: { club: input.id } },
                { new: true }
            );

            // delete club 
            const deletedItem = await Club.findByIdAndDelete(input.id);

            return deletedItem;
        },

        addScore: async (
            _parent: any, 
            { input }: AddScoreArgs, 
            context: any
        ) => {
            if (!context.user) {
                throw new AuthenticationError("You must be logged in to add a score")
            }

            // create new round score
            const score = await Score.create({
                courseName: input.courseName,
                par: input.par,
                totalScore: input.totalScore,
            });

            await User.findByIdAndUpdate(
                context.user._id,
                { $push: { score: score._id }},
                { new: true }
            );

            return score
        },

        updateScore: async (
            _parent: any, 
            { input }: UpdateScoreArgs, 
            context: any
        ) => {
            if (!context.user) {
                throw new AuthenticationError("You must be logged in to update a score")
            }

            // Find Score 
            const score = await Score.findById(input.id);
            if (!score) {
                throw new Error("Round not found")
            }

            // Update Score
            const updatedScore = await Score.findByIdAndUpdate(
                input.id,
                { $set: input },
                { new: true, runValidators: true }
            );

            return updatedScore;
        },

        deleteScore: async (
            _parent: any, 
            { input }: DeleteScoreArgs, 
            context: any
        ) => {
            if (!context.user) {
                throw new AuthenticationError("You must be logged in to delete a score")
            }

            // Find Round
            const score = await Score.findById(input.id);
            if (!score) {
                throw new Error("Round not found")
            }

            // delete score 
            const deletedScore = await Score.findByIdAndDelete(input.id);

            return deletedScore;
        },
        },
};

export default resolvers;