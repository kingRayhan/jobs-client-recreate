<template>
  <form
    action="#"
    @submit.prevent="handleSubmit"
    class="flex flex-col items-start gap-4 p-3 mx-auto md:w-6/12"
  >
    <h1 class="text-xl font-semibold text-slate-700">Register</h1>

    <Input
      v-model="form.name"
      label="Name"
      name="name"
      type="text"
      :helperText="getErrorMessage('name')"
      :hasError="Boolean(getErrorMessage('name'))"
    />

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

    <Input
      v-model="form.password_confirmation"
      label="Confirm Password"
      name="password_confirmation"
      type="password"
      :helperText="getErrorMessage('password_confirmation')"
      :hasError="Boolean(getErrorMessage('password_confirmation'))"
    />

    <Button :loading="loading">Register</Button>
  </form>
</template>

<script setup>
import { reactive, ref } from "vue";
import Input from "@/components/Form/Input.vue";
import Button from "@/components/Form/Button.vue";
import useForm from "@/hooks/useForm";
import { useRouter } from "vue-router";

const router = useRouter();

const { loading, getErrorMessage, submitForm } = useForm();

const form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const handleSubmit = async () => {
  submitForm(form, "/api/auth/register").then((res) => {
    router.push({ name: "auth.login" });
  });
};
</script>
