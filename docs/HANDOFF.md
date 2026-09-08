# DELIGHT FILM 인수인계 메모

## 현재 상태

- `/admin`은 현재 React 상태(state) 기반의 관리 UI입니다. 새로고침하면 변경사항이 초기 데이터로 돌아갑니다.
- 콘텐츠 등록·수정·삭제, 카테고리 필터, 페이지네이션, 일괄 카테고리/공개 상태 변경, YouTube 링크 메타데이터 미리보기를 제공합니다.
- `반응형 미리보기` 탭에서 Home·Works·About·Contact를 여러 해상도로 확인할 수 있습니다. 기본 프리셋은 PC 1920×1080, 모바일 390×844입니다.
- 실제 운영 전에는 인증, 데이터베이스, 파일 저장소를 연결하고 상태 변경 함수를 API 호출로 교체해야 합니다.

## YouTube 계정 연결 및 신규 영상 자동 수집

### 구현 가능 여부

구현 가능합니다. 다만 브라우저에 API 키를 넣는 방식이 아니라, 서버에서 YouTube OAuth 2.0으로 채널 소유자의 권한을 받아 동기화하는 방식으로 진행해야 합니다. 현재 화면에는 수동 링크 입력과 oEmbed/재생시간 조회만 구현되어 있으며, 계정 연동·자동 동기화는 다음 단계 작업입니다.

### 권장 운영 방식

1. Google Cloud Console에서 YouTube Data API v3를 활성화하고 OAuth 동의 화면과 웹 클라이언트 ID를 생성합니다.
2. 관리자에서 `YouTube 계정 연결`을 누르면 OAuth 동의 후 서버에 refresh token을 암호화해 저장합니다. 토큰은 프론트엔드나 Git에 노출하지 않습니다.
3. 자동 수집 기준은 채널 전체보다 **전용 업로드/사이트 동기화 플레이리스트**를 권장합니다. 일부공개(Unlisted) 영상은 일반 채널 공개 목록만으로 안정적으로 발견되지 않을 수 있기 때문입니다.
4. 서버가 플레이리스트의 `playlistItems.list`를 주기적으로 조회하고, 영상 상세는 `videos.list(part=snippet,contentDetails,status)`로 가져옵니다.
5. `youtubeVideoId`를 고유 키로 upsert합니다. 이미 등록된 ID는 건너뛰고, 새 영상만 초안으로 생성한 뒤 관리자에서 카테고리·구분·공개 여부를 확인합니다.
6. 마지막 동기화 시각과 페이지 토큰을 저장해 변경분만 조회하고, API quota를 절약합니다. 실패 시 지수 백오프 재시도와 관리자 알림을 둡니다.

### 데이터 필드 제안

`youtubeVideoId`, `sourceUrl`, `title`, `subtitle`, `thumbnailUrl`, `durationSeconds`, `section(video|shorts)`, `categoryId`, `visibility`, `publishedAt`, `lastSyncedAt`, `syncStatus`, `createdAt`, `updatedAt`

### 필요한 백엔드 작업

- 관리자 인증과 OAuth callback/API route
- 암호화된 refresh token 저장소
- 콘텐츠·카테고리·레이아웃 순서를 위한 DB 테이블
- cron/queue 기반 동기화 작업과 중복 upsert
- 썸네일을 장기 보관할 필요가 있으면 자체 스토리지로 복사
- 연결 해제, 토큰 만료, quota 초과, 삭제/비공개 전환에 대한 상태 처리

## 인수인계 시 확인할 것

- 일부공개 영상을 자동으로 가져오려면 채널 공개 목록이 아니라 전용 플레이리스트를 운영할지 먼저 결정합니다.
- 자동 수집 결과는 바로 공개하지 않고 초안으로 쌓는 것을 기본값으로 합니다.
- YouTube OAuth client secret, refresh token, DB 접속 정보는 환경변수/시크릿 매니저에서만 관리합니다.
- 현재 UI의 저장 동작은 로컬 상태이므로, API 연결 시 낙관적 업데이트와 실패 롤백을 추가합니다.
