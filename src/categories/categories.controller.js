
const CategoriesService = require('./categories.service');

async function list(_req, res, _next) {
  const categories = await CategoriesService.getAllCategories();
  res.json({ data: categories });
}

module.exports = {
  list: [list],
};
