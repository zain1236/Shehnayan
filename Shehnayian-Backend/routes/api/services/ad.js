// utils
import { handleErrors } from "../../../utils/handleError.js";
import advertisement from "../../../models/Ad.js"

const addAdToDB = async (adData) => {    
    await handleErrors(addAdInfoToDB,adData)
};

async function addAdInfoToDB(adData) {
    const ad = new advertisement(adData);
    await ad.save();
}

export { addAdToDB }
