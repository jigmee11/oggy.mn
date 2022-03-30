import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.body?.token;
  if (!token) {
    res.status(403).send("Token required");
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN);
    req.user = decoded;
  } catch (err) {
    res.status(401).send("Invalid Token");
    return;
  }
  return next();
};

export const generate = (id,name) =>{ 
  return jwt.sign(
    { _id: id,name:name},
    process.env.TOKEN,
    {
      expiresIn: "2h",
    }
  );
}