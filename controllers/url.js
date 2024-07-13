const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const {customShortCode,expirationDays,url} = req.body;
//  console.log(customShortCode,expirationDays,url);

  if (customShortCode) {
    const existingUrl = await URL.findOne({ shortUrl: customShortCode });
    if (existingUrl) {
      return res.status(400).send('Custom short code already in use.');
    }
    console.log(existingUrl);
  }
  // Set default expiration to 30 days if not provided
  const expirationDate =  expirationDays 
  ? new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000) 
  : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  if (!url) return res.status(400).json({ error: "url is required" });
  const shortID = customShortCode || shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: url,
    visitHistory: [],
    expirationDate,
  });

  return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
    visits: result.visits,
  });
}



module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
