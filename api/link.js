const crypto = require('crypto');

module.exports = (req, res) => {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Get current host (e.g. your-app.vercel.app or custom domain)
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost:3000';
  const proto = req.headers['x-forwarded-proto'] || 'https';
  
  // Generate random cryptographic unique identifier and tags
  const randomId = crypto.randomBytes(6).toString('hex');
  const timestamp = Date.now();
  const categories = ['tech', 'gaming', 'cloud', 'dev', 'ai', 'cyber'];
  const cat = categories[Math.floor(Math.random() * categories.length)];
  
  // Build a unique dynamic destination link
  const uniqueUrl = `${proto}://${host}/article?id=${randomId}&cat=${cat}&t=${timestamp}&ref=portal`;

  return res.status(200).json({
    success: true,
    url: uniqueUrl,
    id: randomId,
    category: cat,
    timestamp: timestamp
  });
};
