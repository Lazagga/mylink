"use client";

import { useState } from "react";

// Replace these example.com URLs with real destinations when available.
const links = [
  { title: "포트폴리오", description: "작업과 프로젝트를 모아둔 곳", url: "https://example.com/portfolio", icon: "01", category: "WORK" },
  { title: "깃허브", description: "코드와 실험을 기록하는 곳", url: "https://example.com/github", icon: "⌘", category: "CODE" },
  { title: "블로그", description: "생각과 배움을 적어두는 곳", url: "https://example.com/blog", icon: "✎", category: "WRITING" },
  { title: "인스타그램", description: "일상의 장면을 공유하는 곳", url: "https://example.com/instagram", icon: "◎", category: "SOCIAL" },
  { title: "연락하기", description: "이야기를 나누고 싶을 때", url: "https://example.com/contact", icon: "↗", category: "CONTACT" },
];

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M8 5h11v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function Home() {
  const [copied, setCopied] = useState(false);

  async function shareProfile() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
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
          <div className="links-heading"><div><span className="small-label muted">01 / FIND ME ONLINE</span><h3>나의 링크<span className="accent">.</span></h3></div><span className="count">{links.length.toString().padStart(2, "0")} LINKS</span></div>
          <div className="link-list">
            {links.map((link, index) => (
              <a className="link-row" key={link.title} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`${link.title}, 예시 링크 새 탭에서 열기`}>
                <span className="link-icon">{link.icon}</span><span className="link-text"><strong>{link.title}</strong><span>{link.description}</span></span><span className="link-category">{link.category} / {(index + 1).toString().padStart(2, "0")}</span><span className="link-arrow"><ArrowIcon /></span>
              </a>
            ))}
          </div>
          <p className="demo-note">* 링크 주소와 소개 문구는 예시입니다.</p>
          <div className="closing"><span className="small-label">A LITTLE NOTE</span><p>좋은 연결은<br />작은 인사에서 시작되니까<span>.</span></p><div className="closing-bottom"><span>읽어주셔서 감사합니다.</span><span>— 김태랑</span></div></div>
        </section>
      </div>
      <footer className="site-footer shell"><span>© {new Date().getFullYear()} KIM TAERANG</span><span>MADE TO CONNECT.</span><a href="#top">맨 위로 ↑</a></footer>
    </main>
  );
}
