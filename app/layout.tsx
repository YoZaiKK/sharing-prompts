import "@styles/globals.css";
// Importing the styles

import { Nav, Provider } from "@components/";

export const metadata = {
	title: "Promptopia",
	description: "Discover & share AI Prompts",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<body>
				<Provider>
					<div className="main">
						<div className="gradient" />
					</div>

					<main className="app">
						<Nav />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	);
};

export default RootLayout;
