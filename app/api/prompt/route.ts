import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

// the type of req is RequestWithUser

export const GET = async (req: Request) => { 

  try {

    await connectToDatabase(); // this is the line that connects to the database

    const prompts = await Prompt.find({}).populate('creator');

    return new Response(JSON.stringify(prompts), { status: 200, }
    );

  } catch (error) {
    return new Response('Failed to fetch a new prompt', {
      status: 500
    });
  }
}