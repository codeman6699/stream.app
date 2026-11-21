<template>
  <div class="about-page">
    <main>
      <!-- ==================== HERO ==================== -->
      <section class="hero container">
        <span class="hero-badge">
          <Clapperboard :size="16" />
          About Us
        </span>
        <h1>Your Gateway to <span class="gradient-text">Agasobanuye</span> Entertainment</h1>
        <p class="tagline">
          Free streaming and download of Kinyarwanda-translated movies and series — anywhere, anytime, for everyone.
        </p>
      </section>

      <!-- ==================== WELCOME & MISSION ==================== -->
      <section class="section container" aria-labelledby="mission-heading">
        <div class="welcome-box">
          <h2 id="mission-heading" class="section-title">Welcome to Stream.Store</h2>
          <p>
            We are your premier destination for Agasobanuye movies and series translated into Kinyarwanda,
            available for free streaming and download. Wherever you are in the world, Stream.Store brings
            the best of translated entertainment right to your fingertips.
          </p>
          <p>
            <strong class="mission-highlight">Our Mission:</strong> Making entertainment accessible to everyone,
            everywhere. At Stream.Store, our mission is simple — to make entertainment accessible to everyone
            by providing free access to high-quality Kinyarwanda-translated movies and series. Whether you are
            looking for action, drama, romance, cartoons, or Indian films, Stream.Store has something for everyone.
          </p>
        </div>
      </section>

      <!-- ==================== WHAT WE OFFER ==================== -->
      <section class="section container" aria-labelledby="offer-heading">
        <div class="section-header">
          <h2 id="offer-heading" class="section-title">What We Offer</h2>
          <p class="section-subtitle">Everything you need for the ultimate translated entertainment experience.</p>
        </div>
        <div class="grid grid-3">
          <article class="card">
            <div class="card-icon" aria-hidden="true">
              <Film :size="24" />
            </div>
            <h3>Vast Collection</h3>
            <p>A vast collection of translated movies and series across all genres.</p>
          </article>
          <article class="card">
            <div class="card-icon" aria-hidden="true">
              <Unlock :size="24" />
            </div>
            <h3>Free Access</h3>
            <p>Free access to all content with no subscription fees or hidden charges.</p>
          </article>
          <article class="card">
            <div class="card-icon" aria-hidden="true">
              <Clapperboard :size="24" />
            </div>
            <h3>Movie Trailers</h3>
            <p>Movie trailers to give you a quick summary of what to expect.</p>
          </article>
          <article class="card">
            <div class="card-icon" aria-hidden="true">
              <Radio :size="24" />
            </div>
            <h3>Seamless Streaming</h3>
            <p>Seamless streaming experience through our partner websites.</p>
          </article>
          <article class="card">
            <div class="card-icon" aria-hidden="true">
              <Download :size="24" />
            </div>
            <h3>Download Options</h3>
            <p>Download options for offline viewing of your favorite movies and series.</p>
          </article>
          <article class="card">
            <div class="card-icon" aria-hidden="true">
              <Compass :size="24" />
            </div>
            <h3>User-Friendly</h3>
            <p>Easy navigation and search to find exactly what you want.</p>
          </article>
        </div>
      </section>

      <!-- ==================== CATEGORIES ==================== -->
      <section class="section container" aria-labelledby="categories-heading">
        <div class="section-header">
          <h2 id="categories-heading" class="section-title">Our Categories</h2>
          <p class="section-subtitle">Stream.Store offers a variety of categories to cater to every viewer's preference.</p>
        </div>
        <div class="grid grid-3">
          <article class="card category-card">
            <div class="category-icon" aria-hidden="true">
              <Zap :size="24" />
            </div>
            <div>
              <h3>Action</h3>
              <p>High-energy movies with intense sequences.</p>
            </div>
          </article>
          <article class="card category-card">
            <div class="category-icon" aria-hidden="true">
              <Theater :size="24" />
            </div>
            <div>
              <h3>Indian Films</h3>
              <p>Bollywood and regional Indian movies.</p>
            </div>
          </article>
          <article class="card category-card">
            <div class="category-icon" aria-hidden="true">
              <Cat :size="24" />
            </div>
            <div>
              <h3>Cartoons</h3>
              <p>Animated films for kids and families.</p>
            </div>
          </article>
          <article class="card category-card">
            <div class="category-icon" aria-hidden="true">
              <Heart :size="24" />
            </div>
            <div>
              <h3>Romantic Movies</h3>
              <p>Heartfelt love stories.</p>
            </div>
          </article>
          <article class="card category-card">
            <div class="category-icon" aria-hidden="true">
              <Clapperboard :size="24" />
            </div>
            <div>
              <h3>Drama</h3>
              <p>Emotional and thought-provoking narratives.</p>
            </div>
          </article>
          <article class="card category-card">
            <div class="category-icon" aria-hidden="true">
              <Tv :size="24" />
            </div>
            <div>
              <h3>Series</h3>
              <p>Binge-worthy translated shows.</p>
            </div>
          </article>
          <article class="card category-card">
            <div class="category-icon" aria-hidden="true">
              <Smile :size="24" />
            </div>
            <div>
              <h3>Comedy</h3>
              <p>Laugh-out-loud hilarious movies.</p>
            </div>
          </article>
          <article class="card category-card">
            <div class="category-icon" aria-hidden="true">
              <Ghost :size="24" />
            </div>
            <div>
              <h3>Horror</h3>
              <p>Spooky and thrilling films.</p>
            </div>
          </article>
          <article class="card category-card">
            <div class="category-icon" aria-hidden="true">
              <Swords :size="24" />
            </div>
            <div>
              <h3>War Films</h3>
              <p>Historical and action-packed war movies.</p>
            </div>
          </article>
        </div>
      </section>

      <!-- ==================== HOW IT WORKS ==================== -->
      <section class="section container" aria-labelledby="how-heading">
        <div class="section-header">
          <h2 id="how-heading" class="section-title">How It Works</h2>
          <p class="section-subtitle">Get started in three simple steps.</p>
        </div>
        <div class="steps">
          <article class="step">
            <div class="step-number" aria-hidden="true">1</div>
            <h3>Browse</h3>
            <p>Explore our collection by genre or search for your favorite titles.</p>
          </article>
          <article class="step">
            <div class="step-number" aria-hidden="true">2</div>
            <h3>Select</h3>
            <p>Choose your preferred movie or series from our extensive library.</p>
          </article>
          <article class="step">
            <div class="step-number" aria-hidden="true">3</div>
            <h3>Watch or Download</h3>
            <p>Stream the full movie online or download it for offline viewing.</p>
          </article>
        </div>
      </section>

      <!-- ==================== WHY CHOOSE ==================== -->
      <section class="section container" aria-labelledby="why-heading">
        <div class="section-header">
          <h2 id="why-heading" class="section-title">Why Choose Stream.Store?</h2>
          <p class="section-subtitle">
            Stream.Store stands out as a trusted platform for translated entertainment in Kinyarwanda. Here's why:
          </p>
        </div>
        <div class="grid grid-2">
          <article class="card why-card">
            <h3><Users :size="20" /> Community Focus</h3>
            <p>We welcome everyone to join us in enjoying the best of Agasobanuye entertainment.</p>
          </article>
          <article class="card why-card">
            <h3><Globe :size="20" /> Global Access</h3>
            <p>Watch your favorite translated content from anywhere in the world.</p>
          </article>
          <article class="card why-card">
            <h3><BookOpen :size="20" /> Inclusive Library</h3>
            <p>A collection that caters to all age groups and preferences.</p>
          </article>
          <article class="card why-card">
            <h3><Gift :size="20" /> Free Content</h3>
            <p>All our movies and series are free to access.</p>
          </article>
        </div>
      </section>

      <!-- ==================== HOSTING & COPYRIGHT ==================== -->
      <section class="section container" aria-labelledby="copyright-heading">
        <div class="section-header">
          <h2 id="copyright-heading" class="section-title">Our Approach to Hosting & Copyright</h2>
        </div>
        <div class="notice-box">
          <h3><LinkIcon :size="20" /> Hosting</h3>
          <p>
            We collaborate with third-party platforms to host download links for the movies and series on
            Stream.Store. This helps us provide seamless streaming and downloading options.
          </p>
          <h3 style="margin-top: 28px;"><Copyright :size="20" /> Copyright Notice</h3>
          <p>
            If any link violates copyright laws or creates a concern, we encourage copyright holders to
            contact us immediately. We are committed to respecting intellectual property and will promptly
            remove any content that infringes copyrights.
          </p>
          <p>
            <strong>Stream.Store does not claim ownership of the hosted content.</strong> Our primary goal is to
            provide access to translated entertainment for educational and enjoyment purposes only, without
            intending to violate copyright laws.
          </p>
        </div>
      </section>

      <!-- ==================== CTA / CONTACT ==================== -->
      <section class="section container cta-section" aria-labelledby="cta-heading">
        <h2 id="cta-heading">Have Questions or Suggestions?</h2>
        <p>Feel free to contact us. We'd love to hear from you!</p>
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
  Clapperboard,
  Film,
  Unlock,
  Radio,
  Download,
  Compass,
  Zap,
  Theater,
  Cat,
  Heart,
  Tv,
  Smile,
  Ghost,
  Swords,
  Users,
  Globe,
  BookOpen,
  Gift,
  Link as LinkIcon,
  Copyright,
  MessageSquare,
  House
} from "lucide-vue-next";
</script>

