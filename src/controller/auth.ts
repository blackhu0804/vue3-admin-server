import { RegisterModel } from '../db/models/user'
import { getUserInfo, createUser }  from '../services/auth'
import { ErrorResponse, SuccessResponse } from '../utils/Response'
import errorInfo  from '../constants/errorInfo'
import { createMd5 } from '../utils/createMD5'
import { createToken } from '../utils/token'

const { registerUserNameExistInfo, registerFailInfo, loginFailInfo } = errorInfo

export const registerController = async (params: RegisterModel) => {
  const { username, password } =  params;

  // 先判断是否注册过
  const userInfo = await getUserInfo({ username })
  if (userInfo) {
    const { code, message } = registerUserNameExistInfo
    return new ErrorResponse(code, message)
  }

  try {
    await createUser({
      ...params,
      password: createMd5(password)
    })
    return new SuccessResponse({})
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
  if (userInfo) {
    const { id, username } = userInfo
    const token = createToken({
      id,
      username
    })

    return new SuccessResponse({token})
  }

  const { code, message } = loginFailInfo
  return new ErrorResponse(code, message)
}