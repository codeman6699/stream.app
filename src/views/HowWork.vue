<template>
  <div class="how-page">
    <main>
      <!-- ==================== HERO ==================== -->
      <section class="hero container">
        <span class="hero-badge">
          <BookOpen :size="16" />
          Complete Platform Guide
        </span>
        <h1>How to Use <span class="gradient-text">Stream.Store</span></h1>
        <p class="tagline">
          Your comprehensive guide to navigating, searching, and enjoying content on the Stream.Store platform.
        </p>
      </section>

      <!-- ==================== TABLE OF CONTENTS ==================== -->
      <section class="section container" style="padding-top: 0;">
        <nav class="toc" aria-label="Table of contents">
          <button @click="scrollTo('overview')" class="toc-link">
            <ClipboardList :size="16" /> Platform Overview
          </button>
          <button @click="scrollTo('features')" class="toc-link">
            <Star :size="16" /> Key Features
          </button>
          <button @click="scrollTo('getting-started')" class="toc-link">
            <Rocket :size="16" /> Getting Started
          </button>
          <button @click="scrollTo('browsing')" class="toc-link">
            <Clapperboard :size="16" /> Browsing Content
          </button>
          <button @click="scrollTo('search')" class="toc-link">
            <Search :size="16" /> Search
          </button>
          <button @click="scrollTo('interaction')" class="toc-link">
            <MessageSquare :size="16" /> User Interaction
          </button>
          <button @click="scrollTo('technical')" class="toc-link">
            <Settings :size="16" /> Technical Details
          </button>
          <button @click="scrollTo('support')" class="toc-link">
            <LifeBuoy :size="16" /> Support
          </button>
        </nav>
      </section>

      <!-- ==================== PLATFORM OVERVIEW ==================== -->
      <section id="overview" class="section container" aria-labelledby="overview-heading">
        <div class="section-header">
          <h2 class="section-title">Platform Overview</h2>
          <p class="section-subtitle">
            Stream.Store is a comprehensive movie and series platform that allows users to browse,
            search, and interact with a wide collection of content.
          </p>
        </div>
        <div class="grid grid-2">
          <article class="overview-card">
            <div class="overview-icon" aria-hidden="true">
              <Film :size="28" />
            </div>
            <h3>Movie Collection</h3>
            <p>Browse through an extensive collection of movies organized by genres.</p>
          </article>
          <article class="overview-card">
            <div class="overview-icon" aria-hidden="true">
              <Tv :size="28" />
            </div>
            <h3>Series Library</h3>
            <p>Access complete series with multiple episodes, organized for easy navigation.</p>
          </article>
          <article class="overview-card">
            <div class="overview-icon" aria-hidden="true">
              <Search :size="28" />
            </div>
            <h3>Advanced Search</h3>
            <p>Find exactly what you're looking for with our powerful search functionality.</p>
          </article>
          <article class="overview-card">
            <div class="overview-icon" aria-hidden="true">
              <MessageCircle :size="28" />
            </div>
            <h3>Community Interaction</h3>
            <p>Engage with other users through comments, replies, and rating systems.</p>
          </article>
        </div>
      </section>

      <!-- ==================== KEY FEATURES ==================== -->
      <section id="features" class="section container" aria-labelledby="features-heading">
        <div class="section-header">
          <h2 class="section-title">Key Features</h2>
          <p class="section-subtitle">Everything that makes Stream.Store a great platform.</p>
        </div>
        <div class="grid grid-3">
          <article class="feature-card">
            <div class="feature-icon" aria-hidden="true">
              <Tags :size="22" />
            </div>
            <div>
              <h4>Genre Organization</h4>
              <p>Content is categorized by genres including Action, Drama, Comedy, and specialized categories like Rocky, Korea, and Chinese content.</p>
            </div>
          </article>
          <article class="feature-card">
            <div class="feature-icon" aria-hidden="true">
              <Target :size="22" />
            </div>
            <div>
              <h4>Recommendation System</h4>
              <p>Get personalized recommendations based on your viewing history and preferences.</p>
            </div>
          </article>
          <article class="feature-card">
            <div class="feature-icon" aria-hidden="true">
              <Smartphone :size="22" />
            </div>
            <div>
              <h4>Responsive Design</h4>
              <p>Enjoy a seamless experience across all devices — desktop, tablet, and mobile.</p>
            </div>
          </article>
          <article class="feature-card">
            <div class="feature-icon" aria-hidden="true">
              <Zap :size="22" />
            </div>
            <div>
              <h4>Fast Loading</h4>
              <p>Optimized performance with caching mechanisms for quick content delivery.</p>
            </div>
          </article>
          <article class="feature-card">
            <div class="feature-icon" aria-hidden="true">
              <Lock :size="22" />
            </div>
            <div>
              <h4>Secure Platform</h4>
              <p>Robust security measures including rate limiting and IP banning for abusive users.</p>
            </div>
          </article>
          <article class="feature-card">
            <div class="feature-icon" aria-hidden="true">
              <BarChart3 :size="22" />
            </div>
            <div>
              <h4>Rich Metadata</h4>
              <p>Detailed information for each title including synopsis, cast, ratings, and trailers.</p>
            </div>
          </article>
        </div>
      </section>

      <!-- ==================== GETTING STARTED ==================== -->
      <section id="getting-started" class="section container" aria-labelledby="started-heading">
        <div class="section-header">
          <h2 class="section-title">Getting Started</h2>
          <p class="section-subtitle">Follow these simple steps to start using the Stream.Store platform.</p>
        </div>

        <div class="steps-container">
          <!-- Step 1 -->
          <article class="step-item">
            <div class="step-number" aria-hidden="true">1</div>
            <div class="step-content">
              <h3>Visit the Homepage</h3>
              <p>Navigate to the Stream.Store homepage where you'll find featured movies and series.</p>
              <div class="step-details">
                <h5>What You'll Find</h5>
                <ul>
                  <li>The homepage displays latest content</li>
                  <li>Featured movies and series are highlighted</li>
                  <li>Genre categories are available for browsing</li>
                </ul>
              </div>
            </div>
          </article>

          <!-- Step 2 -->
          <article class="step-item">
            <div class="step-number" aria-hidden="true">2</div>
            <div class="step-content">
              <h3>Browse or Search</h3>
              <p>Use the navigation menu to browse by category or use the search bar to find specific titles.</p>
              <div class="step-details">
                <h5>Available Options</h5>
                <ul>
                  <li>Search functionality available in navbar</li>
                  <li>Genre-based browsing organized intuitively</li>
                  <li>Filter options for refined results</li>
                </ul>
              </div>
            </div>
          </article>

          <!-- Step 3 -->
          <article class="step-item">
            <div class="step-number" aria-hidden="true">3</div>
            <div class="step-content">
              <h3>Select Content</h3>
              <p>Click on any movie or series to view detailed information and access viewing options.</p>
              <div class="step-details">
                <h5>Features on Content Pages</h5>
                <ul>
                  <li>Each title has a dedicated page</li>
                  <li>Detailed metadata and description provided</li>
                  <li>Multiple viewing parts or episodes available</li>
                </ul>
              </div>
            </div>
          </article>

          <!-- Step 4 -->
          <article class="step-item">
            <div class="step-number" aria-hidden="true">4</div>
            <div class="step-content">
              <h3>Interact with Content</h3>
              <p>Leave comments, reply to others, and rate content to engage with the community.</p>
              <div class="step-details">
                <h5>Interaction Features</h5>
                <ul>
                  <li>Comment system with moderation</li>
                  <li>Reply functionality for discussions</li>
                  <li>Like/dislike system for feedback</li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- ==================== BROWSING CONTENT ==================== -->
      <section id="browsing" class="section container" aria-labelledby="browsing-heading">
        <div class="section-header">
          <h2 class="section-title">Browsing Content</h2>
          <p class="section-subtitle">Genre-Based Browsing — content is organized into genres for easy discovery.</p>
        </div>

        <div class="genre-tags">
          <span class="genre-tag"><Zap :size="14" /> Action</span>
          <span class="genre-tag"><Map :size="14" /> Adventure</span>
          <span class="genre-tag"><Palette :size="14" /> Animation</span>
          <span class="genre-tag"><Smile :size="14" /> Comedy</span>
          <span class="genre-tag"><Theater :size="14" /> Drama</span>
          <span class="genre-tag"><Ghost :size="14" /> Horror</span>
          <span class="genre-tag"><Rocket :size="14" /> Sci-Fi</span>
          <span class="genre-tag"><Wand2 :size="14" /> Fantasy</span>
          <span class="genre-tag"><Swords :size="14" /> Rocky</span>
          <span class="genre-tag"><Flag :size="14" /> Korea</span>
          <span class="genre-tag"><Flag :size="14" /> Chinese</span>
          <span class="genre-tag"><Flag :size="14" /> Indian</span>
        </div>

        <div class="grid grid-2" style="margin-top: 32px;">
          <article class="overview-card">
            <div class="overview-icon" aria-hidden="true">
              <Sparkles :size="28" />
            </div>
            <h3>Latest Additions</h3>
            <p>The homepage features recently added movies and series, making it easy to stay updated with new content.</p>
          </article>
          <article class="overview-card">
            <div class="overview-icon" aria-hidden="true">
              <Star :size="28" />
            </div>
            <h3>Featured Content</h3>
            <p>Highlighted movies and series are prominently displayed on the homepage for quick access to popular titles.</p>
          </article>
        </div>

        <div class="tip-callout">
          <span class="icon" aria-hidden="true">
            <Lightbulb :size="24" />
          </span>
          <p>
            <strong>Tip:</strong> Use the genre dropdown in the navigation menu to quickly jump
            to your preferred content categories.
          </p>
        </div>
      </section>

      <!-- ==================== SEARCH FUNCTIONALITY ==================== -->
      <section id="search" class="section container" aria-labelledby="search-heading">
        <div class="section-header">
          <h2 class="section-title">Search Functionality</h2>
          <p class="section-subtitle">Find exactly what you're looking for in seconds.</p>
        </div>

        <div class="search-box">
          <h3><Search :size="20" /> Basic Search</h3>
          <p>Simply type keywords in the search bar to find matching titles. The search looks through:</p>
          <ul class="search-list">
            <li>Movie and series titles</li>
            <li>Descriptions and synopses</li>
            <li>Cast and crew information</li>
          </ul>

          <h3 style="margin-top: 32px;"><SlidersHorizontal :size="20" /> Advanced Filtering</h3>
          <p>Refine your search results using filters:</p>
          <ul class="filter-list">
            <li><span class="filter-icon"><Theater :size="16" /></span> <strong>By Genre:</strong> Narrow results to specific categories</li>
            <li><span class="filter-icon"><Clapperboard :size="16" /></span> <strong>By Type:</strong> Filter for movies only, series only, or both</li>
            <li><span class="filter-icon"><BarChart3 :size="16" /></span> <strong>Sort Options:</strong> Order results by title, date added, or relevance</li>
          </ul>

          <h3 style="margin-top: 32px;"><FileText :size="20" /> Search Results Display</h3>
          <p>Search results are presented with:</p>
          <ul class="filter-list">
            <li><span class="filter-icon"><Image :size="16" /></span> Clear visual cards with posters</li>
            <li><span class="filter-icon"><FileEdit :size="16" /></span> Title and brief description</li>
            <li><span class="filter-icon"><Tags :size="16" /></span> Genre information for each result</li>
            <li><span class="filter-icon"><FileText :size="16" /></span> Pagination for large result sets</li>
          </ul>
        </div>

        <!-- Developer Info -->
        <div style="margin-top: 32px;">
          <h3 style="color: var(--white); font-size: 1.05rem; font-weight: 700; margin-bottom: 18px; display: flex; align-items: center; gap: 10px;">
            <Code2 :size="20" /> Developer Information
          </h3>
          <div class="grid grid-3">
            <article class="dev-card">
              <ul>
                <li>Search API endpoint available</li>
              </ul>
            </article>
            <article class="dev-card">
              <ul>
                <li>Returns JSON data for developers</li>
              </ul>
            </article>
            <article class="dev-card">
              <ul>
                <li>Supports pagination and filtering parameters</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <!-- ==================== USER INTERACTION ==================== -->
      <section id="interaction" class="section container" aria-labelledby="interaction-heading">
        <div class="section-header">
          <h2 class="section-title">User Interaction Features</h2>
          <p class="section-subtitle">Engage with the community and share your thoughts.</p>
        </div>

        <div class="grid grid-2">
          <article class="interaction-card">
            <h3><MessageSquare :size="20" /> Commenting System</h3>
            <ul class="interaction-list">
              <li>Post comments on any content page</li>
              <li>Reply to existing comments to continue discussions</li>
              <li>All comments are moderated to maintain quality</li>
            </ul>
          </article>

          <article class="interaction-card">
            <h3><ThumbsUp :size="20" /> Rating System</h3>
            <ul class="interaction-list">
              <li>Like or dislike comments and replies</li>
              <li>See community sentiment through vote counts</li>
              <li>Rate limiting prevents spam voting</li>
            </ul>
          </article>
        </div>

        <div class="protection-banner">
          <span class="icon" aria-hidden="true">
            <ShieldCheck :size="26" />
          </span>
          <div>
            <p>
              <strong>User Protection:</strong> The platform includes measures to ensure a safe environment —
              rate limiting on comments and interactions, IP-based banning for abusive behavior, and
              spam detection through hidden form fields.
            </p>
          </div>
        </div>

        <div class="note-callout">
          <span class="icon" aria-hidden="true">
            <Info :size="22" />
          </span>
          <p>
            <strong>Note:</strong> To prevent spam, users are limited to <strong>5 comments per hour</strong>
            from the same IP address.
          </p>
        </div>
      </section>

      <!-- ==================== TECHNICAL DETAILS ==================== -->
      <section id="technical" class="section container" aria-labelledby="technical-heading">
        <div class="section-header">
          <h2 class="section-title">Technical Details</h2>
          <p class="section-subtitle">Stream.Store is built using modern technologies.</p>
        </div>

        <!-- Platform Architecture -->
        <h3 style="color: var(--white); font-size: 1.1rem; font-weight: 700; margin-bottom: 20px; text-align: center; display: flex; justify-content: center; align-items: center; gap: 8px;">
          <Server :size="22" /> Platform Architecture
        </h3>
        <div class="grid grid-4">
          <article class="tech-card">
            <div class="tech-icon" aria-hidden="true">
              <Settings :size="28" />
            </div>
            <h4>Backend</h4>
            <p>Flask (Python web framework), Go, Astro</p>
          </article>
          <article class="tech-card">
            <div class="tech-icon" aria-hidden="true">
              <Database :size="28" />
            </div>
            <h4>Database</h4>
            <p>PostgreSQL with connection pooling</p>
          </article>
          <article class="tech-card">
            <div class="tech-icon" aria-hidden="true">
              <Zap :size="28" />
            </div>
            <h4>Caching</h4>
            <p>Flask-Caching, Redis, Valkey for improved performance</p>
          </article>
          <article class="tech-card">
            <div class="tech-icon" aria-hidden="true">
              <Layout :size="28" />
            </div>
            <h4>Frontend</h4>
            <p>Astro, React, Tailwind CSS</p>
          </article>
        </div>

        <!-- Database Structure -->
        <h3 style="color: var(--white); font-size: 1.1rem; font-weight: 700; margin: 40px 0 20px; text-align: center; display: flex; justify-content: center; align-items: center; gap: 8px;">
          <HardDrive :size="22" /> Database Structure
        </h3>
        <div class="genre-tags">
          <span class="genre-tag"><Clapperboard :size="14" /> movies</span>
          <span class="genre-tag"><Tv :size="14" /> series</span>
          <span class="genre-tag"><Film :size="14" /> episodes</span>
          <span class="genre-tag"><Tags :size="14" /> genres</span>
          <span class="genre-tag"><MessageCircle :size="14" /> comments</span>
        </div>

        <!-- API Integration -->
        <h3 style="color: var(--white); font-size: 1.1rem; font-weight: 700; margin: 40px 0 20px; text-align: center; display: flex; justify-content: center; align-items: center; gap: 8px;">
          <Plug :size="22" /> API Integration
        </h3>
        <div class="grid grid-3">
          <article class="api-card">
            <div class="api-icon" aria-hidden="true">
              <Clapperboard :size="22" />
            </div>
            <div>
              <h4>TMDB API</h4>
              <p>For movie and series metadata</p>
            </div>
          </article>
          <article class="api-card">
            <div class="api-icon" aria-hidden="true">
              <Play :size="22" />
            </div>
            <div>
              <h4>YouTube API</h4>
              <p>For trailer content</p>
            </div>
          </article>
          <article class="api-card">
            <div class="api-icon" aria-hidden="true">
              <Brain :size="22" />
            </div>
            <div>
              <h4>Custom Algorithms</h4>
              <p>For personalized recommendations</p>
            </div>
          </article>
        </div>

        <!-- Code Snippet -->
        <h3 style="color: var(--white); font-size: 1.1rem; font-weight: 700; margin: 40px 0 20px; text-align: center; display: flex; justify-content: center; align-items: center; gap: 8px;">
          <Code :size="22" /> Example Code Snippet
        </h3>
        <div class="code-block">
