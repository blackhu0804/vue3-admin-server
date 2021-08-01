import { getAllUserService, updateUserService, removeUserService, destoryUserRoleByUserID, allocUserRoleService } from '../services/user'
import { createErrorResponse, SuccessResponse } from '../utils/Response'
import errorInfo from '../constants/errorInfo'
import { RegisterModel } from '../db/models/user'
import { getUserInfo } from '../services/auth'
// import { getInfoByToken } from '../utils/token'
// import { UserTokenInfo } from './types'

const { updateUserExistFailInfo, getUserListFailInfo, allocRoleAccessFailInfo, deleteUserInfoFailInfo, allocUserRoleFailInfo } = errorInfo

export interface WhereQuery {
    name: string;
    status: number;
    mobile: string;
}

export interface UserListParams {
    offset: number;
    limit: number;
    query: Record<string, any>
}

export const getAllUserController = async ({offset, limit, query}: UserListParams) => {
    try {
        const result = await getAllUserService(offset, limit, query)
        return new SuccessResponse(result)
    } catch (error) {
        console.log(error.message)
        return createErrorResponse(getUserListFailInfo)
    }
}

export const updateUserController = async (id: number, data: RegisterModel & {roleIds: number[]}) => {
    const { username, email, mobile, description, status, roleIds } = data

    const userInfo = await getUserInfo({ username })
    if (userInfo && userInfo.id !== id) {
        return createErrorResponse(updateUserExistFailInfo)
    }

    try {
        await updateUserService(id, {
            username, email, mobile, description, status
        } as RegisterModel)
        await allocUserRoleController(id, roleIds)
        return new SuccessResponse('用户信息修改成功')
    } catch (error) {
        console.log(error.message)
        return createErrorResponse(allocRoleAccessFailInfo)
    }
}

export const allocUserRoleController = async (id: number, roles: number[] = []) => {
    await destoryUserRoleByUserID(id)
    try {
        await allocUserRoleService(id, roles)
        return new SuccessResponse('用户分配角色成功')
    } catch (error) {
        console.error(error.message);
        return createErrorResponse(allocUserRoleFailInfo)
    }
}

export const removeUserController = async (id: number) => {
    try {
        await removeUserService(id)
        return new SuccessResponse('用户删除成功')
    } catch (error) {
        console.log(error.message)
        return createErrorResponse(deleteUserInfoFailInfo)
    }
}

// 上传头像
// export const uploadAvatarController = async (origin: string, file?: File, tokenStr?: string) => {
//     const token = tokenStr?.split(/\s+/)[1]
//     if (token) {
//       const tokenInfo = await getInfoByToken<UserTokenInfo>(token)
//       if (file && tokenInfo) {
//         const { id } = tokenInfo
//         const baseName = path.basename(file.path)
//         const url = `${origin}/uploads/${baseName}`
//         // 更新用户头像信息
//         await updateUserService(id, { avatar: url })
//         return new SuccessResponse({ url })
//       }
//     }
  
//     return createErrorResponse(uploadUserAvatarFailInfo)
//   }