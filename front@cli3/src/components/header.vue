<template>
  <div class="header">
    <div class="wrap">
        <router-link to="/">
            <h1>张复星的博客</h1>
        </router-link>
        <div class="fr pc">
            <router-link to="/">首页</router-link>
            <a href="https://github.com/fuxingZhang" target="_blank">GitHub</a>
            <router-link to="/about">关于</router-link>
        </div>
        <div class="fr btn-mobile">
            <button @click="display=!display">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        <div class="fr mobile" v-show="display">
            <router-link to="/"><span @click="display=!display">首页</span></router-link>
            <a href="https://github.com/fuxingZhang" target="_blank"><span @click="display=!display">GitHub</span></a>
            <router-link to="/about"><span @click="display=!display">关于</span></router-link>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
        return {
            display:false,
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      displayChange(){
          this.display = !this.display
      }
    }
  }
</script>

<style>
.header{
    background: #2c3e50;
    color: #fff;
    padding: 30px 0;
    flex: 0 0 auto;
}
.header h1{
		color:#fff;
    font-size: 22px;
    font-weight: 500;
    display: inline-block;
    font-family: "Hiragino Sans GB";
}
.header .fr{
    padding-top: 5px;
}
.header .pc a{
    font-size:14px;
    padding: 10px 20px;
    border-radius: 3px;
    color: #fff;
}
.header .pc a:hover{
    background:#fff;
    color: #2c3e50;
}
.header .btn-mobile{
    display: none;
}
@media screen and (max-width: 767px) {
    .header .pc{
        display: none;
    }
    .header .mobile{
        width: 100%;
        border-top: 1px solid #ddd;
        margin-top: 20px;
    }
    .header .mobile span{
        width: 100%;
        display: block;
        font-size:14px;
        padding: 20px 0 20px;
        border-radius: 3px;
        color: #fff;
        border-bottom: 1px dashed #ddd;
    }
    .header .btn-mobile{
        display: block;
        margin-top: -10px;
    }
    .header .btn-mobile button{
        margin-top: 2px;
        padding: 9px 10px;
        background: transparent;
        border: none;
    }
    .header .btn-mobile button span{
        display: block;
        width: 22px;
        height: 2px;
        background: #eee;
        border-radius: 1px;
    }
    .header .btn-mobile button span+span{
        margin-top: 4px;
    }
}
</style>
