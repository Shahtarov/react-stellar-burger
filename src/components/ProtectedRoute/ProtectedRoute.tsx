import React, { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
	children: React.ReactNode;
	onlyUnAuth?: boolean;
	onlyAuth?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
	children,
	onlyUnAuth = false,
	onlyAuth = false
}) => {
	const accessToken = localStorage.getItem("accessToken");
	const location = useLocation();

	if (onlyUnAuth) {
		return !accessToken ? (
			<>{children}</>
		) : (
			<Navigate to={"/"} state={{ from: location }} />
		);
	}

	if (onlyAuth) {
		return accessToken ? (
			<>{children}</>
		) : (
			<Navigate to={"/login"} state={{ from: location }} />
		);
	}

	return null;
};

export const OnlyAuth: React.FC<{ children: React.ReactNode }> = ({
	children
}) => <ProtectedRoute onlyAuth={true} children={children} />;

export const OnlyUnAuth: React.FC<{ children: React.ReactNode }> = ({
	children
}) => <ProtectedRoute onlyUnAuth={true} children={children} />;
