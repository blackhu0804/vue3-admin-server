import Router from "@koa/router"
import { allocUserRoleController, getAllUserController, removeUserController, updateUserController } from "../controller/user"

const router = new Router({
    prefix: '/api/user'
})

// 获取用户列表
router.get('/', async (ctx: any) => {
    const { pageNum = 0, pageSize = 10, ...query } = ctx.request.query
    ctx.body = await getAllUserController({
        offset: +pageNum,
        limit: +pageSize,
        query
    })
})

// 编辑用户
router.put('/:id', async (ctx: any) => {
    const { id } = ctx.params
    ctx.body = await updateUserController(+id, ctx.request.body)
})

// 删除用户
router.delete('/:id', async (ctx: any) => {
    const { id } = ctx.params
    ctx.body = await removeUserController(+id)
})

router.post('/role/:id', async ctx => {
    const { id } = ctx.params
    const { roles } = ctx.request.body as any
    ctx.body = await allocUserRoleController(+id, roles)
})

export default router