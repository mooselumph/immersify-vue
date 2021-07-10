<template>
  <div class="content has-text-left">

    <p v-for="p in paragraphs">
        <sentence v-for="sentence in p" :sentenceData="sentence" :wordStats="articleInfo.stats" v-on:viewed="sentenceViewed"></sentence>
    </p>

  </div>
</template>

<script>


import Sentence from "@/components/Document/Sentence.vue";
import apiCall from '@/utils/api'

export default {
  name: "Document",
  components: {
      sentence: Sentence
  },
  props: ['articleInfo'],
  data () {
    return {
    }
  },
  computed: {
    paragraphs: function () {
      var ps = [];
      var p = [];
      for (var i in this.articleInfo.sentences){
        var s = this.articleInfo.sentences[i]
        if (s.category == "paragraph" && p.length > 0){
          ps.push(p);
          p = []
        }else{
          p.push(s)
        }
      }
      return ps;
    }
  },
  methods:{
    sentenceViewed: function(order){
       apiCall('encounter/article/'+this.articleInfo.id+'/sentence/'+order+'/','post',{cumulative:true}).then(data => {
        for (var i =0; i<=order; i++){
          this.articleInfo.sentences[i].viewed = true;
        }        
      }).catch(error => {
        console.log(error)
      }).finally(() => {})
    }
  },

};

</script>

<style>

</style>
