async function authMiddleware(req, reply) {
  try {
    const token = req.cookies.token;

    if(!token) {
      throw new Error('No token provided')
    }

    const decoded = await req.jwtVerify()

    req.user = decoded
  } catch (err) {
    reply.status(401).send({error: 'Unauthorized access' })
  }
}

module.exports = authMiddleware