import { piyushSirSystemPrompt } from "@/app/utilities/systemPrompts";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMENI_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function POST(request) {
  try {
    const { messages = [] } = await request.json();
    const formattedMessages = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));
    const responseMessage = await openai.chat.completions.create({
      model: "gemini-1.5-flash",
      messages: [
        {
          role: "system",
          content: piyushSirSystemPrompt,
        },
        ...formattedMessages,
      ],
    });
    return Response.json(
      {
        error: false,
        result: responseMessage.choices[0].message.content,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("error", error);
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
