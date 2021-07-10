<template>

  <section v-if="errored">
    <p>We're sorry, communication with the API failed. Please try again later.</p>
  </section>

  <section v-else>
    <div v-if="loading">Loading...</div>

    <div v-else class="columns">
      <div class="column is-1"></div>
      <div class="column is-6">
        <div  class="section"></div>
        <document :articleInfo="articleInfo"></document>
      </div>
      <div class="column is-4">
        <div class="sidebar-holder">
          <sentence-lookup :sourceInfo="{articleId:articleInfo.id,wordStats:articleInfo.stats,searchTerm:null}" :isBase="true"></sentence-lookup>
        </div>
      </div>
      <div class="column is-1"></div>
    </div>

  </section>

</template>

<script>
import Document from "@/components/Document/Document.vue";
import SentenceLookup from "@/components/SentenceLookup/SentenceLookup.vue";

import apiCall from '@/utils/api'

export default {
    name: "Article",
    components: {
      document: Document,
      'sentence-lookup': SentenceLookup
    },
    data () {
    
    return {
      articleInfo: null,
      loading: 3,
      errored: false
    }
  },
  mounted () {
    
    apiCall('article/'+this.$route.params.id+'/','get').then(data => {
        this.articleInfo = data
        apiCall(this.articleInfo.sentences,'get',{},false).then(data => {this.articleInfo.sentences = data}).catch(error => {console.log(error);this.errored=true}).finally(() => this.loading -= 1)
        apiCall(this.articleInfo.words,'get',{},false).then(data => {this.articleInfo.stats = data.stats}).catch(error => {console.log(error);this.errored=true}).finally(() => this.loading -= 1)
      }).catch(error => {
        console.log(error)
        this.errored = true
      }).finally(() => this.loading -= 1)
  }
};


</script>

<style>
.sidebar-holder{
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: auto;
  padding: 60px 20px 1px 1px;
}

</style>