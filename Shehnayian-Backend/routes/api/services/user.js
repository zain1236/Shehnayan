// utils
import { generatePasswordHash, getUserId } from "../../../utils/user.js";
import { handleErrors } from "../../../utils/handleError.js";

//db
import User from "../../../models/User.js"

const addUserToDB = async (body) => {
  body.password = await generatePasswordHash(body.password);
  const user = new User(body);
  await user.save();
};





export { addUserToDB }
