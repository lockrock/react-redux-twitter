const Koa = require('koa')
const cors = require('koa2-cors')
const app = new Koa()
const router = require('koa-router')()
const Twitter = require('twitter-node-sdk')

Twitter.prototype.search = function (args) {
    const path = "/search/tweets.json"
         + this.buildQS(
                Object.assign({
                    result_type: "mixed",
                    count: 4
                }, args),
            );
    const url = this.baseUrl + path
    return new Promise((resolve, reject) => {
        this.doRequest(url, reject, resolve)
    })
}

var config = {
    consumerKey: '4muRkCj7PEeK0rD7T9KGQyTz0',
    consumerSecret: 'YJw8V0MKtCXBy5kZGxNOmeBwxLN5nvcwmyQLpMtPIaBTTbLJUs',
    accessToken: '3355249732-ZvSC5JWOPc9JXoHP0F0gLaV4jHQgvfBKm8z13ZB',
    accessTokenSecret: 'qHTwwv10IcDYkIMfqwTdVAo41h0OKaGleZ5M9jK2HgjpV',
    callBackUrl: 'http://127.0.0.1:3000'
};
const twitter = new Twitter(config)

router.get('/search/', async function (context, next) {
    const { q, since_id, count } = context.request.query
    var query = { q }
    if(since_id) query.since_id = since_id
    if(count) query.count = count
    context.body = (await twitter.search(query))
    console.log(context.body)
    await next()
})
app .use(cors())
    .use(router.routes())
    .use(router.allowedMethods())

console.log('server listening on port 5000')

app.listen(5000)