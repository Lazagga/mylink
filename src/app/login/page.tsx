"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [authReady, setAuthReady] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(firebaseApp), (user) => {
      setAuthReady(true);
      if (user) router.replace("/profile");
    }, () => {
      setAuthReady(true);
      setError("로그인 상태를 확인하지 못했습니다. 다시 시도해 주세요.");
    });
    return unsubscribe;
  }, [router]);

  async function login() {
    setError("");
    setSigningIn(true);
    try {
      await signInWithPopup(getAuth(firebaseApp), new GoogleAuthProvider());
      router.replace("/profile");
    } catch {
      setError("Google 로그인에 실패했습니다. 팝업과 승인된 도메인을 확인한 뒤 다시 시도해 주세요.");
      setSigningIn(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-shell shell">
        <header className="login-header"><Link className="brand" href="/" aria-label="myLink 홈"><span className="brand-symbol">m<span>.</span></span><span>myLink</span></Link><Link className="login-back" href="/">← 홈으로</Link></header>
        <div className="login-grid">
          <section className="login-story" aria-label="myLink 소개"><div className="login-story-top"><span>YOUR SPACE STARTS HERE</span><span>✳</span></div><div className="login-story-art" aria-hidden="true"><div className="login-story-circle"><span>m<span>.</span></span></div></div><div className="login-story-copy"><span>01 / CONNECT</span><h2>모든 연결의<br />시작점.</h2><p>당신의 링크와 이야기를 하나의 공간에 담아보세요.</p></div></section>
          <section className="login-form-panel" aria-labelledby="login-title"><p className="small-label">WELCOME BACK</p><h1 id="login-title">나의 공간으로<br />들어가기<span className="accent">.</span></h1><p className="login-subtitle">Google 계정으로 로그인하면 내 프로필과 링크 목록을 확인하고 관리할 수 있습니다.</p><button className="google-button" type="button" disabled={!authReady || signingIn} onClick={() => void login()}><span className="google-mark">G</span>{signingIn ? "로그인 중…" : "Google로 계속하기"}<span className="google-arrow">↗</span></button>{error && <p className="form-error" role="alert">{error}</p>}<p className="login-note">로그인한 계정의 링크는 해당 계정에서만 볼 수 있습니다.</p><div className="login-form-bottom"><span>아직 시작하지 않으셨나요?</span><span>위 버튼으로 바로 시작할 수 있어요.</span></div></section>
        </div>
        <footer className="login-footer"><span>© {new Date().getFullYear()} myLink</span><span>MADE TO CONNECT.</span></footer>
      </div>
    </main>
  );
}
