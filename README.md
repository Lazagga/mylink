# myLink — 김태랑 프로필

TypeScript와 Next.js App Router로 만든 김태랑의 반응형 개인 프로필 페이지입니다. `DESIGN.md`의 타이포그래피, 색상, 여백 및 카드 원칙을 참고했습니다.

## 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다. 배포용 빌드는 `npm run build`, 타입 검사는 `npm run typecheck`로 확인합니다.

## 링크 수정

`src/app/page.tsx`의 `links` 배열과 프로필 문구를 원하는 내용으로 바꾸세요. 사진 대신 이니셜 아바타를 사용하며, 현재 링크는 모두 `example.com`을 사용하는 예시 데이터입니다.

## Firebase

`src/lib/firebase.ts`에 제공된 Firebase 웹 앱 설정이 등록되어 있습니다. 앱은 중복 초기화를 방지하며, `src/app/firebase-analytics.tsx`에서 브라우저가 Analytics를 지원할 때만 Analytics를 시작합니다. 현재 연결된 Firebase 서비스는 Analytics뿐입니다. Firebase Authentication, Firestore, Storage 등은 필요할 때 해당 SDK와 보안 규칙을 추가하세요.
