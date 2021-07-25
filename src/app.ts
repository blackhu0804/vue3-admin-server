import Koa from 'koa'
import cors from '@koa/cors'
import logger from 'koa-logger'
import bodyparser from 'koa-bodyparser'
import authRoutes from './routes/auth'
import { jwtSecret } from './config/auth'
import jwt from 'koa-jwt'

const app = new Koa()

// middleware
app.use(cors())
app.use(bodyparser({ // 解析请求体
  enableTypes: ['json', 'form', 'text']
}))
app.use(logger())

app.use((ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        error: '未登录 token 失效'
      }
    } else {
      ctx.throw(err)
    }
  })
})

// token 验证未携带token 直接返回401
app.use(jwt(({ secret: jwtSecret })).unless({
  path: ['/api/auth/login', '/api/auth/register']
}))

// routes
app.use(authRoutes.routes()).use(authRoutes.allowedMethods())

const port = process.env.PORT || '3000'
app.listen(port, () => {
  console.log(`server listening on ${port}`)
})

app.on('error', (err) => {
  console.log('server error', err)
})