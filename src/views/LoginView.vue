
<template>
  <div class="login">
    <div class="login-card">
      <div class="form-wrapper" :class="{ register: !showLogin }">

        <h3>{{ showLogin ? 'Welcome back' : 'Create account' }}</h3>

        <p class="subtitle">
          {{ showLogin
            ? 'Login to continue your journey'
            : 'Create an account to start your journey'
          }}
        </p>

        <form @submit.prevent="handleSubmit">
          <div class="form-fields">

            <input
              v-if="!showLogin"
              v-model="form.name"
              type="text"
              placeholder="Full name"
              autocomplete="name"
              required
            >

            <input
              v-model="form.email"
              type="email"
              placeholder="Email address"
              autocomplete="email"
              required
            >

            <input
              v-model="form.password"
              type="password"
              placeholder="Password"
              :autocomplete="showLogin ? 'current-password' : 'new-password'"
              minlength="6"
              required
            >

          </div>

          <button class="login-btn" type="submit">
            {{ showLogin ? 'Login' : 'Create Account' }}
            <span>→</span>
          </button>
        </form>

        <div class="account-switch">
          <p>
            {{ showLogin
              ? "Don't have an account?"
              : 'Already have an account?'
            }}
          </p>

          <button
            class="create-btn"
            type="button"
            @click="toggleForm"
          >
            {{ showLogin ? 'Create account' : 'Login' }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",

  data() {
    return {
      showLogin: true,

      form: {
        name: "",
        email: "",
        password: ""
      }
    };
  },

  methods: {
    toggleForm() {
      this.showLogin = !this.showLogin;
    },

    handleSubmit() {
      if (this.showLogin) {
        this.login();
      } else {
        this.createAccount();
      }
    },

    login() {
      if (!this.form.email || !this.form.password) {
        alert("Please enter your email and password.");
        return;
      }

      alert(
        "Welcome back!" 
      );
    },

    createAccount() {
      if (!this.form.name || !this.form.email || !this.form.password) {
        alert("Please fill in all fields.");
        return;
      }

      axios.post("http://localhost:3000/insert", {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password
      })
        .then((res) => {
          alert(res.data);

          this.form.name = "";
          this.form.email = "";
          this.form.password = "";

          this.showLogin = true;
        })
        .catch((error) => {
          console.log("Error:", error);

          alert(
            error.response?.data ||
            "Error creating account. Please check your server."
          );
        });
    }
  }
};
</script>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

:global(html),
:global(body),
:global(#app) {
  width: 100%;
  min-height: 100%;
  margin: 0;
  padding: 0;
}

:global(html),
:global(body) {
  overflow-x: hidden;
}

.login {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100vh;
  height: 100dvh;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 24px;
  overflow-y: auto;
  overflow-x: hidden;

  background-image: url('@/assets/dira.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  box-sizing: border-box;
}

.login-card {
  width: 100%;
  max-width: 420px;
  flex-shrink: 0;

  padding: 38px 32px;
  overflow: hidden;

  color: white;

  background: rgba(255, 255, 255, 0.13);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;

  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);

  animation: cardEnter 0.7s ease both;
}

.form-wrapper {
  animation: formEnter 0.45s ease both;
}

.form-wrapper.register {
  animation-name: formEnterReverse;
}

h3 {
  margin: 0;
  font-size: 30px;
  font-weight: 750;
  text-align: center;
  letter-spacing: 0.3px;
}

.subtitle {
  margin: 10px 0 28px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  text-align: center;
}

form,
.form-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.login-card input {
  display: block;
  width: 100%;
  min-width: 0;

  padding: 15px 16px;

  color: white;
  font-size: 15px;

  background: rgba(255, 255, 255, 0.1);

  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  outline: none;

  transition:
    background 0.3s,
    border-color 0.3s,
    box-shadow 0.3s;
}

.login-card input::placeholder {
  color: rgba(255, 255, 255, 0.72);
}

.login-card input:focus {
  background: rgba(255, 255, 255, 0.19);
  border-color: #ddd6fe;
  box-shadow: 0 0 0 4px rgba(196, 181, 253, 0.16);
}

.login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: 100%;
  margin-top: 5px;
  padding: 15px;

  color: white;
  font-size: 16px;
  font-weight: 700;

  background: linear-gradient(
    120deg,
    #7c3aed,
    #a855f7,
    #7c3aed
  );

  background-size: 200% 100%;

  border: none;
  border-radius: 12px;

  cursor: pointer;

  transition:
    transform 0.3s,
    box-shadow 0.3s,
    background-position 0.4s;
}

.login-btn span {
  font-size: 20px;
  transition: transform 0.3s;
}

.login-btn:hover {
  transform: translateY(-2px);
  background-position: 100% 0;
  box-shadow: 0 10px 25px rgba(124, 58, 237, 0.4);
}

.login-btn:hover span {
  transform: translateX(4px);
}

.login-btn:focus-visible,
.create-btn:focus-visible {
  outline: 2px solid #ddd6fe;
  outline-offset: 4px;
}

.account-switch {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}

.account-switch p {
  margin: 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
}

.create-btn {
  padding: 8px 9px;

  color: #e9d5ff;
  font-size: 13px;
  font-weight: 700;

  background: transparent;
  border: none;
  border-radius: 7px;

  cursor: pointer;

  transition:
    color 0.3s,
    background 0.3s;
}

.create-btn:hover {
  color: white;
  background: rgba(255, 255, 255, 0.15);
}

@keyframes cardEnter {
  from {
    opacity: 0;
    transform: translateY(25px) scale(0.97);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes formEnter {
  from {
    opacity: 0;
    transform: translateX(18px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes formEnterReverse {
  from {
    opacity: 0;
    transform: translateX(-18px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 480px) {
  .login {
    padding: 16px;
  }

  .login-card {
    padding: 30px 22px;
    border-radius: 20px;
  }

  h3 {
    font-size: 26px;
  }
}

@media (max-height: 550px) {
  .login {
    align-items: flex-start;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
