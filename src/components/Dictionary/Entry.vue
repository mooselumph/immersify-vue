<template>
  <div class="content has-text-left">
    <div class="forms">
      <span v-for="(form,ii) in entryData.forms" class="form" :class="{common:isCommon(form.priority)}">
        {{form.characters}}<template v-if="ii<entryData.forms.length-1">,</template>
      </span>
    </div>
    <template v-for="(sense,ii) in entryData.senses">
      <div class="pos" v-if="sense.pos">{{sense.pos}}</div>
      <p>
        {{ii+1}}. 
        <span v-for="(gloss,jj) in sense.glosses">
          {{gloss.text}}<template v-if="jj<sense.glosses.length-1">;</template>
        </span>
        <span v-if="sense.field" class="field">{{sense.field}}</span>
        <span v-if="sense.misc" class="misc">{{sense.misc}}</span>
      </p>
    </template>
  </div>  
</template>

<script>

import apiCall from '@/utils/api'

export default {
  name: "Dictionary",
  components: {

  },
  props: ['entryData'],
  data () {
    return {
    }
  },
  computed: {
  },
  methods:{
    isCommon: function(priority){
      var labels = ['spec1','spec2','news1','news2','ichi1','ichi2','gai1','gai2']
      return labels.includes(priority)
    }
  }
};

</script>

<style scoped>
  .pos{
    color:#403844;
    font-size:0.7rem;
  }

  .field,.misc{
    margin-left:1em;
    color:#919191;
    font-size:0.8rem;
  }

  .forms{
    color:#403844;
    font-size:1.2rem;
    margin-bottom: 1em;
  }

  .form{
    margin-right:0.7em;
    white-space:nowrap;
    display: inline-block
  }

  .form.common{
    border-bottom: 1px solid rgba(121, 87, 213, 0.5);
  }
</style>
