'use strict';

const knex = require('../db/connection');

const products = knex('products');

const getAllProducts = () => products.select('*');

const getProductById = productId => products.select('*').where({ product_id: productId }).first();

const getOutOfStockCount = () => 
  products
    .select('product_quantity_in_stock as out_of_stock')
    .count('product_id')
    .where({ product_quantity_in_stock: 0 })
    .groupBy('out_of_stock');

const getPriceSummary = () => 
  products
    .select('supplier_id')
    .min('product_price')
    .max('product_price')
    .avg('product_price')
    .groupBy('supplier_id');


module.exports = { 
  getAllProducts,
  getProductById,
  getOutOfStockCount,
  getPriceSummary
};

