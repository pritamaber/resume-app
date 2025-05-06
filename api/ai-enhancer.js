import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { type, input, context } = req.body;

  if (!type || !input) {
    return res.status(400).json({ error: "Missing type or input" });
  }

  // Smart prompt routing
  let prompt = "";

  switch (type) {
    case "summary":
      prompt = `Improve the following resume summary and make it more professional and ATS-friendly:\n\n"${input}"`;
      break;
    case "experience":
      prompt = `Rewrite the following work experience bullet point to be more impactful, using action verbs and measurable results:\n\n"${input}"`;
      break;
    case "project":
      prompt = `Rewrite this project description to highlight impact, tools, and results for a resume:\n\n"${input}"`;
      break;
    case "skills":
      prompt = `Based on the following candidate profile, suggest 8–10 relevant technical and soft skills:\n\n"${input}"\n\nContext:\n${JSON.stringify(
        context
      )}`;
      break;
    default:
      return res.status(400).json({ error: "Unsupported type" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const output = completion.choices[0].message.content;

    res.status(200).json({ output });
  } catch (error) {
    console.error("OpenAI error:", error.message);
    res.status(500).json({ error: "Failed to generate output" });
  }
}
