import Router from '@koa/router'
import { addRoleAccessController, getRoleAccessController, getAccessbyRolesController } from "../controller/roleAccess"

const router = new Router({
  prefix: '/api/role_access'
})

/**
 * 添加菜单与角色管理
 * POST /api/role_access
 */
router.post('/:id', async (ctx: any) => {
  const { id } = ctx.params
  const { access } = ctx.request.body
  console.log(id, access)
  ctx.body = await addRoleAccessController(id, access)
})

/**
* 根据角色id获取关联菜单id
* POST /api/role_access'
*/
router.get('/:id', async (ctx: any) => {
  const { id } = ctx.params
  ctx.body = await getRoleAccessController(+id)
})

router.post('/role/access', async (ctx: any) => {
  const { roles } = ctx.request.body
  const ids = roles?.map(Number)
  ctx.body = await getAccessbyRolesController(ids)
})

export default router