<template>

  <span v-if="element.type==='text'">
    <token v-for="token in element.tokens" v-bind:token="token"></token>
  </span>

  <span v-else-if="element.type==='link'">
    <token v-for="token in element.tokens" v-bind:token="token"></token><a v-bind:href="element.url">[link]</a>
  </span>

  <span v-else>
  </span>

</template>

<script>
import Token from "@/components/Token.vue";

export default {
  name: "Element",
  components: {
      token: Token
  },
  props: ['element'],
  data () {
    return {
    }
  },
};


</script>
