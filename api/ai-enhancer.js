import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { type, input, context = {} } = req.body;

  if (!type || typeof input !== "string" || input.trim().length === 0) {
    return res.status(400).json({ error: "Missing or invalid type/input" });
  }

  let prompt = "";

  switch (type) {
    case "summary":
      prompt = `Improve the following resume summary to make it professional, concise, and ATS-friendly:\n\n${input.trim()}`;
      break;

    case "experience":
      prompt = `Rewrite the following work experience bullet point to be more impactful, using action verbs and measurable outcomes.
      Wrap important technologies, results, or metrics in **bold** markdown formatting.
       Keep it one to two lines max:\n\n${input.trim()}`;
      break;

    case "project":
      prompt = `
Please rewrite the following project description to be professional, concise, and optimized for a tech resume.
Wrap important technologies, results, or metrics in **bold** markdown formatting.
Use action verbs and keep it one paragraph max.

Project description:
${input.trim()}
`.trim();
      break;

    case "skills":
      prompt = `The user has described their background as:
"${input.trim()}"

Based on this, suggest 8–10 modern, relevant technical and soft skills. Return only a comma-separated list. Context:
${JSON.stringify(context)}`;
      break;

    default:
      return res.status(400).json({ error: "Unsupported type" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
    });

    let output = completion.choices?.[0]?.message?.content?.trim();
    if (!output) throw new Error("Empty response from OpenAI");

    // Convert markdown **bold** to HTML <strong> with extra weight
    const htmlOutput = output.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-extrabold">$1</strong>'
    );

    res.status(200).json({ output: htmlOutput });
  } catch (err) {
    console.error("AI Enhancer Error:", err);
    res.status(500).json({ error: "AI generation failed. Try again." });
  }
}
