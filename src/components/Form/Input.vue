<template>
  <div class="flex flex-col w-full">
    <label :for="name">{{ label }}</label>
    <input
      type="text"
      :name="name"
      :id="name"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full rounded-sm bg-slate-50"
      v-bind="$attrs"
    />

    <p v-if="helperText" class="text-sm" :class="{ 'text-red-500': hasError }">
      {{ helperText }}
    </p>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
defineProps({
  modelValue: {
    default: "",
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    default: "",
    type: String,
  },
  helperText: {
    default: "",
    type: String,
  },
  hasError: {
    default: false,
    type: Boolean,
  },
});
defineEmits(["update:modelValue"]);
</script>
