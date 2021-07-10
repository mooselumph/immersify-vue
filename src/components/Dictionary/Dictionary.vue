<template>

  <article class="message dictionary">
    <div class="message-header">
      <p>{{searchTerm}}</p>
      <button class="delete" aria-label="delete" v-on:click="$emit('close-dictionary')"></button>
    </div>
    <div class="message-body">

      <div class="nav">

        <div class="has-text-primary nextprev prev-button" v-on:click="prev" :class="{hide: selected == 0}"><div>&laquo;</div></div>
        <div class="nextprev-container">
          <transition :name="transitionName">
            <div v-for="(entry, index) in entries" v-if="index === selected" :key="index">
              <entry :entryData="entry"></entry>
            </div>
          </transition>
        </div>
        <div class="has-text-primary nextprev next-button" v-on:click="next" :class="{hide: selected+1 == entries.length}"><div>&raquo;</div></div>
      </div>

    </div>
  </article>

</template>

<script>

import apiCall from '@/utils/api'
import Entry from "@/components/Dictionary/Entry.vue";

export default {
  name: "Dictionary",
  props:['searchTerm'],
  components: {
    entry: Entry
  },
  data () {
    return {
      entries: [],
      selected: 0,
      transitionName: 'none'
    }
  },
  computed: {
  },
  methods:{
    getEntries: function(lexeme){
      apiCall('dict/'+lexeme+'/','get').then(data => {
          this.entries = data
        }).catch(error => {
          console.log(error)
        }).finally(() => {})
    },
    next: function(){
      this.transitionName = 'next'
      this.selected = Math.min(this.selected+1,this.entries.length-1)
    },
    prev: function(){
      this.transitionName = 'prev'
      this.selected = Math.max(this.selected-1,0)
    },
  },
  mounted(){
    this.getEntries(this.searchTerm)
  }
};

</script>

<style scoped>
  .dictionary{
    margin:1px;
  }
</style>
