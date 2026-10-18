# 관리자 로그인 설정

관리 페이지와 `/api/admin/contents`, `/api/admin/categories`, `/api/admin/layouts`는 서버 세션 인증으로 보호됩니다. 인증 설정이 없거나 DB에 접근할 수 없으면 관리 API 접근을 거부합니다. 공개 Works API는 로그인 없이 사용할 수 있습니다.

## 최초 설정

1. 프로젝트 루트에서 `npm run admin:credentials`를 실행합니다. 64자 랜덤 비밀번호와 비밀번호 해시, 세션 비밀 값을 `.admin-credentials.local` 파일로 생성합니다. 파일은 Git에서 제외되며, 기존 파일을 덮어쓰지 않습니다. 비밀번호를 비밀번호 관리자에 보관하세요.
2. Neon SQL Editor에서 해당 배포가 사용하는 DB를 선택하고 `db/migrations/003_admin_auth.sql`의 내용을 실행합니다. 또는 DB 환경변수가 있는 환경에서 `npm run db:migrate`를 실행합니다.
3. Vercel 프로젝트의 서버 환경변수에 인증 파일의 `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET` 값을 등록합니다. `=` 뒤의 값을 그대로 복사하며, 따옴표나 `REACT_APP_` 접두어를 추가하지 않습니다. 실제 로그인 비밀번호는 Vercel에 등록하지 않습니다.
4. 사용할 배포 환경(Production 또는 Preview)에 환경변수를 설정한 뒤 코드를 배포합니다. `/admin`에 접속하여 파일의 로그인 비밀번호를 입력합니다.

비밀번호 해시에도 `$` 문자가 포함됩니다. 셸 명령에 직접 붙여 넣지 말고 Vercel 환경변수 입력창을 사용하세요. 인증 파일과 환경변수 값을 소스 저장소나 채팅에 공유하지 마세요.

## 동작

- `GET /api/admin/auth`: 현재 로그인 상태를 확인합니다.
- `POST /api/admin/auth`: JSON `{ action: "login", password }`로 로그인하거나 `{ action: "logout" }`으로 로그아웃합니다.
- 로그인은 8시간 후 만료됩니다. 브라우저에는 HttpOnly·Secure·SameSite=Strict 쿠키를 설정하며, DB에는 세션 토큰의 HMAC 해시만 저장합니다.
- 관리 API의 모든 조회·변경 요청에 인증을 요구합니다. 변경 요청은 동일 출처의 JSON 요청만 허용합니다.
- 로그인은 15분 동안 IP별 5회, 전체 30회까지 허용합니다. 성공·실패를 포함한 시도 횟수를 Neon에 기록하므로 여러 서버 인스턴스가 같은 제한을 공유합니다. Vercel이 설정한 IP 헤더를 사용하며 IP 원문을 DB에 저장하지 않습니다.
- 로그아웃하면 해당 세션을 DB에서 삭제합니다. 다른 브라우저에서 로그인한 세션은 각자 유지됩니다.
- 비밀번호는 Node scrypt(N=131072, r=8, p=1)로 해싱하고 상수 시간 비교를 사용합니다. 프론트엔드 번들에 비밀번호·해시·세션 비밀 값을 넣지 않습니다.

## 비밀번호 변경

기존 `.admin-credentials.local` 파일을 안전한 곳에 보관하거나 비밀번호 관리자에 옮긴 뒤 파일 이름을 변경합니다. `npm run admin:credentials`를 다시 실행하고 새 `ADMIN_PASSWORD_HASH`와 `ADMIN_SESSION_SECRET`을 Vercel에 등록한 뒤 재배포합니다. 새 배포에서는 이전 세션을 사용할 수 없습니다. 이전 배포 URL도 계속 사용 가능하다면 Vercel에서 별도로 접근을 제한하거나 제거해야 합니다.

## 로컬 미리보기

`npm start`의 기본 로컬 샘플 모드에서는 로그인 없이 UI를 확인합니다. 이 예외는 프론트엔드 개발 모드에만 적용되며 서버 API에는 인증 우회 경로가 없습니다. `REACT_APP_ADMIN_USE_API=true`로 실제 API를 사용하면 로컬에서도 로그인 및 DB 인증 설정이 필요합니다. `vercel dev`에서는 Development 환경변수를 사용합니다.
