import jwt from "jsonwebtoken";
import constant from "../config/constant.js";

// generate token
const genarateToken = async (payload) => {
  const token = await jwt.sign({ userId: payload }, constant.JWT_SECRET_KEY, {
    expiresIn: "5h",
  });

  return token;
};

export default genarateToken;
