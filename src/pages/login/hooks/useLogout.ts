import { useNavigate } from 'react-router'

const useLogout = () => {
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate('/login')
  }
  return { logOut }
}

export default useLogout
