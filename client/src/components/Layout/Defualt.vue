<!-- DefaultLayout.vue -->
<template>
 
  <div class="defualt-layout">
    <header>
      <div class="header-right-section">

        <img src="../../../public/Vectorsearch.svg" alt="logo" class="logo-search">
        <input type="search" placeholder="Search" class="search-bar" />
      </div>
      <div class="header-left-section">
        <img src="../../../public/Bell_fillnotification.svg" alt="logo" class="notification-logo" />
        <h3>Taskify</h3>

      </div>
    </header>
    <aside>
      <div class="taskify-logo">
        <img src="../../../public/amjad.svg" alt="logo" class="profile-logo" />
        <p class="userdata">{{ userData ? userData[0].username : '' }}</p>
      </div>
      <ul class="nav-bar">
        <li><img src="../../../public/griddashboard.svg" alt="" class=""> <router-link to="/dashboard" class="link"
            :class="{ 'active-link': $route.name === 'dashboard' }">Dash
            Board</router-link></li>
        <li><img src="../../../public/createtask.svg" alt="" class=""><router-link to="/createtask" class="link"
            :class="{ 'active-link': $route.name === 'createtask' }">Create
            Task</router-link></li>
        <li><img src="../../../public/project.svg" alt="" class=""><router-link to="/project" class="link"
            :class="{ 'active-link': $route.name === 'project' }">Project</router-link></li>
        <li><img src="../../../public/calender.svg" alt="" class=""><router-link to="/calender"
            class="link">Calender</router-link></li>
        <li><img src="../../../public/about.svg" alt="" class=""><router-link to="/about" class="link"
            :class="{ 'active-link': $route.name === 'calender' }">About</router-link>
        </li>
        <li><img src="../../../public/contact.svg" alt="" class=""><router-link to="/connect" class="link"
            :class="{ 'active-link': $route.path === '/calender' }">Contact us</router-link></li>
      </ul>
      <div>
        <button @click="logout">Log out</button>
      </div>
    </aside>
    <div class="main-content">
      <router-view name="main" />
    </div>
   
  </div>
</template>
  
<script>
// import { authMixin } from '../../authMixin';
import axios from 'axios';
// logoutuserdata
export default {
  data() {
    return {
      userData: null,
    };
  },
  logout(){
    localStorage.removeItem('user_id');
    this.$router.push('/login');
  },
  methods: {
   
    async fetchUserData() {
      try {
        const userId = localStorage.getItem('user_id');
        console.log(userId);
        const response = await axios.get(`http://localhost:9000/api/users/${userId}`);
        console.log(response.data);
        this.userData = response.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    logout() {
      localStorage.removeItem('user_id');
      this.$router.push('/login');
    },
  },
  mounted() {
    const userId = localStorage.getItem('user_id');
    this.fetchUserData();
  },
  
};
</script>
<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
}


/* header */
header {
  background-color: #000000;
  height: 80px;
  width: 80%;
  color: #fff;
  float: right;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px;
  position: fixed;
  right: 0px;
}

.profile-logo {
  border-radius: 50%;
  width: 60px;
  height: 60px;
}

.userdata{
  font-size: 16px;
  color: white;
  margin: 5px;
}
.header-left-section {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  width: 20%;
}

.search-bar {
  width: 70%;
  height: 35px;
  border-radius: 10px;
  border: none;
  padding: 8px 12px;
  /* Adjusted padding for better visual balance */
  font-size: 15px;
  font-weight: 600;
  background-color: #fff;
  color: #000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding-left: 40px;
  margin-left: 15px;
  /* Add a subtle box shadow for depth */
}

.header-right-section {
  position: relative;
  width: 100%;
}

.logo-search {
  width: 18px;
  height: 18px;
  position: absolute;
  left: 25px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}


.notification-logo {
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-right: 15px;
}

/* aside  */


aside {
  background-color: #2e2b2b;
  min-height: 100%;
  width: 20%;
  float: left;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  position: fixed;
  left: 0px;
  bottom: 0px;
}

.taskify-logo {
  width: 100%;
  height: 60px;
  /* background-color: #fff; */
  color: #000;
  font-size: 30px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 60px;
}

.nav-bar {
  width: 100%;
  list-style: none;
  padding: 0px;
  margin: 0px;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 15px;
}

.nav-bar>li {
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
}

/* main-content */
.main-content {
  background-color: #000000;
  height: calc(100vh - 80px);
  /* Subtract the height of the header */
  width: 80%;
  margin-top: 80px;
  /* Height of the header */
  float: right;
  padding: 40px;
  overflow-y: auto;
  /* Add vertical scroll when content overflows */
}

.nav-bar>li.active,
.nav-bar>li:hover {
  color: orange;
  /* Add any additional styling for the active item */
}

.nav-bar>.active {
  color: orange;
}

.active-link {
  color: orange;
  /* Add any additional styling for the active link */
}

.link {
  color: #fff;
  text-decoration: none;
}
</style>