const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const dotenv = require("dotenv");
const app = express();
const rateLimit = require('express-rate-limit');
dotenv.config();
const mockData = require('./MOCK_DATA');
const PORT = process.env.PORT;
connectToMongoDB(process.env.MONGO_URI).then(() =>
  console.log("Mongodb connected")
);

app.use(express.json());
app.get('/json', async (req, res) => {
  res.json(mockData);

})

// Define rate limits
const createShortUrlLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many requests, please try again later.'
});

// Middleware to extract user ID or handle custom logic
const customRateLimiter = (req, res, next) => {
  // Assume user ID is passed in the request header for authenticated users
  const userId = req.headers['user-id'];
  //console.log(userId);

  if (userId) {
    // Apply rate limit based on user ID
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 10, // limit each user ID to 10 requests per windowMs
      keyGenerator: (req) => userId, // use user ID as the key
      message: 'Too many requests from this user, please try again later.'
    })(req, res, next);
  } else {
    // Apply rate limit based on IP address for non-authenticated users
    createShortUrlLimiter(req, res, next);
  }
};

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;


  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
        visits:{
          userAgent: req.headers["user-agent"],
          ipAddress: req.ip,
        
        }
      },
    }
  );

    // // Check if the URL has expired
    // if (new Date() > entry.expirationDate) {
    //   return res.status(410).send('URL has expired');
    // }

  res.redirect(entry.redirectURL);
});



app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
