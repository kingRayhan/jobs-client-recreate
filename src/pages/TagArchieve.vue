<template>
  <div class="max-w-6xl mx-auto">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-2xl font-semibold">Jobs of #{{ route.params.slug }}</h1>
    </div>
    <Loading :active="loading" />
    <Job v-for="job in jobs" :key="job.id" :job="job" />

    <div ref="trigger_point" class="my-10 text-center">
      <SyncLoader color="#6560EC" v-if="pagination_loading" />
    </div>
  </div>
</template>
<script setup>
import api from "@/helpers/api";
import SyncLoader from "vue-spinner/src/SyncLoader.vue";
import { useIntersectionObserver } from "@vueuse/core";

import { onMounted, reactive, ref, watch } from "vue";
import Loading from "vue-loading-overlay";
import Job from "../components/Job.vue";
const loading = ref(false);
const pagination_loading = ref(false);
const jobs = ref([]);
const trigger_point = ref(null);

import { useRoute } from "vue-router";

const route = useRoute();

const pagination = reactive({
  page: 1,
  last_page: null,
});

const loadInitialJobs = async () => {
  const { ok, data } = await api.get(`/api/tags/${route.params.slug}/jobs`);
  if (!ok) alert("Failed to fetch jobs");

  loading.value = false;
  jobs.value = data.data;
  pagination.last_page = data.meta.last_page;
  pagination.page = data.meta.current_page;
};

onMounted(() => {
  loadInitialJobs();
});

watch(
  () => route.params.slug,
  async () => {
    if (route.params.slug) loadInitialJobs();
  }
);

useIntersectionObserver(trigger_point, async ([{ isIntersecting }]) => {
  if (isIntersecting && pagination.page < pagination.last_page) {
    // ISSUE: alling initially
    pagination_loading.value = true;
    const { ok, data } = await api.get(
      `/api/tags/${route.params.slug}/jobs?page=${++pagination.page}`
    );
    if (!ok) alert("Failed to fetch jobs");

    jobs.value = [...jobs.value, ...data.data];
    pagination_loading.value = false;
  }
});
</script>
