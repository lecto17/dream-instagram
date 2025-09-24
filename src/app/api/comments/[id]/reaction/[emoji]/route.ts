import { getAuthenticatedUser } from '@/actions/action';
import { deleteReactionOnComment } from '@/service/supa-comment';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; emoji: string }> },
) {
  const { id, emoji } = await params;
  const decodedEmoji = decodeURIComponent(emoji);

  const user = await getAuthenticatedUser();
  if (!user) {
    return new Response('Authenticated Error');
  }

  return await deleteReactionOnComment(id, user.id, decodedEmoji)
    .then(() => NextResponse.json({ message: 'Reaction deleted' }))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
