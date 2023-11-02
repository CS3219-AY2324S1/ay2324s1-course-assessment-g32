const { OpenAI } = require("openai");
const env = require('./loadEnvironment');
const { Status } = require('./constants');
const logger = require('./Log');

const openai = new OpenAI({
  // replace your-api-key with your API key from ChatGPT
  apiKey: env.OPENAI_SECRET_KEY
});

const getResponse = async (req, res) => {
  try {
    console.log("in controller")
    console.log(req.body)
    const resp = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", 
          content: req.body.question
        }
      ]
    });

    logger.logSuccess('Generated response.');

    res
      .status(200)
      .json({ message: resp.choices[0].message });
  } catch (err) {
    logger.error('Cannot generate response.', err?.message || err);
    res
      .status(err?.status || Status.BAD_REQUEST)
      .json({ error: err?.message || err });
  }
};

module.exports = {
  getResponse,
};
