<template>
  <div class="terms-page">
    <main>
      <!-- ==================== HERO ==================== -->
      <section class="hero container">
        <span class="hero-badge">
          <FileText :size="16" />
          Terms &amp; Conditions
        </span>
        <h1>Platform <span class="gradient-text">Usage Agreement</span></h1>
        <p class="tagline">
          By using Stream.Store, you agree to our terms, which include respecting copyright laws
          and refraining from misuse of our platform.
        </p>
        <span class="last-updated">
          <Calendar :size="16" />
          Last Updated: January 15, 2024
        </span>
      </section>

      <!-- ==================== IMPORTANT NOTICE ==================== -->
      <section class="section container">
        <div class="notice-banner">
          <div class="icon" aria-hidden="true">
            <AlertTriangle :size="28" />
          </div>
          <div>
            <h2>Important Notice</h2>
            <p>
              By accessing or using Stream.Store, you acknowledge that you have read, understood,
              and agree to be bound by these Terms and Conditions.
            </p>
          </div>
        </div>
      </section>

      <!-- ==================== AGREEMENT OVERVIEW ==================== -->
      <section class="section container" aria-labelledby="agreement-heading">
        <div class="section-header">
          <h2 id="agreement-heading" class="section-title">Agreement Overview</h2>
        </div>
        <div class="grid grid-2">
          <article class="resp-card">
            <h3>
              <ScrollText :size="20" />
              Acceptance of Terms
            </h3>
            <p style="color: var(--text-muted); font-size: 0.93rem;">
              Your access to and use of Stream.Store is conditioned on your acceptance of and
              compliance with these Terms. These Terms apply to all visitors, users, and others
              who access or use the Service.
            </p>
          </article>
          <article class="resp-card">
            <h3>
              <User :size="20" />
              User Responsibilities
            </h3>
            <ul class="check-list">
              <li>Respect copyright and intellectual property laws</li>
              <li>Use the platform for personal, non-commercial purposes only</li>
              <li>Refrain from any misuse or illegal activities</li>
              <li>Not attempt to bypass any security measures</li>
              <li>Report any copyright violations you encounter</li>
            </ul>
          </article>
        </div>
      </section>

      <!-- ==================== COPYRIGHT COMPLIANCE ==================== -->
      <section class="section container" aria-labelledby="copyright-heading">
        <div class="section-header">
          <h2 id="copyright-heading" class="section-title">Copyright Compliance</h2>
          <p class="section-subtitle">Respecting Intellectual Property</p>
        </div>

        <div class="copyright-box">
          <p>
            Stream.Store is committed to respecting copyright laws and intellectual property rights.
            We provide translated content for <strong>educational and entertainment purposes only</strong>.
          </p>

          <h3 style="color: var(--white); font-size: 1.05rem; font-weight: 700; margin-bottom: 18px;">
            Copyright Holder Rights
          </h3>
          <p style="color: var(--text-muted); font-size: 0.93rem; margin-bottom: 20px;">
            If you are a copyright holder and believe your work has been used in a way that
            constitutes copyright infringement, please contact us immediately with:
          </p>

          <ul class="copyright-list">
            <li>Identification of the copyrighted work</li>
            <li>URL where the material appears</li>
            <li>Your contact information</li>
            <li>A statement of good faith belief</li>
          </ul>

          <div class="ownership-warning">
            <span class="icon" aria-hidden="true">
              <AlertCircle :size="26" />
            </span>
            <p>
              <strong>Important Notice:</strong> Stream.Store does not claim ownership of the content
              hosted on third-party platforms. We act as a <strong>directory service</strong> providing
              access to translated entertainment content.
            </p>
          </div>
        </div>
      </section>

      <!-- ==================== PLATFORM USAGE RULES ==================== -->
      <section class="section container" aria-labelledby="rules-heading">
        <div class="section-header">
          <h2 id="rules-heading" class="section-title">Platform Usage Rules</h2>
          <p class="section-subtitle">Clear guidelines for a safe and lawful community.</p>
        </div>
        <div class="grid grid-2">
          <!-- Permitted -->
          <article class="rules-card permitted">
            <h3>
              <CheckCircle2 :size="22" />
              Permitted Uses
            </h3>
            <ul class="rules-list">
              <li>Personal viewing of translated content</li>
              <li>Educational purposes</li>
              <li>Non-commercial entertainment</li>
              <li>Sharing links with friends and family</li>
            </ul>
          </article>

          <!-- Prohibited -->
          <article class="rules-card prohibited">
            <h3>
              <XCircle :size="22" />
              Prohibited Uses
            </h3>
            <ul class="rules-list">
              <li>Commercial redistribution of content</li>
              <li>Modifying or altering content</li>
              <li>Attempting to hack or disrupt service</li>
              <li>Using automated tools to scrape content</li>
              <li>Uploading malicious content or viruses</li>
            </ul>
          </article>
        </div>
      </section>

      <!-- ==================== LIMITATION OF LIABILITY ==================== -->
      <section class="section container" aria-labelledby="liability-heading">
        <div class="section-header">
          <h2 id="liability-heading" class="section-title">Limitation of Liability</h2>
          <p class="section-subtitle">Understanding the scope of our responsibility.</p>
        </div>
        <div class="grid grid-2">
          <article class="liability-card">
            <div class="liability-icon" aria-hidden="true">
              <FileText :size="28" />
            </div>
            <h3>Disclaimer of Warranties</h3>
            <p>
              Stream.Store provides content on an <strong>"as is"</strong> and
              <strong>"as available"</strong> basis. We make no warranties, expressed or implied,
              regarding the accuracy, completeness, or reliability of any content on our platform.
            </p>
          </article>
          <article class="liability-card">
            <div class="liability-icon" aria-hidden="true">
              <Scale :size="28" />
            </div>
            <h3>User Acknowledgment</h3>
            <p>
              You acknowledge and agree that your use of Stream.Store is at your
              <strong>sole risk</strong>. We shall not be liable for any direct, indirect,
              incidental, or consequential damages arising from your use of the platform.
            </p>
          </article>
        </div>
      </section>

      <!-- ==================== TERMS UPDATES ==================== -->
      <section class="section container" aria-labelledby="updates-heading">
        <div class="section-header">
          <h2 id="updates-heading" class="section-title">Terms Updates</h2>
          <p class="section-subtitle">Stream.Store reserves the right to update these terms at any time.</p>
        </div>

        <div class="updates-box">
          <h3>
            <RefreshCw :size="20" />
            Policy Revisions
          </h3>
          <p>
            We may modify or replace these Terms at our sole discretion. If a revision is material,
            we will provide at least <strong>30 days' notice</strong> prior to any new terms taking effect.
            What constitutes a material change will be determined at our sole discretion.
          </p>
          <p>
            <strong>Last Updated:</strong> January 15, 2024
          </p>
        </div>
      </section>

      <!-- ==================== YOUR RESPONSIBILITY ==================== -->
      <section class="section container" aria-labelledby="responsibility-heading">
        <div class="section-header">
          <h2 id="responsibility-heading" class="section-title">Your Responsibility</h2>
        </div>

        <div class="reminder-box">
          <h3>
            <Pin :size="22" />
            Review Periodically
          </h3>
          <p>
            It is your responsibility to review these Terms periodically for changes. Your continued
            use of Stream.Store following the posting of changes will mean that you accept and agree
            to the changes.
          </p>

          <h3 style="margin-top: 20px; font-size: 1.05rem;">By using Stream.Store, you confirm that:</h3>

          <ul class="confirmation-list">
            <li>You are at least 13 years old</li>
            <li>You agree to these Terms</li>
            <li>You will comply with all rules</li>
          </ul>

          <p class="final-note">
            If you do not agree with any part of these Terms, please do not use our platform.
          </p>
        </div>
      </section>

      <!-- ==================== CTA ==================== -->
      <section class="section container cta-section" aria-labelledby="cta-heading">
        <h2 id="cta-heading">Questions About These Terms?</h2>
        <p>If you have any questions about these Terms and Conditions, please contact us.</p>
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
  FileText,
  Calendar,
  AlertTriangle,
  ScrollText,
  User,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Scale,
  RefreshCw,
  Pin,
  MessageSquare,
  House,
} from "lucide-vue-next";
</script>

