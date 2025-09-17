# 환경 변수 설정 가이드

## 환경별 환경 변수 설정

이 프로젝트는 개발환경과 프로덕션 환경에서 다른 환경 변수를 사용하도록 설정되어 있습니다.

### 설정 방법

#### 1. 환경 변수 파일 생성

프로젝트 루트에 다음 파일들을 생성하세요:

**`.env.local` (개발환경)**

```env
NEXT_PUBLIC_APP_URL_DEV=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_dev_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_dev_supabase_anon_key
```

**`.env.production` (프로덕션 환경)**

```env
NEXT_PUBLIC_APP_URL_PROD=https://your-production-domain.com
NEXT_PUBLIC_SUPABASE_URL=your_prod_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_prod_supabase_anon_key
```

#### 2. 환경 변수 사용법

코드에서 환경 변수를 사용할 때는 `src/utils/env.ts`의 유틸리티 함수를 사용하세요:

```typescript
import { getAppUrl, getSupabaseUrl, isProduction } from '@/utils/env';

// 앱 URL 가져오기 (환경에 따라 자동으로 선택됨)
const appUrl = getAppUrl();

// 프로덕션 환경인지 확인
if (isProduction()) {
  // 프로덕션 환경 로직
}
```

### 동작 방식

- **개발환경** (`NODE_ENV=development`): `NEXT_PUBLIC_APP_URL_DEV` 사용
- **프로덕션 환경** (`NODE_ENV=production`): `NEXT_PUBLIC_APP_URL_PROD` 사용
- 환경 변수가 설정되지 않은 경우 기본값 사용

### 주의사항

1. `.env.local`과 `.env.production` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다.
2. 실제 환경 변수 값은 각 환경에 맞게 설정해야 합니다.
3. `NEXT_PUBLIC_` 접두사가 붙은 환경 변수만 클라이언트 사이드에서 사용할 수 있습니다.
