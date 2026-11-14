"use client";

import { FormEvent, useEffect, useState } from "react";
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { addDoc, collection, getFirestore, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { firebaseApp } from "@/lib/firebase";

const ADMIN_EMAIL = "030126evan@gmail.com";
const categories = ["WORK", "CODE", "WRITING", "SOCIAL", "CONTACT", "OTHER"] as const;

type ProfileLink = {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  category: string;
};

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M8 5h11v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function validWebUrl(value: string) {
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

export default function Home() {
  const [links, setLinks] = useState<ProfileLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [manageOpen, setManageOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("↗");
  const [category, setCategory] = useState<(typeof categories)[number]>("OTHER");
  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL && user.emailVerified;

  useEffect(() => {
    const db = getFirestore(firebaseApp);
    const unsubscribeLinks = onSnapshot(
      query(collection(db, "links"), orderBy("createdAt", "desc")),
      (snapshot) => {
        setLinks(snapshot.docs.map((document) => {
          const data = document.data();
          return {
            id: document.id,
            title: typeof data.title === "string" ? data.title : "제목 없음",
            description: typeof data.description === "string" ? data.description : "",
            url: typeof data.url === "string" ? data.url : "",
            icon: typeof data.icon === "string" ? data.icon : "↗",
            category: typeof data.category === "string" ? data.category : "OTHER",
          };
        }).filter((link) => validWebUrl(link.url)));
        setLoadError("");
        setLoading(false);
      },
      () => {
        setLoadError("링크를 불러오지 못했습니다. Firestore 설정과 읽기 규칙을 확인해 주세요.");
        setLoading(false);
      },
    );
    const unsubscribeAuth = onAuthStateChanged(getAuth(firebaseApp), setUser);
    return () => {
      unsubscribeLinks();
      unsubscribeAuth();
    };
  }, []);

  async function shareProfile() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  async function login() {
    setFormError("");
    try {
      await signInWithPopup(getAuth(firebaseApp), new GoogleAuthProvider());
    } catch {
      setFormError("Google 로그인에 실패했습니다. Firebase 인증 설정을 확인해 주세요.");
    }
  }

  async function addLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    if (!isAdmin) {
      setFormError("관리자 계정으로 로그인해 주세요.");
      return;
    }
    const cleanTitle = title.trim();
    const cleanDescription = description.trim();
    const cleanUrl = url.trim();
    const cleanIcon = icon.trim() || "↗";
    if (!cleanTitle || !validWebUrl(cleanUrl)) {
      setFormError("제목과 http 또는 https로 시작하는 올바른 주소를 입력해 주세요.");
      return;
    }
    setSaving(true);
    try {
      await addDoc(collection(getFirestore(firebaseApp), "links"), {
        title: cleanTitle,
        description: cleanDescription,
        url: cleanUrl,
        icon: cleanIcon,
        category,
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setDescription("");
      setUrl("");
      setIcon("↗");
      setCategory("OTHER");
      setManageOpen(false);
    } catch {
      setFormError("저장하지 못했습니다. Firestore 데이터베이스와 관리자 쓰기 규칙을 확인해 주세요.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main id="top">
      <header className="site-header shell">
        <a className="brand" href="#top" aria-label="김태랑 프로필 맨 위로"><span className="brand-symbol">t<span>.</span></span><span>김태랑</span></a>
        <span className="header-label">PERSONAL PROFILE / LINKS</span>
        <button className="share-button" type="button" onClick={shareProfile} aria-live="polite">{copied ? "주소 복사됨" : "프로필 공유"}<ArrowIcon /></button>
      </header>

      <div className="shell profile-layout">
        <aside className="identity" aria-labelledby="profile-name">
          <div className="identity-top"><span className="small-label"><span className="online-dot" /> PERSONAL SPACE</span><span className="identity-number">01 / 01</span></div>
          <div className="portrait" aria-label="김태랑 이니셜 아바타" role="img"><span className="portrait-ring ring-one" /><span className="portrait-ring ring-two" /><span className="portrait-initial">T<span>.</span></span><span className="portrait-caption">KIM TAERANG</span></div>
          <p className="hello">안녕하세요, 저는</p>
          <h1 id="profile-name">김태랑<span className="accent">.</span></h1>
          <p className="identity-roman">KIM TAERANG</p>
          <p className="identity-bio">좋아하는 것을 만들고, 배우고, 기록합니다.<br />저의 여러 이야기를 이곳에서 만나보세요.</p>
          <div className="identity-rule" />
          <div className="identity-footer"><span className="online-dot" /> 새로운 연결을 기다리고 있어요</div>
        </aside>

        <section className="content" aria-labelledby="intro-title">
          <div className="intro"><p className="small-label">WELCOME TO MY PAGE <span className="intro-line" /></p><h2 id="intro-title">저를 더 알고 싶다면,<br /><em>여기서</em> 시작해요<span className="accent">.</span></h2><p>흩어져 있던 저의 작업과 기록, 소셜 채널을 한곳에 모았습니다. 관심 가는 곳부터 편하게 둘러보세요.</p></div>
          <div className="links-heading"><div><span className="small-label muted">01 / FIND ME ONLINE</span><h3>나의 링크<span className="accent">.</span></h3></div><div className="links-actions"><span className="count">{links.length.toString().padStart(2, "0")} LINKS</span><button type="button" className="manage-button" aria-expanded={manageOpen} aria-controls="link-manager" onClick={() => { setManageOpen(!manageOpen); setFormError(""); }}>{manageOpen ? "닫기" : "링크 관리"}</button></div></div>

          {manageOpen && <div id="link-manager" className="manager"><div className="manager-heading"><span className="small-label">MANAGE LINKS</span><h4>새 링크 추가</h4></div>{!user ? <div className="manager-login"><p>관리자 Google 계정으로 로그인하면 링크를 추가할 수 있습니다.</p><button type="button" className="primary-button" onClick={login}>Google로 로그인</button></div> : !isAdmin ? <div className="manager-login"><p>이 계정에는 링크 추가 권한이 없습니다.</p><button type="button" className="secondary-button" onClick={() => void signOut(getAuth(firebaseApp))}>로그아웃</button></div> : <form className="link-form" onSubmit={addLink}><label>제목<input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={80} required placeholder="예: 포트폴리오" /></label><label>URL<input value={url} onChange={(event) => setUrl(event.target.value)} type="url" maxLength={2048} required placeholder="https://example.com" /></label><label>설명<input value={description} onChange={(event) => setDescription(event.target.value)} maxLength={160} placeholder="짧은 소개" /></label><div className="form-pair"><label>분류<select value={category} onChange={(event) => setCategory(event.target.value as (typeof categories)[number])}>{categories.map((value) => <option key={value} value={value}>{value}</option>)}</select></label><label>아이콘<input value={icon} onChange={(event) => setIcon(event.target.value)} maxLength={4} placeholder="↗" /></label></div><div className="form-actions"><button type="submit" className="primary-button" disabled={saving}>{saving ? "저장 중…" : "Firebase에 저장"}</button><button type="button" className="secondary-button" onClick={() => void signOut(getAuth(firebaseApp))}>로그아웃</button></div></form>}{formError && <p className="form-error" role="alert">{formError}</p>}</div>}

          {loading ? <p className="list-state" role="status">링크를 불러오는 중입니다…</p> : loadError ? <p className="list-state error" role="alert">{loadError}</p> : links.length === 0 ? <p className="list-state">아직 등록된 링크가 없습니다.</p> : <div className="link-list">{links.map((link, index) => <a className="link-row" key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`${link.title}, 새 탭에서 열기`}><span className="link-icon">{link.icon}</span><span className="link-text"><strong>{link.title}</strong><span>{link.description}</span></span><span className="link-category">{link.category} / {(index + 1).toString().padStart(2, "0")}</span><span className="link-arrow"><ArrowIcon /></span></a>)}</div>}
          <div className="closing"><span className="small-label">A LITTLE NOTE</span><p>좋은 연결은<br />작은 인사에서 시작되니까<span>.</span></p><div className="closing-bottom"><span>읽어주셔서 감사합니다.</span><span>— 김태랑</span></div></div>
        </section>
      </div>
      <footer className="site-footer shell"><span>© {new Date().getFullYear()} KIM TAERANG</span><span>MADE TO CONNECT.</span><a href="#top">맨 위로 ↑</a></footer>
    </main>
  );
}
