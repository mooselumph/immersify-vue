<template>
  <div class="has-text-left">

    <template v-if="isBase">
      <transition v-if="searchTerm" name="appear-basic">
        <div v-if="showDictionary" class="dictionary-holder" :key="searchTerm">
          <dictionary :searchTerm="searchTerm" v-on:close-dictionary="()=>{showDictionary=false}"></dictionary>
        </div>
        <div v-else class="main-search-term" key="term"><a v-on:click="toggleDictionary">"{{searchTerm}}"</a></div>
      </transition>
      <article-result v-for="article in articles" :articleData="article" :sourceInfo="sourceInfo" :searchTerm="searchTerm" :key="refreshCode+article.id" :isBase="true"></article-result>
    </template>

    <div v-else class="nav">

      <div class="nextprev-container">
        <transition v-if="searchTerm" name="appear-basic">
          <div v-if="showDictionary" class="lookup-connector dictionary-holder" :key="searchTerm">
            <dictionary :searchTerm="searchTerm" v-on:close-dictionary="()=>{showDictionary=false}"></dictionary>
          </div>
          <div v-else :key="refreshCode" class="lookup-connector search-term"><a v-on:click="toggleDictionary">"{{searchTerm}}"</a></div>
        </transition>
        <transition :name="transitionName">
          <div v-for="(article, index) in articles" v-if="index === selected" :key="refreshCode+article.id">
            <article-result :articleData="article" :sourceInfo="sourceInfo" :searchTerm="searchTerm" 
            :hasPrev="selected > 0" :hasNext="selected+1 < articles.length" :key="article.id"
            v-on:prev-article="prev" v-on:next-article="next"></article-result>
          </div>
        </transition>
      </div>

    </div>

  </div>
</template>

<script>

import apiCall from '@/utils/api'
import ArticleResult from "@/components/SentenceLookup/ArticleResult.vue";
import Dictionary from "@/components/Dictionary/Dictionary.vue";

export default {
  name: "SentenceLookup",
  components: {
    'article-result': ArticleResult,
    dictionary: Dictionary,
  },
  props: ['sourceInfo','isBase'],
  data () {
    return {
      searchTerm: null,
      articles: [],
      selected: 0,
      transitionName: 'appear',
      refreshCode: Math.random(),
      showDictionary: false,
    }
  },
  computed: {
  },
  watch:{
    sourceInfo: function (val) {
      this.getArticles(val.searchTerm)
    },
  },
  methods:{
    getArticles: function(lexeme){
      apiCall('word/'+lexeme+'/articles/','get').then(data => {
          this.searchTerm = lexeme
          this.articles = data.results
          this.selected = 0
          this.transitionName = 'appear'
          var stat = this.sourceInfo.wordStats[lexeme]
          this.showDictionary = !stat || stat < 5
          this.refreshCode = Math.random()
        }).catch(error => {
          console.log(error)
        }).finally(() => {})
    },
    next: function(){
      this.transitionName = 'next'
      this.selected = Math.min(this.selected+1,this.articles.length-1)
    },
    prev: function(){
      this.transitionName = 'prev'
      this.selected = Math.max(this.selected-1,0)
    },
    toggleDictionary: function(){
      this.showDictionary = !this.showDictionary
    }
  },
  mounted() {
    if (this.isBase){
      this.$root.$on('token-clicked-article',(lexeme) => {
        this.getArticles(lexeme)
      })
    }else{
      this.getArticles(this.sourceInfo.searchTerm)
    }
  }
};

</script>

<style scoped>

  .lookup-connector{
    background-image: linear-gradient(rgb(134, 134, 134), rgb(134, 134, 134));
    background-size: 2px 100%;
    background-repeat: no-repeat;
    background-position: center center;
    padding-top: 1em;
    padding-bottom: 1em;
  }

  .main-search-term{
    text-align: center;
    position: relative;
    top: 0.5em;
  }

  .search-term{
    height: 2.5em;
    position: relative;
  }

  .search-term a{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background-color: white;
  }

  .appear-basic-enter-active{
    transition: opacity 0.3s cubic-bezier(0.785, 0.135, 0.150, 0.860);
  }

  .appear-basic-enter-active{
    transition: opacity 0.1s cubic-bezier(0.785, 0.135, 0.150, 0.860);
  }

  .appear-basic-enter,.appear-basic-leave-to{
    position: absolute;
    width: 100%;
    opacity: 0;
  }


</style>