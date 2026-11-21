<template>
  <div class="disclaimer-page">
    <main>
      <!-- ==================== HERO ==================== -->
      <section class="hero container">
        <span class="hero-badge">
          <AlertTriangle :size="16" />
          Disclaimer
        </span>
        <h1>Important <span class="gradient-text">Legal Information</span></h1>
        <p class="tagline">
          Stream.Store provides translated movies and series for free. We are not responsible
          for the accuracy of translations or third-party content.
        </p>
      </section>

      <!-- ==================== IMPORTANT BANNER ==================== -->
      <section class="section container">
        <div class="important-banner">
          <div class="icon" aria-hidden="true">
            <AlertCircle :size="28" />
          </div>
          <div>
            <h2>General Disclaimer</h2>
            <p>
              Stream.Store provides access to translated movies and series for free. We strive
              to provide accurate translations, but we cannot guarantee the complete accuracy
              or quality of all translations available on our platform.
            </p>
          </div>
        </div>
      </section>

      <!-- ==================== DISCLAIMER POINTS ==================== -->
      <section class="section container" aria-labelledby="points-heading">
        <div class="section-header">
          <h2 id="points-heading" class="section-title">Key Points of Disclaimer</h2>
          <p class="section-subtitle">Understanding the scope of our content and services.</p>
        </div>
        <div class="grid grid-2">
          <!-- No Warranties -->
          <article class="disclaimer-card">
            <div class="card-icon" aria-hidden="true">
              <FileText :size="24" />
            </div>
            <h3>No Warranties</h3>
            <p>
              All content is provided <strong>"as is"</strong> without any warranties, express or implied.
              We disclaim all warranties including, without limitation, implied warranties of
              merchantability and fitness for a particular purpose.
            </p>
          </article>

          <!-- Viewer Discretion -->
          <article class="disclaimer-card">
            <div class="card-icon" aria-hidden="true">
              <Eye :size="24" />
            </div>
            <h3>Viewer Discretion</h3>
            <p>
              Some content may not be suitable for all audiences. <strong>Viewer discretion is advised.</strong>
              Parents and guardians are responsible for monitoring their children's access to content
              on our platform.
            </p>
          </article>

          <!-- Technical Issues -->
          <article class="disclaimer-card">
            <div class="card-icon" aria-hidden="true">
              <Wrench :size="24" />
            </div>
            <h3>Technical Issues</h3>
            <p>
              We are not responsible for broken links, server issues, or technical problems with
              third-party hosting services. Availability of content is subject to change without notice.
            </p>
          </article>

          <!-- Content Accuracy -->
          <article class="disclaimer-card">
            <div class="card-icon" aria-hidden="true">
              <FileEdit :size="24" />
            </div>
            <h3>Content Accuracy</h3>
            <p>
              We are not responsible for errors, omissions, or inaccuracies in translations.
              Content is provided for educational and entertainment purposes only.
            </p>
          </article>
        </div>

        <!-- Warning Callout -->
        <div class="warning-callout" style="margin-top: 24px;">
          <span class="icon" aria-hidden="true">
            <AlertTriangle :size="22" />
          </span>
          <p>We are not responsible for errors, omissions, or inaccuracies in translations.</p>
        </div>
      </section>

      <!-- ==================== THIRD-PARTY CONTENT ==================== -->
      <section class="section container" aria-labelledby="third-party-heading">
        <div class="section-header">
          <h2 id="third-party-heading" class="section-title">Third-Party Content</h2>
        </div>
        <div class="copyright-banner">
          <div class="icon" aria-hidden="true">
            <Link :size="28" />
          </div>
          <div>
            <h3>Directory Service Notice</h3>
            <p>
              Stream.Store acts as a <strong>directory service</strong> that links to content hosted on
              third-party platforms. We do <strong>not host the actual video files</strong> on our servers.
              All trademarks and copyrights belong to their respective owners. Content is provided
              for educational and entertainment purposes only.
            </p>
          </div>
        </div>
      </section>

      <!-- ==================== USER RESPONSIBILITIES ==================== -->
      <section class="section container" aria-labelledby="user-resp-heading">
        <div class="section-header">
          <h2 id="user-resp-heading" class="section-title">User Responsibilities</h2>
          <p class="section-subtitle">
            As a user of Stream.Store, you acknowledge and agree to the following responsibilities:
          </p>
        </div>
        <div class="grid grid-2">
          <article class="responsibility-card">
            <span class="number" aria-hidden="true">1</span>
            <div>
              <h3>Content Evaluation</h3>
              <p>You are responsible for evaluating the accuracy, completeness, and usefulness of any content available through our platform.</p>
            </div>
          </article>
          <article class="responsibility-card">
            <span class="number" aria-hidden="true">2</span>
            <div>
              <h3>Legal Compliance</h3>
              <p>You must comply with all applicable laws regarding the content you access through our platform.</p>
            </div>
          </article>
          <article class="responsibility-card">
            <span class="number" aria-hidden="true">3</span>
            <div>
              <h3>Personal Risk</h3>
              <p>Your use of any information or materials on Stream.Store is entirely at your own risk.</p>
            </div>
          </article>
          <article class="responsibility-card">
            <span class="number" aria-hidden="true">4</span>
            <div>
              <h3>System Security</h3>
              <p>You are responsible for implementing sufficient procedures to protect your own computer systems from viruses or malware.</p>
            </div>
          </article>
        </div>
      </section>

      <!-- ==================== CONTENT REPORTING ==================== -->
      <section class="section container" aria-labelledby="report-heading">
        <div class="section-header">
          <h2 id="report-heading" class="section-title">Content Reporting</h2>
          <p class="section-subtitle">
            Users are encouraged to report inappropriate content for review.
          </p>
        </div>

        <div class="report-box">
          <p>
            If you encounter content that you believe violates our policies, copyright laws,
            or is inappropriate, please report it immediately.
          </p>

          <h3 style="color: var(--white); font-size: 1.05rem; font-weight: 700; margin-bottom: 18px;">
            What to Report:
          </h3>
          <ul class="report-list">
            <li>Copyright infringement</li>
            <li>Inappropriate or offensive content</li>
            <li>Broken or malicious links</li>
            <li>Content that violates local laws</li>
          </ul>

          <div style="text-align: center;">
            <router-link to="/contact" class="btn btn-warning">
              <Siren :size="18" />
              Report Now
            </router-link>
          </div>
        </div>

        <div class="commitment-box" style="margin-top: 24px;">
          <span class="icon" aria-hidden="true">
            <Handshake :size="26" />
          </span>
          <p>
            <strong>Our Commitment:</strong> We take all reports seriously and will review reported content
            promptly. We reserve the right to remove any content that violates our policies or applicable laws.
          </p>
        </div>
      </section>

      <!-- ==================== LIMITATION OF LIABILITY ==================== -->
      <section class="section container" aria-labelledby="liability-heading">
        <div class="section-header">
          <h2 id="liability-heading" class="section-title">Limitation of Liability</h2>
          <p class="section-subtitle">No Liability Clause</p>
        </div>

        <div class="important-banner" style="margin-bottom: 28px;">
          <div class="icon" aria-hidden="true">
            <Scale :size="28" />
          </div>
          <div>
            <h2>No Liability Clause</h2>
            <p>
              Under no circumstances shall Stream.Store, its affiliates, or their respective directors,
              officers, employees, or agents be liable for any direct, indirect, incidental, special,
              consequential, or punitive damages resulting from the following:
            </p>
          </div>
        </div>

        <div class="liability-grid">
          <!-- Content Related -->
          <article class="liability-card">
            <h3>
              <MonitorPlay :size="20" />
              Content Related
            </h3>
            <ul class="liability-list">
              <li>Your use or inability to use our service</li>
              <li>Any content obtained through our platform</li>
              <li>Translation inaccuracies</li>
            </ul>
          </article>

          <!-- Technical Issues -->
          <article class="liability-card">
            <h3>
              <Wrench :size="20" />
              Technical Issues
            </h3>
            <ul class="liability-list">
              <li>Service interruptions or delays</li>
              <li>Viruses or malware from third-party sites</li>
              <li>Data loss or corruption</li>
            </ul>
          </article>
        </div>
      </section>

      <!-- ==================== ACKNOWLEDGMENT ==================== -->
      <section class="section container" aria-labelledby="acknowledgment-heading">
        <div class="section-header">
          <h2 id="acknowledgment-heading" class="section-title">By Using Stream.Store, You Acknowledge That:</h2>
        </div>

        <div class="acknowledgment-box">
          <ul class="acknowledgment-list">
            <li>
              <CheckCircle2 :size="18" class="check-icon" />
              You have read and understood this Disclaimer
            </li>
            <li>
              <CheckCircle2 :size="18" class="check-icon" />
              You accept all risks associated with using our platform
            </li>
            <li>
              <CheckCircle2 :size="18" class="check-icon" />
              You will report any inappropriate content you encounter
            </li>
            <li>
              <CheckCircle2 :size="18" class="check-icon" />
              You understand that content is provided for educational and entertainment purposes only
            </li>
          </ul>
        </div>
      </section>

      <!-- ==================== RELATED DOCUMENTS ==================== -->
      <section class="section container" aria-labelledby="related-heading">
        <div class="section-header">
          <h2 id="related-heading" class="section-title">Related Documents</h2>
          <p class="section-subtitle">Explore our other legal and policy pages.</p>
        </div>

        <div class="related-docs">
          <router-link to="/terms" class="related-card">
            <div class="related-icon" aria-hidden="true">
              <FileText :size="26" />
            </div>
            <h4>Terms &amp; Conditions</h4>
            <p>Platform usage agreement and rules</p>
          </router-link>
          <router-link to="/privacy" class="related-card">
            <div class="related-icon" aria-hidden="true">
              <Lock :size="26" />
            </div>
            <h4>Privacy Policy</h4>
            <p>How we protect your data</p>
          </router-link>
        </div>
      </section>

      <!-- ==================== CTA ==================== -->
      <section class="section container cta-section" aria-labelledby="cta-heading">
        <h2 id="cta-heading">Need Help?</h2>
        <p>Our support team is ready to assist with any questions about this disclaimer.</p>
        <div class="btn-group">
          <router-link to="/contact" class="btn btn-primary">
            <MessageSquare :size="18" />
            Contact Support
          </router-link>
          <router-link to="/" class="btn btn-outline">
            <House :size="18" />
            Return Home
          </router-link>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import {
  AlertTriangle,
  AlertCircle,
  FileText,
  Eye,
  Wrench,
  FileEdit,
  Link,
  Siren,
  Handshake,
  Scale,
  MonitorPlay,
  CheckCircle2,
  Lock,
  MessageSquare,
  House,
} from "lucide-vue-next";
</script>

