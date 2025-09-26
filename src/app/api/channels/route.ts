import { NextRequest, NextResponse } from 'next/server';
import {
  getAuthenticatedUser,
  getAuthenticatedUserSession,
} from '@/actions/action';
import { getAllChannels, createChannel } from '@/service/supa-channel';
import { CreateChannelRequest } from '@/types/channel';

// GET /api/channels - 모든 채널 목록 조회
export async function GET() {
  try {
    const session = await getAuthenticatedUserSession();
    const user = session?.user;

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const channels = await getAllChannels(user.id);

    return NextResponse.json(channels);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch channels' },
      { status: 500 },
    );
  }
}

// POST /api/channels - 새 채널 생성
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: CreateChannelRequest = await request.json();

    // 입력 검증
    if (!body.name || !body.description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 },
      );
    }

    if (user.id == null) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const channel = await createChannel(body, user.id);

    if (!channel) {
      return NextResponse.json(
        { error: 'Failed to create channel' },
        { status: 500 },
      );
    }

    return NextResponse.json(channel, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/channels:', error);
    return NextResponse.json(
      { error: 'Failed to create channel' },
      { status: 500 },
    );
  }
}
