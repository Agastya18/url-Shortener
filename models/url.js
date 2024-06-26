const mongoose = require("mongoose");
const visitSchema = new mongoose.Schema({
  
  userAgent: String,
  ipAddress: String,
  visitorId: String
});
const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
    visits: [visitSchema],
    expirationDate: { type: Date, required: true },
    uniqueVisitors: { type: Number, default: 0 },

  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
