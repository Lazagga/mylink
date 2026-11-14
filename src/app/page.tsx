"use client";

import { useState } from "react";

type Category = "전체" | "프로젝트" | "콘텐츠" | "소셜";
type LinkItem = {
  title: string;
  description: string;
  category: Exclude<Category, "전체">;
  url: string;
  mark: string;
  tone: string;
  featured?: boolean;
};

const categories: Category[] = ["전체", "프로젝트", "콘텐츠", "소셜"];

// Replace these example.com URLs with your own links before publishing a real profile.
const links: LinkItem[] = [
  {
    title: "새로운 작업 보기",
    description: "최근에 만든 것들과 지금 진행 중인 이야기",
    category: "프로젝트",
    url: "https://example.com/projects",
    mark: "✳",
    tone: "mint",
    featured: true,
  },
  {
    title: "포트폴리오",
    description: "작업과 생각을 한눈에",
    category: "프로젝트",
    url: "https://example.com/portfolio",
    mark: "01",
    tone: "stone",
  },
  {
    title: "노트와 기록",
    description: "배우고 발견한 것을 적습니다",
    category: "콘텐츠",
    url: "https://example.com/notes",
    mark: "↗",
    tone: "coral",
  },
  {
    title: "뉴스레터",
    description: "가끔 보내는 짧은 편지",
    category: "콘텐츠",
    url: "https://example.com/newsletter",
    mark: "✉",
    tone: "blue",
  },
  {
    title: "인스타그램",
    description: "일상 속 작은 장면들",
    category: "소셜",
    url: "https://example.com/instagram",
    mark: "◎",
    tone: "sand",
  },
  {
    title: "깃허브",
    description: "만들고 실험한 코드",
    category: "소셜",
    url: "https://example.com/github",
    mark: "⌘",
    tone: "lavender",
  },
];

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M8 5h11v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
}

export default function Home() {
  const [category, setCategory] = useState<Category>("전체");
  const [copied, setCopied] = useState(false);
  const visibleLinks = links.filter((link) => category === "전체" || link.category === category);
  const featured = visibleLinks.find((link) => link.featured);
  const regular = visibleLinks.filter((link) => !link.featured);

  async function copyPageLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main>
      <header className="site-header shell">
        <a className="brand" href="#top" aria-label="myLink 홈"><span className="brand-dot" />myLink<span className="brand-period">.</span></a>
        <span className="header-note">YOUR CORNER OF THE INTERNET</span>
        <button className="share-button" onClick={copyPageLink} type="button" aria-live="polite">
          {copied ? "복사했어요" : "페이지 공유"}<span className="share-icon"><ArrowIcon diagonal /></span>
        </button>
      </header>

      <div className="shell page-grid" id="top">
        <section className="main-column" aria-labelledby="hero-title">
          <div className="eyebrow"><span className="status-dot" /> MY SPACE, MY LINKS <span className="eyebrow-line" /></div>
          <div className="hero">
            <p className="intro-kicker">안녕하세요, 여기는</p>
            <h1 id="hero-title">나의 모든<br /><em>연결</em>이 시작되는 곳<span className="hero-period">.</span></h1>
            <p className="hero-description">좋아하는 일, 만들고 있는 것, 그리고 더 많은 이야기.<br className="desktop-break" /> 필요한 링크를 이곳에 가지런히 모았어요.</p>
          </div>

          <div className="section-heading">
            <div><span className="section-index">01 / EXPLORE</span><h2>둘러보기<span className="heading-period">.</span></h2></div>
            <span className="link-count">{visibleLinks.length.toString().padStart(2, "0")} LINKS</span>
          </div>

          <nav className="filters" aria-label="링크 카테고리">
            {categories.map((item) => (
              <button key={item} type="button" className={`filter ${category === item ? "active" : ""}`} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>
            ))}
          </nav>

          {featured && (
            <a className="featured-link" href={featured.url} target="_blank" rel="noopener noreferrer" aria-label={`${featured.title}, 새 탭에서 열기`}>
              <div className="featured-copy"><span className="featured-label"><span className="featured-spark">✳</span> FEATURED LINK</span><div><h3>{featured.title}</h3><p>{featured.description}</p></div><span className="featured-cta">링크 열기 <ArrowIcon /></span></div>
              <div className="featured-art" aria-hidden="true"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="art-center">m<span>.</span></div><span className="art-caption">MAKE / CONNECT / SHARE</span></div>
            </a>
          )}

          <div className="link-list">
            {regular.map((link, index) => (
              <a className="link-row" key={link.title} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`${link.title}, 새 탭에서 열기`}>
                <span className={`link-mark ${link.tone}`}>{link.mark}</span>
                <span className="link-copy"><span className="link-title">{link.title}</span><span className="link-description">{link.description}</span></span>
                <span className="link-meta">{link.category} <span className="row-number">/ {(index + 1).toString().padStart(2, "0")}</span></span>
                <span className="row-arrow"><ArrowIcon diagonal /></span>
              </a>
            ))}
          </div>
          {regular.length === 0 && !featured && <p className="empty-state">이 카테고리에는 아직 링크가 없어요.</p>}
        </section>

        <aside className="side-column" aria-label="프로필 소개">
          <div className="profile-card"><div className="profile-top"><span>ABOUT THIS SPACE</span><span className="profile-star">✳</span></div><div className="profile-avatar" aria-hidden="true"><span>m.</span></div><p className="profile-name">안녕하세요,<br />마이링크입니다.</p><p className="profile-text">여러 곳에 흩어진 나의 이야기를 하나의 페이지에 담았습니다. 편하게 둘러보고, 마음에 드는 곳에서 만나요.</p><div className="profile-bottom"><span className="available-dot" /> 새로운 연결을 환영해요</div></div>
          <div className="side-note"><span>NOTE / 001</span><p>이 페이지의 프로필과 링크는<br />예시 데이터입니다.</p><ArrowIcon diagonal /></div>
        </aside>
      </div>

      <footer className="site-footer shell"><span>© {new Date().getFullYear()} myLink</span><span>하나의 페이지, 무한한 연결.</span><a href="#top">맨 위로 ↑</a></footer>
    </main>
  );
}
