import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import IndexRouter from "./routes/index-router/index-router.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<IndexRouter />
	</StrictMode>
);
