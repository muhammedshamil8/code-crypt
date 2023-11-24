<template>
  <div class="container">
    <form @submit.prevent="registerUser">
      <div class="box">
        <h2>Signup for free</h2>
        <p v-if="registrationMessage" :class="{ 'error-message': isError }">{{ registrationMessage }}</p>


        <div class="details">
          <InputField label="Name" name="username" id="username" type="text" v-model="formData.username" required />
          <InputField label="Email" type="email" id="email" name="email" v-model="formData.email" required />
          <InputField label="Password" v-model="formData.password" type="password" id="password" name="password"
            required />
          <InputField label="Confirm Password" v-model="formData.passwordConfirm" type="password" id="passwordConfirm"
            name="passwordConfirm" required />
        </div>

        <button type="submit" class="signup-btn" :class="{ 'loading': isLoading }" :disabled="isLoading">
          {{ isLoading ? 'Signing up...' : 'Sign up' }}
        </button>

        <router-link to="/login" class="login-link">Don't you have an account? Login</router-link>
      </div>
    </form>
  </div>
</template>
 
<script>
import InputField from '../components/viewTools/InputFields.vue';
export default {
  name: 'Signup',
  components: {
    InputField,
  },
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
      },
      isLoading: false,
      registrationMessage: '',
    };
  },
  computed: {
    isError() {
      return this.registrationMessage.toLowerCase().includes('error');
    },
  },
  methods: {
    async registerUser() {
      try {
        this.isLoading = true;
        const response = await fetch('http://localhost:9000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.formData.username,
            email: this.formData.email,
            password: this.formData.password,
            passwordConfirm: this.formData.passwordConfirm,
          }),
        });

        const data = await response.json();

        if (data.status === 1) {
          this.registrationMessage = 'Registration successful!';
          setTimeout(() => {
            this.$router.push('/login');
          }, 3000);
        } else {
          this.registrationMessage = `${data.message}`;
        }
      } catch (error) {
        console.error('Error:', error);
        this.registrationMessage = 'An error occurred during registration. Please try again.';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>


<style scoped>
.signup-btn.loading {
  background-color: gray;
  cursor: not-allowed;
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  width: 50vw;
  background-color: #fffedd;
  border-radius: 52px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000000;
}

.signup-btn {
  background-color: orange;
  color: white;
  width: 64%;
  height: 40px;
  margin-bottom: 20px;
  margin-top: 40px;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  padding: 6px;
}

.login-link {
  color: #000000;
  text-decoration: none;
  font-size: 14px;
  margin-top: 10px;
}

.registration-message {
  color: green;
  /* or any color you prefer for success messages */
  margin-top: 10px;
}

.error-message {
  color: red; /* or any color you prefer for error messages */
  margin-top: 10px;
}

</style>