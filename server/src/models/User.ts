import { Schema, model, Types, Document } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
    username: string; 
    name: string; 
    email: string;
    password: string;
    bag: Schema.Types.ObjectId[];
    scores: Schema.Types.ObjectId[];
    isCorrectPassword(password: string): Promise<boolean>
    bestScore: number;
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
        },
        name: {
          type: String,
        },
        email: {
          type: String,
          required: true,
          unique: true,
          match: [/.+@.+\..+/, "Must use a valid email address"],
        },
        password: {
          type: String,
          required: true,
        },
        bag: [
            {
                type: Schema.Types.ObjectId,
                ref: "Club"
            }
        ],
        scores: [
            {
                type: Schema.Types.ObjectId,
                ref: "Score"
            }
        ],
    },

    {
        toJSON: {
            virtuals: true,
        },
    }
)

// hash user password
userSchema.pre<IUser>("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

  // custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  };

userSchema.virtual("bestScore").get(function (this: IUser) {
    return Math.min(...this.scores)
})

const User = model<IUser>("User", userSchema);

export default User