import jwt from "jsonwebtoken";
import dotenv from "dotenv"

// dotenv config
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

// http status codes
import { StatusCodes } from "http-status-codes";

export default (req, res, next) => {
    // get token from header
    const token = req.header("x-auth-token");
    // check if token exists
    if (!token) {
        return res
            .send(StatusCodes.UNAUTHORIZED)
            .json({ msg: "No Token, Authorization denied" });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = { userID: decoded.userID, type: decoded.type };
        next();
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid Token" });
    }
};
