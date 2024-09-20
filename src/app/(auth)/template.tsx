import React from "react";
import styles from "./template.module.scss";

const App: React.FC = ({ children }: React.PropsWithChildren) => {
	return (
		<div className={styles.wrap}>
			<div className={styles.main}>{children}</div>
		</div>
	);
};

export default App;
