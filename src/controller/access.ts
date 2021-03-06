import { createAccess, getAllAccess, removeAccessById, updateAccessById, updateBulkAccess } from "../services/access"
import { createErrorResponse, SuccessResponse } from "../utils/Response"
import errorInfo from "../constants/errorInfo"
import { AccessModelProps } from "../db/models/access"

const { addAccessFailInfo, getAccessAllFailInfo, removeAccessFailInfo, updateAccessFailInfo } = errorInfo

export const addAccessController = async (params: AccessModelProps) => {
	if (params) {
		try {
			const result = await createAccess({
				...params
			})
			return new SuccessResponse(result)
		} catch (error) {
			console.log(error.message)
			return createErrorResponse(addAccessFailInfo)
		}
	}
}

export const getAccessAllController = async () => {
	try {
		const result = await getAllAccess()
		return new SuccessResponse(result)
	} catch (error) {
		console.log(error.message)
		return createErrorResponse(getAccessAllFailInfo)
	}
}

export const removeAccessController = async (id: number) => {
	try {
		const result = await removeAccessById(id)
		return new SuccessResponse('删除成功')
	} catch (error) {
		console.log(error.message)
		return createErrorResponse(removeAccessFailInfo)
	}
}

export const updateAccessController = async (id: number, data: AccessModelProps) => {
	try {
		const result = await updateAccessById(id, data)
		return new SuccessResponse('菜单更新成功')
	} catch (error) {
		console.log(error.message)
		return createErrorResponse(updateAccessFailInfo)
	}
}

export const updateBulkAccessController = async (data: AccessModelProps[]) => {
	try {
		const result = await updateBulkAccess(data)
		return new SuccessResponse('菜单更新成功')
	} catch (error) {
		console.log(error.message)
		return createErrorResponse(updateAccessFailInfo)
	}
}