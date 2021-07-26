import { getAllUserService, updateUserService, removeUserService } from '../services/user'
import { createErrorResponse, SuccessResponse } from '../utils/Response'
import errorInfo from '../constants/errorInfo'
import { RegisterModel } from '../db/models/user'
import { getUserInfo } from '../services/auth'

const { updateUserExistFailInfo, getUserListFailInfo, allocRoleAccessFailInfo, deleteUserInfoFailInfo } = errorInfo

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

export const updateUserController = async (id: number, data: RegisterModel) => {
    const { username, email, mobile, description, status } = data

    const userInfo = await getUserInfo({ username })
    if (userInfo && userInfo.id !== id) {
        return createErrorResponse(updateUserExistFailInfo)
    }

    try {
        await updateUserService(id, {
            username, email, mobile, description, status
        } as RegisterModel)
        // TODO: allocUserRoleService
        return new SuccessResponse('用户信息修改成功')
    } catch (error) {
        console.log(error.message)
        return createErrorResponse(allocRoleAccessFailInfo)
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