import type { NextRequest } from 'next/server';
import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const runtime = 'edge';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request: NextRequest) {
  // const { searchParams } = new URL(request.url);
  const { messages } : any = await request.json();
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      // messages: [
      //   { role: 'system', content: 'You are a helpful assistant.' },
      //   { role: 'user', content: 'Who won the world series in 2020?' },
      //   {
      //     role: 'assistant',
      //     content: 'The Los Angeles Dodgers won the World Series in 2020.',
      //   },
      //   { role: 'user', content: 'Where was it played?' },
      // ],
      messages,
      // max_tokens: 7,
      temperature: 0,
      stream: true,
    });

    // return new Response(completion.body, {
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Content-Type": "text/event-stream;charset=utf-8",
    //     "Cache-Control": "no-cache, no-transform",
    //     "X-Accel-Buffering": "no",
    //   },
    // })
    const stream = OpenAIStream(completion);
    return new StreamingTextResponse(stream);
  } catch (error: any) {
    console.error(error);

    return new Response(JSON.stringify(error), {
      status: 400,
      headers: {
        'content-type': 'application/json',
      },
    });
  }
}
