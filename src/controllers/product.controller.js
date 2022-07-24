const fs = require("fs");
const path = require('path');
const dataPath = path.join(process.cwd()+'/lib/data.json');

const productList = (req, res) => {
  fs.readFile(dataPath, 'utf-8', (err, products) => {
    if (err) {
      res.json({
        'error': true
      })
    }
    return res.json(JSON.parse(products));
  });
};

const productView = (req, res) => {
  const id = +req.params.id
  if (!id) {
    return res.json({
      'error': true,
      'message': 'id undefined'
    })
  }
  fs.readFile(dataPath, 'utf-8', (err, products) => {
    if (err) {
      return res.json({
        'error': true,
      })
    }
    products = JSON.parse(products)
    const product = products.filter( product => product.id === id )
    if (product.length==0) {
      return res.json({
        'error': true,
        'message': 'id not exist'
      })
    }
    return res.json(product);
  });
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
  return res.json({
    'error': false
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

  return res.json({
    'error': false
  });
}

const productDelete = (req, res) => {

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

module.exports = {
  productList,
  productView,
  productUpdate,
  productCreate
};
