import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

// the type of req is RequestWithUser

export const POST = async (req: Request) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDatabase();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    }
    );

  } catch (error) {
  }
}