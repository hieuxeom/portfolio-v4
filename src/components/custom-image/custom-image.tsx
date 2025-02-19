import { useEffect, useState } from "react";

interface CustomImageProps {
	src: string;
}

const CustomImage = ({ src }: CustomImageProps) => {
	const [loading, setLoading] = useState(true);
	const [currentSrc, setCurrentSrc] = useState("");

	useEffect(() => {
		if (src) {
			setLoading(true); // Ẩn ảnh cũ và hiển thị loading
			const img = new Image();
			img.src = src;
			img.onload = () => {
				setCurrentSrc(src);
				setLoading(false);
			};
		}
	}, [src]);

	return (
		<div className="w-full h-auto">
			<img
				src={loading ? "/loadingimage.png" : currentSrc}
				alt=""
				width={1920}
				height={1080}
				className="transition-opacity duration-300"
			/>
		</div>
	);
};

export default CustomImage;
