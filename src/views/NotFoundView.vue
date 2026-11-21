
<template>
  <div class="not-found">
    <div class="error-code">404</div>

    <h1>Page Not Found</h1>

    <p>
      Sorry, the page you are looking for does not exist
      or may have been moved.
    </p>

    <router-link to="/home" class="home-btn">
      <House :size="18" />
      Back to Home
    </router-link>
  </div>
</template>

<script setup>
import { House } from "lucide-vue-next";
</script>

<style scoped>
.not-found {
  min-height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 25px;
  text-align: center;
}

.error-code {
  font-size: clamp(75px, 15vw, 150px);
  font-weight: 900;
  line-height: 1;
  color: #818cf8;
  text-shadow: 0 10px 40px rgba(99, 102, 241, 0.25);
}

h1 {
  margin-top: 20px;
  color: white;
  font-size: 27px;
}

p {
  max-width: 430px;
  margin: 12px 0 25px;
  color: #94a3b8;
  font-size: 13px;
  line-height: 1.7;
}

.home-btn {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 12px 18px;
  color: white;
  background: #536fe0;
  border-radius: 10px;
  text-decoration: none;
  font-size: 13px;
}
</style>
