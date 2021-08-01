import { 
  createRoleAccess,
  destoryRoleAccessByRoleID,
  getRoleAccessByID,
  getAccessByRolesService
} from '../services/roleAccess'
import { createErrorResponse, SuccessResponse } from '../utils/Response'
import errorInfo from '../constants/errorInfo'

const { allocRoleAccessFailInfo, getRoleAccessFailInfo } = errorInfo

export const addRoleAccessController = async (id: number, access: number[]) => {
  await destoryRoleAccessByRoleID(id)
  try {
    // 批量插入记录
    await createRoleAccess(id, access)
    return new SuccessResponse('权限分配成功')
  } catch (error) {
    console.error(error);
    return createErrorResponse(allocRoleAccessFailInfo)
  }
}

export const getRoleAccessController = async (id: number) => {
  try {
    const result = await getRoleAccessByID(id)
    return new SuccessResponse(result)
  } catch (error) {
    console.error(error);
    return createErrorResponse(getRoleAccessFailInfo)
  }
}

export const getAccessbyRolesController = async (roles: number[]) => {
  try {
    const result = await getAccessByRolesService(roles)
    return new SuccessResponse(result)
  } catch (error) {
    console.error(error);
    return createErrorResponse(getRoleAccessFailInfo)
  }
}
