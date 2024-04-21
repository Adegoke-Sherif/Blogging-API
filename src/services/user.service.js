import User from "../database/user.schema.js"
import { ErrorWithStatus } from "../exceptions/error-with-status-exception.js";

export const getAllUsers = async ( page = 1, limit = 20) => {
  try {
    const skip = (page -1) * limit;
    const users = await User.find().skip(skip).limit(limit);
    const total = await User.countDocuments();
    return { data: users, meta: { page, limit, total } };
  } catch (error) {
    throw new ErrorWithStatus(error.message, 500)
  }
}