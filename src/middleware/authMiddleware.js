async function authMiddleware(req, reply) {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = await req.jwtVerify();


    if (!decoded || !decoded.id) {
      throw new Error('Invalid token');
    }

    req.user = decoded;
  } catch (err) {
    console.error("Erro no authMiddleware:", err.message);
    reply.status(401).send({ error: 'Unauthorized access' });
  }
}

module.exports = authMiddleware;
