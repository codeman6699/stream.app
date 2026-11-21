<template>
  <div class="privacy-page">
    <main>
      <!-- ==================== HERO ==================== -->
      <section class="hero container">
        <span class="hero-badge">
          <ShieldCheck :size="16" />
          Privacy Policy
        </span>
        <h1>Protecting Your <span class="gradient-text">Privacy</span> Is Our Priority</h1>
        <p class="tagline">
          Your privacy is important to us. We collect minimal user data to enhance your experience,
          and we never share your information without consent.
        </p>
        <span class="effective-date">
          <Calendar :size="16" />
          Effective Date: October 16, 2026
        </span>
      </section>

      <!-- ==================== COMMITMENT ==================== -->
      <section class="section container">
        <div class="commitment">
          <div class="commitment-icon" aria-hidden="true">
            <Handshake :size="32" />
          </div>
          <h2>Our Commitment to Your Privacy</h2>
          <p>
            At Stream.Store, we believe in transparency and respect for your personal information.
            We are committed to protecting your privacy and ensuring that your personal data is
            handled securely and responsibly.
          </p>
        </div>
      </section>

      <!-- ==================== DATA WE COLLECT ==================== -->
      <section class="section container" aria-labelledby="data-heading">
        <div class="section-header">
          <h2 id="data-heading" class="section-title">Data We Collect</h2>
          <p class="section-subtitle">
            Minimal Data Collection — we collect only what is necessary to provide and improve our services.
          </p>
        </div>
        <div class="grid grid-2">
          <!-- What We Collect -->
          <article class="data-card collect">
            <div class="data-card-header">
              <div class="icon collect-icon" aria-hidden="true">
                <CheckCircle2 :size="24" />
              </div>
              <h3>What We Collect</h3>
            </div>
            <ul class="data-list">
              <li>Basic usage analytics</li>
              <li>Content preferences (optional)</li>
              <li>Device information for compatibility</li>
            </ul>
          </article>

          <!-- What We DON'T Collect -->
          <article class="data-card not-collect">
            <div class="data-card-header">
              <div class="icon reject-icon" aria-hidden="true">
                <XCircle :size="24" />
              </div>
              <h3>What We DON'T Collect</h3>
            </div>
            <ul class="data-list">
              <li>Personal identification data</li>
              <li>Payment information</li>
              <li>Sensitive personal information</li>
            </ul>
          </article>
        </div>
      </section>

      <!-- ==================== HOW WE USE YOUR DATA ==================== -->
      <section class="section container" aria-labelledby="usage-heading">
        <div class="section-header">
          <h2 id="usage-heading" class="section-title">How We Use Your Data</h2>
          <p class="section-subtitle">Your data helps us serve you better — nothing more.</p>
        </div>
        <div class="grid grid-2">
          <article class="usage-card">
            <div class="usage-icon" aria-hidden="true">
              <Target :size="28" />
            </div>
            <h3>Service Improvement</h3>
            <ul class="usage-list">
              <li>Enhance user experience</li>
              <li>Optimize content delivery</li>
              <li>Improve platform performance</li>
            </ul>
          </article>
          <article class="usage-card">
            <div class="usage-icon" aria-hidden="true">
              <BarChart3 :size="28" />
            </div>
            <h3>Analytics</h3>
            <ul class="usage-list">
              <li>Understand usage patterns</li>
              <li>Identify popular content</li>
              <li>Track service improvements</li>
            </ul>
          </article>
        </div>
      </section>

      <!-- ==================== COOKIE POLICY ==================== -->
      <section class="section container" aria-labelledby="cookie-heading">
        <div class="section-header">
          <h2 id="cookie-heading" class="section-title">Cookie Policy</h2>
        </div>

        <div class="cookie-intro">
          <p>
            We use cookies and similar tracking technologies to enhance your browsing experience
            and analyze website traffic. Cookies are small data files stored on your device.
          </p>
        </div>

        <h3 style="color: var(--white); font-size: 1.1rem; font-weight: 700; margin-bottom: 20px; text-align: center;">
          Types of Cookies We Use
        </h3>

        <div class="cookie-types">
          <article class="cookie-card essential">
            <span class="badge">Required</span>
            <h3>Essential Cookies</h3>
            <p>Necessary for the website to function properly. Cannot be disabled.</p>
          </article>
          <article class="cookie-card analytics">
            <span class="badge">Optional</span>
            <h3>Analytics Cookies</h3>
            <p>Help us understand how visitors interact with our website.</p>
          </article>
        </div>

        <div class="updates-box" style="margin-top: 28px;">
          <h4>
            <Cookie :size="20" />
            Cookie Control
          </h4>
          <p>
            You can control and/or delete cookies as you wish. Most web browsers allow you to
            manage cookie preferences through browser settings.
          </p>
        </div>
      </section>

      <!-- ==================== DATA SHARING POLICY ==================== -->
      <section class="section container" aria-labelledby="sharing-heading">
        <div class="section-header">
          <h2 id="sharing-heading" class="section-title">Data Sharing Policy</h2>
          <p class="section-subtitle">We Respect Your Privacy</p>
        </div>

        <div class="sharing-highlight">
          <span class="icon" aria-hidden="true">
            <AlertTriangle :size="26" />
          </span>
          <p>We NEVER share your personal information with third parties without your explicit consent.</p>
        </div>

        <h3 style="color: var(--white); font-size: 1.05rem; font-weight: 700; margin-bottom: 18px;">
          When We Might Share Data
        </h3>
        <ul class="sharing-list">
          <li>With your explicit permission</li>
          <li>When required by law or legal process</li>
          <li>To protect our rights and users' safety</li>
        </ul>

        <div class="third-party-note">
          <h4>
            <Link :size="18" />
            Third-Party Services
          </h4>
          <p>
            We may use third-party services for analytics and hosting. These services have their
            own privacy policies and <strong>only receive anonymized data</strong>.
          </p>
        </div>
      </section>

      <!-- ==================== DATA SECURITY ==================== -->
      <section class="section container" aria-labelledby="security-heading">
        <div class="section-header">
          <h2 id="security-heading" class="section-title">Data Security</h2>
          <p class="section-subtitle">Your data is protected with industry-standard safeguards.</p>
        </div>
        <div class="grid grid-3">
          <article class="security-card">
            <div class="security-icon" aria-hidden="true">
              <Lock :size="28" />
            </div>
            <h3>Encryption</h3>
            <p>All data transmissions are encrypted using industry-standard protocols.</p>
          </article>
          <article class="security-card">
            <div class="security-icon" aria-hidden="true">
              <ShieldCheck :size="28" />
            </div>
            <h3>Access Control</h3>
            <p>Strict access controls to ensure only authorized personnel can access data.</p>
          </article>
          <article class="security-card">
            <div class="security-icon" aria-hidden="true">
              <ClipboardList :size="28" />
            </div>
            <h3>Regular Audits</h3>
            <p>Regular security audits to identify and address potential vulnerabilities.</p>
          </article>
        </div>
      </section>

      <!-- ==================== QUESTIONS & UPDATES ==================== -->
      <section class="section container" aria-labelledby="questions-heading">
        <div class="section-header">
          <h2 id="questions-heading" class="section-title">Questions About Privacy?</h2>
        </div>

        <div class="contact-email-box">
          <h3>
            <Mail :size="22" />
            Get in Touch
          </h3>
          <p>
            For more details about our privacy practices or to exercise your rights,
            please contact us at:
          </p>
          <a href="mailto:support@stream.store" class="email-link">
            <Mail :size="18" />
            support@stream.store
          </a>
        </div>

        <div class="updates-box">
          <h4>
            <RefreshCw :size="20" />
            Policy Updates
          </h4>
          <p>
            We may update this privacy policy from time to time. The latest version will always
            be posted on this page with an updated effective date. We encourage you to review
            this policy periodically.
          </p>
        </div>
      </section>

      <!-- ==================== CTA ==================== -->
      <section class="section container cta-section" aria-labelledby="cta-heading">
        <h2 id="cta-heading">Have More Questions?</h2>
        <p>Our support team is ready to help with anything you need.</p>
        <div class="btn-group">
          <router-link to="/contact" class="btn btn-primary">
            <MessageSquare :size="18" />
            Contact Support
          </router-link>
          <router-link to="/" class="btn btn-outline">
            <House :size="18" />
            Go to Home
          </router-link>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import {
  ShieldCheck,
  Calendar,
  Handshake,
  CheckCircle2,
  XCircle,
  Target,
  BarChart3,
  Cookie,
  AlertTriangle,
  Link,
  Lock,
  ClipboardList,
  Mail,
  RefreshCw,
  MessageSquare,
  House,
} from "lucide-vue-next";
</script>

