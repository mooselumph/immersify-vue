<template>

  <span v-if="sentenceData.category==='sentence'" class="sentence">
    <template v-for="element in sentenceData.elements" v-bind:element="element">

      <template v-if="element.type==='text'"><!--
        --><token v-for="token in element.tokens" :token="token" :wordStats="wordStats"></token><!--
      --></template>

      <template v-else-if="element.type==='link'">
        <token v-for="token in element.tokens" :token="token" :wordStats="wordStats"></token><a v-bind:href="element.url">[link]</a>
      </template>

    </template>

    <a v-if="!sentenceData.viewed" v-on:click="$emit('viewed', sentenceData.order)" class="has-text-grey-lighter">&#10003</a>
  </span>

  <span v-else>
      {{ sentenceData.order }}
  </span>

</template>

<script>

// Send message when viewed button is clicked. Listen for message in Document. Change sentence viewed status. Update encounter endpoint to allow adding all encounters up to sentence order

import Token from "@/components/Document/Token.vue";

export default {
  name: "Sentence",
  components: {
      token: Token
  },
  props: ['sentenceData','wordStats'],
  data () {
    return {
    }
  }
};
</script>

<style scoped>

.sentence{
  line-height: 2;
  font-size: 1.3rem;
}

</style>