<pre><span class="code-comment"># Example API endpoint for movies</span>
<span class="code-decorator">@app.route</span>(<span class="code-string">'/movie/&lt;int:movie_id&gt;'</span>)
<span class="code-decorator">@cache.cached</span>(timeout=<span class="code-string">300</span>)
<span class="code-keyword">def</span> <span class="code-string">movie</span>(movie_id):
    <span class="code-comment"># Fetches movie data with caching</span>
    <span class="code-keyword">return</span> render_template(<span class="code-string">'movie.html'</span>, movie=movie_data)</pre>
        </div>
      </section>

      <!-- ==================== SUPPORT & CONTACT ==================== -->
      <section id="support" class="section container" aria-labelledby="support-heading">
        <div class="section-header">
          <h2 class="section-title">Support &amp; Contact Information</h2>
          <p class="section-subtitle">We're here to help with any questions or issues.</p>
        </div>

        <!-- Platform Support -->
        <h3 style="color: var(--white); font-size: 1.05rem; font-weight: 700; margin-bottom: 20px; text-align: center; display: flex; justify-content: center; align-items: center; gap: 8px;">
          <LifeBuoy :size="20" /> Platform Support
        </h3>
        <div class="grid grid-3">
          <router-link to="/contact" class="support-card">
            <div class="support-icon" aria-hidden="true">
              <LifeBuoy :size="28" />
            </div>
            <h4>Support Page</h4>
            <p>FAQs and troubleshooting guides</p>
          </router-link>
          <router-link to="/about" class="support-card">
            <div class="support-icon" aria-hidden="true">
              <Info :size="28" />
            </div>
            <h4>About Us</h4>
            <p>Platform information and mission</p>
          </router-link>
          <router-link to="/terms" class="support-card">
            <div class="support-icon" aria-hidden="true">
              <FileText :size="28" />
            </div>
            <h4>Legal Info</h4>
            <p>Terms of Service and Privacy Policy</p>
          </router-link>
        </div>

        <!-- Contact Methods -->
        <h3 style="color: var(--white); font-size: 1.05rem; font-weight: 700; margin: 40px 0 20px; text-align: center; display: flex; justify-content: center; align-items: center; gap: 8px;">
          <Phone :size="20" /> Contact Methods
        </h3>
        <div class="grid grid-3">
          <article class="api-card">
            <div class="api-icon" aria-hidden="true">
              <MessageCircle :size="22" />
            </div>
            <div>
              <h4>WhatsApp</h4>
              <p>Updates &amp; community discussions</p>
            </div>
          </article>
          <article class="api-card">
            <div class="api-icon" aria-hidden="true">
              <Instagram :size="22" />
            </div>
            <div>
              <h4>Instagram</h4>
              <p>News &amp; content highlights</p>
            </div>
          </article>
          <article class="api-card">
            <div class="api-icon" aria-hidden="true">
              <Youtube :size="22" />
            </div>
            <div>
              <h4>YouTube</h4>
              <p>Video content &amp; trailers</p>
            </div>
          </article>
          <article class="api-card">
            <div class="api-icon" aria-hidden="true">
              <Facebook :size="22" />
            </div>
            <div>
              <h4>Facebook</h4>
              <p>Community updates</p>
            </div>
          </article>
          <article class="api-card">
            <div class="api-icon" aria-hidden="true">
              <Music2 :size="22" />
            </div>
            <div>
              <h4>TikTok</h4>
              <p>Short videos &amp; highlights</p>
            </div>
          </article>
        </div>

        <!-- Feedback -->
        <h3 style="color: var(--white); font-size: 1.05rem; font-weight: 700; margin: 40px 0 20px; text-align: center; display: flex; justify-content: center; align-items: center; gap: 8px;">
          <Lightbulb :size="20" /> Feedback &amp; Suggestions
        </h3>
        <div class="grid grid-3">
          <article class="overview-card">
            <div class="overview-icon" aria-hidden="true">
              <MessageSquare :size="28" />
            </div>
            <h3>Comment System</h3>
            <p>Share your thoughts on specific content</p>
          </article>
          <article class="overview-card">
            <div class="overview-icon" aria-hidden="true">
              <Mail :size="28" />
            </div>
            <h3>Direct Contact</h3>
            <p>Contact us directly with feature requests</p>
          </article>
          <article class="overview-card">
            <div class="overview-icon" aria-hidden="true">
              <Users :size="28" />
            </div>
            <h3>Community</h3>
            <p>Participate in community discussions</p>
          </article>
        </div>
      </section>

      <!-- ==================== CTA ==================== -->
      <section class="section container cta-section" aria-labelledby="cta-heading">
        <h2>Ready to Explore Stream.Store?</h2>
        <p>Start your journey with thousands of movies and series at your fingertips.</p>
        <div class="btn-group">
          <router-link to="/" class="btn btn-primary">
            <Rocket :size="18" />
            Start Browsing Now
          </router-link>
          <router-link to="/contact" class="btn btn-outline">
            <MessageCircle :size="18" />
            Contact Support
          </router-link>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import {
  BookOpen,
  ClipboardList,
  Star,
  Rocket,
  Clapperboard,
  Search,
  MessageSquare,
  Settings,
  LifeBuoy,
  Film,
  Tv,
  MessageCircle,
  Tags,
  Target,
  Smartphone,
  Zap,
  Lock,
  BarChart3,
  Map,
  Palette,
  Smile,
  Theater,
  Ghost,
  Wand2,
  Swords,
  Flag,
  Sparkles,
  Lightbulb,
  SlidersHorizontal,
  FileText,
  Image,
  FileEdit,
  Code2,
  ThumbsUp,
  ShieldCheck,
  Info,
  Server,
  Database,
  Layout,
  HardDrive,
  Plug,
  Play,
  Brain,
  Code,
  Phone,
  Instagram,
  Youtube,
  Facebook,
  Music2,
  Mail,
  Users
} from "lucide-vue-next";

