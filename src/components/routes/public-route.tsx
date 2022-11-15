/* eslint-disable react/prop-types */
// Third party packages
import { Navigate, useNavigate } from 'react-router-dom'

interface PublicRouteProps {
  isAuth: boolean
  children?: React.ReactNode
}

const PublicRoute: React.FC<PublicRouteProps> = (props) => {
  const { isAuth, children } = props
  const navigate = useNavigate()

  console.log('[PublicRoute] isAuth =', isAuth)

  if (isAuth) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default PublicRoute
