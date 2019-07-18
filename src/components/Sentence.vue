<template>

  <span v-if="sentence.category==='sentence'" class="sentence">
    <template v-for="element in sentence.elements" v-bind:element="element">

      <template v-if="element.type==='text'">
        <token v-for="token in element.tokens" v-bind:token="token"></token>
      </template>

      <template v-else-if="element.type==='link'">
        <token v-for="token in element.tokens" v-bind:token="token"></token><a v-bind:href="element.url">[link]</a>
      </template>

    </template>

    <a v-if="!sentence.viewed" v-on:click="$emit('viewed', sentence.order)" class="has-text-grey-lighter">&#10003</a>
  </span>

  <span v-else>
      {{ sentence.order }}
  </span>

</template>

<script>

// Send message when viewed button is clicked. Listen for message in Document. Change sentence viewed status. Update encounter endpoint to allow adding all encounters up to sentence order

import Token from "@/components/Token.vue";

export default {
  name: "Sentence",
  components: {
      token: Token
  },
  props: ['sentence'],
  data () {
    return {
    }
  },
};
</script>

<style>

</style>

.

</style>