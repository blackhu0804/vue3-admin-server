import Router from '@koa/router'
import { registerController, loginController, UserInfoController } from '../controller/auth'
import { RegisterModel } from '../db/models/user'

const router = new Router({
  prefix: '/api/auth'
})

router.get('/test', async ctx => {
  ctx.body = 'auth test router'
})

router.post('/register', async ctx => {
  ctx.body = await registerController(ctx.request.body as RegisterModel)
})

router.post('/login', async (ctx: any) => {
  const { username, password } = ctx.request.body
  ctx.body = await loginController({ username, password })
})

router.post('/info', async (ctx: any) => {
  const token = ctx.header.authorization || ctx.request.body.token
  ctx.body = await UserInfoController(token)
})

export default router