import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export interface UploadFileParams {
  file: File;
  fileName: string;
  folder?: string;
}

export interface UploadResult {
  key: string;
  url: string;
}

/**
 * S3에 파일을 업로드하고 공개 URL을 반환합니다.
 * @param params 업로드할 파일 정보
 * @returns 업로드된 파일의 키와 URL
 */
export const uploadFileToS3 = async ({
  file,
  fileName,
  folder = '',
}: UploadFileParams): Promise<UploadResult> => {
  const today = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Seoul',
  })
    .format(new Date())
    .replaceAll('-', '');

  const key = folder
    ? `${folder}/${today}/${new Date().toISOString()}-${encodeURIComponent(
        fileName,
      )}`
    : `${today}/${new Date().toISOString()}-${encodeURIComponent(fileName)}`;

  const body = Buffer.from(await file.arrayBuffer());

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: key,
    Body: body,
    ContentType: 'multipart/form-data',
    // CacheControl: "public, max-age=31536000, immutable", // 정적 이미지면 권장
  });

  await s3.send(command);

  const url = process.env.PUBLIC_CDN_HOST
    ? `${process.env.PUBLIC_CDN_HOST}/${key}`
    : `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

  return {
    key,
    url,
  };
};
