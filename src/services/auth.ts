import UserModel, { RegisterModel, UserModelProps }  from '../db/models/user'
import { UserWhereProps } from './types'
import { createMd5 } from '../utils/createMD5'

/**
 * 创建用户
 */
export const createUser = async ({ username, password, email, mobile, status, avatar}: RegisterModel) => {
  const result = await UserModel.create({
    username,
    password,
    email,
    mobile,
    status,
    avatar
  })

  return result.toJSON()
}


export const getUserInfo = async ({ username, password, id}: UserWhereProps) => {
  const where: UserWhereProps = {
    username
  }

  if (password) {
    where.password = createMd5(password)
  }

  if (typeof id !== 'undefined') {
    where.id = id
  }

  const result = await UserModel.findOne({
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt']
    },
    where,
  })
  if (result === null) return null

  return result.toJSON() as UserWhereProps
}