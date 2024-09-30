import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { Modal, Pressable, View } from "react-native";

const ImageModal = ({ imgUri, showModal, setShowModal }) => {
	return (
		<View>
			<Modal
				transparent
				animationType="slide"
				visible={showModal}
				onRequestClose={() => setShowModal(!showModal)}
			>
				<View className="bg-black/60 w-full h-full justify-center items-center px-7">
					<Pressable
						onPress={() => setShowModal(false)}
						className="absolute top-5 right-5 z-10"
					>
						<MaterialIcons
							name="close"
							size={40}
							color={"white"}
						/>
					</Pressable>
					<Image
						source={{ uri: imgUri }}
						contentFit="contain"
						className="w-full	h-full"
					/>
				</View>
			</Modal>
		</View>
	);
};

export default ImageModal;
