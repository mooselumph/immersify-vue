<template>
  <div class="hello">
    <h1>This is the login page.</h1>
  </div>
</template>

<script>
import LoginModal from "@/components/LoginModal.vue";

export default {
    name: "Login",
    mounted: function() {
        this.$modal.open({
            parent: this,
            component: LoginModal,
            hasModalCard: true,
            onCancel: () => this.$router.go(-1)
        })
    },
    beforeDestroy: function(){
        this.$root.$emit('closeLoginModal')
    }
};
</script>