<style scoped>
/* ==================== BASE ==================== */
.about-page {
  width: 100%;
  font-family: 'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif;
  color: #e5e0f0;
  line-height: 1.7;
  font-size: 16px;
  position: relative;
}

.about-page::before {
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
  padding: 90px 0 70px;
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
  font-size: clamp(2.1rem, 6vw, 3.6rem);
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
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: #a89ec4;
  max-width: 680px;
  margin: 0 auto 32px;
}

/* ==================== WELCOME / MISSION ==================== */
.welcome-box {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 40px;
  backdrop-filter: blur(10px);
  text-align: center;
}

.welcome-box p {
  color: #e5e0f0;
  font-size: 1.05rem;
  max-width: 820px;
  margin: 0 auto;
}

.welcome-box p + p {
  margin-top: 16px;
}

.mission-highlight {
  color: #f59e0b;
  font-weight: 700;
}

/* ==================== FEATURE GRID ==================== */
.grid {
  display: grid;
  gap: 20px;
}

.grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 28px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.card::before {
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

.card:hover {
  transform: translateY(-5px);
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.card:hover::before {
  opacity: 1;
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.25), rgba(139, 92, 246, 0.12));
  border: 1px solid rgba(139, 92, 246, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b5cf6;
  margin-bottom: 18px;
}

.card h3 {
  color: #ffffff;
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.card p {
  color: #a89ec4;
  font-size: 0.92rem;
  line-height: 1.6;
}

/* ==================== CATEGORIES ==================== */
.category-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 22px;
}

.category-icon {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.25), rgba(245, 158, 11, 0.1));
  border: 1px solid rgba(139, 92, 246, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b5cf6;
}

