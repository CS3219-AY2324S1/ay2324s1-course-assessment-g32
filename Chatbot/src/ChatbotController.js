const { Configuration, OpenAIApi } = require("openai");
const env = require('./loadEnvironment');
const { Status } = require('./constants');
const logger = require('./Log');

const openai = new OpenAIApi(new Configuration({
  // replace your-api-key with your API key from ChatGPT
  apiKey: env.OPENAI_SECRET_KEY
}))

const getResponse = async (req, res) => {
  try {
    const resp = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: req.body.question}
        ]  
    })

    logger.logSuccess('Generated response');

    res
      .status(200)
      .json({ message: resp.data.choices[0].message.content });
  } catch (err) {
    logger.error('Cannot generate response', err?.message || err);
    res
      .status(err?.status || Status.BAD_REQUEST)
      .json({ error: err?.message || err });
  }
};

module.exports = {
  getResponse,
};
