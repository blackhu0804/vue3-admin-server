import { getUserInfo, createUser, getUserInfoAndRoles }  from '../services/auth'
import { createErrorResponse, ErrorResponse, SuccessResponse } from '../utils/Response'
import errorInfo  from '../constants/errorInfo'
import { createMd5 } from '../utils/createMD5'
import { createToken, getInfoByToken } from '../utils/token'
import { RegisterPropsWithRoles } from './types'
import { allocUserRoleService } from '../services/user'

const { registerUserNameExistInfo, registerFailInfo, loginFailInfo, getUserInfoFailInfo, accountForbiddenFailInfo } = errorInfo

export const registerController = async (params: RegisterPropsWithRoles) => {
  const { username, password = '111111' } =  params;

  // 先判断是否注册过
  const userInfo = await getUserInfo({ username })
  if (userInfo) {
    const { code, message } = registerUserNameExistInfo
    return new ErrorResponse(code, message)
  }

  const { roleIds = [] } = params

  try {
    const result = await createUser({
      ...params,
      password: createMd5(password)
    })
    await allocUserRoleService(result.id, roleIds)
    return new SuccessResponse(result)
  } catch (error) {
    // 注册失败
    console.log(error.message, error.stack)
    const { code, message } = registerFailInfo
    return new ErrorResponse(code, message)
  }
}

interface loginModel {
  username: string;
  password: string;
}

export const loginController = async (params: loginModel) => {
  const { username, password } = params

  const userInfo = await getUserInfo({ username, password})
  if (userInfo && !userInfo.status) {
    return createErrorResponse(accountForbiddenFailInfo)
  }

  if (userInfo) {
    const { id, username } = userInfo
    const token = createToken({
      id,
      username
    })

    return new SuccessResponse({token})
  }

  return createErrorResponse(loginFailInfo)
}

interface UserTokenInfo {
  id: number;
  username: string;
}

export const UserInfoController = async (params = '') => {
  const token = params.split(' ')[1]
  if (token) {
    const tokenInfo = await getInfoByToken<UserTokenInfo>(token)
    if (tokenInfo) {
      const { id } = tokenInfo
      const userInfo = await getUserInfoAndRoles(id)
      return new SuccessResponse(userInfo)
    }
  }
  return createErrorResponse(getUserInfoFailInfo)
}