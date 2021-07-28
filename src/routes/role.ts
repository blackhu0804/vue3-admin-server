import Router from "@koa/router"
import { addRoleController, getAllRoleController, updateRoleController, removeRoleController } from "../controller/role"

const router = new Router({
	prefix: '/api/role'
})

/**
 * 添加角色
 * POST /api/role
 */
router.post('/', async (ctx: any) => {
	ctx.body = await addRoleController(ctx.request.body)
})

/**
 * 获取全部角色
 * GET /api/role
 */
router.get('/', async (ctx: any) => {
	const { pageNum = 0, pageSize = 10 } = ctx.request.query
	ctx.body = await getAllRoleController({
		offset: +pageNum,
		limit: +pageSize
	})
})

/**
 * 编辑角色
 * PUT /api/role/:id
 */
router.put('/:id', async (ctx: any) => {
	const { id } = ctx.params
	ctx.body = await updateRoleController(+id, ctx.request.body)
})

/**
 * 删除角色
 * DELETE /api/role/:id
 */
router.delete('/:id', async (ctx: any) => {
	const { id } = ctx.params
	ctx.body = await removeRoleController(+id)
})

export default router