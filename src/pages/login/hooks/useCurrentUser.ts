// import axiosPublic from '@/services/axiosPublic'
import axiosPrivate from '@/services/axiosPrivate'

type IUser = {
  first_name: string
  last_name: string
  email_id: string
}
type ILoginResponse = {
  ok: boolean
  message: string
  data: IUser
}

const useCurrentUser = async () => {
  const access_token = localStorage.getItem('access_token')

  if (!access_token) {
    return false
  }

  try {
    const response = await axiosPrivate.get<ILoginResponse>(
      '/user/getcurrentuser'
    )
    // console.log(response)
    return response.data.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export default useCurrentUser
