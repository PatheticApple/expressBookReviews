const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});      
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  let allBookPromise = new Promise((resolve,reject) => {
    let books = require("./booksdb.js")
    resolve(books);
  })
  
    allBookPromise.then((result) => {
      res.send(result);
    })

    // return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  // res.send(books[req.params.isbn])
  
  let allBookPromise = new Promise((resolve,reject) => {
    let books = require("./booksdb.js")
    resolve(books);
  })
  
    allBookPromise.then((result) => {
      res.send(books[req.params.isbn])
    })


  // return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author


public_users.get('/author/:author',function (req, res) {
  let filteredBooks = Object.values(books).filter((book) => book.author === req.params.author);

  let allBookPromise = new Promise((resolve,reject) => {
    let books = require("./booksdb.js")
    resolve(books);
  })
  
    allBookPromise.then((result) => {
      let filteredBooks = Object.values(result).filter((book) => book.author === req.params.author);
      res.send(filteredBooks)
    })
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let allBookPromise = new Promise((resolve,reject) => {
    let books = require("./booksdb.js")
    resolve(books);
  })
  
    allBookPromise.then((result) => {
      let filteredBooks = Object.values(result).filter((book) => book.title === req.params.title);
      res.send(filteredBooks)
    })
  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  res.send(books[req.params.isbn].review)
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
