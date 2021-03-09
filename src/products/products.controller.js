const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const ProductsService = require('./products.service');

async function productExists(req, res, next) {
  const error = { status: 404, message: `Product cannot be found.` };

  const { productId } = req.params;
  if (!productId) return next(error);

  const product = await ProductsService.getProductById(productId);

  if (!product) return next(error);
  res.locals.product = product;
  next();
}

function read(_req, res, _next) {
  const { product } = res.locals;
  res.json({ data: product });
}

async function list(_req, res, _next) {
  const products = await ProductsService.getAllProducts();
  res.json({ data: products });
}

async function listOutOfStockCount(_req, res, next) {
  res.json({ data: await ProductsService.getOutOfStockCount() });
}

async function listPriceSummary(_req, res, _next) {
  res.json({ data: await ProductsService.getPriceSummary() });
}


module.exports = {
  read: [asyncErrorBoundary(productExists), asyncErrorBoundary(read)],
  list: asyncErrorBoundary(list),
  listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
  listPriceSummary: asyncErrorBoundary(listPriceSummary),
};