.category-card h3 {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.category-card p {
  color: #a89ec4;
  font-size: 0.88rem;
}

/* ==================== HOW IT WORKS ==================== */
.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}

.step {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 34px 28px;
  text-align: center;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.step:hover {
  transform: translateY(-5px);
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.step-number {
  width: 56px;
  height: 56px;
  margin: 0 auto 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6d28d9, #8b5cf6);
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(109, 40, 217, 0.4);
}

.step h3 {
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.step p {
  color: #a89ec4;
  font-size: 0.92rem;
}

/* ==================== WHY CHOOSE ==================== */
.why-card {
  text-align: left;
  border-left: 3px solid #8b5cf6;
}

.why-card h3 {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 8px;
}

/* ==================== NOTICE BOX ==================== */
.notice-box {
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.08), rgba(245, 158, 11, 0.04));
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 40px;
}

.notice-box h3 {
  color: #ffffff;
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.notice-box p {
  color: #a89ec4;
  font-size: 0.95rem;
  margin-bottom: 14px;
}

.notice-box p:last-child {
  margin-bottom: 0;
}

.notice-box strong {
  color: #e5e0f0;
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
  gap: 8px;
  padding: 14px 30px;
  border-radius: 100px;
  font-size: 0.95rem;
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
  box-shadow: 0 8px 24px rgba(109, 40, 217, 0.4);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(109, 40, 217, 0.55);
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
  .section { padding: 52px 0; }
  .welcome-box, .notice-box { padding: 28px 22px; }
  .hero { padding: 64px 0 48px; }
}

@media (max-width: 480px) {
  .container { padding: 0 18px; }
  .btn { width: 100%; justify-content: center; }
  .card { padding: 22px; }
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