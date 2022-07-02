import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv"

// dotenv config
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

import User from "../models/User.js"
import { handleErrors } from "./handleError.js";

// function to generate password hash using bcryptjs and using gensalt 10.
async function generatePasswordHash(password) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
}

// function to generate json web token.
async function getJSONWebToken(payload) {
    const expiryTime = 46000; // this can be changed later
    try {
        const token = await jwt.sign(payload, jwtSecret, { expiresIn: expiryTime });
        return token;
    } catch (err) { }
}

// function to check that whether user already exists or not.
async function isUserExists(email) {
    let user = await User.findOne({ email });
    if (user) {
        return true;
    } else {
        return false;
    }
}

// function to get user id
async function getUserId(email) {
    let user = await User.findOne({ email });
    if (!user) {
        return null;
    } else {
        return user.id;
    }
}

// function to get user by email
async function getUserByEmail(email) {
    let user = await User.findOne({ email });
    if (!user) {
        return null;
    } else {
        return user;
    }
}


// function to validate.
async function validateUserCredentials({ email, password }) {
    try {
        let user = await User.findOne({ email: email });
        if (!user) {
            return false;
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return isMatch;
        }
        return isMatch;
    } catch (error) {
        console.log(error.message)
        return { errors: { msg: 'Sever Error' } };
    }
}

export { validateUserCredentials, getUserId,getUserByEmail, getJSONWebToken, isUserExists, generatePasswordHash };