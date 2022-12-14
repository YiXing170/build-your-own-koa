// const delegate = require('delegates')
const proto = module.exports = {

}

/**
 * 作用是直接在ctx能访问到 response 或request的属性，如ctx.query 被代理成ctx.request.query
 *
 * 代理使用的包是delegate,我这里为了简化没做代理
 */

// delegate(proto, 'response')
//   .method('attachment')
//   .method('redirect')
//   .method('remove')
//   .method('vary')
//   .method('has')
//   .method('set')
//   .method('append')
//   .method('flushHeaders')
//   .access('status')
//   .access('message')
//   .access('body')
//   .access('length')
//   .access('type')
//   .access('lastModified')
//   .access('etag')
//   .getter('headerSent')
//   .getter('writable')

// /**
//  * Request delegation.
//  */

// delegate(proto, 'request')
//   .method('acceptsLanguages')
//   .method('acceptsEncodings')
//   .method('acceptsCharsets')
//   .method('accepts')
//   .method('get')
//   .method('is')
//   .access('querystring')
//   .access('idempotent')
//   .access('socket')
//   .access('search')
//   .access('method')
//   .access('query')
//   .access('path')
//   .access('url')
//   .access('accept')
//   .getter('origin')
//   .getter('href')
//   .getter('subdomains')
//   .getter('protocol')
//   .getter('host')
//   .getter('hostname')
//   .getter('URL')
//   .getter('header')
//   .getter('headers')
//   .getter('secure')
//   .getter('stale')
//   .getter('fresh')
//   .getter('ips')
//   .getter('ip')