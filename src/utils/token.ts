import jwt from 'jsonwebtoken'
import util from 'util'
import { jwtSecret } from '../config/auth'

const jwtVerify = util.promisify<string, string>(jwt.verify)

export const createToken = (payload: any) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: '6h' })
}

export const getInfoByToken = async<T>(token: string): Promise<T | null> => {
  try {
    const res = await jwtVerify(token, jwtSecret)
    return res as unknown as T
  } catch (error) {
    console.error(error.message);
    return null
  }
}