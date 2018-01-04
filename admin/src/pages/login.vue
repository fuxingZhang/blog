<template>
  <div  class="login">
    <div class="card">
      <div class="title">登录</div>
      <div class="content">
        <el-row :gutter="15">
          <el-col :md="8" class="label">邮箱</el-col>
          <el-col :md="12" >
            <el-input v-model="email"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :md="8" class="label">密码</el-col>
          <el-col :md="12" >
            <el-input v-model="password" type="password"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :md="8" class="space">1</el-col>
          <el-col :md="12" >
            <el-checkbox v-model="checked" @change="save">记住我</el-checkbox>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :md="8" class="space">1</el-col>
          <el-col :md="12">
            <el-button type="primary" @click="submit">登录</el-button>
            <router-link to="/reset">
              <span style="padding-left:20px;color: #2a3f54;">忘记密码？</span>
            </router-link>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/API'
import CONFIG from '@/config'

export default {
  data(){
    return {
      email:'',
      password:'',
      checked:false,

    }
  } ,
  created(){
    if( localStorage.hasOwnProperty(CONFIG.remember) ){
      let data = localStorage.getItem(CONFIG.remember)
      data = JSON.parse( data )
      this.email = data.email
      this.password = data.password
      this.checked = true
    }
  },
  methods: {
    save(){
      console.log(this.email,this.password,this.checked)
      if( this.checked == false ){
        localStorage.removeItem(CONFIG.remember)
      }
    },
    async submit(){
      if( !this.email ){
        this.$message({
          showClose: true,
          message: '请输入邮箱',
          type: 'error'
        });
        return
      }
      const reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
      if( !reg.test(this.email) ){
        this.$message({
          showClose: true,
          message: '邮箱格式不正确',
          type: 'error'
        });
        return
      }
      if( !this.password ){
        this.$message({
          showClose: true,
          message: '请输入密码！',
          type: 'error'
        });
        return
      }
      if( this.password.length < 6 ){
        this.$message({
          showClose: true,
          message: '密码长度最少6位',
          type: 'error'
        });
        return
      }
      let res = await API.login({
        email: this.email,
        password: this.password
      })
      console.log(res)
      if( res.status == 200 ){
        localStorage.setItem('wjdc-user-name-zfx',res.data.name)    
        this.$router.push('/admin')
      }
      this.$message({
        showClose: true,
        message: res.status == 200 ? res.data.msg : res.data,
        type: res.status == 200 ? 'success' : 'error'
      });
      if ( res.status == 200 && this.checked == true ) {
        localStorage.setItem(CONFIG.remember,JSON.stringify({
          email: this.email ,
          password: this.password
        }))
      }
    }
  }
}
</script>

<style>
.login{
  padding-left: 15px;
  padding-right: 15px;  
}
.login .card{
  margin: 0 auto;
  margin-top: 30px;
  max-width: 750px;
  margin-bottom: 22px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 1px;
  box-shadow: 0 5px 10px rgba(0,0,0,.1);
}
.login .title{
  color: #333;
  background-color: #fff;
  padding: 10px 15px;
  font-size: 14px;
  border-bottom: 1px solid #d3e0e9;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
}
.login .content{
  padding: 15px;
}
.login .label{
  text-align: right;
  vertical-align: middle;
  line-height: 40px;
}
.login .el-row{
  margin-bottom: 15px;
}
.login .el-button--primary {
  background-color:#2a3f54;
  border-color:#2a3f54;
}
.login .el-button--primary:hover{
  background-color: #192632;
    border-color: #0d141a;
}
.login .space{
  color: transparent;
}
@media screen and ( max-width: 991px ){
  .login .label{
    text-align: left;
  }
  .login .space{
    display: none;
  }
}
</style>
