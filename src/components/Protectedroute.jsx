import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const Protectedroute = ({ element }) => {
    const authState = useSelector((state) => state.auth)

    return authState.user ? element : <Navigate to="/login" />

}

export default Protectedroute