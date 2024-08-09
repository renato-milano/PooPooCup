import { ActivityIndicator, Text, TouchableOpacity, Image} from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  image,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={{backgroundColor:"#e7bc91"}}
      className={`rounded-xl min-h-[62px] flex flex justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      { (image!=undefined) ?
      <Image className="w-[25vh] h-[20vh]" resizeMethod="resize" source={image}></Image>
      :null }
      <Text className={`text-white font-bsemibold text-lg ${textStyles}`}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
