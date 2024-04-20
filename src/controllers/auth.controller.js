import * as authService from "../services/auth.service.js";

export const login = async (req, res) => {
  try {
  const { email, password } = req.body
  const token = await authService.login(email, password);
  res.json({
    message: "Login successfully",
    data: {
      accessToken: token,
    }
  });
  }catch(err) {
    res.status(err.status || 500);
    res.json({ message: err.message });
  }
};

export const signUp = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;
    const newUser = await authService.signUp(first_name, last_name, email, password, role);
    res.json({
      message: "User signed Up successfully",
      data: {
        user: newUser,
      },
    });
  }catch (err) {
    res.status(err.status || 500);
    res.json({ message: err.message });
  }
}