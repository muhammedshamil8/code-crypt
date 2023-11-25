// // authMixin.js
// export const authMixin = {
//   data() {
//     return {
//       isAuthenticated: false,
//     };
//   },
//   created() {
//     this.isAuthenticated = this.checkAuthentication();
//   },
//   methods: {
//     checkAuthentication() {
//       const storedUserId = localStorage.getItem('user_id');

//       if (!storedUserId) {
//         this.$router.push('/login');
//         return false;
//       }

//       const isValidUser = this.validateUserWithServer(storedUserId);

//       if (!isValidUser) {
//         localStorage.removeItem('user_id');
//         this.$router.push('/login');
//         return false;
//       }

//       return true;
//     },
//     async validateUserWithServer(userId) {
//       try {
//         const response = await axios.get(`http://localhost:9000/api/user/${userId}`);
//         return !!response.data; // Return true if user exists, false otherwise
//       } catch (error) {
//         console.error('Error validating user:', error);
//         return false;
//       }
//     },
//   },
// };
