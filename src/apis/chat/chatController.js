const nlpService = require("../../services/nlp/nlpService");

/*
* this method gets response from nlpService and sends to user, 
* if needed we can perform additional functions such as 
* calling db to get available items dynamically or we can reserve
* table and store details in db based on intent
*/
exports.processMessage = async (req, res) => {
  const { message } = req.query;

  try {
    const response = await nlpService.processMessage(message);
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};