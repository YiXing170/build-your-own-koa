/* 
  只写了一些属性，koa源码中还有很多其他http其他属性，
  koa初始版本中没有request.js和response.js文件，相关属性都是写在context.js中，
  后面版本对request和response的属性做了拆分，
  最终目的不变：将相关的属性代理到ctx上，能直接访问和修改

*/
const url = require('url')


module.exports = {

  get header() {
    return this.req.headers;
  },
  set header(value) {
    this.req.headers = value;
  },
  get headers() {
    return this.header;
  },
  set headers(value) {
    this.header = value;
  },
  get method() {
    return this.req.method;
  },
  set method(value) {
    this.req.method = value;
  },
  get url() {
    return this.req.url;
  },
  set url(value) {
    this.req.url = value;
  },
  get querystring() {
    return url.parse(this.url).search || '';
  },
  get query() {
    return url.parse(this.url).query || '';
  }
}