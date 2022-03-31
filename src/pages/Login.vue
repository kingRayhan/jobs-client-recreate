<template>
  <form
    action="#"
    class="flex flex-col items-start gap-4 p-3 mx-auto md:w-6/12"
    @submit.prevent="handleSubmit"
  >
    <h1 class="text-xl font-semibold text-slate-700">Login</h1>

    <Input
      v-model="form.email"
      label="Email addresss"
      name="email"
      type="email"
      :helperText="getErrorMessage('email')"
      :hasError="Boolean(getErrorMessage('email'))"
    />

    <Input
      v-model="form.password"
      label="Password"
      name="password"
      type="password"
      :helperText="getErrorMessage('password')"
      :hasError="Boolean(getErrorMessage('password'))"
    />

    <Button :loading="loading">Login</Button>
  </form>
</template>

<script setup>
import Input from "@/components/Form/Input.vue";
import Button from "@/components/Form/Button.vue";
import { reactive } from "vue";
import useForm from "@/hooks/useForm";
import { useRouter } from "vue-router";
import useAuthStore from "@/store/auth";
import api from "@/helpers/api";
const router = useRouter();

const auth = useAuthStore();

const { loading, getErrorMessage, submitForm } = useForm();

const form = reactive({
  email: "",
  password: "",
});

const handleSubmit = () => {
  submitForm(form, "/api/auth/login").then(async ({ token }) => {
    localStorage.setItem("token", token);
    api.setHeader("Authorization", `Bearer ${token}`);
    await auth.boot();
    router.push({ name: "home" });
  });
};
</script>