<style scoped>
/* ==================== BASE ==================== */
.terms-page {
  width: 100%;
  font-family: 'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif;
  color: #e5e0f0;
  line-height: 1.7;
  font-size: 16px;
  position: relative;
}

.terms-page::before {
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

.last-updated {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.25);
  color: #f59e0b;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 100px;
  margin-top: 20px;
}

/* ==================== IMPORTANT NOTICE BANNER ==================== */
.notice-banner {
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.1), rgba(245, 158, 11, 0.04));
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-left: 4px solid #f59e0b;
  border-radius: 14px;
  padding: 32px 36px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  position: relative;
  overflow: hidden;
}

.notice-banner .icon {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.06));
  border: 1px solid rgba(245, 158, 11, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f59e0b;
}

.notice-banner h2 {
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 8px;
}

.notice-banner p {
  color: #a89ec4;
  font-size: 0.98rem;
}

/* ==================== GRIDS ==================== */
.grid {
  display: grid;
  gap: 22px;
}

.grid-2 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }

/* ==================== RESPONSIBILITY CARDS ==================== */
.resp-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 30px 28px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.resp-card::before {
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

.resp-card:hover {
  transform: translateY(-5px);
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.resp-card:hover::before {
  opacity: 1;
}

.resp-card h3 {
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.resp-card h3 svg {
  color: #8b5cf6;
}

.check-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.check-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: #a89ec4;
  font-size: 0.93rem;
}

.check-list li::before {
  content: '✓';
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  font-size: 0.75rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
}

/* ==================== COPYRIGHT SECTION ==================== */
.copyright-box {
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.08), rgba(245, 158, 11, 0.04));
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 40px;
}