<style scoped>
/* ==================== BASE ==================== */
.privacy-page {
  width: 100%;
  font-family: 'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif;
  color: #e5e0f0;
  line-height: 1.7;
  font-size: 16px;
  position: relative;
}

.privacy-page::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background:
    radial-gradient(circle at 20% 10%, rgba(109, 40, 217, 0.18), transparent 45%),
    radial-gradient(circle at 80% 30%, rgba(245, 158, 11, 0.08), transparent 40%),
    radial-gradient(circle at 50% 90%, rgba(139, 92, 246, 0.12), transparent 50%);
  z-index: -1;
  pointer-events: none;
}

/* ==================== UTILITIES ==================== */
.container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

.section {
  padding: 72px 0;
  position: relative;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-title {
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #8b5cf6, #f59e0b);
  border-radius: 4px;
  margin: 12px auto 0;
}

.section-subtitle {
  color: #a89ec4;
  font-size: 1.05rem;
  max-width: 640px;
  margin: 0 auto;
}

/* ==================== HERO ==================== */
.hero {
  text-align: center;
  padding: 90px 0 60px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  color: #8b5cf6;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 8px 18px;
  border-radius: 100px;
  margin-bottom: 24px;
}

.hero h1 {
  font-size: clamp(2.1rem, 6vw, 3.4rem);
  font-weight: 900;
  color: #ffffff;
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin-bottom: 18px;
}

.hero h1 .gradient-text {
  background: linear-gradient(135deg, #8b5cf6, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero .tagline {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: #a89ec4;
  max-width: 680px;
  margin: 0 auto 12px;
}

.effective-date {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.25);
  color: #10b981;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 100px;
  margin-top: 20px;
}

/* ==================== COMMITMENT BANNER ==================== */
.commitment {
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.1), rgba(245, 158, 11, 0.04));
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.commitment::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #8b5cf6, #f59e0b);
}

