import Carousel from "react-native-reanimated-carousel";
import { View, Image, Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export default function ImageCarousel() {
  const images = [
    require("../assets/images/banner-1.png"),
    require("../assets/images/banner-2.png"),
    require("../assets/images/banner-3.png"),
    require("../assets/images/banner-4.png"),
    require("../assets/images/banner-5.png"),
  ];

  return (
    <View >
      <Carousel
        width={width}
        height={180}
        data={images}
        loop
        autoPlay
        autoPlayInterval={3000}
        renderItem={({ item }) => (
          <Image
            source={item}
            style={{
              width: width - 40,
              height: 180,
              borderRadius: 12,
              justifyContent: "center"
            }}
          />
        )}
      />
    </View>
  );
}