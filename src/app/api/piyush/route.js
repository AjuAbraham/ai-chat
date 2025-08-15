import { piyushSirSystemPrompt } from "@/app/utilities/systemPrompts";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMENI_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function POST(request) {
  try {
    const { message } = await request.json();
    const responseMessage = await openai.chat.completions.create({
      model: "gemini-1.5-flash",
      message: [
        {
          role: "system",
          content: piyushSirSystemPrompt,
        },
        {
          role: "user",
          content: JSON.stringify(message),
        },
      ],
    });
    return Response.json(
      {
        error: false,
        result: JSON.parse(responseMessage.choices[0].message.content),
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        error: true,
        result: "Unable to get response",
      },
      {
        status: 400,
      }
    );
  }
}
