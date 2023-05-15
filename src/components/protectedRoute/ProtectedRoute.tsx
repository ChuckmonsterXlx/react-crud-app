import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

interface Props {
  children: ReactNode;
}

export function ProtectedRoute({children}: Props) {
    const { verifedUser } = useAppSelector((state) => state);

    if (!verifedUser.login) {
        return <Navigate to='/login' />
    }

    return <>
        {children}
    </>
}