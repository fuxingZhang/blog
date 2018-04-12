<template>
  <div  class="admin" v-show="!loading">
    <div class="card">
      <p class="label">标题</p>
      <el-input
        placeholder="请输入标题"
        v-model="title"
        clearable>
      </el-input>
      <p class="label">标签</p>
      <el-select v-model="tag" multiple placeholder="请选择标签" style="width: 100%;">
        <el-option
          v-for="(item,index) in tags"
          :key="index"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <p class="label">摘要</p>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 6}"
        placeholder="请输入摘要"
        v-model="summary">
      </el-input>
      <p class="label">内容</p>
      <div  ref="editor" style="text-align:left"></div>
      <div style="margin:25px 0 10px;text-align: center">
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button type="primary" @click="remove">删除</el-button>
      </div>
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
      loading:true,
      id:1,
      tags:[],
      title:'',
      tag:'',
      summary:'',
      content: '',
      editor:null
    }
  },
  async created(){
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    let tags = await API.getTags()
    this.tags = tags.data.tags
    let {data} = await API.getArtical(this.$route.params.id)
    console.log(data)
    this.id = data.id
    this.title = data.title,
    this.tag = data.tag.split(','),
    this.summary = data.summary,
    this.content = data.content
    this.editor.txt.html(this.content)
    this.loading = false
    loading.close();
  },
  methods: {
    async submit() {
      let res = await API.upadteArtical(this.id, {
        title:this.title,
        tag:this.tag.join(),
        summary:this.summary,
        content:this.content
      })
      this.$message({
        showClose: true,
        message: res.data,
        type: res.status == 200 ? 'success' : 'error'
      });
    },
    async remove() {
      let res = await API.removeArtical(this.id)
      this.$message({
        showClose: true,
        message: res.data,
        type: res.status == 200 ? 'success' : 'error'
      });
      if(res.status == 200){
        this.$router.go(-1)
        //window.history.go(-1)
        //window.history.back()
      }
    }
  },
  mounted() {
    let editor = this.editor = new E(this.$refs.editor)
    editor.customConfig.onchange = (html) => {
      this.content = html
    }
    editor.customConfig.uploadImgShowBase64 = true
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
  margin-bottom: 40px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 1px;
  box-shadow: 0 5px 10px rgba(0,0,0,.1);
  padding: 15px;
}
.admin p.label{
  font-size: 14px;
  padding: 10px 0;
}
.el-select-dropdown.el-popper.is-multiple {
  z-index: 10008 !important;
}
.el-button--primary {
  background-color:#2a3f54;
  border-color:#2a3f54;
}
.el-button--primary:hover{
  background-color: #192632;
    border-color: #0d141a;
}
</style>
