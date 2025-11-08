import { Pressable, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const ButtonTypes = {
  NUMBER: "NUMBER",
  OPERATOR: "OPERATOR",
};

const Button = ({ title, onPress, buttonStyle, buttonType }) => {

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor:
            buttonType === ButtonTypes.NUMBER ? "#71717a" : "#f59e0b",
        },
        pressed && {
          backgroundColor: buttonType.NUMBER ? "#3f3f46" : "#b645309",
        },
        buttonStyle,
      ]}
      onPressOut={onPress}
      //   onPressIn={() => console.log("Press In")}
      //   onPressOut={() => console.log("Press Out")}
      //   onPress={() => console.log("Press")}
      //   onLongPress={() => console.log("Long Press")}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  buttonStyle: PropTypes.object,
  buttonType: PropTypes.oneOf(Object.values(ButtonTypes)),
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    },
  title: {
    color: "#ffffff",
    fontSize: 50,
  },
});

export default Button;
export { ButtonTypes };
