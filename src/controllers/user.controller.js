import * as userService from "../services/user.service.js"

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers()
    res.json({ message: "Get all users", data: users});
  } catch (error) {
    res.json(500).json({ message: error.message});
  }
}