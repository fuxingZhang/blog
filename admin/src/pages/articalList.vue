<template>
  <div class="index">
  <!-- <div class="index" v-loading="loading"> -->
    <div class="wrap">
      <el-row>
        <el-col :xs="24" :sm="16" :md="16" :lg="16">
          <div class="left" v-for="(item,index) in items" :key="index">
            <router-link :to="'/admin/editArtical/' + item.id " >
              <h2>{{item.title}}</h2>
            </router-link>
            <div>
              <i class="el-icon-date"></i>&nbsp;
              <span>{{item.created_at}}</span>&nbsp;&nbsp;&nbsp;
              <i class="iconfont zfx-comment"></i>&nbsp;
              <span>{{item.comment}} 条评论</span>
            </div>
            <p>摘要:{{item.summary}}</p>
            <router-link :to="'artical/' + item.id " >
              <el-button type="danger">阅读全文</el-button>
            </router-link>
          </div>
          <!-- 分页 -->
          <div class="block fr">
            <el-pagination class="page-pc" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total,prev, pager, next, jumper" :total="total">
            </el-pagination>
            <el-pagination class="page-mobile" layout="prev, pager, next" :total="total">
            </el-pagination>
          </div>
        </el-col>
        <el-col :span="8" class="only-pc">
          <div class="right">
            <div>
              <div class="input">
                <el-input v-model="input" placeholder="请输入标题"></el-input>
              </div>
              <!--vue data和method 不能重名 -->
              <el-button type="danger" class="search" @click="search">
                <i class="el-icon-search"></i>
              </el-button>
              <h3>标签</h3>
              <ul>
                <li v-for="tag in tags" :key="tag" @click="filterTag(tag)" style="cursor: pointer;">{{tag}}</li>
              </ul>
            </div>
            <!-- <div>
              <h3>分类目录</h3>
              <ul>
                <li>前端</li>
                <li>后端</li>
                <li>数据库</li>
                <li>服务器</li>
                <li>搬运工</li>
                <li>读书收获</li>
                <li>生活兴趣</li>
                <li>VR全景</li>
              </ul>
            </div> -->
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import API from '@/API'

export default {
  data() {
    return {
      loading:true,
      tags:[],
      tag:'',
      title:'',
      input: '',
      currentPage: 1,
      total: 100,
      pageSize:10,
      page:1,
      items: [
        {
          id:1,
          title: '标题',
          created_at:'2016-03-25',
          comment:'11',
          summary:'Electron 是一个搭建跨平台桌面应用的框架，仅仅使用 JavaScript、HTML 以及 CSS，即可快速而容易地搭建一个原生应用。这对于想要涉及其他领域的开发者来说是一个非常大的福利。'
        }
      ]
    }
  },
  async created(){
    const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
    let [res_tags,res] = await Promise.all([API.get('/tags'), API.get(`/articals?pageSize=${this.pageSize}&page=${this.page}`)])
    this.tags = res_tags.data.tags
    this.total = res.data.count
    this.items = res.data.rows.map( artical => {
      return {
        id: artical.id,
        title: artical.title,
        comment: '0',
        summary: artical.summary,
        created_at: new Date(artical.created_at).toLocaleString()
      }
    })
    loading.close();
    // this.loading = false
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    async handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      let path = `/articals?pageSize=${this.pageSize}&page=${val}`
      if(this.tag) path += `&tag=${this.tag}`
      if(this.title) path += `&title=${this.title}`
      let res = await API.get(path)
      console.log(res)
      this.$message({
        showClose: true,
        message: res.status == 200 ? '数据刷新成功' : res.data,
        type: res.status == 200 ? 'success' : 'error'
      });
      if( res.status != 200 ) return
      this.total = res.data.count
      this.items = res.data.rows.map( artical => {
        return {
          title: artical.title,
          comment: '0',
          summary: artical.summary,
          created_at: new Date(artical.created_at).toLocaleString()
        }
      })
    },
    // vue data和method 不能重名
    async search() {
      let res = await API.get(`/articals?pageSize=${this.pageSize}&page=1&title=${this.input}`)
      this.$message({
        showClose: true,
        message: res.status == 200 ? '数据刷新成功' : res.data,
        type: res.status == 200 ? 'success' : 'error'
      });
      if( res.status != 200 ) return
      this.page = 0
      this.tag = ''
      this.title = this.input
      this.input = ''
      this.total = res.data.count
      this.items = res.data.rows.map( artical => {
        return {
          id: artical.id,
          title: artical.title,
          comment: '0',
          summary: artical.summary,
          created_at: new Date(artical.created_at).toLocaleString()
        }
      })
    },
    async filterTag(tag){
      let res = await API.get(`/articals?pageSize=${this.pageSize}&page=1&tag=${tag}`)
      this.$message({
        showClose: true,
        message: res.status == 200 ? '数据刷新成功' : res.data,
        type: res.status == 200 ? 'success' : 'error'
      });
      if( res.status != 200 ) return
      this.tag = tag
      this.title = ''
      this.page = 0
      this.total = res.data.count
      this.items = res.data.rows.map( artical => {
        return {
          id: artical.id,
          title: artical.title,
          comment: '0',
          summary: artical.summary,
          created_at: new Date(artical.created_at).toLocaleString()
        }
      })
    }
  }
}

</script>

<style>
@import '../css/iconfont/iconfont.css';

.index {
  padding: 40px 10% 80px;
}

/* left */

.index .left {
  background-color: #fff;
  border: 1px solid #DADADA;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
  padding: 45px 50px;
  margin-bottom: 50px;
}

.index .left h2 {
  font-size: 26px;
  color: #444;
  transition: all 0.3s;
  margin-bottom: 30px;
  cursor: pointer;
}

.index .left h2:hover {
  color: #DA4453;
}

.index .left>p {
  color: #555;
  font-size: 14px;
  line-height: 2;
  margin: 30px 0;
}

.index .left>div {
  font-size: 13px;
  color: #6B6B6B;
}

/* right */

.index .right .input {
  padding-right: 50px;
  margin-bottom: 20px;
}

.index .right .search {
  position: absolute;
  top: 31px;
  right: 30px;
}

.index .right {
  margin-left: 40px;
  padding: 30px;
  font-size: 14px;
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid #DADADA;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
}

.index .right>div {
  margin-bottom: 20px;
}

.index .right h3 {
  color: #636467;
  font-weight: bold;
  padding: 20px 0;
}

.index .right li {
  color: #999;
  padding-bottom: 15px;
}

@media screen and (max-width: 767px) {
  .only-pc {
    display: none;
  }
  .index .left {
    margin-bottom: 20px;
  }
}

.page-mobile {
  display: none;
}

@media screen and (max-width: 540px) {
  .page-pc {
    display: none;
  }
  .page-mobile {
    display: block;
  }
  .index {
    padding: 20px 15px 0;
  }
}

@media screen and (max-width: 375px) {
  .index .left {
    padding: 15px 15px 15px;
  }
}
</style>
