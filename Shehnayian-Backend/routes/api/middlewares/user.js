import Joi from "joi";
import PasswordComplexity from "joi-password-complexity";
//utils
import { isUserExists } from "../../../utils/user.js";
import { handleErrors } from "../../../utils/handleError.js";
// http status codes
import { StatusCodes } from "http-status-codes";

const userValidator = async (req, res, next) => {
    const { body } = req;
    const roles = {
        A: "Donor",
        B: "Admin",
        C: "Receiver",
      };
    const userValidatorSchema = Joi.object({
        fullName: Joi.string().max(100).required(),
        email: Joi.string()
            .email({
                minDomainSegments: 2,
                tlds: { allow: ["com", "net", "de", "org", "info", "biz"] },
            })
            .required()
            .max(50),
        password: new PasswordComplexity({
            min: 8,
            max: 50,
            lowerCase: 1,
            upperCase: 1,
            numeric: 1,
            symbol: 1,
        }),
        mobile: Joi.number().required(),
        CNIC: Joi.string().required(),
        address: Joi.string().required(),
        userType: Joi.string().valid(...Object.values(roles)),
    });

    try {
        await userValidatorSchema.validateAsync(body);
    } catch (err) {
        return res.status(StatusCodes.BAD_REQUEST).send({
            error: err.details[0].message
        });
    }
    // checking that user already exists or not and username is available or not
    const { email } = body;
    const isUserValid = await handleErrors(isUserExists, email);
    if (isUserValid) {
        return res.status(StatusCodes.BAD_REQUEST).send({
            error: "User Already Exists"
        });
    } else {
        next();
    }
};


export { userValidator }
