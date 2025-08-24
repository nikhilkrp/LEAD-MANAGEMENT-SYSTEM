import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Lead from "./models/leads.models.js";

dotenv.config();

const seedLeads = async () => {
  try {
    await connectDB();

    await Lead.deleteMany();

   
    const leads = [];
    for (let i = 0; i < 100; i++) {
      leads.push({
        first_name: `First${i}`,
        last_name: `Last${i}`,
        email: `lead${i+1}@example.com`,
        phone: `999999${i+1}`,
        company: `Company${i+1}`,
        city: `City${i+1}`,
        state: `State${i+1}`,
        source: ["website", "facebook_ads", "google_ads", "referral", "events", "other"][i % 6],
        status: ["new", "contacted", "qualified", "lost", "won"][i % 5],
        score: Math.floor(Math.random() * 100),
        lead_value: Math.floor(Math.random() * 10000),
        last_activity_at: new Date(),
        is_qualified: i % 2 === 0,
      });
    }

    await Lead.insertMany(leads);
    console.log("100 Leads Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error(" Seeding failed", error);
    process.exit(1);
  }
};

seedLeads();
