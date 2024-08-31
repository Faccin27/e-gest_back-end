async function authMiddleware(req, reply) {
  try {
    console.log("entrou no try")
    const token = req.cookies.token;
    console.log("seu token é: ", token)

    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = await req.jwtVerify();

    req.user = decoded;
  } catch (err) {
    reply.status(401).send({ error: 'Unauthorized access' });
  }
}

module.exports = authMiddleware;
