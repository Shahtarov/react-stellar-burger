//import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export const ProtectedRoute = ({
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

export const OnlyAuth = ({ children }) => (
	<ProtectedRoute onlyAuth={true} children={children} />
);
export const OnlyUnAuth = ({ children }) => (
	<ProtectedRoute onlyUnAuth={true} children={children} />
);

ProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired,
	onlyAuth: PropTypes.bool,
	onlyUnAuth: PropTypes.bool
};

OnlyUnAuth.propTypes = {
	children: PropTypes.node.isRequired
};

OnlyAuth.propTypes = {
	children: PropTypes.node.isRequired
};
