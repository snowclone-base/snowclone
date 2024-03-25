function verifyToken(req, res, next) {
  const clientToken = req.headers["authorization"];
  if (!clientToken) {
    return res.status(403).send({ message: "No token provided." });
  }

  const bearerToken = clientToken.split(" ")[1]; // Assuming the token is sent as "Bearer <token>"
  const secretToken = process.env.API_TOKEN;

  if (bearerToken !== secretToken) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  next(); // Token is valid, proceed with the request
}

export default verifyToken;
