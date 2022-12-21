import Cookies from 'js-cookie'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
    let jwt = Cookies.get('jwt')
    return (
        jwt ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes