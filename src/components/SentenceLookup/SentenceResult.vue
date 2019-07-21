<template>

  <div v-if="sentence.category==='sentence'">

    <div class="sentence">
      <template v-for="element in sentence.elements" v-bind:element="element">

        <template v-if="element.type==='text'">
          <token v-for="token in element.tokens" :token="token" :stats="sentence.stats" :term="info.term"></token>
        </template>

        <template v-else-if="element.type==='link'">
          <token v-for="token in element.tokens" :token="token" :stats="sentence.stats" :term="info.term"></token><a :href="element.url">[link]</a>
        </template>

      </template>
    </div>

  </div>

  <span v-else>
      {{ sentence.order }}
  </span>

</template>

<script>

// Send message when viewed button is clicked. Listen for message in Document. Change sentence viewed status. Update encounter endpoint to allow adding all encounters up to sentence order

import Token from "@/components/SentenceLookup/Token.vue";
import {API_URL} from '@/env'

export default {
  name: "Sentence",
  components: {
      token: Token
  },
  props: ['sentence','info'],
  data () {
    return {
    }
  },
};
</script>

<style scoped>

.sentence{
  line-height: 2;
  font-size: 1.1rem;
}

</style>