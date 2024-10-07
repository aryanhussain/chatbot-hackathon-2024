const Helpers = require("../../helpers/utils.helpers");
const Models = require("../../database/models");

const userController = {
    /**
     * API for updating user profile
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * For getting all roles list
     */
    getList: async (req, res, next) => {
      try {
            const users = await Models.User.findAll({});
            Helpers.cRes(res, {
                statusCode: 200,
                data: users,
                message: "User Controller",
            });
        }catch(error){
            console.error("##### error userController", error);
            Helpers.cRes(res, {
                statusCode: 500,
                message: "User Controller errors",
            });
        }
    }
}

module.exports = userController;
