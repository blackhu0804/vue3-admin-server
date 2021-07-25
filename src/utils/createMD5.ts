import crypto from 'crypto'
import { UserSecret } from '../config/auth'

export const createMd5 = (content: any) => {
  const md5 = crypto.createHash('md5')
  return md5.update(`${content}_${UserSecret}`).digest('hex')
}