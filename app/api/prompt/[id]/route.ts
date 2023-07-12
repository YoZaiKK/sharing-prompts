import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

// the type of req is RequestWithUser

export const GET = async (req: Request, { params }: { params: { id: string } }) => {

  try {

    await connectToDatabase(); // this is the line that connects to the database

    const prompts = await Prompt.findById(params.id).populate('creator');

    if (!prompts) {
      return new Response('Prompt not found', { status: 404 });
    }
    return new Response(JSON.stringify(prompts), { status: 200, });

  } catch (error) {
    return new Response('Failed to fetch a new prompt', {
      status: 500
    });
  }
}


export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDatabase(); // this is the line that connects to the database

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response('Prompt not found', { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200, });

  } catch (error) {
    return new Response('Failed to update the prompt', {
      status: 500
    });
  }
}


export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {

  try {
    await connectToDatabase(); // this is the line that connects to the database

    await Prompt.findByIdAndRemove(params.id); 

    return new Response("Prompt deleted successfully", { status: 200, });

  } catch (error) {
    return new Response('Failed to delete the prompt', {
      status: 500
    });
  }
}
