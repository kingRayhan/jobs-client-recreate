import api from "@/helpers/api";
import { defineStore } from "pinia";

const useAuthStore = defineStore("auth", {
  state() {
    return {
      user: null,
      loggedIn: false,
    };
  },
  actions: {
    boot() {
      return new Promise(async (resolve) => {
        const { ok, data } = await api.get("/api/auth/me");
        if (ok) {
          this.user = data;
          this.loggedIn = true;
        }
        resolve();
      });
    },
    async logout() {
      const { ok } = await api.post("/api/auth/logout");
      if (ok) {
        this.user = null;
        this.loggedIn = false;
        localStorage.removeItem("token");
      }
    },
  },
});

export default useAuthStore;
