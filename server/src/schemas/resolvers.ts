import { User, Club, Score } from "../models/index.js"
import { signToken, AuthenticationError } from "../utils/auth.js";

interface UserDocument {
    username: string;
    email: string;
    password: string;
}