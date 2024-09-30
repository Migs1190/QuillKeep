import { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing } from "react-native";
import { G, Path, Svg } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const SplashFrame = ({ color, strokeWidth }) => {
	const { width, height } = Dimensions.get("screen");

	const pathOffset = useRef(new Animated.Value(0)).current;
	useEffect(() => {
		Animated.timing(pathOffset, {
			toValue: 1000,
			duration: 1500,
			easing: Easing.elastic(0.6),
			useNativeDriver: false,
		}).start();
	}, []);

	return (
		<Svg
			width={width}
			height={height}
			className="w-full h-full absolute"
		>
			<G>
				<AnimatedPath
					id="top-right-top"
					d={`M${width * 0.9},${height * 0.1} L${width * 0.6},${height * 0.1}`}
					fill={"none"}
					stroke={color}
					strokeLinecap="round"
					strokeWidth={strokeWidth}
					strokeDashoffset={pathOffset.interpolate({
						inputRange: [0, 1000],
						outputRange: [120, 0],
					})}
					strokeDasharray={120}
				/>
				<AnimatedPath
					id="top-right-right"
					d={`M${width * 0.9},${height * 0.465} L${width * 0.9},${height * 0.1}`}
					fill={"none"}
					stroke={color}
					strokeLinecap="round"
					strokeWidth={strokeWidth}
					strokeDashoffset={pathOffset.interpolate({
						inputRange: [0, 1000],
						outputRange: [320, 0],
					})}
					strokeDasharray={320}
				/>
				<AnimatedPath
					id="bottom-right-right"
					d={`M${width * 0.9},${height * 0.9} L${width * 0.9},${height * 0.55} `}
					fill={"none"}
					stroke={color}
					strokeLinecap="round"
					strokeWidth={strokeWidth}
					strokeDashoffset={pathOffset.interpolate({
						inputRange: [0, 1000],
						outputRange: [320, 0],
					})}
					strokeDasharray={320}
				/>
				<AnimatedPath
					id="bottom-right-bottom"
					d={`M${width * 0.9},${height * 0.9} L${width * 0.6},${height * 0.9}`}
					fill={"none"}
					stroke={color}
					strokeLinecap="round"
					strokeWidth={strokeWidth}
					strokeDashoffset={pathOffset.interpolate({
						inputRange: [0, 1000],
						outputRange: [120, 0],
					})}
					strokeDasharray={120}
				/>
				<AnimatedPath
					id="bottom-left-bottom"
					d={`M${width * 0.1},${height * 0.9} L${width * 0.4},${height * 0.9}`}
					fill={"none"}
					stroke={color}
					strokeLinecap="round"
					strokeWidth={strokeWidth}
					strokeDashoffset={pathOffset.interpolate({
						inputRange: [0, 1000],
						outputRange: [120, 0],
					})}
					strokeDasharray={120}
				/>
				<AnimatedPath
					id="bottom-left-left"
					d={`M${width * 0.1},${height * 0.615} L${width * 0.1},${height * 0.9}`}
					fill={"none"}
					stroke={color}
					strokeLinecap="round"
					strokeWidth={strokeWidth}
					strokeDashoffset={pathOffset.interpolate({
						inputRange: [0, 1000],
						outputRange: [320, 0],
					})}
					strokeDasharray={320}
				/>
				<AnimatedPath
					id="top-left-left"
					d={`M${width * 0.1},${height * 0.1} L${width * 0.1},${height * 0.43}`}
					fill={"none"}
					stroke={color}
					strokeLinecap="round"
					strokeWidth={strokeWidth}
					strokeDashoffset={pathOffset.interpolate({
						inputRange: [0, 1000],
						outputRange: [320, 0],
					})}
					strokeDasharray={320}
				/>
				<AnimatedPath
					id="top-left-top"
					d={`M${width * 0.1},${height * 0.1} L${width * 0.4},${height * 0.1}`}
					fill={"none"}
					stroke={color}
					strokeLinecap="round"
					strokeWidth={strokeWidth}
					strokeDashoffset={pathOffset.interpolate({
						inputRange: [0, 1000],
						outputRange: [120, 0],
					})}
					strokeDasharray={120}
				/>
			</G>
		</Svg>
	);
};

export default SplashFrame;
