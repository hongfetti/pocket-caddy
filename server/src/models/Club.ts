import { Schema, model, Types, Document } from "mongoose";

interface IClub extends Document {
    _id: Types.ObjectId;
    clubType:
        | "Driver"
        | "3 Wood"
        | "5 Wood"
        | "7 Wood"
        | "3 Hybrid"
        | "4 Hybrid"
        | "5 Hybrid"
        | "6 Hybrid"
        | "7 Hybrid"
        | "2 Iron"
        | "3 Iron"
        | "4 Iron"
        | "5 Iron"
        | "6 Iron"
        | "7 Iron"
        | "8 Iron"
        | "9 Iron"
        | "Pitching Wedge"
        | "64"
        | "62"
        | "60"
        | "58"
        | "56"
        | "54"
        | "52"
        | "50"
        | "48"
        | "Putter"
    distance: number;
}

const clubSchema = new Schema<IClub>(
    {
        clubType: {
            type: String,
            required: true,
            enum: [
              "DRIVER",
              "THREE_WOOD",
              "FIVE_WOOD",
              "SEVEN_WOOD",
              "THREE_HYBRID",
              "FOUR_HYBRID",
              "FIVE_HYBRID",
              "SIX_HYBRID",
              "SEVEN_HYBRID",
              "TWO_IRON",
              "THREE_IRON",
              "FOUR_IRON",
              "FIVE_IRON",
              "SIX_IRON",
              "SEVEN_IRON",
              "EIGHT_IRON",
              "NINE_IRON",
              "PITCHINGWEDGE",
              "SIXTYFOUR",
              "SIXTYTWO",
              "SIXTY",
              "FIFTYEIGHT",
              "FIFTYSIX",
              "FIFTYFOUR",
              "FIFTYTWO",
              "FIFTY",
              "FORTYEIGHT",
              "PUTTER",
            ]
        },
        distance: {
            type: Number
        }
    }
)

const Club = model<IClub>("Club", clubSchema);

export default Club