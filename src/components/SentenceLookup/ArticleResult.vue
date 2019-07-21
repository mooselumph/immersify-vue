<template>
  <div class="article box">

    <h6 class="source">
      <div style="float:right">({{selected+1}} of {{article.count}})</div>
      <template v-if="article.id==info.id">
        This article
      </template> 
      <template v-else>
        <a :href="articleUrl">{{article.title}}</a>
      </template> 
    </h6>

    <div class="nav">

      <div class="has-text-primary nextprev prev-button" v-on:click="prev" :class="{hide: selected == 0}"><div>&laquo;</div></div>
      <div class="sentence-container">
        <transition :name="transitionName">
          <div v-for="(sentence, index) in sentences" v-if="index === selected" :key="index">
            <sentence :sentence="sentence" :info="info"></sentence>
          </div>
        </transition>
      </div>
      <div class="has-text-primary nextprev next-button" v-on:click="next" :class="{hide: selected+1 == article.count}"><div>&raquo;</div></div>

    </div>

  </div>
</template>

<script>

import apiCall from '@/utils/api'
import Sentence from "@/components/SentenceLookup/SentenceResult.vue";

export default {
  name: "ArticleResult",
  components: {
    sentence: Sentence
  },
  props: ['info','article'],
  data () {
    return {
      sentences: null,
      limit: 5,
      selected: 0,
      transitionName: 'next',
    }
  },
  methods:{
    next: function(){
      var n = Math.min(this.selected+1,this.article.count-1)
      this.transitionName = 'next'
      if (this.selected+1 >= this.loaded){
        this.getSentences().then(() => {
          this.selected = n
        })
      }else{
        this.selected = n
      }

    },
    prev: function(){
      this.transitionName = 'prev'
      this.selected = Math.max(this.selected-1,0)
    },
    getSentences: function() {
      return new Promise((resolve, reject) => {
        apiCall('word/'+this.info.term+'/article/'+this.article.id+'/sentences/','get',{offset:this.loaded,limit:this.limit}).then(data => {
          this.sentences = this.sentences.concat(data.results)
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        }).finally()
      });
    }
  },
  computed: {
    articleUrl: function(){
      return '?#/article/' + this.article.id + '/'
    },
    loaded: function(){
      return this.sentences.length
    }
  },
  mounted(){
    this.sentences = this.article.selected_sentences
  }
};

</script>

<style scoped>

.sentence-container{
  width: 100%;
  overflow: hidden;
  position: relative;
}

.next-leave-active, .next-enter-active,.prev-leave-active, .prev-enter-active{
  transition: transform 0.5s cubic-bezier(0.785, 0.135, 0.150, 0.860)
}

.next-enter,.prev-leave-to{
    transform: translate3d(100%, 0, 0);
    position: absolute;
    width: 100%
}

.next-leave-to,.prev-enter{
  transform: translateX(-100%);
  position: absolute;
  width: 100%
}

.nav{
  display:flex; 
  align-items: stretch;
}

.nextprev{
  position: relative;
  cursor: pointer;
  border:1px solid rgba(121, 87, 213, 0);
}

.nextprev.hide{
  visibility: hidden;
}

.nextprev:hover{
  border:1px solid rgba(121, 87, 213, 0.5);
}

.nextprev div{
  text-align: center;
  width: 20px;
  margin: 0;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.next-button{
  right: -0.7em;
}

.prev-button{
  left: -0.7em;
}


</style>