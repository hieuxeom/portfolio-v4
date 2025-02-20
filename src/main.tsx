import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "react-day-picker/style.css";
import IndexRouter from "./routes/index-router/index-router.tsx";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<HelmetProvider>
			<Toaster
				position="top-center"
				reverseOrder={false}
				gutter={8}
				toastOptions={{
					duration: 2000,
					style: {
						color: "#1f2937",
					},
					loading: {
						duration: 5000,
						style: {
							backgroundColor: "#406D96",
							color: "#FCFAFA",
						},
					},
					success: {
						iconTheme: {
							primary: "#ffffff",
							secondary: "#53DD6C",
						},
						style: {
							backgroundColor: "#53DD6C",
							color: "#FCFAFA",
						},
					},
					error: {
						iconTheme: {
							primary: "#ffffff",
							secondary: "#C1292E",
						},
						style: {
							backgroundColor: "#C1292E",
							color: "#FCFAFA",
						},
					},
				}}
			/>

			<IndexRouter />
		</HelmetProvider>
	</StrictMode>
);
