const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    console.log("Token exists:", !!token);
    console.log("JWT Secret exists:", !!process.env.JWT_SECRET);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized access", success: false });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(`decoded value is: ${decoded}`);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(401).json({
      message: "Invalid or expired token",
      sucess: false,
      error: error.message,
    });
  }
};

module.exports = authMiddleware;
