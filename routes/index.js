/**
 * Created by zfx 
 */
const Router = require('koa-router')
const router  = new Router({
  prefix: '/api'
})
const model = require('../models/index.js')

const tag = model.tag

global.session = {}

tag.sync({force:true})

router
.get('/tags',async ctx =>{
	let tags = await tag.findAll({
	  attributes: ['tag']
	})
	tags = tags.map( item =>{
		return item.tag
	})
  console.log(JSON.stringify(tags))
  ctx.body = {
  	tags
  }
})
.post('/tag',async ctx =>{
	try{
		const tagName = ctx.request.body.tag
		await tag.create({tag: tagName})
	  console.log(tagName)
	  ctx.body = '标签添加成功'
	}catch(err){
		ctx.throw(500,err)
	}
})
.delete('/tag/:tag',async ctx =>{
	try{
		const tagName = ctx.params.tag
		await tag.destroy({where:{tag: tagName},force:true})
	  ctx.body = "标签删除成功"
	}catch(err){
		ctx.throw(500,err)
	}
})

module.exports = router