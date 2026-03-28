import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import { View, Text, Pressable, Image, Modal, Alert } from "react-native";
import { useState } from "react";

import { X } from "lucide-react-native";
import Login from "./(auth)/Login";
import Signup from "./(auth)/SignUp";

export default function WelcomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [btnValue, setBtnValue] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-orange-100">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View className="w-96 mx-auto pt-56">
          <View className="bg-white p-5 rounded-lg shadow-md">
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text className="text-lg text-right">
                <X />
              </Text>
            </Pressable>
            {btnValue === "login" ? <Login closed={() => setModalVisible(!modalVisible)}/> : <Signup />}
          </View>
        </View>
      </Modal>

      <View className="bg-orange-100 w-full">
        <Image
          source={require("../assets/logo/Logo-Nexpay-preto.png")}
          style={{ width: 152, height: 55 }}
          className="mx-auto"
        />
      </View>

      <View className="bg-orange-100 w-full grid grid-cols-3">
        <View className="flex flex-row justify-center gap-5 pt-8">
          <Image
            source={require("../assets/images/img-login-3.png")}
            style={{ width: 114, height: 94 }}
            className=""
          />

          <Image
            source={require("../assets/images/img-login-2.png")}
            style={{ width: 41, height: 144 }}
            className=""
          />
        </View>

        <Image
          source={require("../assets/images/img-login-1.png")}
          style={{ width: 295, height: 167 }}
          className="col-start-1 col-end-3 mx-auto"
        />
      </View>

      <View className="bg-white h-full pt-10">
        <View className="grid items-center gap-2 pb-10">
          <Text className="font-semibold text-2xl">
            Pague online de forma fácil
          </Text>
          <Text className="text-xs text-center">
            Melhore sua experiência de pagamento agora mesmo. Nenhuma taxa
            administrativa adicional.
          </Text>
        </View>

        <View className="grid gap-3 mx-auto">
          <Pressable
            className="login bg-black w-72 py-4 rounded-lg"
            onPressIn={() => setBtnValue("login")}
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-sm font-semibold text-white text-center">
              Logar
            </Text>
          </Pressable>

          <Pressable
            className="signUp w-72 py-4 rounded-lg border-solid border"
            onPressIn={() => setBtnValue("signUp")}
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-sm font-semibold text-center">Cadastrar</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
