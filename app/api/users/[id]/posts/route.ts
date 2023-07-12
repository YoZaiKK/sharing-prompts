import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";


export const GET = async (req: Request, { params }: { params: { id: string } }
) => {

  try {

    await connectToDatabase(); // this is the line that connects to the database

    const prompts = await Prompt.find({
      creator: params.id
    }).populate('creator');

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });

  } catch (error) {
    return new Response('Failed to fetch the user info', {
      status: 500
    });
  }
}