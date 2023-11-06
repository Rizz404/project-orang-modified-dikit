import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    // jika token tidak ada maka
    if (!token) {
      res.status(403).send("Access Denied");
    }

    // token harus dimulai dengan Bearer
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next(); // lanjut ke middleware selanjutnya
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