<style scoped>
/* ==================== BASE ==================== */
.disclaimer-page {
  width: 100%;
  font-family: 'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif;
  color: #e5e0f0;
  line-height: 1.7;
  font-size: 16px;
  position: relative;
}

.disclaimer-page::before {
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
  color: #f59e0b;
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
  background: linear-gradient(135deg, #f59e0b, #ef4444);
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

/* ==================== IMPORTANT BANNER ==================== */
.important-banner {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(239, 68, 68, 0.05));
  border: 1px solid rgba(245, 158, 11, 0.25);
  border-left: 4px solid #f59e0b;
  border-radius: 14px;
  padding: 32px 36px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  position: relative;
  overflow: hidden;
}

.important-banner .icon {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(245, 158, 11, 0.08));
  border: 1px solid rgba(245, 158, 11, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f59e0b;
}

.important-banner h2 {
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 8px;
}

.important-banner p {
  color: #a89ec4;
  font-size: 0.98rem;
}

/* ==================== GRIDS ==================== */
.grid {
  display: grid;
  gap: 22px;
}

.grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

/* ==================== DISCLAIMER CARDS ==================== */
.disclaimer-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 30px 28px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.disclaimer-card::before {
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

.disclaimer-card:hover {
  transform: translateY(-5px);
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.disclaimer-card:hover::before {
  opacity: 1;
}

.disclaimer-card .card-icon {
  width: 52px;
  height: 52px;
  border-radius: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b5cf6;
  margin-bottom: 18px;
  border: 1px solid rgba(139, 92, 246, 0.18);
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.25), rgba(139, 92, 246, 0.1));
}

.disclaimer-card h3 {
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.disclaimer-card p {
  color: #a89ec4;
  font-size: 0.93rem;
}

.disclaimer-card p + p {
  margin-top: 10px;
}

/* ==================== WARNING CALLOUT ==================== */
.warning-callout {
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-left: 4px solid #f59e0b;
  border-radius: 8px;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 18px;
}

.warning-callout .icon {
  flex-shrink: 0;
  color: #f59e0b;
}

.warning-callout p {
  color: #e5e0f0;
  font-size: 0.92rem;
  font-weight: 500;
}

/* ==================== COPYRIGHT BANNER ==================== */
.copyright-banner {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(245, 158, 11, 0.04));
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-left: 4px solid #ef4444;
  border-radius: 14px;
  padding: 32px 36px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.copyright-banner .icon {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.06));
  border: 1px solid rgba(239, 68, 68, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ef4444;
}

.copyright-banner h3 {
  color: #ffffff;
  font-size: 1.15rem;
  font-weight: 800;
  margin-bottom: 8px;
}

.copyright-banner p {
  color: #a89ec4;
  font-size: 0.95rem;
}

/* ==================== USER RESPONSIBILITIES ==================== */
.responsibility-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 28px 26px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  gap: 18px;
  align-items: flex-start;
}

