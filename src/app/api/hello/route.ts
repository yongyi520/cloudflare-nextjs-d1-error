
// Next.js Edge API Route Handlers: https://nextjs.org/docs/app/building-your-application/routing/router-handlers#edge-and-nodejs-runtimes

import { getDrizzleDB } from '@/db'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  console.log('db', process.env.DB)
  const results = await process.env.DB.prepare("SELECT name FROM sqlite_master WHERE type='table'").run();

  console.log('results', results)
  // const db = getDrizzleDB({database: process.env.DB})
  // const users = await db.query.users.findMany()
  // console.log('users', users)
  return new Response(JSON.stringify({ name: 'John Doe' }))
}
