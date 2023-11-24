<template>
  <div class="sidebar">
    <div class="sidebar-item" v-for="item in sidebarItems" :key="item.name">
      <router-link :to="item.link">
        <div class="sidebar-icon">
          <i :class="item.icon"></i>
        </div>
        <div class="sidebar-label">
          {{ item.name }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Demo",
  data() {
    return {
      sidebarItems: [
        {
          name: "Dashboard",
          link: "/dashboard",
          icon: "fas fa-tachometer-alt",
        },
        { name: "Create Task", link: "/create-task", icon: "fas fa-tasks" },
        { name: "Project", link: "/project", icon: "fas fa-briefcase" },
        { name: "Calendar", link: "/calendar", icon: "fas fa-calendar-alt" },
        { name: "About", link: "/about", icon: "fas fa-info-circle" },
        { name: "Contact Us", link: "/contact-us", icon: "fas fa-envelope" },
      ],
    };
  },
};
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  padding: 20px 0;
  width: 100%;
}

.sidebar-item {
  padding: 10px 20px;
  cursor: pointer;
}

.sidebar-item:hover {
  background-color: #f8f9fa;
}

.sidebar-icon {
  margin-bottom: 5px;
}

.sidebar-label {
  font-size: 14px;
}
</style>
