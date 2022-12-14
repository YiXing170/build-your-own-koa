const Koa = require('../application')
const fs = require('fs')
const path = require('path')

const app = new Koa()

app.use((ctx) => {
  console.log(ctx.url, ctx.req.url);
  ctx.body = fs.readFileSync(path.join(__dirname, './index.html'), 'utf-8')

})

app.listen(3000, () => {
  console.log('启动')
})