import { RoleModelProps } from "../db/models/role"
import { createRole, getRole, getAllRoleService, updateRoleById, removeRoleById } from "../services/role"
import { createErrorResponse, SuccessResponse } from "../utils/Response"
import errorInfo from "../constants/errorInfo"

const {
	addRoleNameExistInfo,
	updateRoleFailInfo,
	updateRoleNameExistInfo,
	removeRoleFailInfo,
} = errorInfo

// 添加角色
export const addRoleController = async (params: RoleModelProps) => {
	const result = await getRole(params.name)
	if (result) {
		return createErrorResponse(addRoleNameExistInfo)
	}
	if (params) {
		try {
			const result = await createRole({ ...params })
			return new SuccessResponse(result)
		} catch(error) {
			console.log(error.message)
			return createErrorResponse('添加角色失败')
		}
	}
}

interface RoleListParams {
	offset: number;
	limit: number;
}

// 获取全部角色
export const getAllRoleController = async ({ offset, limit }: RoleListParams) => {
	try {
		const result = await getAllRoleService(offset, limit)
		return new SuccessResponse(result)
	} catch (error) {
		console.log(error.message)
		return createErrorResponse('获取全部角色失败')
	}
}

export const updateRoleController = async (id: number, data: RoleModelProps) => {
	const result = await getRole(data.name || '')
	if (result && result.id === id) {
		return createErrorResponse(updateRoleNameExistInfo)
	}
	try {
		const result = await updateRoleById(id, data)
		return new SuccessResponse('更新角色信息成功')
	} catch (error) {
		console.error(error.message);
		return createErrorResponse(updateRoleFailInfo)
	}
}

export const removeRoleController = async (id: number) => {
	try {
		await removeRoleById(id)
		return new SuccessResponse('角色删除成功')
	} catch (error) {
		console.error('角色删除成功');
		return createErrorResponse(removeRoleFailInfo)
	}
}