import axiosPrivate from '@/services/axiosPrivate'
import axiosPublic from '@/services/axiosPublic'
import { setAuthDataInLocalStorage } from '@/utils/auth.utils'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Third party packages
import create from 'zustand'

type IToken = {
  access_token: string
  refresh_token: string
}

type ILoginResponse = {
  ok: boolean
  message: string
  data: IToken
}

type ILoginRequest = {
  email: string
  password: string
}

export interface IUser {
  id: string
  firstName: string
  lastName: string
  email?: string
  access: {
    token: string
    expireIn: string
  }
  refresh: {
    token: string
    expireIn: string
  }
}

interface IAuth {
  isAuth: boolean
  user: IUser
  login: (loginReqData: ILoginRequest) => Promise<void>
  logout: () => void
  autoLogin: () => Promise<void>
}

const initialUserState = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  access: {
    token: '',
    expireIn: '',
  },
  refresh: {
    token: '',
    expireIn: '',
  },
}
export const useAuth = create<IAuth>((set) => ({
  isAuth: false,
  user: initialUserState,
  login: async (loginReqData: ILoginRequest) => {
    console.log('Login in user')
    try {
      const response = await axiosPublic.post<ILoginResponse>(
        '/user/login',
        loginReqData
      )

      const accessToken = response.data?.data?.access_token || ''
      const refreshToken = response.data?.data?.refresh_token || ''
      setAuthDataInLocalStorage(accessToken, refreshToken)

      const rawUserData = await getUserData()
      const userData = {
        isAuth: true,
        user: {
          id: rawUserData?.id || '',
          firstName: rawUserData?.first_name || '',
          lastName: rawUserData?.last_name || '',
          email: rawUserData?.email || '',
          access: {
            token: accessToken,
            expireIn: '',
          },
          refresh: {
            token: refreshToken,
            expireIn: '',
          },
        },
      }

      set(userData)
      //   return userData
    } catch (error) {
      console.log(error)
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      throw error
    }
  }, // End of loginHandler function,
  autoLogin: async () => {
    try {
      const accessToken = localStorage.getItem('access_token')
      const refreshToken = localStorage.getItem('refresh_token')

      const rawUserData = await getUserData()
      const userData = {
        isAuth: true,
        user: {
          id: rawUserData?.id || '',
          firstName: rawUserData?.first_name || '',
          lastName: rawUserData?.last_name || '',
          email: rawUserData?.email || '',
          access: {
            token: accessToken || '',
            expireIn: '',
          },
          refresh: {
            token: refreshToken || '',
            expireIn: '',
          },
        },
      }
      set(userData)
    } catch (error) {
      console.log(error)
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      throw error
    }
  },
  logout: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('expire_at')

    set({
      isAuth: false,
      user: initialUserState,
    })

    return null
  }, // End of logout function
}))

type GetUsersResponse = {
  data: {
    id: string
    first_name?: string
    last_name?: string
    email?: string
  }[]
}
const getUserData = async () => {
  try {
    const response = await axiosPrivate.get<GetUsersResponse>(
      '/user/getcurrentuser'
    )
    return response.data.data[0]
  } catch (error) {
    console.log(error)
    return null
  }
}
