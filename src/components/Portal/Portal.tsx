import { useState, useEffect, FC } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
	children: React.ReactNode;
}

const Portal: FC<PortalProps> = ({ children }) => {
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

export default Portal;
