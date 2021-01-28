const bcrypt = require('bcryptjs') 

const users = [
  {
    name: "Admin User",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "subin c",
    email: "subin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "hari",
    email: "hari@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];
module.exports = users;
