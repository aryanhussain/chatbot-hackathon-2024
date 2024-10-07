const crypto = require('crypto');
const moment = require('moment');

const UtilsHelper = {
  /**
   * Global Response Object
   * @return Object
   */
  responseObject: function () {
    return {
      status: "success",
      statusCode: 200,
      msgCode: "",
      msg: "",
      data: null,
    };
  },

  /**
   * Send response
   */
  cRes: function (res, data) {
    return res.status(data.statusCode).json(data);
  },

  /**
   * Generate Hash token for the give bytes
   */
  genHashToken: async function (bytes) {
    let _str = null;
    try {
      return await crypto.randomBytes(bytes).toString("hex");
    } catch (err) {
      console.log("Error in Utils helper genHashToken ", err);
    }
    return _str;
  },

  /**
   * Generate Random token using getHashToken
   */
  genRandomToken: async function () {
    return await this.genHashToken(32);
  },

  /**
   * Generate Random numbers for the given digits,
   * if not provided than upto 6 digits
   */
  genRandomNumber: function (digits) {
    digits = digits || 6;
    let min = Math.pow(10, digits - 1);
    let max = Math.pow(10, digits) - 1;

    return _.random(min, max);
  },

  /**
   * Generate random alpha numeric string for given length
   */
  getRandomString: function (length) {
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomBytes = crypto.randomBytes(length);
    let resultrr = new Array(length);
    const charsLength = chars.length;
    let cursor = 0;
    for (let i = 0; i < length; i++) {
      cursor += randomBytes[i];
      resultrr[i] = chars[cursor % charsLength];
    }
    return resultrr.join("");
  },

  /**
   * To copy object by value not by reference.
   * @param Object obj
   * @return Object
   */
  clone: function (obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  /**
   * Round Number
   */
  roundNumber: function (val, dec = 2) {
    let mp = Math.pow(10, dec);
    return Math.round(val * mp) / mp;
  },

  /**
   * Get request IP
   * @returns String
   */
  getIP: function (req) {
    let _ip =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.ip ||
      "";
    return _ip;
  },

  /**
   * Get request user agent
   * @returns String
   */
  getUserAgent: function (req) {
    let _userAgent = req.headers["user-agent"] || "";
    return _userAgent;
  },

  /**
   * Creates a new object composed of properties filtered from the given object.
   *
   * @param {Object} object - The source object to filter properties from.
   * @param {Array} keys - An array of keys to filter from the source object.
   *
   * @returns {Object} - A new object with only the filtered properties.
   */

  filterProperties: (object, keys) => {
    return keys.reduce((obj, key) => {
      if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        obj[key] = object[key];
      }
      return obj;
    }, {});
  },

  /**
   * Function for to get auto incremented id with padding of zero and prefix or suffix added
   * @param {*} num
   * @returns
   */
  leading_zero: function (num, min_size = 4, prefix = "", suffix = "") {
    num = num + 1;
    let new_num = num.toString();
    for (let i = new_num.length; i < min_size; i++) {
      new_num = "0" + new_num;
    }
    return prefix + new_num + suffix;
  },

  /**
   * Function for returning string is number or not
   * @param {*} str
   * @returns
   */
  endsWithNumber: function (str) {
    str = str.trim();
    if (!str) return "Invalid input"; //return if input is empty
    return isNaN(str.slice(-1)) ? false : true;
  },

  /**
   * Function for making first letter capital of each words
   * @param {*} str
   * @returns
   */
  titleFirstLetterUpperCase: function (str) {
    let splitStr = str.toLowerCase().split(" ");
    for (let i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
  },

  /**
   * Function to concat object values with provided seprator
   * @param {*} obj
   * @param {*} separator
   */
  concatObject: function (obj, separator, appendingSpace = true) {
    return Object.values(obj)
      .filter((val) => val)
      .join(appendingSpace ? `${separator} ` : `${separator}`);
  },
};

module.exports = UtilsHelper