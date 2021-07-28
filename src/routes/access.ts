import Router from "@koa/router"
import { addAccessController, getAccessAllController, removeAccessController, updateAccessController, updateBulkAccessController } from "../controller/access"

const router = new Router({
  prefix: '/api/access'
})

/**
 * 添加菜单 
 * POST /api/access/menu
 */
router.post('/menu', async (ctx: any) => {
  ctx.body = await addAccessController(ctx.request.body)
})

/**
 * 获取菜单
 * GET /api/access/menus
 */
router.get('/menus', async ctx => {
  ctx.body = await getAccessAllController()
})

/**
 * 删除菜单
 * DELETE /api/access/menu/:id
 */
router.delete('/menu/:id', async (ctx: any) => {
  const { id } = ctx.params
  ctx.body = await removeAccessController(+id)
})

/**
 * 编辑某个菜单
 * PUT /api/access/menu/:id
 */
router.put('/menu/:id', async (ctx: any) => {
  const { id } = ctx.params
  ctx.body = await updateAccessController(+id, ctx.request.body)
})

/**
 * 批量更新
 * PATCH /api/access/update
 */
router.patch('/menu/update', async (ctx: any) => {
  const { access } = ctx.request.body
  ctx.body = await updateBulkAccessController(access)
})

export default router