import jwt from "jsonwebtoken"

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;

  // verify if token exists
  if(!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(`Error in verifying token: ${error}`);
    res.status(401).json({ success: false, error: error.message });
  }
}

export default verifyToken;