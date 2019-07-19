<template>
  <div class="content has-text-left">

    <sentence v-for="sentence in sentences" v-bind:sentence="sentence" v-bind:info="info"></sentence>

  </div>
</template>

<script>

import apiCall from '@/utils/api'
import Sentence from "@/components/SentenceLookup/Sentence.vue";

export default {
  name: "SentenceLookup",
  components: {
    sentence: Sentence
  },
  props: ['info'],
  data () {
    return {
      sentences: null,
    }
  },
  computed: {
  },
  methods:{
  },
  mounted() {
    this.$root.$on('token-clicked',(lexeme) => {
      apiCall('word/'+lexeme+'/sentences/','get').then(data => {
        console.log('received response')
        this.info.term = lexeme
        this.sentences = data
      }).catch(error => {
        console.log(error)
      }).finally(() => {})
    })
  }
};

</script>