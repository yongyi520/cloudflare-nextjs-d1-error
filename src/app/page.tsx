// import Image from 'next/image'

import Chat from '@/components/Chat';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const runtime = 'edge';

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect('/api/auth/signin');
  }
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h2>Home Page</h2>
      <Chat />
    </main>
  );
}
