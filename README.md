# myLink — 김태랑 프로필

TypeScript와 Next.js App Router로 만든 김태랑의 반응형 개인 프로필 페이지입니다. `DESIGN.md`의 타이포그래피, 색상, 여백 및 카드 원칙을 참고했습니다.

## 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다. 배포용 빌드는 `npm run build`, 타입 검사는 `npm run typecheck`로 확인합니다.

## 링크 관리

링크 목록은 `src/app/page.tsx`의 고정 배열 대신 Cloud Firestore의 `links` 컬렉션에서 실시간으로 읽습니다. 페이지의 **링크 관리**를 열고 관리자 Google 계정(`030126evan@gmail.com`)으로 로그인하면 링크를 추가할 수 있습니다. 이전 예시 링크는 실제 데이터로 저장하지 않았으므로 처음에는 빈 목록이 표시됩니다. 사진 대신 이니셜 아바타를 사용합니다.

## Firebase

`src/lib/firebase.ts`에 제공된 Firebase 웹 앱 설정이 등록되어 있습니다. 앱은 중복 초기화를 방지하며, `src/app/firebase-analytics.tsx`에서 브라우저가 Analytics를 지원할 때만 Analytics를 시작합니다. 링크에는 Firebase Authentication과 Cloud Firestore를 사용합니다.

`mylink-94c8e` 프로젝트에는 기본 Firestore 데이터베이스, Google 로그인 제공업체, `firestore.rules`가 설정되어 있습니다. 로컬 개발 주소 `localhost`도 인증 설정에 포함했습니다. 배포 주소를 새로 사용한다면 Authentication의 승인된 도메인에 추가하세요.

규칙이나 인증 설정을 수정한 뒤 다시 배포할 때는 다음 명령을 사용합니다. 규칙 배포는 프로젝트의 기존 Firestore 규칙 전체를 교체하므로, 다른 컬렉션 규칙이 생겼다면 먼저 이 파일에 병합하세요.

```bash
npx -y firebase-tools@latest deploy --only firestore:rules,auth --project mylink-94c8e
```

관리자 계정을 바꾸려면 `src/app/page.tsx`의 `ADMIN_EMAIL`, `firestore.rules`의 이메일, `firebase.json`의 지원 이메일을 함께 수정하고 설정을 다시 배포하세요.
