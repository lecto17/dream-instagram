export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/actions/action';
import { serverSupabase } from '@/lib/supabaseServerClient';
import { HTTP_STATUS, ERROR_MESSAGES } from '@/constants/http-status';
import bcrypt from 'bcrypt';

// POST /api/channels/[channelId]/check-password - 채널 비밀번호 확인
export async function POST(
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
    const { password } = await request.json();

    if (!channelId) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.CHANNEL_ID_REQUIRED },
        { status: HTTP_STATUS.BAD_REQUEST },
      );
    }

    if (!password) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.PASSWORD_REQUIRED },
        { status: HTTP_STATUS.BAD_REQUEST },
      );
    }

    const supabase = await serverSupabase();

    // 채널 정보 조회
    const { data: channel, error: channelError } = await supabase
      .from('channels')
      .select(
        'id, name, description, is_private, password_hash, created_at, created_by',
      )
      .eq('id', channelId)
      .single();

    if (channelError || !channel) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.CHANNEL_NOT_FOUND },
        { status: HTTP_STATUS.NOT_FOUND },
      );
    }

    // 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(
      password,
      channel.password_hash,
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_PASSWORD },
        { status: HTTP_STATUS.UNAUTHORIZED },
      );
    }

    // 비밀번호가 맞으면 채널 정보 반환 (password_hash 제외)
    const { password_hash, ...channelData } = channel;

    return NextResponse.json({
      success: true,
      channel: channelData,
      message: 'Password verified successfully',
    });
  } catch (error) {
    console.error(
      'Error in POST /api/channels/[channelId]/check-password:',
      error,
    );
    return NextResponse.json(
      { error: ERROR_MESSAGES.FAILED_TO_VERIFY_PASSWORD },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
}
