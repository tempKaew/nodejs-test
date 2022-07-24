# nodejs-test

## Logic test
- [แสดงข้อมูลทั้งหมด](https://nodejs-test-one.vercel.app/logic-test/)
- [แบบระบุตัวแปร](https://nodejs-test-one.vercel.app/logic-test/?name=Somchai&surname=Thomson&gender=M&birthDate=1/1/1990)
- [code logic-test.controller.js](https://github.com/tempKaew/nodejs-test/blob/main/src/controllers/logic-test.controller.js)

## Coffee cup
- [coffee-cup](https://nodejs-test-one.vercel.app/coffee-cup)
- [code coffee-cup.html](https://github.com/tempKaew/nodejs-test/blob/main/src/view/coffee-cup.html)

## API Product
- [code product.controller.js](https://github.com/tempKaew/nodejs-test/blob/main/src/controllers/product.controller.js)
- [code product.route.js](https://github.com/tempKaew/nodejs-test/blob/main/src/routes/product.route.js)
- product list [#link get](https://nodejs-test-one.vercel.app/api/product)
```curl
curl --location --request GET 'https://nodejs-test-one.vercel.app/api/product/' \
--header 'Accept: application/json'
```
- product view by id [#link get](https://nodejs-test-one.vercel.app/api/product/1)
```curl
curl --location --request GET 'https://nodejs-test-one.vercel.app/api/product/1' \
--header 'Accept: application/json'
```