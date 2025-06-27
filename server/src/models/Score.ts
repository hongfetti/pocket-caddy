import { Schema, model, Types, Document } from "mongoose";

interface IScore extends Document {
    _id: Types.ObjectId;
    courseName: string;
    par: number;
    totalScore: number
};

const scoreSchema = new Schema<IScore>(
    {
        courseName: {
            type: String,
            required: true,
        },
        par: {
            type: Number,
            required: true,
        },
        totalScore: {
            type: Number,
            required: true,
        }
    }
);

const Score = model<IScore>("Score", scoreSchema);

export default Score