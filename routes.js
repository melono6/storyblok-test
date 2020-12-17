const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

routes.add('preview', '/preview/:slug+')

routes.add('index', '/:slug+')
