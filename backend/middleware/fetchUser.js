var jwt = require('jsonwebtoken')
const JWT_SECRET = "Harryisagood$boy"

const fetchUser = (req, res, next) => {
    //Get the User from the jwt Token and add id to request object
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ error: "Please Login using valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).send({ error: "Please Login using valid token" })
    }

}

module.exports = fetchUser;