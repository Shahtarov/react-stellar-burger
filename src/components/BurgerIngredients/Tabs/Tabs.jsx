import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Tabs.module.css";
import { useState } from "react";

const Tabs = () => {
	const tabsData = ["Булки", "Соусы", "Начинки"];
	const [current, setCurrent] = useState(tabsData[0]);

	return (
		<div className={styles.tabs}>
			{tabsData.map((tab) => (
				<Tab
					key={tab}
					value={tab}
					active={current === tab}
					onClick={setCurrent}
				>
					{tab}
				</Tab>
			))}
		</div>
	);
};

export default Tabs;
