import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User";
import Club from "./models/Club";
import Score from "./models/Score";

dotenv.config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      // if needed: dbName: "your-db-name"
    });
    console.log("📦 Connected to MongoDB");

    // Optional: clear existing data
    await User.deleteMany({});
    await Club.deleteMany({});
    await Score.deleteMany({});
    console.log("🧹 Cleared existing collections");

    // Insert Clubs
    const clubs = await Club.insertMany([
      { clubType: "DRIVER", distance: 250 },
      { clubType: "EIGHT_IRON", distance: 140 },
      { clubType: "PUTTER", distance: 20 },
    ]);
    console.log("🏌️‍♂️ Clubs seeded");

    // Insert Scores
    const scores = await Score.insertMany([
      { courseName: "Sunnyvale Golf Club", par: 72, totalScore: 85 },
      { courseName: "Pebble Beach", par: 72, totalScore: 92 },
    ]);
    console.log("📊 Scores seeded");

    // Insert User
    const user = await User.create({
      username: "Bob123",
      name: "Bob Smith",
      email: "bob@email.com",
      password: "password123", // will be hashed by pre-save hook
      bag: clubs.map(club => club._id),
      scores: scores.map(score => score._id),
    });
    console.log("👤 User seeded");

    console.log("🌱 Seeding complete!");
  } catch (err) {
    console.error("❌ Seed error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
    process.exit(0);
  }
}

seedDatabase();