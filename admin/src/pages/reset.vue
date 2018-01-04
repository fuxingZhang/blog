<template>
  <div  class="reset">
    <div class="card">
      <div class="title">重置密码</div>
      <div class="content">
        <el-row :gutter="15">
          <el-col :md="8" class="label">邮箱</el-col>
          <el-col :md="12" >
            <el-input v-model="email"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :md="8" class="space">1</el-col>
          <el-col :md="12">
            <el-button type="primary">发送密码重置链接</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/API'

export default {
  data(){
    return {
      email:''
    }
  } ,
  created(){
    
  },
  methods: {
  }
}
</script>

<style>
.reset{
  padding-left: 15px;
  padding-right: 15px;  
}
.reset .card{
  margin: 0 auto;
  margin-top: 60px;
  max-width: 610px;
  margin-bottom: 22px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 1px;
  box-shadow: 0 5px 10px rgba(0,0,0,.1);
}
.reset .title{
  color: #333;
  background-color: #fff;
  padding: 10px 15px;
  font-size: 14px;
  border-bottom: 1px solid #d3e0e9;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}
.reset .content{
  padding: 15px;
}
.reset .label{
  text-align: right;
  vertical-align: middle;
  line-height: 40px;
}
.reset .el-row{
  margin-bottom: 15px;
}
.reset .el-button--primary {
  background-color:#2a3f54;
  border-color:#2a3f54;
}
.reset .el-button--primary:hover{
  background-color: #192632;
    border-color: #0d141a;
}
.reset .space{
  color: transparent;
}
@media screen and ( max-width: 991px ){
  .reset .label{
    text-align: left;
  }
  .reset .space{
    display: none;
  }
}
</style>
