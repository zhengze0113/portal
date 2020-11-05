<template>
  <div id="app"></div>
</template>

<script>
import { loginApi } from "../../api/login";
import { isvalidUsername } from "../../utils/validate";
import {
  getLocation,
  removeLocation,
  getUserInfo,
  getUserName,
  getLastUserName,
  getUserLocation,
  removeUserLocation
} from "../../utils/auth";
import Cookies from "js-cookie";
export default {
  name: "App",

  data: function() {
    return {};
  },
  mounted() {},
  created() {
    this.handleLogin();
  },
  methods: {
    handleLogin(data) {
      this.loading = true;
      this.$store
        .dispatch("Login", data)
        .then(() => {
          this.loading = false;
          window.location.href = "/html";
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped></style>
