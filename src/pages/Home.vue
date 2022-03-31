<template>
  <suspense>
    <template #fallback>
      <Loading :active="true" />
    </template>

    <JobList />
  </suspense>
</template>

<script setup>
import JobList from "@/components/JobList.vue";
import Loading from "vue-loading-overlay";
</script>
