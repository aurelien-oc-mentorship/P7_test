const jwt = require('jsonwebtoken') 
require('dotenv').config()


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    console.log(token);

    const decodedToken = jwt.verify(token, process.env.JWT_KEY)
    const userId = decodedToken.userId
    
    req.auth = { userId }
    if (req.body.userId && req.body.userId !== userId ) {
      throw 'Invalid user ID'
    } else {
      
      next()
    }
  } catch {
    res.status(401).json({
      error: new Error('You are not authenticated')
    })
  }
} 