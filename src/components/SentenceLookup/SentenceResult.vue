<template>

  <div v-if="sentenceData.category==='sentence'">

    <div class="sentence">
      <template v-for="element in sentenceData.elements" v-bind:element="element">

        <template v-if="element.type==='text'">
          <token v-for="token in element.tokens" :token="token" :wordStats="sentenceData.stats" :searchTerm="searchTerm" v-on:token-clicked="tokenClicked"></token>
        </template>

        <template v-else-if="element.type==='link'">
          <token v-for="token in element.tokens" :token="token" :wordStats="sentenceData.stats" :searchTerm="searchTerm" v-on:token-clicked="tokenClicked"></token><a :href="element.url">[link]</a>
        </template>

      </template>
    </div>

  </div>

  <span v-else>
      {{ sentenceData.order }}
  </span>

</template>

<script>

// Send message when viewed button is clicked. Listen for message in Document. Change sentence viewed status. Update encounter endpoint to allow adding all encounters up to sentence order

import Token from "@/components/SentenceLookup/Token.vue";
import {API_URL} from '@/env'

export default {
  name: "SentenceResult",
  components: {
      token: Token
  },
  props: ['sentenceData','searchTerm'],
  data () {
    return {
    }
  },
  methods:{
    tokenClicked: function(lexeme){
      this.$emit('token-clicked',lexeme)
    }
  }
};
</script>

<style scoped>

.sentence{
  line-height: 2;
  font-size: 1.1rem;
}

</style>