.responsibility-card:hover {
  transform: translateY(-5px);
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.responsibility-card .number {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6d28d9, #8b5cf6);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(109, 40, 217, 0.35);
}

.responsibility-card h3 {
  color: #ffffff;
  font-size: 1.02rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.responsibility-card p {
  color: #a89ec4;
  font-size: 0.9rem;
}

/* ==================== REPORT SECTION ==================== */
.report-box {
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.08), rgba(16, 185, 129, 0.04));
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 40px;
}

.report-box > p {
  color: #a89ec4;
  font-size: 0.98rem;
  margin-bottom: 24px;
  max-width: 820px;
}

.report-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
  margin-bottom: 28px;
}

.report-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 8px;
  padding: 16px 20px;
  color: #a89ec4;
  font-size: 0.92rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.report-list li:hover {
  border-color: rgba(139, 92, 246, 0.35);
  background: rgba(139, 92, 246, 0.05);
}

.report-list li::before {
  content: '!';
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
  font-size: 0.8rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
}

/* ==================== COMMITMENT ==================== */
.commitment-box {
  background: rgba(16, 185, 129, 0.06);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-left: 4px solid #10b981;
  border-radius: 8px;
  padding: 22px 26px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.commitment-box .icon {
  flex-shrink: 0;
  color: #10b981;
}

.commitment-box p {
  color: #a89ec4;
  font-size: 0.93rem;
}

.commitment-box strong {
  color: #10b981;
}

/* ==================== LIABILITY SECTION ==================== */
.liability-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 22px;
}