.copyright-box > p {
  color: #a89ec4;
  font-size: 0.98rem;
  margin-bottom: 24px;
  max-width: 820px;
}

.copyright-list {
  list-style: none;
  display: grid;
  gap: 12px;
  margin-bottom: 28px;
}

.copyright-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 8px;
  padding: 16px 20px;
  color: #a89ec4;
  font-size: 0.93rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.copyright-list li:hover {
  border-color: rgba(139, 92, 246, 0.35);
  background: rgba(139, 92, 246, 0.05);
}

.copyright-list li::before {
  content: '•';
  color: #8b5cf6;
  font-weight: 900;
  font-size: 1.2rem;
  line-height: 1;
  flex-shrink: 0;
}

.ownership-warning {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-left: 4px solid #ef4444;
  border-radius: 8px;
  padding: 22px 26px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.ownership-warning .icon {
  flex-shrink: 0;
  color: #ef4444;
}

.ownership-warning p {
  color: #e5e0f0;
  font-size: 0.95rem;
  font-weight: 500;
}

.ownership-warning strong {
  color: #ef4444;
}

/* ==================== PERMITTED / PROHIBITED ==================== */
.rules-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 32px 28px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.rules-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.rules-card.permitted {
  border-top: 4px solid #10b981;
}

.rules-card.prohibited {
  border-top: 4px solid #ef4444;
}

.rules-card h3 {
  font-size: 1.15rem;
  font-weight: 800;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.rules-card.permitted h3 {
  color: #10b981;
}

.rules-card.prohibited h3 {
  color: #ef4444;
}

.rules-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rules-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: #a89ec4;
  font-size: 0.93rem;
}

.rules-card.permitted .rules-list li::before {
  content: '✓';
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  font-size: 0.75rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
}

.rules-card.prohibited .rules-list li::before {
  content: '✗';
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  font-size: 0.75rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
}

/* ==================== LIABILITY CARDS ==================== */
.liability-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 32px 28px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.liability-card:hover {
  transform: translateY(-5px);
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.liability-icon {
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

.liability-card h3 {
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.liability-card p {
  color: #a89ec4;
  font-size: 0.93rem;
}

/* ==================== TERMS UPDATES ==================== */
.updates-box {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 36px;
}

.updates-box h3 {
  color: #ffffff;
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.updates-box h3 svg {
  color: #8b5cf6;
}

.updates-box p {
  color: #a89ec4;
  font-size: 0.95rem;
  margin-bottom: 14px;
}

.updates-box p:last-child {
  margin-bottom: 0;
}

.updates-box strong {
  color: #e5e0f0;
}

/* ==================== RESPONSIBILITY REMINDER ==================== */
.reminder-box {
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.08), rgba(245, 158, 11, 0.04));
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 36px;
  text-align: center;
}

.reminder-box h3 {
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.reminder-box > p {
  color: #a89ec4;
  font-size: 0.98rem;
  max-width: 720px;
  margin: 0 auto 28px;
}

.confirmation-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
  margin-bottom: 28px;
}

.confirmation-list li {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.25);
  color: #10b981;
  font-size: 0.88rem;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 100px;
}

.confirmation-list li::before {
  content: '✓';
  font-weight: 800;
}

.final-note {
  color: #a89ec4;
  font-size: 0.93rem;
  font-style: italic;
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
  .notice-banner,
  .copyright-box,
  .updates-box,
  .reminder-box {
    padding: 28px 22px;
  }
  .notice-banner {
    flex-direction: column;
    gap: 16px;
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
  .resp-card,
  .rules-card,
  .liability-card {
    padding: 24px 20px;
  }
  .confirmation-list li {
    width: 100%;
    justify-content: center;
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