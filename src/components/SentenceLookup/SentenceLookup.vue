<template>
  <div class="content has-text-left">

    <article-result v-for="article in articles" v-bind:article="article" v-bind:info="info" :key="Math.random()"></article-result>

  </div>
</template>

<script>

import apiCall from '@/utils/api'
import ArticleResult from "@/components/SentenceLookup/ArticleResult.vue";

export default {
  name: "SentenceLookup",
  components: {
    'article-result': ArticleResult
  },
  props: ['info'],
  data () {
    return {
      articles: null,
      
    }
  },
  computed: {
  },
  methods:{
  },
  mounted() {
    this.$root.$on('token-clicked',(lexeme) => {
      apiCall('word/'+lexeme+'/articles/','get').then(data => {
        console.log('received response')
        this.info.term = lexeme
        this.articles = data.results
      }).catch(error => {
        console.log(error)
      }).finally(() => {})
    })
  }
};

</script>