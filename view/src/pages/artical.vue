<template>
	<div class="artical">
		<div class="wrap">
			<div class="box">
				<h2>{{data.title}}</h2>
				<div style="text-align: center">
					<i class="el-icon-date"></i>&nbsp;
					<span>{{data.created_at}}</span>&nbsp;&nbsp;&nbsp;
					<i class="iconfont zfx-comment"></i>&nbsp;
					<span>{{data.comment}} 条评论</span>
				</div>
				<div style="margin-top: 20px;">标签: 
					<el-tag v-for="(item,index) in data.tag" :key="index" type="danger">{{item}}</el-tag>&nbsp;&nbsp;&nbsp;
				</div>
				<p>摘要:{{data.summary}}</p>
				<div class="content" v-html="data.content" style="padding-bottom: 60px;"></div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
			data: {
				title: '标题',
				created_at:'2016-03-25',
				comment:'11',
				tag:[],
				summary:'摘要',
				content:'内容'
			}
		}
	},
	async created(){
		let res = await this.axios.get(`/artical/${this.$route.params.id}`)
		console.log(res,res.data.tag.split(','))
		this.data = {
			title: res.data.title,
			comment: '0',
			tag: res.data.tag.split(','),
			summary: res.data.summary,
			created_at: new Date(res.data.created_at).toLocaleString(),
			content: res.data.content
		}
	}
}

</script>

<style>
@import '../style/iconfont/iconfont.css';

.artical {
	padding: 30px 0 80px;
}
.artical .box {
	padding: 10px 30px;
	margin: 0 12%;
	background-color: #fff;
	border: 1px solid #DADADA;
	border-radius: 4px;
	box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
}
.artical .box>h2 {
	font-size: 26px;
	color: #444;
	transition: all 0.3s;
	margin-top: 30px;
	margin-bottom: 30px;
	cursor: pointer;
	text-align: center;
}
.artical .box>p {
	color: #555;
	font-size: 14px;
	line-height: 2;
	margin: 30px 0;
}
.artical .box>div {
	font-size: 13px;
	color: #6B6B6B;
}
.artical .box .el-tag--danger {
	padding: 0 10px !important;
	margin-left: 20px !important;
  height: 32px;
  line-height: 30px;
}
@media screen and (max-width: 375px) {
	.artical {
		padding: 20px 0;
	}
	.artical .box {
		padding: 10px;
		margin: 0;
	}
}
</style>
