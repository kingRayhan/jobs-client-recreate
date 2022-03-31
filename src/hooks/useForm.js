import { ref } from "vue";
import api from "@/helpers/api";

const useForm = () => {
  const errors = ref([]);
  const loading = ref(false);

  const getErrorMessage = (key) => {
    return errors.value[key]?.join(" ") || null;
  };

  const submitForm = (payload, endpoint, method = "post") => {
    errors.value = [];
    loading.value = true;

    return new Promise(async (resolve) => {
      const { ok, data, originalError } = await api[method](endpoint, payload);
      if (ok) {
        resolve(data);
      } else {
        errors.value = originalError.response.data.errors;
      }

      loading.value = false;
    });
  };

  return {
    submitForm,
    loading,
    getErrorMessage,
  };
};

export default useForm;
