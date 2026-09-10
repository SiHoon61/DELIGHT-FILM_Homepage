# Works configuration API

## 현재 범위

- `GET /api/works/config`에서 Neon의 Works 콘텐츠, 카테고리, 배치를 한 번에 반환합니다.
- `GET /api/health/db`에서 Neon 연결 상태를 확인합니다.
- `/Works`는 진입 시 API를 한 번 호출하고 이후 카테고리 및 PC/Mobile 전환은 받은 데이터로 처리합니다.
- API가 없거나 실패하면 번들에 포함된 `workList.json`으로 만든 기본 설정을 사용합니다.
- `DATABASE_URL`이 없는 환경에서만 `server/sampleWorksConfig.js`의 샘플 응답을 사용합니다.
- `GET /api/admin/layouts?section=video&category=all`에서 한 카테고리 범위의 배치를 조회합니다.
- `PUT /api/admin/layouts`에서 선택한 범위의 PC 또는 Mobile 배치를 일괄 저장합니다.
- Admin의 `화면 배치`는 섹션·카테고리 변경 시 조회하고, 현재 기기의 변경사항만 저장합니다.
- Admin 인증은 아직 연결되지 않았으므로 배포 전에 반드시 쓰기 정책을 추가해야 합니다.

## 응답 구조

```text
contents[]
  콘텐츠 원본 정보

categories[section][]
  ALL을 포함한 카테고리 목록

layouts[section][categoryId][]
  contentId
  desktopPosition
  mobilePosition
  desktopColumnSpan
  desktopRowSpan
```

각 `section × category`는 독립적인 배치를 가집니다. PC는 순서와 카드 크기를 사용하고 모바일은 순서만 사용합니다.

## 로컬 실행

`react-scripts start`는 Vercel Function을 실행하지 않으므로 API까지 확인할 때는 프로젝트 루트에서 `vercel dev`를 사용합니다. CRA 개발 서버만 사용할 경우 Works 화면은 자동으로 로컬 fallback 데이터를 사용합니다.

Neon 런타임 연결에는 pooled `DATABASE_URL`을 사용합니다. 로컬에서는 Vercel Development 환경변수를 `.env.development.local`로 내려받을 수 있으며, migration에는 direct `DATABASE_URL_UNPOOLED`을 사용합니다.

## DB 연결 시 교체 지점

런타임 조회는 `server/worksRepository.js`에 모여 있습니다. API와 프론트 응답 계약은 DB 구현과 분리되어 있습니다.

권장 테이블은 다음 두 개입니다.

- `categories`: 섹션별 카테고리와 노출 순서
- `contents`: YouTube 콘텐츠와 공개 상태
- `layout_sets`: `section × category(ALL 포함)` 배치 버전
- `layout_items`: 콘텐츠별 PC/Mobile 순서와 PC 카드 크기

## DB 명령

```bash
npm run db:migrate
npm run db:seed
```

- migration은 `DATABASE_URL_UNPOOLED`을 우선 사용합니다.
- seed는 현재 샘플 콘텐츠와 11개 배치 범위를 upsert합니다.
- 두 명령은 반복 실행할 수 있지만 운영 데이터가 생긴 뒤에는 seed를 배포 과정에서 자동 실행하지 않습니다.

## Admin 배치 저장

PC 저장 요청은 `position`, `columnSpan`, `rowSpan`을 받고 Mobile 저장 요청은 `position`만 받습니다. 요청의 `version`이 현재 DB 버전과 다르면 `409 layout_version_conflict`를 반환합니다.

```json
{
  "section": "video",
  "categoryId": "all",
  "device": "desktop",
  "version": 1,
  "items": [
    {
      "contentId": "video-example-0",
      "position": 0,
      "columnSpan": 2,
      "rowSpan": 2
    }
  ]
}
```

저장 요청에는 해당 범위의 모든 콘텐츠가 한 번씩 포함되어야 하며, position은 0부터 연속되어야 합니다.
