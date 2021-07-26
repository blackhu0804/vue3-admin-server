import { Model, Optional, DataTypes } from 'sequelize'
import seq from '../seq'

export interface UserModelProps {
  id: number;
  username: string;
  password: string;
  email: string | null;
  mobile: string | null;
  avatar: string;
  description: string;
  isSuper: 0 | 1;
  status: 0 | 1;
}

export type RegisterModel = Omit<UserModelProps, 'id' | 'isSuper'>

interface UserCreationAttributes extends Optional<UserModelProps, 'id' | 'isSuper' | 'status' | 'avatar' | 'description'>{}

interface UserInstance extends Model<UserModelProps, UserCreationAttributes>, UserModelProps {}

const User = seq.define<UserInstance>('User', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '用户名'
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '密码'
  },
  email: {
    type: DataTypes.STRING,
    comment: '用户邮箱'
  },
  mobile: {
    type: DataTypes.STRING,
    comment: '手机号'
  },
  avatar: {
    type: DataTypes.STRING,
    comment: '头像'
  },
  isSuper: {
    type: DataTypes.BOOLEAN, // TINYINT(1)
    comment: '超级管理员 1是 0不是',
    defaultValue: 0
  },
  description: {
    type: DataTypes.TEXT,
    comment: '描述说明'
  },
  status: {
    type: DataTypes.BOOLEAN, // TINYINT(1)
    comment: '账户禁用状态 1正常 0禁用',
    defaultValue: 1
  }
})

export default User