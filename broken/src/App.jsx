import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUpRight, 
  ExternalLink, 
  Mail, 
  MessageSquare, 
  ArrowUp, 
  Menu, 
  X, 
  Copy, 
  Check, 
  Code2, 
  Layout, 
  Sparkles, 
  Layers, 
  Globe, 
  ShieldCheck,
  Send
} from 'lucide-react';

// Data definitions strictly adhering to brand requirements
const PROJECTS = [
  {
    id: '01',
    name: 'DeCheffs',
    category: 'Business Website / Food & Hospitality',
    description: 'A business website created to showcase food offerings and provide customers with an accessible online experience.',
    url: 'https://decheffs.ng',
    isLive: true
  },
  {
    id: '02',
    name: 'BlazeBro',
    category: 'Fashion / Clothing Website',
    description: 'A clothing website project designed to present a fashion brand and its products through a modern online interface.',
    url: 'https://blazebro.com',
    isLive: true
  },
  {
    id: '03',
    name: 'Auntrans',
    category: 'Audio Transcription / Web Development',
    description: 'A collaborative project focused on audio transcription and providing a digital experience for converting audio content into text.',
    url: 'https://auntrans.online',
    isLive: true
  },
  {
    id: '04',
    name: 'Gym Website',
    category: 'Fitness / Website Development',
    description: 'A gym website project focused on presenting fitness services and creating a modern, responsive online experience.',
    status: 'IN DEVELOPMENT',
    isLive: false
  }
];

const SERVICES = [
  {
    num: '01',
    title: 'Frontend Web Development',
    description: 'Building responsive, high-performance client interfaces using semantic HTML5, modern CSS3, and dynamic JavaScript frameworks.'
  },
  {
    num: '02',
    title: 'Responsive Website Development',
    description: 'Ensuring seamless adaptability and pixel-perfect layouts across mobile devices, tablets, and wide desktop screens.'
  },
  {
    num: '03',
    title: 'Business and Corporate Websites',
    description: 'Creating structured digital platforms for companies to communicate their value proposition and build trust with clients.'
  },
  {
    num: '04',
    title: 'Landing Page Development',
    description: 'Crafting focused, high-conversion single-page experiences optimized for speed, clarity, and intentional user action.'
  },
  {
    num: '05',
    title: 'UI Implementation',
    description: 'Translating design systems and visual concepts into precise, accessible, and maintainable code without compromising aesthetic intent.'
  },
  {
    num: '06',
    title: 'Website Redesign and Improvements',
    description: 'Auditing existing websites to enhance visual hierarchy, mobile responsiveness, navigation flows, and technical polish.'
  }
];

const SKILL_GROUPS = [
  {
    title: 'Core Web Technologies',
    skills: ['HTML5', 'CSS3', 'JavaScript']
  },
  {
    title: 'Frameworks and Libraries',
    skills: ['React', 'Next.js', 'Tailwind CSS']
  },
  {
    title: 'Development Tools',
    skills: ['Git', 'GitHub', 'Visual Studio Code']
  },
  {
    title: 'Additional Skills',
    skills: [
      'Responsive Web Design',
      'Mobile-First Development',
      'Website Deployment',
      'UI Implementation',
      'Cross-Browser Compatibility'
    ]
  }
];

const TICKER_ITEMS = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Tailwind CSS',
  'Git',
  'GitHub',
  'Responsive Design'
];

