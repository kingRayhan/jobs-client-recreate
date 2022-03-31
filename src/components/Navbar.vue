<template>
  <div
    class="flex justify-between max-w-6xl px-2 py-10 mx-auto border-t-4 border-indigo-500 xl:px-0"
  >
    <h2 class="text-2xl font-semibold text-indigo-500">
      <router-link to="/"> JOB Board </router-link>
    </h2>

    <nav v-if="auth.loggedIn" class="flex items-center gap-4">
      <router-link class="text-base" :to="{ name: 'jobs.mine' }">
        My posts
      </router-link>
      <router-link class="text-base button" :to="{ name: 'jobs.create' }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Post a job</span>
      </router-link>

      <p>{{ auth.user.name }}</p>
      <button @click="handleLogout">Logout</button>
    </nav>
    <nav v-else class="flex items-center gap-4">
      <router-link class="text-base" :to="{ name: 'auth.login' }"
        >Login</router-link
      >
      <router-link class="text-base button" :to="{ name: 'auth.register' }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Join</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import useAuthStore from "@/store/auth";

const auth = useAuthStore();

const handleLogout = () => {
  auth.logout();
};
</script>
