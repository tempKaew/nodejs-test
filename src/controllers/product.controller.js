const fs = require("fs");
const path = require('path');
const dataPath = path.join(process.cwd()+'/lib/data.json');

const productList = (req, res) => {
  const products = getFileJson()
  return res.json(products)
};

const productView = (req, res) => {
  const id = +req.params.id
  if (!id) {
    return res.json({
      'error': true,
      'message': 'id undefined'
    })
  }
  const products = getFileJson()
  const product = products.filter( product => product.id === id )
  if (product.length==0) {
    return res.json({
      'error': true,
      'message': 'id not exist'
    })
  }
  return res.json(product);
}

const productCreate = (req, res) => {
  const hasError = validation(
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.discountPercentage,
    req.body.rating,
    req.body.stock,
    req.body.brand,
    req.body.category,
    req.body.thumbnail
  )
  if (hasError.length) {
    return res.json({
      'error': true,
      'message': hasError
    });
  }
  let existProducts = getFileJson()
  const newProductId = existProducts[existProducts.length-1].id + 1
  existProducts.push({
    "id": newProductId,
    "title": req.body.title,
    "description": req.body.description,
    "price": req.body.price,
    "discountPercentage": req.body.discountPercentage,
    "rating": req.body.rating,
    "stock": req.body.stock,
    "brand": req.body.brand,
    "category": req.body.category,
    "thumbnail": req.body.thumbnail
  })
  return res.json({
    'created': saveFileJson(existProducts)
  });
}

const productUpdate = (req, res) => {
  const id = +req.params.id
  if (!id) {
    return res.json({
      'error': true,
      'message': 'id undefined'
    })
  }

  const hasError = validation(
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.discountPercentage,
    req.body.rating,
    req.body.stock,
    req.body.brand,
    req.body.category,
    req.body.thumbnail
  )
  if (hasError.length) {
    return res.json({
      'error': true,
      'message': hasError
    });
  }

  let products = getFileJson()
  const filterProducts = products.filter( product => product.id !== id )
  filterProducts.push({
    "id": id,
    "title": req.body.title,
    "description": req.body.description,
    "price": req.body.price,
    "discountPercentage": req.body.discountPercentage,
    "rating": req.body.rating,
    "stock": req.body.stock,
    "brand": req.body.brand,
    "category": req.body.category,
    "thumbnail": req.body.thumbnail
  })
  return res.json({
    'updated': saveFileJson(filterProducts)
  });
}

const productDelete = (req, res) => {
  const id = +req.params.id
  if (!id) {
    return res.json({
      'error': true,
      'message': 'id undefined'
    })
  }
  const products = getFileJson()
  const product = products.filter( product => product.id === id )
  if (product.length==0) {
    return res.json({
      'error': true,
      'message': 'id not exist'
    })
  }
  const filterProducts = products.filter( product => product.id !== id )
  return res.json({
    'deleted': saveFileJson(filterProducts)
  });
}

const validation = (
  title,
  description,
  price,
  discountPercentage,
  rating,
  stock,
  brand,
  category,
  thumbnail
) => {
  let error = []
  if (
    !title
    || title == ''
  ) {
    error.push('title is required')
  }
  if (
    !description
    || description == ''
  ) {
    error.push('description is required')
  }
  if (
    !price
    || price == ''
  ) {
    error.push('price is required')
  }
  if (
    !discountPercentage
    || discountPercentage == ''
  ) {
    error.push('discountPercentage is required')
  }
  if (
    !rating
    || rating == ''
  ) {
    error.push('rating is required')
  }
  if (
    !stock
    || stock == ''
    || stock.match(/[^0-9]+/)
  ) {
    error.push('stock only Integer')
  }
  if (
    !brand
    || brand == ''
  ) {
    error.push('brand is required')
  }
  if (
    !category
    || category == ''
  ) {
    error.push('category is required')
  }
  if (
    !thumbnail
    || thumbnail == ''
  ) {
    error.push('thumbnail is required')
  }
  return error
}

const saveFileJson = (data) => {
  const stringifyData = JSON.stringify(data)
  try {
    fs.writeFileSync(dataPath, stringifyData)
    return true
  }catch(err){
    return false
  }
}

const getFileJson = () => {
  try {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData) 
  }catch(err){
    return []
  }
}

module.exports = {
  productList,
  productView,
  productUpdate,
  productCreate,
  productDelete
};
