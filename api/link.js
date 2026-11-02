const crypto = require('crypto');

const AUTH_KEY = "Raj Nandini is the heart of Rudra/Zeno";

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Auth-Key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Security Check: Verify password from Query param, Header, or Authorization
  const providedAuth = req.query.auth || req.headers['x-auth-key'] || req.headers['authorization'];
  if (providedAuth !== AUTH_KEY) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized: Access restricted. Valid security key required."
    });
  }

  const host = req.headers['x-forwarded-host'] || req.headers.host || 'ouo-portal.vercel.app';
  const proto = req.headers['x-forwarded-proto'] || 'https';
  
  const randomId = crypto.randomBytes(6).toString('hex');
  const timestamp = Date.now();
  const categories = ['tech', 'cloud', 'dev', 'ai', 'crypto', 'quantum'];
  const cat = categories[Math.floor(Math.random() * categories.length)];
  
  // Encrypted auth token for target URL so article page unlocks for automated visitor
  const authHash = crypto.createHash('sha256').update(AUTH_KEY + timestamp).digest('hex').substring(0, 16);
  const uniqueUrl = `${proto}://${host}/article?id=${randomId}&cat=${cat}&t=${timestamp}&auth=${encodeURIComponent(AUTH_KEY)}`;

  return res.status(200).json({
    success: true,
    url: uniqueUrl,
    id: randomId,
    category: cat,
    timestamp: timestamp
  });
};
