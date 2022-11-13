import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//completion endpoint with temperature of 0.6
//1 token generally corresponds to abbout 4 characters of common english text (default to 16)
export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.prompt),
    temperature: 0.6,
    max_tokens: 100,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

// function generatePrompt(animal) {
//   const capitalizedAnimal =
//     animal[0].toUpperCase() + animal.slice(1).toLowerCase();
//   return `Suggest three names for kid that is from Pakistan.

// Animal: Human
// Names: Rushikesh, Abhi, Raunak
// Animal: Human
// Names: Danial, Azeem, Alysha
// Animal: ${capitalizedAnimal}
// Names:`;
// }

function generatePrompt(prompt) {
  const capitalizedPrompt = prompt[0].toUpperCase() + prompt.slice(1).toLowerCase();
  return `Write an essay about ${capitalizedPrompt}.`
}
