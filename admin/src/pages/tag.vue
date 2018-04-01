<template>
  <div class="tag">
    <el-tag
      :key="tag"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">
      {{tag}}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  </div>
</template>

<script>
import API from '@/API'

export default {
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: ''
    };
  },
  async created(){
    let tags = await API.getTags()
    console.log(tags)
    this.dynamicTags = tags.data.tags
  },
  methods: {
    async handleClose(tag) {
      let res = await API.deleteTag(tag)
      if( res.status == 200 ){
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      }
      this.$message({
        showClose: true,
        message: res.data,
        type: res.status == 200 ? 'success' : 'error'
      });
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    async handleInputConfirm() {
      let inputValue = this.inputValue;
      console.log(inputValue)
      if (inputValue) {
        let res = await API.addTag(inputValue)
        if( res.status == 200 ){
          this.dynamicTags.push(inputValue);
        }
        console.log(res)
        this.$message({
          showClose: true,
          message: res.data,
          type: res.status == 200 ? 'success' : 'error'
        });
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
}
</script>

<style>
.tag{
	margin: 20px 20%;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
@media screen and (max-width: 767px) {
	.tag{
		margin: 15px;
	}
}
</style>