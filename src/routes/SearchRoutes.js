const authMiddleware = require('../middleware/authMiddleware');
const SearchController = require('../controllers/SearchController');

async function SearchRoutes(fastify, options) {
  fastify.get('/', { preHandler: authMiddleware }, SearchController.searchByCPF);
}

module.exports = SearchRoutes;
