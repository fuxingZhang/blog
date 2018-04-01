module.exports = {
  async crossOrigin(ctx, next) {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Content-Length, Accept, X-Requested-With,x-access-token,x-admin-token"
    );
    ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");

    if (ctx.method.toUpperCase() === "OPTIONS") {
      ctx.status = 200;
    } else {
      await next();
    }
  },
  async checkLogin(ctx, next) {
    console.log('checkLogin', ctx.cookies.get('token-zfx'))
    let token = ctx.cookies.get('token-zfx')
    if( !token ){
      ctx.throw(401,'unauthorized')
    }
    token = JSON.parse( token )
    let email = token.email
    if( token.id != global.session[email] ){
      ctx.throw(401,'登陆状态已失效，请重新登录')
    }

    await next()
  }
}
