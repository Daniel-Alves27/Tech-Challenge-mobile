import { View, Text, Image, Pressable } from "react-native";
import { Share2 } from "lucide-react-native";

export default function Receipt() {
  return (
    <>
      <View>
        <View>
          <Image
            source={require("../assets/images/img-man-flag.png")}
            style={{ width: 295, height: 167 }}
          />
        </View>

        <View className="flex items-center gap-2 border-b-2 border-dotted py-5 border-gray-50">
          <Text className="text-3xl text-center font-bold">Transferência feita com sucesso</Text>
          <Text className="text-center text-gray-50 font-semibold">
            Seu dinheiro foi transferido com sucesso, para Lucas S. Silva
          </Text>
        </View>

        <View className="items-center py-5">
          <Text>Valor Transferido</Text>
          <Text className="text-4xl font-extrabold">R$132,00</Text>
        </View>

        <Pressable className="flex flex-row gap-3 bg-black justify-center py-5 rounded-lg">
          <Share2 color={'white'}/>
          <Text className="text-white font-semibold">Compartilhar</Text>
        </Pressable>
      </View>
    </>
  );
}
