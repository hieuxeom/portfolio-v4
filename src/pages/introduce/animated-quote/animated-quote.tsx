import { useCallback, useEffect, useState } from "react";
import BlockQuote from "../../../components/block-quote";

interface AnimatedQuoteProps {
	renderText: string;
}

const AnimatedQuote = ({ renderText }: AnimatedQuoteProps) => {
	const [currentText, setCurrentText] = useState<string>("|");

	const renderAnimated = useCallback(async () => {
		for (let i = 0; i < renderText.length; i++) {
			await new Promise((resolve) => setTimeout(resolve, 50));
			setCurrentText(() => `${renderText.slice(0, i + 1)}${i + 1 !== renderText.length ? "|" : ""}`);
		}
	}, [renderText]);

	useEffect(() => {
		renderAnimated();
	}, []);

	return (
		<BlockQuote
			size={"6xl"}
			customClass={"font-cairo-play font-bold text-primary-600 bg-primary-100/50 py-8"}
		>
			{currentText}
		</BlockQuote>
	);
};

export default AnimatedQuote;