.commitment-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6d28d9, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 8px 24px rgba(109, 40, 217, 0.4);
}

.commitment h2 {
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 12px;
}

.commitment p {
  color: #a89ec4;
  font-size: 1rem;
  max-width: 720px;
  margin: 0 auto;
}

/* ==================== GRIDS ==================== */
.grid {
  display: grid;
  gap: 22px;
}

.grid-2 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
.grid-3 { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }

/* ==================== DATA CARDS ==================== */
.data-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 30px 28px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.data-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #8b5cf6, #f59e0b);
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.data-card:hover {
  transform: translateY(-5px);
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.data-card:hover::before {
  opacity: 1;
}

.data-card.collect {
  border-left: 4px solid #10b981;
}

.data-card.not-collect {
  border-left: 4px solid #ef4444;
}

.data-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.data-card-header .icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(139, 92, 246, 0.18);
  flex-shrink: 0;
}

.collect-icon {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(16, 185, 129, 0.06));
  color: #10b981;
}

.reject-icon {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.18), rgba(239, 68, 68, 0.06));
  color: #ef4444;
}

.data-card-header h3 {
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
}

.data-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.data-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #a89ec4;
  font-size: 0.92rem;
}

.data-list li::before {
  content: '✓';
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  font-size: 0.7rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
}

.data-card.not-collect .data-list li::before {
  content: '✕';
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

/* ==================== USAGE CARDS ==================== */
.usage-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 32px 28px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.usage-card:hover {
  transform: translateY(-5px);
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.usage-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.25), rgba(139, 92, 246, 0.1));
  border: 1px solid rgba(139, 92, 246, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b5cf6;
  margin-bottom: 18px;
}

.usage-card h3 {
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.usage-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.usage-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #a89ec4;
  font-size: 0.9rem;
}

.usage-list li::before {
  content: '•';
  color: #8b5cf6;
  font-weight: 900;
  font-size: 1.2rem;
  line-height: 1;
}

/* ==================== COOKIE SECTION ==================== */
.cookie-intro {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 30px;
  margin-bottom: 28px;
  text-align: center;
}

.cookie-intro p {
  color: #a89ec4;
  font-size: 0.98rem;
  max-width: 760px;
  margin: 0 auto;
}

.cookie-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.cookie-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 28px 26px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.cookie-card:hover {
  transform: translateY(-5px);
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.cookie-card.essential {
  border-top: 3px solid #10b981;
}

.cookie-card.analytics {
  border-top: 3px solid #8b5cf6;
}

.cookie-card .badge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 4px 12px;
  border-radius: 100px;
  margin-bottom: 14px;
}

.cookie-card.essential .badge {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
}

