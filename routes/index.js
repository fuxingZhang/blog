/**
 * Created by zfx 
 */
const Router = require('koa-router')
const router  = new Router({
  prefix: '/api'
})
const model = require('../models/index.js')

const tagModel = model.tag
const articalModel = model.artical
const userModel = model.user

global.session = {}

tagModel.sync({force:false})
articalModel.sync({force:false})
userModel.sync({force:false})

router
.get('/tags',async ctx =>{
	let tags = await tagModel.findAll({
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
.get('/articals',async ctx =>{
	let page = parseInt(ctx.query.page)
	let pageSize = parseInt(ctx.query.pageSize)
	console.log(page,pageSize)
	let articals = await articalModel.findAndCountAll({
		limit: pageSize,
		offset: (page-1) * pageSize
	})
  ctx.body = articals
})
.get('/artical/:id',async ctx =>{
	let id = parseInt(ctx.params.id)
	let artical = await articalModel.findOne({
		where: {
			id
		}
	})
  ctx.body = artical
})
.post('/add', async ctx => {
	await userModel.create({
		name:"张复星",
		email:"502545703"
		password:"19871019"
	})
	ctx.body = "ok"
})
.post('/login', async ctx => {
	const data = ctx.request.body
	console.log('/login',data)	
	const email = data.email
	const password = data.password
	const user = await userModel.findOne({
		where: {
			email
		}
	})
	console.log('/login ==> user : ', JSON.stringify(user))
	if( !user ){
		ctx.throw(404,'帐号不存在')
	}
	console.log(user.password)
	if( password != user.password ){
		ctx.throw(401,'账户名与密码不匹配，请重新输入')
	}
	let token = { 
		email: email,
		id: new Date().getTime()
	}
	global.session[email] = token.id
	ctx.cookies.set('token-zfx', JSON.stringify(token) , { maxAge: 12*60*60*1000, httpOnly: true });
  ctx.body = {
  	name: user.name,
  	msg: '你好' + user.name + '，欢迎回来！'
  }
})

const middlewares = require('../utils/middlewares')
router.use(middlewares.checkLogin)

router
.post('/tag',async ctx =>{
	try{
		const tagName = ctx.request.body.tag
		await tagModel.create({tag: tagName})
	  console.log(tagName)
	  ctx.body = '标签添加成功'
	}catch(err){
		ctx.throw(500,err)
	}
})
.delete('/tag/:tag',async ctx =>{
	try{
		const tagName = ctx.params.tag
		await tagModel.destroy({where:{tag: tagName},force:true})
	  ctx.body = "标签删除成功"
	}catch(err){
		ctx.throw(500,err)
	}
})
.post('/artical',async ctx =>{
	try{
		const artical = ctx.request.body
		await articalModel.create(artical)
	  ctx.body = '文章添加成功'
	}catch(err){
		ctx.throw(500,err)
	}
})
.put('/artical/:id',async ctx =>{
	try{
		const id = ctx.params.id
		const artical = ctx.request.body
		await articalModel.update(artical,{
			where:{
				id
			}
		})
	  ctx.body = '文章修改成功'
	}catch(err){
		ctx.throw(500,err)
	}
})
.delete('/artical/:id',async ctx =>{
	try{
		const id = ctx.params.id
		await articalModel.destroy({where:{id: id},force:true})
	  ctx.body = "文章删除成功"
	}catch(err){
		ctx.throw(500,err)
	}
})
.post('/logout', async ctx =>{
	const cookie = ctx.cookies.get('token-zfx')
	if( cookie ){
		const user = JSON.parse( cookie )
		delete global.session[user.email]
		//删除cookie
		ctx.cookies.set('token-zfx', 'delete cookie', { maxAge: 5000, httpOnly: true });
	}
	ctx.body = '退出成功'
})

module.exports = router