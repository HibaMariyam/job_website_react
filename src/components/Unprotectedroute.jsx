import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const UnProtectedroute = ({ element }) => {
    const authState = useSelector((state) => state.auth)

    return authState.user ? <Navigate to="/" /> : element
    //UnProtectedRoute is a component that checks if a user is logged in. If the user is logged in (authState.user exists), it redirects them to the login page (/login). If the user is not logged in, it renders the given component (element).


}

export default UnProtectedroute