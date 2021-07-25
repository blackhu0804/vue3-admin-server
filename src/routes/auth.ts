import Router from '@koa/router'
import { registerController, loginController } from '../controller/auth'
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

export default router