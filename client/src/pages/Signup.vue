<!-- Signup.vue -->
<template>
  <div>
    <form @submit.prevent="registerUser">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="formData.username" required /><br />

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="formData.email" required /><br />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="formData.password" required /><br />

      <label for="passwordConfirm">Confirm Password:</label>
      <input type="password" id="passwordConfirm" v-model="formData.passwordConfirm" required /><br />

      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
      },
    };
  },
  methods: {
    async registerUser() {
      try {
        console.log('Form Data:', this.formData);

        const response = await fetch('http://localhost:9000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.formData),
        });

        const data = await response.json();

        if (data.status === 1) {
          console.log('Registration successful!');
        } else {
          console.error('Registration failed:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
  },
};
</script>
