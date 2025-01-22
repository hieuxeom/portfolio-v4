import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "react-day-picker/style.css";
import IndexRouter from "./routes/index-router/index-router.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Toaster
			position="top-center"
			reverseOrder={false}
			gutter={8}
			containerClassName=""
			containerStyle={{}}
			toastOptions={{
				// Define default options
				className: "",
				duration: 2000,
				style: {
					background: "#363636",
					color: "#fff",
				},
			}}
		/>
		<IndexRouter />
	</StrictMode>
);
