import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/actions/action';
import { joinChannel, leaveChannel } from '@/service/supa-channel';
import { HTTP_STATUS, ERROR_MESSAGES } from '@/constants/http-status';

// POST /api/channels/[channelId]/join - 채널 참여
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.UNAUTHORIZED },
        { status: HTTP_STATUS.UNAUTHORIZED },
      );
    }

    const { channelId } = await request.json();

    if (!channelId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.CHANNEL_ID_REQUIRED },
        { status: HTTP_STATUS.BAD_REQUEST },
      );
    }

    const success = await joinChannel({ channelId }, user.id);

    if (!success) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.FAILED_TO_JOIN_CHANNEL },
        { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST /api/channels/[channelId]/join:', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.FAILED_TO_JOIN_CHANNEL },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
}

// DELETE /api/channels/[channelId]/join - 채널 탈퇴
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ channelId: string }> },
) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.UNAUTHORIZED },
        { status: HTTP_STATUS.UNAUTHORIZED },
      );
    }

    const { channelId } = await params;

    if (!channelId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.CHANNEL_ID_REQUIRED },
        { status: HTTP_STATUS.BAD_REQUEST },
      );
    }

    const success = await leaveChannel(channelId, user.id);

    if (!success) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.FAILED_TO_LEAVE_CHANNEL },
        { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/channels/[channelId]/join:', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.FAILED_TO_LEAVE_CHANNEL },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
}
