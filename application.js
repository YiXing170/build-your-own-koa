const http = require('http');
const stream = require('stream');
const EventEmitter = require('events');

const compose = require('./compose');
const request = require('./request');
const response = require('./response');
const context = require('./context');

module.exports = class Koa extends EventEmitter {
  constructor() {
    super();

    this.middlewares = [];
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }

  use(func) {
    if (!(typeof func === 'function')) {
      console.error('middleware must be a function.');
      return;
    }
    this.middlewares.push(func);
  }

  listen(...args) {

    const server = http.createServer(this.callback());
    return server.listen(...args);
  }

  callback() {
    const middlewaresFunc = compose(this.middlewares);

    return (req, res) => {
      const context = this.createContext(req, res);
      return this.handleRequest(context, middlewaresFunc);
    };
  }

  createContext(req, res) {
    const context = Object.create(this.context);
    const request = Object.create(this.request);
    const response = Object.create(this.response);
    context.request = response.request = request;
    context.response = request.response = response;
    context.res = this.res = request.res = response.res = res;
    context.req = this.req = request.req = response.req = req;
    context.app = this;
    return context;
  }

  handleRequest(ctx, middlewares) {
    // koa 自己对响应进行处理的中间件，相当于最后一个中间件
    const handleResponse = () => { responsed(ctx); };

    return middlewares(ctx).then(handleResponse).catch((err) => { console.log(err); });
  }

};

const emptyCode = [404, 500, 304, 204];

const responsed = function (ctx) {
  const res = ctx.res;
  const code = ctx.status;
  let body = ctx.body;

  if (emptyCode.includes(code)) {
    body = null;
    return res.end();
  }

  if (ctx.method === 'HEAD') {

    body = null;
    return res.end();
  }

  if (body == null) {
    body = ctx.status || null;
    console.log(body);

    return res.end(body);
  }

  if (Buffer.isBuffer(body)) return res.end(body);
  if ('string' === typeof body) return res.end(body);
  if (body instanceof stream) return body.pipe(res);

  body = JSON.stringify(body);

  return res.end(body);
};