.liability-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 30px 28px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-top: 4px solid #ef4444;
}

.liability-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.liability-card h3 {
  color: #ffffff;
  font-size: 1.08rem;
  font-weight: 700;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.liability-card h3 svg {
  color: #ef4444;
}

.liability-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.liability-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #a89ec4;
  font-size: 0.92rem;
}

.liability-list li::before {
  content: '•';
  color: #ef4444;
  font-weight: 900;
  font-size: 1.2rem;
  line-height: 1;
}

/* ==================== ACKNOWLEDGMENT ==================== */
.acknowledgment-box {
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.08), rgba(245, 158, 11, 0.04));
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 40px;
  text-align: center;
}

.acknowledgment-box h3 {
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 24px;
}

.acknowledgment-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 720px;
  margin: 0 auto;
}

.acknowledgment-list li {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 8px;
  padding: 18px 22px;
  color: #a89ec4;
  font-size: 0.93rem;
  text-align: left;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.acknowledgment-list li:hover {
  border-color: rgba(139, 92, 246, 0.35);
  background: rgba(139, 92, 246, 0.05);
}

.check-icon {
  flex-shrink: 0;
  color: #10b981;
  margin-top: 1px;
}

/* ==================== RELATED DOCS ==================== */
.related-docs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
}

.related-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 26px 24px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.related-card:hover {
  transform: translateY(-5px);
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.related-card .related-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.25), rgba(139, 92, 246, 0.1));
  border: 1px solid rgba(139, 92, 246, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b5cf6;
}

.related-card h4 {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
}

.related-card p {
  color: #a89ec4;
  font-size: 0.85rem;
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

.btn-warning {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #ffffff;
  box-shadow: 0 8px 24px rgba(245, 158, 11, 0.35);
}

.btn-warning:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(245, 158, 11, 0.5);
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
  .important-banner,
  .copyright-banner {
    flex-direction: column;
    gap: 16px;
    padding: 28px 22px;
  }
  .report-box,
  .acknowledgment-box {
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
  .disclaimer-card,
  .liability-card,
  .responsibility-card {
    padding: 24px 20px;
  }
  .responsibility-card {
    flex-direction: column;
    gap: 12px;
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