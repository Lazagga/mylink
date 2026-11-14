import Link from "next/link";

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function LandingPage() {
  return (
    <main className="landing-page">
      <header className="landing-header shell">
        <a className="brand" href="#top" aria-label="myLink 홈"><span className="brand-symbol">m<span>.</span></span><span>myLink</span></a>
        <span className="header-label">A PLACE FOR EVERY CONNECTION</span>
        <Link className="landing-nav-cta" href="/login">로그인 <ArrowIcon /></Link>
      </header>

      <section className="landing-hero shell" id="top" aria-labelledby="landing-title">
        <div className="landing-hero-copy">
          <p className="landing-eyebrow"><span className="online-dot" /> YOUR LINKS, ONE SPACE <span className="intro-line" /></p>
          <h1 id="landing-title">나를 소개하는<br />링크, <em>한 페이지</em>로<span className="accent">.</span></h1>
          <p className="landing-lead">흩어져 있는 나의 작업, 기록, 소셜 채널을 한곳에 모아보세요. 필요한 순간에 보여줄 수 있는 나만의 공간이 생깁니다.</p>
          <div className="landing-hero-actions"><Link className="landing-primary" href="/login">내 공간 시작하기 <ArrowIcon /></Link><a className="landing-text-link" href="#how-it-works">어떻게 사용하나요? ↓</a></div>
          <p className="landing-footnote">Google 계정으로 간편하게 시작할 수 있어요.</p>
        </div>
        <div className="landing-visual" aria-hidden="true">
          <div className="landing-visual-top"><span>MY PERSONAL SPACE</span><span>✳</span></div>
          <div className="landing-visual-orbit"><span>m<span>.</span></span></div>
          <div className="landing-preview"><div className="landing-preview-head"><span className="landing-preview-avatar">m.</span><div><strong>나의 공간</strong><small>모든 연결이 시작되는 곳</small></div></div><div className="landing-preview-link"><span>01</span> 나의 작업 <b>↗</b></div><div className="landing-preview-link"><span>02</span> 나의 기록 <b>↗</b></div><div className="landing-preview-link"><span>03</span> 나의 소셜 <b>↗</b></div></div>
          <span className="landing-visual-caption">MAKE / CONNECT / SHARE</span>
        </div>
      </section>

      <section className="landing-process shell" id="how-it-works" aria-labelledby="process-title"><div className="landing-section-head"><span className="small-label">01 / HOW IT WORKS</span><h2 id="process-title">시작은 간단하게<span className="accent">.</span></h2></div><div className="landing-steps"><div><span>01</span><h3>Google로 로그인</h3><p>계정으로 로그인하면 나만의 프로필 공간이 열립니다.</p></div><div><span>02</span><h3>링크를 추가</h3><p>소개하고 싶은 주소와 설명을 내 목록에 저장합니다.</p></div><div><span>03</span><h3>한곳에서 관리</h3><p>새 링크를 추가하거나 새로고침하면 최신 목록을 확인할 수 있습니다.</p></div></div></section>

      <section className="landing-bottom shell"><div><span className="small-label">READY TO BEGIN?</span><h2>당신의 이야기를<br />하나로 이어보세요<span>.</span></h2></div><Link className="landing-bottom-cta" href="/login">Google로 시작하기 <ArrowIcon /></Link></section>
      <footer className="site-footer shell"><span>© {new Date().getFullYear()} myLink</span><span>MADE TO CONNECT.</span><a href="#top">맨 위로 ↑</a></footer>
    </main>
  );
}
