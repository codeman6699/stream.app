<template>
  <div class="contact-page">
    <main>
      <!-- ==================== HERO ==================== -->
      <section class="hero container">
        <span class="hero-badge">
          <MessageSquare :size="16" />
          Support &amp; Contact
        </span>
        <h1>We're Here to <span class="gradient-text">Help You</span></h1>
        <p class="tagline">
          Ukeneye ubundi bufasha cg igitekerezo watwandikira — reach out any time.
        </p>
        <p class="sub-tagline">
          Whether you need technical help, have a suggestion, or want to report an issue — our team is ready.
        </p>
      </section>

      <!-- ==================== CONTACT METHODS ==================== -->
      <section class="section container" aria-labelledby="contact-heading">
        <div class="section-header">
          <h2 id="contact-heading" class="section-title">When You Need Another Help</h2>
          <p class="section-subtitle">Choose the channel that works best for you.</p>
        </div>
        <div class="contact-grid">
          <!-- WhatsApp -->
          <article class="contact-card">
            <div class="contact-icon whatsapp" aria-hidden="true">
              <MessageCircle :size="30" />
            </div>
            <h3>WhatsApp</h3>
            <p>Chat with our support team directly for quick answers.</p>
            <a href="https://wa.me/250789358535" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
              <MessageCircle :size="18" />
              Open WhatsApp
            </a>
          </article>

          <!-- Email -->
          <article class="contact-card">
            <div class="contact-icon email" aria-hidden="true">
              <Mail :size="30" />
            </div>
            <h3>Email</h3>
            <p>Send us an email for detailed inquiries and copyright matters.</p>
            <a href="mailto:support@stream.store" class="btn btn-primary">
              <Send :size="18" />
              Send Email
            </a>
          </article>

          <!-- Phone -->
          <article class="contact-card">
            <div class="contact-icon phone" aria-hidden="true">
              <Phone :size="30" />
            </div>
            <h3>Call Support</h3>
            <p>Available during business hours for immediate assistance.</p>
            <a href="tel:+250789358535" class="btn btn-outline">
              <Phone :size="18" />
              +250 789 358 535
            </a>
          </article>
        </div>
      </section>

      <!-- ==================== COPYRIGHT INFORMATION ==================== -->
      <section class="section container" aria-labelledby="copyright-heading">
        <div class="section-header">
          <h2 id="copyright-heading" class="section-title">Copyright Information</h2>
          <p class="section-subtitle">
            Stream.Store respects the intellectual property rights of others.
          </p>
        </div>
        <div class="notice-box">
          <p>
            If you believe that your copyrighted material has been used in a way that constitutes
            copyright infringement, please contact us with the following information:
          </p>

          <ol class="steps-list">
            <li>
              <span class="step-num" aria-hidden="true">1</span>
              <div class="step-content">
                <h4>Identification of the Copyrighted Work</h4>
                <p>Provide details about the copyrighted work you believe has been infringed.</p>
              </div>
            </li>
            <li>
              <span class="step-num" aria-hidden="true">2</span>
              <div class="step-content">
                <h4>The URL Where the Material Is Located</h4>
                <p>Include the exact URL(s) where the allegedly infringing material appears.</p>
              </div>
            </li>
            <li>
              <span class="step-num" aria-hidden="true">3</span>
              <div class="step-content">
                <h4>Your Contact Details</h4>
                <p>Your name, address, telephone number, and email address.</p>
              </div>
            </li>
            <li>
              <span class="step-num" aria-hidden="true">4</span>
              <div class="step-content">
                <h4>A Statement That the Information Provided Is Accurate</h4>
                <p>Include a statement that you have a good faith belief that use of the material is not authorized by the copyright owner.</p>
              </div>
            </li>
          </ol>

          <div class="removal-highlight">
            <h4>
              <CheckCircle2 :size="20" />
              And We Will Remove It
            </h4>
            <p>
              Upon receiving a valid copyright infringement notice with all required information,
              we will promptly investigate and remove the infringing material from our platform.
              We are committed to protecting intellectual property rights and maintaining a lawful
              content-sharing environment.
            </p>
          </div>
        </div>
      </section>

      <!-- ==================== OTHER WAYS TO GET SUPPORT ==================== -->
      <section class="section container" aria-labelledby="support-heading">
        <div class="section-header">
          <h2 id="support-heading" class="section-title">Other Ways to Get Support</h2>
          <p class="section-subtitle">Know what to expect when you reach out.</p>
        </div>
        <div class="info-grid">
          <!-- Response Time -->
          <article class="info-card">
            <div class="info-card-header">
              <div class="icon" aria-hidden="true">
                <Timer :size="22" />
              </div>
              <h3>Response Time</h3>
            </div>
            <ul class="info-list">
              <li>
                <span class="label">WhatsApp</span>
                <span class="value highlight">Within 24 hours</span>
              </li>
              <li>
                <span class="label">Email</span>
                <span class="value">24–48 hours</span>
              </li>
              <li>
                <span class="label">Phone</span>
                <span class="value highlight">Immediate during business hours</span>
              </li>
            </ul>
          </article>

          <!-- Business Hours -->
          <article class="info-card">
            <div class="info-card-header">
              <div class="icon" aria-hidden="true">
                <Clock :size="22" />
              </div>
              <h3>Business Hours</h3>
            </div>
            <ul class="info-list">
              <li>
                <span class="label">Monday – Friday</span>
                <span class="value">8:00 AM – 6:00 PM</span>
              </li>
              <li>
                <span class="label">Saturday</span>
                <span class="value">9:00 AM – 4:00 PM</span>
              </li>
              <li>
                <span class="label">Sunday</span>
                <span class="value">Emergency support only</span>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <!-- ==================== CTA ==================== -->
      <section class="section container cta-section" aria-labelledby="cta-heading">
        <h2 id="cta-heading">Still Have Questions?</h2>
        <p>We'd love to hear from you. Reach out and we'll get back to you as soon as possible.</p>
        <div class="btn-group">
          <a href="https://wa.me/250789358535" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
            <MessageCircle :size="18" />
            Chat on WhatsApp
          </a>
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
  MessageSquare,
  MessageCircle,
  Mail,
  Send,
  Phone,
  CheckCircle2,
  Timer,
  Clock,
  House,
} from "lucide-vue-next";
</script>

