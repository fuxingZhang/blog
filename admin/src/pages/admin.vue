<template>
  <div  class="admin">
    <div class="card">
      <div id="editorElem" style="text-align:left"></div>
      <button v-on:click="getContent">查看内容</button>
    </div>
  </div>
</template>

<script>
import API from '@/API'
import E from 'wangeditor'

export default {
  name: 'editor',
  data () {
    return {
      editorContent: ''
    }
  },
  methods: {
    getContent: function () {
      alert(this.editorContent)
    }
  },
  mounted() {
    var editor = new E('#editorElem')
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    editor.create()
  }
}
</script>

<style>
.admin{
  padding-left: 15px;
  padding-right: 15px;  
}
.admin .card{
  margin: 0 auto;
  margin-top: 30px;
  max-width: 950px;
  margin-bottom: 22px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 1px;
  box-shadow: 0 5px 10px rgba(0,0,0,.1);
}
.admin .title{
  color: #333;
  background-color: #fff;
  padding: 10px 15px;
  border-bottom: 1px solid #d3e0e9;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  border-color: #d3e0e9;
}
.admin .content{
  padding: 15px;
}
.admin h1{
  font-size: 30px;
  font-weight: 500;
  line-height: 1.1;
}
</style>
