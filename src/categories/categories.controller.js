const CategoriesService = require('./categories.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function list(_req, res, _next) {
  const categories = await CategoriesService.getAllCategories();
  res.json({ data: categories });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
