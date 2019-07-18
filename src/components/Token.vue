<template>

  <span>
      {{ word }}
  </span>

</template>

<script>

export default {
  name: "Token",
  props: ['token'],
  data () {
    return {
    }
  },
  computed: {
    word: function () {
      return this.token.split(',')[0]
    }
  }
};


</script>
