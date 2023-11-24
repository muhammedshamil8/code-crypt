<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="registerUser">
      <label for="username">Username:</label>
      <input v-model="formData.username" type="text" id="username" name="username" required>

      <label for="email">Email:</label>
      <input v-model="formData.email" type="email" id="email" name="email" required>

      <label for="password">Password:</label>
      <input v-model="formData.password" type="password" id="password" name="password" required>

      <label for="passwordConfirm">Confirm Password:</label>
      <input v-model="formData.passwordConfirm" type="password" id="passwordConfirm" name="passwordConfirm" required>
      <br />

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Signup',
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
          this.$router.push('/login');
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
