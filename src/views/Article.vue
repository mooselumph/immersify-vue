<template>

  <section v-if="errored">
    <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
  </section>

  <section v-else class="section">
    <div v-if="loading">Loading...</div>

    <div v-else class="columns">
      <div class="column is-1"></div>
      <div class="column is-6"><document v-bind:info="info"></document></div>
      <div class="column is-4">Sidebar</div>
      <div class="column is-1"></div>
    </div>

  </section>

</template>

<script>
import Document from "@/components/Document.vue";

import apiCall from '@/utils/api'

export default {
    name: "Article",
    components: {
      'document': Document,
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
        apiCall(this.info.words,'get',{},false).then(data => {this.info.words = data.words}).catch(error => {console.log(error);this.errored=true}).finally(() => this.loading -= 1)
      }).catch(error => {
        console.log(error)
        this.errored = true
      }).finally(() => this.loading -= 1)
  }
};


</script>
