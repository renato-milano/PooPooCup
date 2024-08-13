import { Text, View, Image, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Redirect, Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { images } from "../constants";
import { useGlobalContext } from "../context/GlobalProvider";
import { getCurrentUser } from "../lib/appwrite";

const RootLayout = () => {
  const { isLoading, isLogged } = useGlobalContext();
  console.log(isLogged);
  getCurrentUser();
  if (!isLoading && isLogged) {
    return <Redirect href="/home"></Redirect>;
  }
  return (
    <SafeAreaView className="h-full bg-primary">
      <View
        className="flex-1 items-center justify-center p-5"
        style={{ backgroundColor: "#6f4417" }}
      >
        <Text className="font-bregular text-large text-white">
          It's time for
        </Text>
        <Text className="font-bregular text-xl text-white">The PooPoo Cup</Text>
        <Image className="m-2 h-[25vh] w-[25vh]" source={images.happy}></Image>
        <StatusBar style="auto"></StatusBar>
        <Text className="text-center font-bregular text-lg text-white my-5">
          Benvenuto alla prima competizione a colpi di sfintere!
        </Text>
        <Text className="text-center font-bregular text-xs text-white my-5">
          Crea il tuo profilo e partecipa alla lega dei tuoi amici oppure ad una
          lega di sconosciuti, ma mi raccomando...
        </Text>
        <Text className="text-center font-bregular text-xs text-white my-5">
          Questo gioco si basa sulla fiducia, non ha senso barare, anzi fai solo
          una figura, beh... di merda.
        </Text>
        <Link
          href="/sign-in"
          className="py-2 px-4 rounded"
          style={{ backgroundColor: "#a57149", color: "white" }}
        >
          <Text className="font-bregular text-white">Inizia Subito</Text>
        </Link>
        <Text className="text-xs primary my-5 font-bregular text-white">
          Made with ❤️ by Ren
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 166,
    height: 58,
  },
});
