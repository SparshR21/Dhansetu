const mongoose = require("mongoose");

const SchemeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, default: "N/A" },
    interestRate: { type: String, default: "Varies" },
    eligibility: { type: String, default: "General" },
    link: { type: String, default: "" }, // Official link for more details
  });
  

const Scheme = mongoose.model("Scheme", SchemeSchema);
module.exports = Scheme;
