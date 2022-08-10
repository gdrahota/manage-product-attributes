# manage-product-attributes

This app could be used to manage product attributes of any product.

## Architecture

* Client Server Application
* Database: postgres
* Back end: Node.js, Express.js
* Front end: Vue.Js (2.x), Quasar (1.x)

## Setup

### Development Environment

```
git clone git@github.com:gdrahota/manage-product-attributes.git
cd manage-product-attributes
docker-compose build
docker-compose up
```

In a new terminal:

```
cd manage-product-attributes
cd gui
yarn
yarn serve 
```

### Post Setup

If using the dev env, in your browser call http://localhost:8082/ to start the app. Go to "Manufacturers" and create one. Then create at
least one product attribute, any number of product group and finally any number of products.