.cookie-card.analytics .badge {
  background: rgba(139, 92, 246, 0.15);
  color: #8b5cf6;
}

.cookie-card h3 {
  color: #ffffff;
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.cookie-card p {
  color: #a89ec4;
  font-size: 0.9rem;
}

/* ==================== SHARING SECTION ==================== */
.sharing-highlight {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-left: 4px solid #ef4444;
  border-radius: 8px;
  padding: 22px 26px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.sharing-highlight .icon {
  flex-shrink: 0;
  color: #ef4444;
}

.sharing-highlight p {
  color: #e5e0f0;
  font-size: 0.98rem;
  font-weight: 600;
}

.sharing-list {
  list-style: none;
  display: grid;
  gap: 12px;
  margin-bottom: 28px;
}

.sharing-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 8px;
  padding: 16px 20px;
  color: #a89ec4;
  font-size: 0.93rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sharing-list li:hover {
  border-color: rgba(139, 92, 246, 0.35);
  background: rgba(139, 92, 246, 0.05);
}

.sharing-list li::before {
  content: '→';
  color: #8b5cf6;
  font-weight: 800;
  flex-shrink: 0;
}

.third-party-note {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 8px;
  padding: 22px 26px;
}

.third-party-note h4 {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.third-party-note p {
  color: #a89ec4;
  font-size: 0.92rem;
}

.third-party-note strong {
  color: #e5e0f0;
}

/* ==================== SECURITY CARDS ==================== */
.security-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 32px 26px;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.security-card:hover {
  transform: translateY(-5px);
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.security-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 18px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.25), rgba(139, 92, 246, 0.1));
  border: 1px solid rgba(139, 92, 246, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b5cf6;
}

.security-card h3 {
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.security-card p {
  color: #a89ec4;
  font-size: 0.9rem;
}

/* ==================== CONTACT / UPDATES ==================== */
.contact-email-box {
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.1), rgba(245, 158, 11, 0.04));
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 40px;
  text-align: center;
}

.contact-email-box h3 {
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.contact-email-box p {
  color: #a89ec4;
  font-size: 0.98rem;
  margin-bottom: 22px;
}

.email-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #6d28d9, #8b5cf6);
  color: #ffffff;
  text-decoration: none;
  padding: 14px 30px;
  border-radius: 100px;
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 24px rgba(109, 40, 217, 0.4);
}

.email-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(109, 40, 217, 0.55);
}

.updates-box {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 32px;
  margin-top: 24px;
}

.updates-box h4 {
  color: #ffffff;
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.updates-box h4 svg {
  color: #8b5cf6;
}

.updates-box p {
  color: #a89ec4;
  font-size: 0.93rem;
}

/* ==================== CTA ==================== */
.cta-section {
  text-align: center;
}

.cta-section h2 {
  font-size: clamp(1.5rem, 4vw, 2rem);
  color: #ffffff;
  font-weight: 800;
  margin-bottom: 12px;
}

.cta-section p {
  color: #a89ec4;
  font-size: 1.05rem;
  margin-bottom: 32px;
}

.btn-group {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 13px 28px;
  border-radius: 100px;
  font-size: 0.92rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: none;
  font-family: inherit;
}

.btn-primary {
  background: linear-gradient(135deg, #6d28d9, #8b5cf6);
  color: #ffffff;
  box-shadow: 0 8px 24px rgba(109, 40, 217, 0.35);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(109, 40, 217, 0.5);
}

.btn-outline {
  background: transparent;
  color: #e5e0f0;
  border: 1px solid rgba(139, 92, 246, 0.18);
}

.btn-outline:hover {
  border-color: #8b5cf6;
  color: #ffffff;
  background: rgba(139, 92, 246, 0.08);
  transform: translateY(-3px);
}

/* ==================== RESPONSIVE ==================== */
@media (max-width: 768px) {
  .section {
    padding: 52px 0;
  }
  .commitment,
  .contact-email-box,
  .updates-box {
    padding: 28px 22px;
  }
  .hero {
    padding: 64px 0 44px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 18px;
  }
  .btn {
    width: 100%;
  }
  .data-card,
  .usage-card,
  .cookie-card,
  .security-card {
    padding: 24px 20px;
  }
}

/* ==================== ACCESSIBILITY ==================== */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

a:focus-visible, button:focus-visible {
  outline: 2px solid #8b5cf6;
  outline-offset: 3px;
  border-radius: 4px;
}
</style>