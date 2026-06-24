import userModel from "../models/user.model.js"

export const createUser = async (data) => {
    const user = await userModel.create(data);
    return user;
}

export const getUserByEmail = async (email) => {
    return await userModel.findOne({ email });
}