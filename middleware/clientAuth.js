module.exports = (req, res, next) => {
  const clientId = req.headers["client-id"];

  if (!clientId) {
    return res.status(400).json({ error: "client-id header required" });
  }

  req.clientId = clientId;
  next();
};