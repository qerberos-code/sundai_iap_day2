import { NextResponse } from 'next/server';
import Replicate from "replicate";

// Add token verification
if (!process.env.REPLICATE_API_TOKEN) {
  throw new Error('Missing Replicate API token');
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json(); // Extract prompt from the request body

    console.log("Received prompt for generation:", prompt);
    const output = await replicate.run(
        "sundai-club/cambridge:eb461fa6a588669ccea46a4731c55f398cfc66fa927fe5fda139b3b5498cc969",
        {
          input: {
            prompt: prompt // Use the extracted prompt
          }
        }
      ); // The model may not be well-tuned for the specific prompts we're using, leading to unrelated images.
    const imgURL = String(output[0]);
    console.log(imgURL)
    return NextResponse.json({
        imgUrl: imgURL
     });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
