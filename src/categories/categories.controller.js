'use strict';

const CategoriesService = require('./categories.service');

async function list(req, res, next) {
  const categories = await CategoriesService.getAllCategories();
  res.json({ data: categories });
}

module.exports = {
  list: [list],
};
