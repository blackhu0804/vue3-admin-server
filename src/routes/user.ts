import Router from "@koa/router"
import { getAllUserController, removeUserController, updateUserController} from "../controller/user"

const router = new Router({
    prefix: '/api/user'
})

router.get('/', async (ctx: any) => {
    const { pageNum = 0, pageSize = 10, ...query } = ctx.request.query
    ctx.body = await getAllUserController({
        offset: +pageNum,
        limit: +pageSize,
        query
    })
})


router.put('/:id', async (ctx: any) => {
    const { id } = ctx.params
    ctx.body = await updateUserController(+id, ctx.request.body)
})

router.delete('/:id', async (ctx: any) => {
    const { id } = ctx.params
    ctx.body = await removeUserController(+id)
})

export default router