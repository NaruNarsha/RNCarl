import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Button, { ButtonTypes } from "./components/Button";
import { useState } from "react";

const App = () => {
  const isError = false;

  const [result, setResult] = useState(0);
  console.log("rendering : ", result);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.text}>{result}</Text>
      {/*
      <Text style={[styles.error, styles.text]}> StyleSheet </Text>
      <Text style={styles.error}> Error </Text>
      <Text style={[styles.text, isError && styles.error]}>Error two</Text>
      */}
      <Button
        title="1"
        onPress={() => console.log("1")}
        buttonStyle={styles.button}
        buttonType={ButtonTypes.NUMBER}
      />
      <Button
        title="0"
        onPress={() => console.log("0")}
        buttonStyle={styles.button}
        buttonType={ButtonTypes.NUMBER}
      />
      <Button
        title="+"
        onPress={() => {
          setResult((prevState) => {
            console.log("prevState 1 :", prevState);
            return prevState + 1;
          });
          setResult((prevState) => {
            console.log("prevState 2 :", prevState);
            return prevState + 1;
          });
          console.log("+", result);
        }}
        buttonStyle={styles.button}
        buttonType={ButtonTypes.OPERATOR}
      />

      <View style={{ paddingVertical: 10 }}></View>

      <Button
        title="-"
        onPress={() => {
          setResult(result - 1);
          console.log("-", result);
        }}
        buttonStyle={styles.button}
        buttonType={ButtonTypes.OPERATOR}
      />
    </View>
  );
};

// StyleSheet: React Native에서 제공하는 모듈로, 스타일 객체를 만들고 관리하는 데 사용됩니다.

// .create(...): 이 메서드는 스타일 객체를 생성합니다.
// 이 방식이 일반 JavaScript 객체를 사용하는 것보다 성능상 이점이 있고,
// 스타일이 앱을 로드할 때 한 번만 생성되도록 최적화합니다.

// styles: 생성된 스타일 객체를 담는 변수 이름입니다.
// 보통 이 변수 이름을 사용하며, 컴포넌트 내의 여러 요소에 이 스타일을 가져와서 적용합니다.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 60,
    fontWeigth: "700",
  },
  button: {
    width: 100,
    height: 100,
  },
  error: {
    fontSize: 30,
    fontWeigth: "700",
    color: "red",
  },
});

export default App;
