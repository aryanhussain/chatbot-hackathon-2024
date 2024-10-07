// const _ = require("lodash");

// const UtilsHelper = require("../helpers/utils.helpers");
// const chatApis = require("./chat");
// const userApis = require("./user");

// exports.mount = (app, options) => {
//   // Admin apis
//   chatApis.mount(app, options);

//   userApis.mount(app, options);

//   console.info("APIS mounted successfully");

//   // should be at the end
//   app.all("/*", function (req, res, next) {
//     let _responseObj = UtilsHelper.responseObject();
//     _.assign(_responseObj, { msg: "Colombohurd APIs running...." });
//     res.send(_responseObj);
//     next();
//   });
// };
const express = require('express');
const router = express.Router();

// Import individual route files
const chatApis = require("./chat");
const userApis = require("./user");

// Use individual route files
router.use('/users', userApis);
router.use('/chat', chatApis);

module.exports = router;
