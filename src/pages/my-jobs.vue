<template>
  <suspense>
    <template #fallback>
      <Loading :active="true" />
    </template>

    <MyJobList />
  </suspense>
</template>
<script setup>
import Loading from "vue-loading-overlay";
import MyJobList from "@/components/MyJobList.vue";
</script>