<style scoped>
/* ==================== BASE ==================== */
.contact-page {
  width: 100%;
  font-family: 'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif;
  color: #e5e0f0;
  line-height: 1.7;
  font-size: 16px;
  position: relative;
}

.contact-page::before {
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
  max-width: 640px;
  margin: 0 auto 12px;
}

.hero .sub-tagline {
  font-size: 0.95rem;
  color: #a89ec4;
  max-width: 560px;
  margin: 0 auto;
  font-style: italic;
}

/* ==================== CONTACT CARDS ==================== */
.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 22px;
}

.contact-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 34px 28px;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact-card::before {
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

.contact-card:hover {
  transform: translateY(-6px);
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.contact-card:hover::before {
  opacity: 1;
}

.contact-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  border: 1px solid rgba(139, 92, 246, 0.18);
}

.contact-icon.whatsapp {
  background: linear-gradient(135deg, rgba(37, 211, 102, 0.18), rgba(37, 211, 102, 0.06));
  color: #25d366;
}

.contact-icon.email {
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.25), rgba(139, 92, 246, 0.1));
  color: #8b5cf6;
}

.contact-icon.phone {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.06));
  color: #f59e0b;
}

.contact-card h3 {
  color: #ffffff;
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.contact-card p {
  color: #a89ec4;
  font-size: 0.92rem;
  margin-bottom: 22px;
  flex-grow: 1;
}

.contact-card .btn {
  margin-top: auto;
}

/* ==================== BUTTONS ==================== */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 26px;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: none;
  font-family: inherit;
  white-space: nowrap;
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

.btn-whatsapp {
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: #ffffff;
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.3);
}

.btn-whatsapp:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(37, 211, 102, 0.45);
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

/* ==================== NOTICE BOX ==================== */
.notice-box {
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.08), rgba(245, 158, 11, 0.04));
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 44px 40px;
}

.notice-box > p {
  color: #a89ec4;
  font-size: 0.98rem;
  margin-bottom: 28px;
  max-width: 820px;
}

.notice-box strong {
  color: #e5e0f0;
}

.steps-list {
  list-style: none;
  display: grid;
  gap: 16px;
  margin-bottom: 28px;
}

.steps-list li {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 8px;
  padding: 20px 22px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.steps-list li:hover {
  border-color: rgba(139, 92, 246, 0.35);
  background: rgba(139, 92, 246, 0.05);
}

.step-num {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6d28d9, #8b5cf6);
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(109, 40, 217, 0.35);
}

.step-content h4 {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.step-content p {
  color: #a89ec4;
  font-size: 0.9rem;
  line-height: 1.6;
}

.removal-highlight {
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-left: 4px solid #10b981;
  border-radius: 8px;
  padding: 22px 26px;
  margin-top: 8px;
}

.removal-highlight h4 {
  color: #10b981;
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.removal-highlight p {
  color: #a89ec4;
  font-size: 0.93rem;
}

/* ==================== INFO GRID ==================== */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 22px;
}

.info-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 32px 28px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.info-card:hover {
  transform: translateY(-5px);
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.info-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 22px;
}

.info-card-header .icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.25), rgba(139, 92, 246, 0.1));
  border: 1px solid rgba(139, 92, 246, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b5cf6;
}

.info-card-header h3 {
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
}

.info-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.info-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(139, 92, 246, 0.1);
  font-size: 0.92rem;
}

.info-list li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.info-list .label {
  color: #a89ec4;
  font-weight: 500;
}

.info-list .value {
  color: #ffffff;
  font-weight: 600;
  text-align: right;
}

.info-list .value.highlight {
  color: #10b981;
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

/* ==================== RESPONSIVE ==================== */
@media (max-width: 768px) {
  .section {
    padding: 52px 0;
  }
  .notice-box {
    padding: 28px 22px;
  }
  .hero {
    padding: 64px 0 44px;
  }
  .info-list li {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  .info-list .value {
    text-align: left;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 18px;
  }
  .btn {
    width: 100%;
    justify-content: center;
  }
  .contact-card {
    padding: 26px 20px;
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