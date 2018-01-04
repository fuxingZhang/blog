<template>
	<div class="account">
    <el-table
      v-if="tableData.length > 0"
      :data="tableData"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>  
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改帐号" :visible.sync="dialogFormVisible" center>
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="form.confirm" type="password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
	</div>
</template>

<script>
import API from '@/API'

export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: '',
        email:'',
        password:'',
        confirm:'',
        oldEmail:''
      },
      index:0,
      formLabelWidth: '80px'
    }
  },
  async created(){
    let res = await API.getUsers()
    console.log(res)
    if( res.status != 200 ){
      this.$message({
        showClose: true,
        message: res.data,
        type: 'error'
      });
      return
    }
    const users = res.data
    for( let key in users ){
      this.tableData.push(users[key])
    }
    console.log(this.tableData)
  },
  methods: {
    async handleEdit(index, row) {
      console.log(index, row);
      this.form.name = row.name
      this.form.email = row.email
      this.form.password = ''
      this.form.confirm = ''
      this.form.oldEmail = row.email,
      this.dialogFormVisible = true
      this.index = index
    },
    async handleDelete(index, row) {
      console.log(index, row)
      let confirm = await this.$confirm('此操作将永久删除邮箱帐号：'+row.email+'，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).catch( (err) =>{
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
      if( !confirm ) return
      let res = await API.deleteUser({
        email: row.email
      })
      console.log(res)
      if( res.status == 200 ){
        this.tableData = this.tableData.filter((item,i)=>{
          return i != index
        })
      }
      this.$message({
        showClose: true,
        message: res.status == 200 ? res.data : res.statusText,
        type: res.status == 200 ? 'success' : 'error'
      });
    },
    async submit(){
      if( !this.form.name ){
        this.$message({
          showClose: true,
          message: '请输入姓名！',
          type: 'error'
        });
        return
      }
      if( !this.form.email ){
        this.$message({
          showClose: true,
          message: '请输入邮箱！',
          type: 'error'
        });
        return
      }
      const reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
      if( !reg.test(this.form.email) ){
        this.$message({
          showClose: true,
          message: '邮箱格式不正确',
          type: 'error'
        });
        return
      }
      if( !this.form.password ){
        this.$message({
          showClose: true,
          message: '请输入密码！',
          type: 'error'
        });
        return
      }
      if( this.form.password.length < 6 ){
        this.$message({
          showClose: true,
          message: '密码长度最少6位',
          type: 'error'
        });
        return
      }
      if( this.form.password != this.form.confirm ){
        this.$message({
          showClose: true,
          message: '两次输入的密码不相同！',
          type: 'error'
        });
        return
      }
      let res =  await API.updateUser(this.form)
      console.log(res)
      if( res.status == 200 ){
        this.dialogFormVisible = false
        this.tableData[this.index].name = this.form.name
        this.tableData[this.index].eamil = this.form.email
        this.tableData[this.index].password = this.form.password
      }
      this.$message({
        showClose: true,
        message: res.status == 200 ? res.data : res.statusText,
        type: res.status == 200 ? 'success' : 'error'
      });
    }
  }
}
</script>

<style>
.account{
	margin: 20px 20%;
}
.account .el-dialog {
  width: 400px;
}
.account .el-table__body-wrapper {
  overflow: hidden;
  position: relative;
}
@media screen and (max-width: 767px) {
	.account{
		margin: 15px;
	}
  .account .el-dialog {
    width: 90%;
  }
}
</style>