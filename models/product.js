const db = require('../util/database');
const Cart = require('./cart')




module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save(){

    return db.execute('INSERT INTO products (title,price,description,imageUrl) VALUES(?,?,?,?)',
    [this.title, this.price, this.description, this.imageUrl]);

  }

  static fetchAll(cb) {
    return db.execute('select * from products');
  }
  static findById(id, cb) {

    return db.execute('SELECT * FROM producs WHERE id =?',[id]);

  }
  static deleteById(id) {

  }
};
