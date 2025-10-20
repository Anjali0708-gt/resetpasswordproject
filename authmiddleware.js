
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authmiddleware = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ msg: "No token provided" });

  const token = authHeader.split(' ')[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    console.log("Decoded JWT:", req.user);
    next(); // pass control to next middleware/route
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token", error: err.message });
  }
};
