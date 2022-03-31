<template>
  <div class="max-w-6xl mx-auto">
    <Job :job="job" :showDetailsButton="false" />
    <div class="max-w-3xl px-8 mx-auto my-10 lg:p-0">
      <div
        class="w-full prose prose-base max-w-none"
        v-html="job.description"
      ></div>
    </div>
  </div>
</template>

<script setup>
import api from "@/helpers/api";
import { ref } from "vue";
import { useRoute } from "vue-router";
import Job from "./Job.vue";

const route = useRoute();

const job = ref(null);

const { ok, data } = await api.get(`/api/jobs/${route.params.slug}`);
if (!ok) alert("Failed to fetch job");
job.value = data.data;
</script>