// Smooth scroll function for the TOC
function scrollTo(id) {
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 100; // Offset for sticky navbar
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
}
</script>

<style scoped>
/* ==================== BASE ==================== */
.how-page {
  width: 100%;
  font-family: 'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif;
  color: #e5e0f0;
  line-height: 1.7;
  font-size: 16px;
  position: relative;
}

.how-page::before {
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
  max-width: 680px;
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
  margin: 0 auto;
}

/* ==================== QUICK NAV / TOC ==================== */
.toc {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 28px 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.toc-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #a89ec4;
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 600;
  padding: 10px 18px;
  border-radius: 100px;
  border: 1px solid rgba(139, 92, 246, 0.18);
  background: rgba(255, 255, 255, 0.02);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toc-link:hover {
  color: #ffffff;
  border-color: #8b5cf6;
  background: rgba(139, 92, 246, 0.1);
  transform: translateY(-3px);
}

/* ==================== GRIDS ==================== */
.grid {
  display: grid;
  gap: 22px;
}

.grid-2 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
.grid-3 { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
.grid-4 { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }

/* ==================== OVERVIEW CARDS ==================== */
.overview-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 30px 28px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.overview-card::before {
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

.overview-card:hover {
  transform: translateY(-5px);
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.overview-card:hover::before {
  opacity: 1;
}

.overview-icon {
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

.overview-card h3 {
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.overview-card p {
  color: #a89ec4;
  font-size: 0.93rem;
}

/* ==================== FEATURE CARDS ==================== */
.feature-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 26px 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.feature-icon {
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.25), rgba(245, 158, 11, 0.08));
  border: 1px solid rgba(139, 92, 246, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b5cf6;
}

.feature-card h4 {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 5px;
}

.feature-card p {
  color: #a89ec4;
  font-size: 0.88rem;
}

/* ==================== STEPS ==================== */
.steps-container {
  display: grid;
  gap: 24px;
}

.step-item {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 32px 30px;
  display: flex;
  gap: 24px;
  align-items: flex-start;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.step-item:hover {
  transform: translateY(-5px);
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.step-number {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
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

.step-content h3 {
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 8px;
}

.step-content > p {
  color: #a89ec4;
  font-size: 0.95rem;
  margin-bottom: 16px;
}

.step-details {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 8px;
  padding: 18px 22px;
}

.step-details h5 {
  color: #f59e0b;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
}

.step-details ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.step-details li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #a89ec4;
  font-size: 0.88rem;
}

.step-details li::before {
  content: '•';
  color: #8b5cf6;
  font-weight: 900;
  font-size: 1.1rem;
  line-height: 1;
}

/* ==================== GENRE TAGS ==================== */
.genre-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.genre-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  color: #e5e0f0;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 100px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.genre-tag:hover {
  border-color: #8b5cf6;
  background: rgba(139, 92, 246, 0.1);
  transform: translateY(-3px);
  color: #ffffff;
}

/* ==================== TIP CALLOUT ==================== */
.tip-callout {
  background: rgba(245, 158, 11, 0.08);
  border: 1px solid rgba(245, 158, 11, 0.25);
  border-left: 4px solid #f59e0b;
  border-radius: 8px;
  padding: 20px 26px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-top: 28px;
}

.tip-callout .icon {
  flex-shrink: 0;
  color: #f59e0b;
}

.tip-callout p {
  color: #e5e0f0;
  font-size: 0.93rem;
}

.tip-callout strong {
  color: #f59e0b;
}

/* ==================== SEARCH SECTION ==================== */
.search-box {
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.08), rgba(59, 130, 246, 0.04));
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 36px;
}

.search-box h3 {
  color: #ffffff;
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-box > p {
  color: #a89ec4;
  font-size: 0.95rem;
  margin-bottom: 18px;
}

.search-list {
  list-style: none;
  display: grid;
  gap: 10px;
  margin-bottom: 24px;
}

.search-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: #a89ec4;
  font-size: 0.92rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 8px;
  padding: 14px 18px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-list li:hover {
  border-color: rgba(139, 92, 246, 0.35);
  background: rgba(139, 92, 246, 0.05);
}

.search-list li::before {
  content: '🔍';
  flex-shrink: 0;
  font-size: 0.9rem;
}

.filter-list {
  list-style: none;
  display: grid;
  gap: 10px;
}

.filter-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: #a89ec4;
  font-size: 0.92rem;
}

.filter-list li .filter-icon {
  flex-shrink: 0;
  display: inline-flex;
  color: #8b5cf6;
}

/* ==================== DEVELOPER SECTION ==================== */
.dev-card {
  background: #241a3d;
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 26px 28px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dev-card:hover {
  transform: translateY(-5px);
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.dev-card ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dev-card li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #a89ec4;
  font-size: 0.88rem;
  font-family: 'Courier New', monospace;
}

.dev-card li::before {
  content: '#';
  color: #8b5cf6;
  font-weight: 800;
}

/* ==================== CODE BLOCK ==================== */
.code-block {
  background: #0a0614;
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 24px 28px;
  overflow-x: auto;
  margin-top: 24px;
}

.code-block pre {
  font-family: 'Courier New', Consolas, monospace;
  font-size: 0.85rem;
  line-height: 1.7;
  color: #c4b5fd;
  white-space: pre;
}

.code-block .code-comment { color: #6b7280; }
.code-block .code-keyword { color: #f472b6; }
.code-block .code-string { color: #34d399; }
.code-block .code-decorator { color: #fbbf24; }

/* ==================== USER INTERACTION ==================== */
.interaction-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 28px 26px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-top: 4px solid #8b5cf6;
}

.interaction-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.interaction-card h3 {
  color: #ffffff;
  font-size: 1.08rem;
  font-weight: 700;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.interaction-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.interaction-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: #a89ec4;
  font-size: 0.92rem;
}

.interaction-list li::before {
  content: '•';
  color: #8b5cf6;
  font-weight: 900;
  font-size: 1.2rem;
  line-height: 1;
}

/* ==================== PROTECTION BANNER ==================== */
.protection-banner {
  background: rgba(16, 185, 129, 0.06);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-left: 4px solid #10b981;
  border-radius: 8px;
  padding: 22px 26px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-top: 24px;
}

.protection-banner .icon {
  flex-shrink: 0;
  color: #10b981;
}

.protection-banner p {
  color: #a89ec4;
  font-size: 0.93rem;
}

.protection-banner strong {
  color: #10b981;
}

/* ==================== NOTE CALLOUT ==================== */
.note-callout {
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.25);
  border-left: 4px solid #3b82f6;
  border-radius: 8px;
  padding: 18px 24px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-top: 18px;
}

.note-callout .icon {
  flex-shrink: 0;
  color: #3b82f6;
}

.note-callout p {
  color: #a89ec4;
  font-size: 0.9rem;
}

.note-callout strong {
  color: #3b82f6;
}

/* ==================== TECH STACK ==================== */
.tech-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 28px 26px;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tech-card:hover {
  transform: translateY(-5px);
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.tech-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 16px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.25), rgba(139, 92, 246, 0.1));
  border: 1px solid rgba(139, 92, 246, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b5cf6;
}

.tech-card h4 {
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.tech-card p {
  color: #a89ec4;
  font-size: 0.88rem;
}

/* ==================== API CARDS ==================== */
.api-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 26px 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.api-card:hover {
  transform: translateY(-5px);
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.api-icon {
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.06));
  border: 1px solid rgba(245, 158, 11, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f59e0b;
}

.api-card h4 {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 5px;
}

.api-card p {
  color: #a89ec4;
  font-size: 0.88rem;
}

/* ==================== SUPPORT CARDS ==================== */
.support-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.18);
  border-radius: 14px;
  padding: 30px 26px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.support-card:hover {
  transform: translateY(-5px);
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

.support-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.25), rgba(139, 92, 246, 0.1));
  border: 1px solid rgba(139, 92, 246, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b5cf6;
}

.support-card h4 {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
}

.support-card p {
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
  .step-item {
    flex-direction: column;
    gap: 16px;
    padding: 28px 22px;
  }
  .search-box {
    padding: 28px 22px;
  }
  .hero {
    padding: 64px 0 44px;
  }
  .toc {
    padding: 22px 20px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 18px;
  }
  .btn {
    width: 100%;
  }
  .overview-card, .feature-card, .interaction-card, .tech-card, .api-card {
    padding: 22px 18px;
  }
  .feature-card, .api-card {
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