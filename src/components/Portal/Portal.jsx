import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const Portal = ({ children }) => {
	const [container] = useState(() => {
		const existingContainer = document.querySelector("#modals");
		return existingContainer || document.createElement("div");
	});

	useEffect(() => {
		if (!document.querySelector("#modals")) {
			document.body.appendChild(container);
		}

		return () => {
			if (!container.hasChildNodes()) {
				document.body.removeChild(container);
			}
		};
	}, [container]);

	return ReactDOM.createPortal(children, container);
};

Portal.propTypes = {
	children: PropTypes.node.isRequired
};

export default Portal;
