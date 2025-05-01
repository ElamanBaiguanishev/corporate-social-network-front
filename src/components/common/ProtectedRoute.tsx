import { FC, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'

interface Props {
    children: React.ReactNode
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
    const isAuth = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate("/auth");
        }
    }, [isAuth, navigate]);

    return <>
        {isAuth ? (
            children
        ) : (
            <Box>
                <h1>To view this you nust be logged in.</h1>
                <img src="/secure.png" alt="" />
            </Box>
        )}
    </>
}
