<template>
  <div class="article">

    <div class="box content" :class="{child:!isBase}">

      <div class="nav">
        <div v-if="hasPrev" class="has-text-primary nextprev prev-button" v-on:click="$emit('prev-article')"><div>&laquo;</div></div>
        <div class="nextprev-container">
          <h6 class="source">
            <template v-if="articleData.id==sourceInfo.articleId">
              This article
            </template> 
            <template v-else>
              <a :href="articleUrl">{{articleData.title}}</a>
            </template> 
          </h6>
        </div>
        <div v-if="hasNext" class="has-text-primary nextprev next-button" v-on:click="$emit('next-article')"><div>&raquo;</div></div>
      </div>

      <div class="nav">

        <div class="has-text-primary nextprev prev-button" v-on:click="prev" :class="{hide: selected == 0}"><div>&laquo;</div></div>
        <div class="nextprev-container">
          <transition :name="transitionName">
            <div v-for="(sentence, index) in sentences" v-if="index === selected" :key="index">
              <sentence :sentenceData="sentence" :searchTerm="searchTerm" v-on:token-clicked="addChildLookup"></sentence>
              <div style="float:right">({{selected+1}} of {{articleData.count}})</div>
            </div>
          </transition>
        </div>
        <div class="has-text-primary nextprev next-button" v-on:click="next" :class="{hide: selected+1 == articleData.count}"><div>&raquo;</div></div>

      </div>
    </div>

    <div v-if="hasChild">
      <sentence-lookup :sourceInfo="{articleId:sourceInfo.articleId,searchTerm:childTerm}" :isBase="false"></sentence-lookup>
    </div>

  </div>
</template>

<script>

import apiCall from '@/utils/api'
import Sentence from "@/components/SentenceLookup/SentenceResult.vue";

export default {
  name: "ArticleResult",
  components: {
    sentence: Sentence,
    'sentence-lookup': () => import('@/components/SentenceLookup/SentenceLookup.vue')
  },
  props: ['sourceInfo','articleData','searchTerm','isBase','hasNext','hasPrev'],
  data () {
    return {
      sentences: null,
      limit: 5,
      selected: 0,
      transitionName: 'none',
      hasChild: false,
      childTerm: null,
    }
  },
  methods:{
    next: function(){
      var n = Math.min(this.selected+1,this.articleData.count-1)
      this.transitionName = 'next'
      if (this.selected+1 >= this.loaded){
        this.getSentences().then(() => {
          this.selected = n
        })
      }else{
        this.selected = n
      }
      this.hasChild = false
    },
    prev: function(){
      this.transitionName = 'prev'
      this.selected = Math.max(this.selected-1,0)
      this.hasChild = false
    },
    getSentences: function() {
      return new Promise((resolve, reject) => {
        apiCall('word/'+this.searchTerm+'/article/'+this.articleData.id+'/sentences/','get',{offset:this.loaded,limit:this.limit}).then(data => {
          this.sentences = this.sentences.concat(data.results)
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        }).finally()
      });
    },
    addChildLookup: function(lexeme){
      this.childTerm = lexeme
      this.hasChild = true
    }
  },
  computed: {
    articleUrl: function(){
      return '?#/article/' + this.articleData.id + '/'
    },
    loaded: function(){
      return this.sentences.length
    }
  },
  mounted(){
    this.sentences = this.articleData.selected_sentences
  }
};

</script>

<style scoped>

.article{
  margin: 1px 1px 20px 1px;
}

.box{
  margin-bottom: 0 !important;
}

.box:not(.child){
  margin-top: 1.5rem;
}

.child{

}

</style>