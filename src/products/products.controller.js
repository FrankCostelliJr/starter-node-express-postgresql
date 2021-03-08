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

function list(req, res, next) {
  ProductsService.getAllProducts().then(products => res.json({ data: products }));
}

module.exports = {
  read: [productExists, read],
  list: [list],
};
