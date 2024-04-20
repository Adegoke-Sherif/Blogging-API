import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { generateMiddleWare } from "../middleware/route.middleware.js";
import { loginSchema, registerSchema } from "../validation/user.validation.js";
const authRoute = Router();

authRoute.post("/login", generateMiddleWare(loginSchema), authController.login);
authRoute.post("/signUp", generateMiddleWare(registerSchema), authController.signUp);



export default authRoute;

// router.post('/register', async (req, res) => {
//   const { first_name, last_name, email, password } = req.body;

//   try {
//     // Check if user already exists
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     // Create a new user
//     user = new User({
//       first_name,
//       last_name,
//       email,
//       password: await bcrypt.hash(password, 10)  // Hash password before saving in database
//     });

//     await user.save(); // Save user in the database

//     const payload = {
//       user: {
//         id: user.id
//       }
//     };

//     // Sign the token
//     jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });  // Return the token
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// /**
//  * @route POST api/auth/login
//  * @desc Authenticate user & get token
//  * @access Public
//  */
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user by email
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid Credentials' });
//     }

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid Credentials' });
//     }

//     const payload = {
//       user: {
//         id: user.id
//       }
//     };

//     // Sign the token
//     jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });  // Return the token if login is successful
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// module.exports = router;