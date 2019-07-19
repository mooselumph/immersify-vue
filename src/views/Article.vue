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
        <document v-bind:info="info"></document>
      </div>
      <div class="column is-4">
        <div class="sidebar-holder">
          <sentence-lookup v-bind:info="{id:info.id,term:null}"></sentence-lookup>
          <dictionary></dictionary>
        </div>
      </div>
      <div class="column is-1"></div>
    </div>

  </section>

</template>

<script>
import Document from "@/components/Document/Document.vue";
import Dictionary from "@/components/Dictionary.vue";
import SentenceLookup from "@/components/SentenceLookup/SentenceLookup.vue";

import apiCall from '@/utils/api'

export default {
    name: "Article",
    components: {
      document: Document,
      dictionary: Dictionary,
      'sentence-lookup': SentenceLookup
    },
    data () {
    
    return {
      info: null,
      loading: 3,
      errored: false
    }
  },
  mounted () {
    
    apiCall('article/'+this.$route.params.id+'/','get').then(data => {
        this.info = data
        apiCall(this.info.sentences,'get',{},false).then(data => {this.info.sentences = data}).catch(error => {console.log(error);this.errored=true}).finally(() => this.loading -= 1)
        apiCall(this.info.words,'get',{},false).then(data => {this.info.stats = data.stats}).catch(error => {console.log(error);this.errored=true}).finally(() => this.loading -= 1)
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