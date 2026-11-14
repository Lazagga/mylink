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

Firebase 콘솔에서 Cloud Firestore 데이터베이스를 만들고, Authentication의 **Google** 로그인 제공업체를 활성화하세요. 로컬 개발 또는 배포 주소가 Authentication의 승인된 도메인에 등록되어 있는지도 확인하세요. 그런 다음 이 저장소의 `firestore.rules`를 Firestore 규칙에 배포해야 관리자만 쓰고 방문자는 읽을 수 있습니다. 프로젝트에 기존 Firestore 규칙이 있다면 배포 전에 `links` 규칙을 기존 규칙과 병합하세요. 아래 명령은 프로젝트의 규칙 전체를 교체합니다.

```bash
npx firebase-tools login
npx firebase-tools deploy --only firestore:rules --project mylink-94c8e
```

관리자 계정을 바꾸려면 `src/app/page.tsx`의 `ADMIN_EMAIL`과 `firestore.rules`의 이메일을 함께 수정하고 규칙을 다시 배포하세요. 웹 설정값만으로는 Firebase 콘솔 설정이나 보안 규칙이 자동 적용되지 않습니다.
