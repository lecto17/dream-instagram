import { getAuthenticatedUser } from '@/actions/action';
import { deleteReactionOnPost } from '@/service/supa-post';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; emoji: string } },
) {
  const { id, emoji } = params;
  const decodedEmoji = decodeURIComponent(emoji);

  const user = await getAuthenticatedUser();
  if (!user) {
    return new Response('Authenticated Error');
  }

  return await deleteReactionOnPost(id, user.id, decodedEmoji)
    .then(() => NextResponse.json({ message: 'Reaction deleted' }))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
