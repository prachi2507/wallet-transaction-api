const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { client_id } = req.body;

  if (!client_id) {
    return res.status(400).json({ message: 'client_id required' });
  }

  const token = jwt.sign({ client_id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({ token });
};