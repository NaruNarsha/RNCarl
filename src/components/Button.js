import PropTypes from "prop-types";
import { Text } from "react-native";

const Button = ({ title }) => {
  console.log(title);
  return <Text>{title}</Text>;
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
};

Button.defaultProps = {
  title: "Default Button",
};

export default Button;
