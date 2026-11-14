# myLink

TypeScript와 Next.js App Router로 만든 반응형 링크 프로필 서비스입니다. `DESIGN.md`의 타이포그래피, 색상, 여백 및 카드 원칙을 참고했습니다.

## 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다. 배포용 빌드는 `npm run build`, 타입 검사는 `npm run typecheck`로 확인합니다.

## 링크 관리

첫 화면(`/`)은 랜딩 페이지이고, `/login`에서 Google 계정으로 로그인합니다. 로그인 전에는 프로필과 링크가 표시되지 않습니다. 로그인 후 `/profile`에서 해당 계정의 이름·사진·이메일과 `users/{uid}/links` 목록을 확인합니다. 기존 소유자 계정(`030126evan@gmail.com`)으로 로그인하면 이전 `links` 목록을 계속 관리할 수 있습니다. 링크는 계정 소유자만 읽고 추가할 수 있습니다. 이전 예시 링크는 실제 데이터로 저장하지 않았습니다.

링크는 페이지 로드, **새로고침** 버튼, 로그인·로그아웃, 링크 추가 완료 시에만 Firestore에서 한 번 조회합니다. 실시간 구독은 사용하지 않으며 `createdAt` 최신순으로 표시합니다.

## Firebase

`src/lib/firebase.ts`에 제공된 Firebase 웹 앱 설정이 등록되어 있습니다. 앱은 중복 초기화를 방지하며, `src/app/firebase-analytics.tsx`에서 브라우저가 Analytics를 지원할 때만 Analytics를 시작합니다. 링크에는 Firebase Authentication과 Cloud Firestore를 사용합니다.

`mylink-94c8e` 프로젝트에는 기본 Firestore 데이터베이스, Google 로그인 제공업체, `firestore.rules`가 설정되어 있습니다. 로컬 개발 주소 `localhost`도 인증 설정에 포함했습니다. 배포 주소를 새로 사용한다면 Authentication의 승인된 도메인에 추가하세요.

규칙이나 인증 설정을 수정한 뒤 다시 배포할 때는 다음 명령을 사용합니다. 규칙 배포는 프로젝트의 기존 Firestore 규칙 전체를 교체하므로, 다른 컬렉션 규칙이 생겼다면 먼저 이 파일에 병합하세요.

```bash
npx -y firebase-tools@latest deploy --only firestore:rules,auth --project mylink-94c8e
```

기존 링크 소유자 계정을 바꾸려면 `src/app/profile/page.tsx`의 `PUBLIC_OWNER_EMAIL`, `firestore.rules`의 이메일, `firebase.json`의 지원 이메일을 함께 수정하고 설정을 다시 배포하세요. 기존 링크 문서는 `links` 컬렉션에 그대로 유지됩니다.
