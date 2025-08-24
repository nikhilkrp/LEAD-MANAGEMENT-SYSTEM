import jwt from "jsonwebtoken";
import User from "../models/user.models.js"

const auth = async (req, res, next) => {
    try {
        let { token } = req.cookies

        if (!token) {
            return res.status(401).json({ message: "No valid token" })
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifyToken) {
            return res.status(401).json({ message: "User does not have a valid token" })
        }

        req.userId = verifyToken.userId
        next()

    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json({ message: "Token is not valid " });

    }

}
export default auth;



