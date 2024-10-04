import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function middleware() {
  const session = await auth();
  console.log('SESSION::', session);
  if (!session) {
    return NextResponse.redirect('http://localhost:3000/login');
  }
}

export const config = {
  matcher: ['/foster/write', '/diary/write'],
};
