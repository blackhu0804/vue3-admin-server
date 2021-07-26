import { UserInfo } from './types'
import { UserModel } from '../db/models'
import User, { RegisterModel } from '../db/models/user'

// 获取全部用户
export const getAllUserService = async (offset = 0, limit = 10, query: Record<string, any>) => {
    const whereProps = { } as Record<string, any>

    if (query.mobile) whereProps.mobile = query.mobile

    if (query.username) whereProps.username = query.username

    if (!isNaN(query.status)) whereProps.status = Number(query.status)

    const { count, rows } = await UserModel.findAndCountAll({
        attributes: ['id', 'username', 'email', 'mobile', 'isSuper', 'status', 'avatar', 'description', 'createdAt' ],
        where: whereProps,
        limit,
        offset: limit * offset,
        distinct: true,
        // include: [
            // {
            //     model: UserRoleModel,
            //     attributes: ['id'],
            //     include: [
            //         {
            //             model: RolesModel,
            //             attributes: ['id', 'name', 'description']
            //         }
            //     ]
            // }
        // ]
    })

    const users = rows.map(row => {
        const user = row.toJSON() as UserInfo
        user.roles = user.UserRoles?.map(item => item.Role)
        delete user.UserRoles
        return user
    })
    return {
        users,
        count
    }
}

// 修改用户信息
export const updateUserService = async (id: number, data: RegisterModel) => {
    const result = await UserModel.update(data, {
        where: {
            id
        }
    })
    return result
}

// 根据用户id删除用户
export const removeUserService = async (id: number) => {
    const result = await UserModel.destroy({
        where: {
            id
        }
    })
    return result
}

// 删除与该用户相关联记录
export const destoryUserRoleByUserID = async (id: number) => {
    // const result = await UserR
}