export default function App() {
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorActive, setCursorActive] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);

  // Email parameters
  const emailAddress = 'grafixs99@gmail.com';
  const emailSubject = 'Website Project Inquiry — Broken Designs';
  const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}`;
  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodeURIComponent(emailSubject)}`;
  const whatsappUrl = 'https://wa.link/fcp300';

  // Fine pointer detection (desktop vs touch)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setHasFinePointer(mediaQuery.matches);

    const handlePointerChange = (e) => setHasFinePointer(e.matches);
    mediaQuery.addEventListener('change', handlePointerChange);

    if (mediaQuery.matches) {
      document.body.classList.add('custom-cursor-enabled');
    }

    return () => {
      mediaQuery.removeEventListener('change', handlePointerChange);
      document.body.classList.remove('custom-cursor-enabled');
    };
  }, []);

  // Custom Cursor tracking
  useEffect(() => {
    if (!hasFinePointer) return;

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('interactive')
      ) {
        setCursorActive(true);
      } else {
        setCursorActive(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [hasFinePointer]);

  // Scroll listener for sticky navbar & back to top
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsNavScrolled(scrollY > 40);
      setShowBackToTop(scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll-triggered reveals
  useEffect(() => {
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    const elements = document.querySelectorAll('.reveal-init');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Copy email to clipboard with notification
  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(emailAddress).then(() => {
      setToastMessage('Email address copied to clipboard');
      setTimeout(() => setToastMessage(''), 3000);
    }).catch(() => {
      setToastMessage(`Email: ${emailAddress}`);
      setTimeout(() => setToastMessage(''), 3000);
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Background Lighting & Grid Effects */}
      <div className="ambient-glow-top" aria-hidden="true" />
      <div className="ambient-glow-bottom" aria-hidden="true" />
      <div className="technical-grid" aria-hidden="true" />

      {/* Custom Desktop Cursor */}
      {hasFinePointer && (
        <>
          <div
            className={`custom-cursor ${cursorActive ? 'active' : ''}`}
            style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
            aria-hidden="true"
          />
          <div
            className="custom-cursor-dot"
            style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Copy Toast Alert */}
      <div className={`toast-notice ${toastMessage ? 'show' : ''}`} role="status">
        <Check size={14} className="text-green-400" />
        <span>{toastMessage}</span>
      </div>

      {/* Floating Back to Top */}
      <button
        onClick={scrollToTop}
        className={`floating-back-to-top ${showBackToTop ? 'visible' : ''}`}
        aria-label="Scroll back to top"
      >
        <ArrowUp size={18} />
      </button>

      {/* 3. Sticky Navigation */}
      <header className={`site-nav ${isNavScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-inner">
            {/* Logo */}
            <a href="#" className="nav-brand" aria-label="Broken Designs Homepage">
              <span className="brand-badge">BD</span>
              <span>BROKEN DESIGNS</span>
            </a>

            {/* Subtle "AVAILABLE FOR PROJECTS" indicator */}
            <div className="nav-center-status" aria-label="Current status: Available for projects">
              <span className="status-dot" aria-hidden="true"></span>
              <span>AVAILABLE FOR PROJECTS</span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="nav-links-desktop" aria-label="Main Navigation">
              <a href="#work" className="nav-link">WORK</a>
              <a href="#about" className="nav-link">ABOUT</a>
              <a href="#stack" className="nav-link">STACK</a>
              <a href="#contact" className="nav-link">CONTACT</a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-links">
            <a href="#work" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>01</span> WORK
            </a>
            <a href="#about" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>02</span> ABOUT
            </a>
            <a href="#stack" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>03</span> STACK
            </a>
            <a href="#contact" className="mobile-nav-link" onClick={closeMobileMenu}>
              <span>04</span> CONTACT
            </a>
          </div>

          <div className="flex items-center gap-3 pt-6 border-t border-hairline font-mono text-xs text-muted">
            <span className="status-dot"></span>
            <span>AVAILABLE FOR PROJECTS</span>
          </div>
        </div>
      </header>

      <main id="main-content">
        {/* 4. Hero Section */}
        <section className="hero-section" id="hero">
          <div className="container">
            <div className="hero-content">
              {/* Eyebrow */}
              <div className="hero-eyebrow">
                <span>FRONTEND WEB DEVELOPER</span>
              </div>

              {/* Oversized Brand Typography */}
              <div className="hero-title-group">
                <h1 className="hero-title-main">
                  <span>BROKEN</span>
                  <span className="hero-title-second">DESIGNS</span>
                </h1>
              </div>

              {/* Tagline */}
              <p className="hero-tagline">
                Digital experiences built with code &amp; intention.
              </p>

              {/* Supporting Statement */}
              <p className="hero-supporting-text">
                I build modern, responsive websites that combine clean code, thoughtful design and purposeful digital experiences.
              </p>

              {/* Two Functional Action Buttons */}
              <div className="hero-actions">
                <a href="#work" className="btn-primary">
                  <span>VIEW SELECTED WORK</span>
                  <ArrowUpRight size={16} />
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  aria-label="Open WhatsApp chat with Broken Designs"
                >
                  <MessageSquare size={16} />
                  <span>LET’S TALK</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Selected Projects — EXACTLY FOUR */}
        <section className="section-wrapper" id="work">
          <div className="container">
            <div className="section-header reveal-init">
              <span className="section-label">SELECTED WORKS</span>
              <h2 className="section-title">FEATURED PROJECTS</h2>
            </div>

            <div className="projects-list">
              {PROJECTS.map((project) => (
                <article
                  key={project.id}
                  className="project-row reveal-init"
                  aria-labelledby={`project-title-${project.id}`}
                >
                  <div className="project-grid-inner">
                    {/* Project Number */}
                    <div className="project-index">
                      <span>{project.id}</span>
                    </div>

                    {/* Project Name & Category */}
                    <div className="project-identity">
                      <h3 id={`project-title-${project.id}`} className="project-name">
                        {project.name}
                      </h3>
                      <span className="project-category">{project.category}</span>
                    </div>

                    {/* Description */}
                    <p className="project-description">
                      {project.description}
                    </p>

                    {/* Action or Status */}
                    <div className="project-action">
                      {project.isLive ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-project-live"
                          aria-label={`Visit live site for ${project.name}`}
                        >
                          <span>LIVE SITE</span>
                          <ExternalLink size={13} />
                        </a>
                      ) : (
                        <div className="badge-in-dev" role="status">
                          <span className="dev-indicator-dot" aria-hidden="true"></span>
                          <span>IN DEVELOPMENT</span>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 6. About Section */}
        <section className="section-wrapper" id="about">
          <div className="container">
            <div className="section-header reveal-init">
              <span className="section-label">ABOUT THE BRAND</span>
              <h2 className="section-title">BEYOND THE INTERFACE.</h2>
            </div>

            <div className="about-grid">
              <div className="about-narrative reveal-init">
                <p className="about-lead-text">
                  “Broken Designs is my creative development brand, focused on building responsive websites and digital experiences that balance functionality with visual identity. I turn ideas into practical, engaging interfaces that help businesses establish their online presence.”
                </p>

                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.75' }}>
                  Every project is approached with deliberate intention—stripping away visual noise to amplify clarity, responsiveness, and technical stability. The objective is never complexity for its own sake, but clean, accessible web software that serves users effortlessly.
                </p>
              </div>

              <div className="about-manifesto-card reveal-init">
                <div className="manifesto-item">
                  <div className="manifesto-icon-box">
                    <Code2 size={20} />
                  </div>
                  <div>
                    <h4 className="manifesto-title">Semantic Precision</h4>
                    <p className="manifesto-desc">
                      Clean markup and structural integrity ensuring rapid load speeds and accessible usability across every viewport.
                    </p>
                  </div>
                </div>

                <div className="manifesto-item">
                  <div className="manifesto-icon-box">
                    <Layout size={20} />
                  </div>
                  <div>
                    <h4 className="manifesto-title">Intentional Aesthetics</h4>
                    <p className="manifesto-desc">
                      Minimal, distinctive visual identity inspired by architectural layouts and brutalist typography.
                    </p>
                  </div>
                </div>

                <div className="manifesto-item">
                  <div className="manifesto-icon-box">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h4 className="manifesto-title">Reliable Execution</h4>
                    <p className="manifesto-desc">
                      Tested across modern browsers and screen form factors for consistent, reliable performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Services */}
        <section className="section-wrapper" id="services">
          <div className="container">
            <div className="section-header reveal-init">
              <span className="section-label">CAPABILITIES</span>
              <h2 className="section-title">SERVICES &amp; SOLUTIONS</h2>
            </div>

            <div className="services-grid">
              {SERVICES.map((service) => (
                <div key={service.num} className="service-card reveal-init">
                  <div className="service-num">{service.num} //</div>
                  <div>
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-desc">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Skills and Technology Stack */}
        <section className="section-wrapper" id="stack">
          <div className="container">
            <div className="section-header reveal-init">
              <span className="section-label">TECHNICAL EXPERTISE</span>
              <h2 className="section-title">SKILLS &amp; TECHNOLOGIES</h2>
            </div>

            {/* Structured Skill Categories */}
            <div className="skills-columns">
              {SKILL_GROUPS.map((group) => (
                <div key={group.title} className="skills-group-card reveal-init">
                  <h3 className="skills-group-title">
                    <span>{group.title}</span>
                  </h3>
                  <ul className="skills-list">
                    {group.skills.map((skill) => (
                      <li key={skill} className="skills-list-item">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Continuously moving horizontal technology ticker */}
          <div className="ticker-outer-container" aria-label="Technology Ticker">
            <div className="ticker-track">
              {/* Loop track 1 */}
              <div className="ticker-items" aria-hidden="true">
                {TICKER_ITEMS.map((item, idx) => (
                  <span key={`t1-${idx}`} className="ticker-item">
                    <span>{item}</span>
                    <span className="ticker-slash">/</span>
                  </span>
                ))}
              </div>
              {/* Loop track 2 (seamless continuation) */}
              <div className="ticker-items" aria-hidden="true">
                {TICKER_ITEMS.map((item, idx) => (
                  <span key={`t2-${idx}`} className="ticker-item">
                    <span>{item}</span>
                    <span className="ticker-slash">/</span>
                  </span>
                ))}
              </div>
              {/* Loop track 3 (ensures widescreen coverage) */}
              <div className="ticker-items" aria-hidden="true">
                {TICKER_ITEMS.map((item, idx) => (
                  <span key={`t3-${idx}`} className="ticker-item">
                    <span>{item}</span>
                    <span className="ticker-slash">/</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 9. Contact Section */}
        <section className="contact-section" id="contact">
          <div className="container">
            <div className="contact-card-main reveal-init">
              <span className="section-label">GET IN TOUCH</span>
              
              <h2 className="contact-heading-large">
                HAVE AN IDEA?<br />
                LET’S BUILD IT.
              </h2>

              <p className="contact-support-text">
                Have a business, product or idea that needs a website? Let’s discuss how we can bring it to life.
              </p>

              {/* Two clear, equally prominent contact options */}
              <div className="contact-channels-grid">
                {/* WhatsApp Option */}
                <div className="contact-channel-card">
                  <div className="contact-channel-meta">
                    <span className="channel-label">Instant Messaging</span>
                    <h3 className="channel-target">WhatsApp Direct</h3>
                    <p className="channel-note">
                      Quickest channel for initial project inquiries, scope discussions, and direct feedback.
                    </p>
                  </div>

                  <div>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp-prominent"
                      aria-label="Let's talk on WhatsApp"
                    >
                      <MessageSquare size={16} />
                      <span>LET’S TALK ON WHATSAPP</span>
                    </a>
                  </div>
                </div>

                {/* Email Option */}
                <div className="contact-channel-card">
                  <div className="contact-channel-meta">
                    <span className="channel-label">Direct Correspondence</span>
                    <a
                      href={mailtoUrl}
                      className="channel-target"
                      aria-label={`Send email to ${emailAddress}`}
                    >
                      {emailAddress}
                    </a>
                    <p className="channel-note">
                      Preferred for detailed briefs, specifications, project proposals, and formal quotes.
                    </p>
                  </div>

                  <div>
                    <a
                      href={mailtoUrl}
                      className="btn-email-prominent"
                      aria-label="Send me an email"
                    >
                      <Mail size={16} />
                      <span>SEND ME AN EMAIL</span>
                    </a>

                    <div className="email-actions-subbar">
                      <button
                        onClick={handleCopyEmail}
                        className="btn-ghost-small"
                        title="Copy email address"
                        aria-label="Copy email address to clipboard"
                      >
                        <Copy size={12} />
                        <span>Copy Address</span>
                      </button>

                      <a
                        href={gmailWebUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost-small"
                        title="Open in Gmail"
                        aria-label="Compose in Gmail Web"
                      >
                        <Send size={12} />
                        <span>Open in Gmail</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 12. Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top-grid">
            <div>
              <h3 className="footer-brand-title">BROKEN DESIGNS</h3>
              <p className="footer-brand-tagline">
                Digital experiences built with code &amp; intention.
              </p>
              <p className="footer-scope-line">
                Frontend Development • Responsive Websites • Digital Experiences
              </p>
            </div>

            <div className="footer-links-group">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link-item"
                aria-label="WhatsApp link in footer"
              >
                <span>WhatsApp</span>
                <ArrowUpRight size={13} />
              </a>

              <a
                href={mailtoUrl}
                className="footer-link-item"
                aria-label="Email link in footer"
              >
                <span>Email ({emailAddress})</span>
                <ArrowUpRight size={13} />
              </a>

              <button
                onClick={scrollToTop}
                className="btn-back-to-top"
                aria-label="Scroll back to top"
              >
                <span>Back to Top</span>
                <ArrowUp size={13} />
              </button>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <span>&copy; {new Date().getFullYear()} BROKEN DESIGNS. All rights reserved.</span>
            <span>Minimalist Dark Architecture • Crafted for High Readability</span>
          </div>
        </div>
      </footer>
    </>
  );
}
