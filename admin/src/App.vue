<template>
  <div id="app">
    <header-com></header-com>
    <router-view></router-view>
  </div>
</template>

<script>
import headerCom  from '@/components/header.vue'

export default {
  components: {
    headerCom
  },
  methods: {
  }
}
</script>

<style>
body{
  background-color: #f8f8f8;
}
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",Arial;
  line-height: 1.6;
  font-size: 14px;
  color: #34495e;
}
.btn{
  font-weight: 400;
  text-shadow: none;
  border-radius: 1px;
  color: #fff !important;
  background-color: #42b983;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  border: 1px solid #3ba676;
  padding: 6px 12px;
  user-select: none;
  cursor: pointer;
}
.btn:hover{
  background-color: #359368;
  border-color: #2b7956;
  outline: 0;
}
.list-box .btn-group {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 36px;
  line-height: 36px;
  -webkit-display: flex;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.list-box .btn-group a.btn-edit, .list-box .btn-group a.btn-produce {
  display: block;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  padding: 0 8px;
  color: #fff;
  text-align: center;
  text-decoration: none;
}
.list-box .btn-group a.btn-edit {
   background-color: #2a3f54;
}
.list-box .btn-group a.btn-produce {
    background-color: #f66;
}
.list-box .btn-group a.btn-edit:hover, .list-box .btn-group a.btn-produce:hover {
    opacity: .8;
}
.el-card__header {
  padding: 14px 20px;
}
.el-button--success {
  background-color: #42b983;
  border-color: #42b983;
}
.el-button--success:focus, .el-button--success:hover {
  background: #359368;
  border-color: #2b7956;
}
.el-button--success.is-disabled, .el-button--success.is-disabled:active, .el-button--success.is-disabled:focus, .el-button--success.is-disabled:hover {
  color: #fff;
  background-color: #42b983;
  border-color: #3ba676;
}
</style>
