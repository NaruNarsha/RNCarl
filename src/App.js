import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Button, { ButtonTypes } from "./components/Button";
import { useState } from "react";

const Operators = {
  CLEAR: "C",
  PLUS: "+",
  MINUS: "-",
  EQUAL: "=",
}


const App = () => {
  const [result, setResult] = useState(0);
  const [formula, setFormula] = useState([]);

  console.log("rendering : ", result);

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const width = (windowWidth - 5) / 4;


  // 숫자 버튼을 눌렀을 때 호출되는 함수
  const onPressNumber = (number) => {
    const last = formula[formula.length - 1];

    if(isNaN(last)){
      setResult(number);
      setFormula((prev) => [...prev, number]);
      // [...prev, number]는 ES6 스프레드 연산자:
      //  - prev 배열의 모든 요소를 새 배열로 복사한 뒤, 마지막에 number를 추가합니다.
      //  - 결과는 이전 배열을 직접 변경하지 않고(불변성 유지) 새로운 배열을 생성합니다.
    }
    else{
      const newNumber = (last ?? 0) * 10 + number;
      setResult(newNumber);
      setFormula((prev) => {
        prev.pop();
        return[...prev, newNumber];
      });
    }
  };


  // 연산관련 버튼을 눌렀을 때 호출되는 함수
  const onPressOperator = (operator) => {
    switch(operator){
      
      case Operators.CLEAR:
        setFormula([]);
        setResult(0);
        return;

      case Operators.EQUAL:
        console.log("onPressOperator - Operators.EQUAL");
        calculate();
        return;

      default:
        const last = formula[formula.length - 1];
        if([Operators.PLUS, Operators.MINUS].includes(last)){
          setFormula(()=>{
            prev.pop();
            return [...prev, operator];
          });
      }
      else{
        setFormula((prev) => [...prev, operator]);
      }
    }
  };


  const calculate = () => {
    let calculatedNumber = 0;
    let operator = "";

    console.log("formula - ", formula);

    formula.forEach((value) => {
      if([Operators.PLUS, Operators.MINUS].includes(value)){
        operator = value;
      }
      else{
        if(operator === Operators.PLUS){
          calculatedNumber += value;
        }
        else if(operator === Operators.MINUS){
          calculatedNumber -= value;
        }
        else{
          calculatedNumber = value;
        }
      }
    });

    setResult(calculatedNumber);
    setFormula([]);
  };




  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Result Display Area */}
      <View style={styles.resultContainer}>
        <Text style={styles.text}>
          {result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
      </View>

      {/* Button Area */}
      <View style={styles.buttonContainer}>
        <View style={styles.leftPad}>
          <View style={styles.number}>
            {[1,2,3,4,5,6,7,8,9].map((num) => (
              <Button
                key={num}
                title={num.toString()}
                onPress={()=>{onPressNumber(num)}}
                buttonStyle={{width: width, height: width, marginBottom: 1}} 
                buttonType={ButtonTypes.NUMBER}
              />
            ))}
          </View>

          <View style={styles.bottom}>
            <Button
              title="0"
              onPress={()=>{onPressNumber(0)}}
              buttonStyle={{
                width: width * 2, 
                height: width, 
                marginTop: 1
              }} 
              buttonType={ButtonTypes.NUMBER}
            />
            <Button
              title= {Operators.EQUAL}
              onPress={()=>{onPressOperator(Operators.EQUAL)}}
              buttonType={ButtonTypes.OPERATOR}
              buttonStyle={{width: width, height: width, marginTop: 1}} 
            />
          </View>
        </View>

        <View>
          <Button
            title = {Operators.CLEAR}
            onPress={()=>{onPressOperator(Operators.CLEAR)}}
            buttonStyle={{width, height: width, marginTop: 1}}
            buttonType={ButtonTypes.OPERATOR}
          />
          <Button
            title={Operators.MINUS}
            onPress={()=>{onPressOperator(Operators.MINUS)}}
            buttonStyle={{width, height:width, marginTop : 1}} 
            buttonType={ButtonTypes.OPERATOR}
          />
          <Button
            title= {Operators.PLUS}
            onPress={()=>{onPressOperator(Operators.PLUS)}}
            buttonStyle={{width, height:width * 2 + 1, marginTop : 1}} 
            buttonType={ButtonTypes.OPERATOR}
          />
        </View>
      </View>
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
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  text: {
    fontSize: 60,
    fontWeigth: "700",
    color: "#ffffff",
    paddingBotton: 30,
    paddingRight: 30,
  },
  resultContainer: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "flex-end",
    alignItem: "flex-end",
  },
  buttonContainer: {
    backgroundColor: "#000000",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  leftPad: {
    backgroundColor: "green",
    width: "75%",
  },
  number: {
    flexWrap : "wrap-reverse",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "evenly",
  },
});

export default App;

// ----------------------------------------------------------------------------------------------------------------
// const App = () => {
//   const [result, setResult] = useState(0);
//   console.log("rendering : ", result);

//   return (
//     <View style={styles.container}>
//       <StatusBar style="light" />

//       <View style={styles.resultContainer}>
//         <Text style={styles.text}>{result}</Text>
//       </View>

//       <View style={styles.buttonContainer}>
//         <Text>Buttonddd</Text>
//       </View>

//       {/* ------------------------------------------------------------------------------------------------
//       <Text style={[styles.error, styles.text]}> StyleSheet </Text>
//       <Text style={styles.error}> Error </Text>
//       <Text style={[styles.text, isError && styles.error]}>Error two</Text>

//       <Button
//         title="1"
//         onPress={() => console.log("1")}
//         buttonStyle={styles.button}
//         buttonType={ButtonTypes.NUMBER}
//       />
//       <Button
//         title="0"
//         onPress={() => console.log("0")}
//         buttonStyle={styles.button}
//         buttonType={ButtonTypes.NUMBER}
//       />
//       <Button
//         title="+"
//         onPress={() => {
//           setResult((prevState) => {
//             console.log("prevState 1 :", prevState);
//             return prevState + 1;
//           });
//           setResult((prevState) => {
//             console.log("prevState 2 :", prevState);
//             return prevState + 1;
//           });
//           console.log("+", result);
//         }}
//         buttonStyle={styles.button}
//         buttonType={ButtonTypes.OPERATOR}
//       />

//       <View style={{ paddingVertical: 10 }}></View>
//       <Button
//         title="-"
//         onPress={() => {
//           setResult(result - 1);
//           console.log("-", result);
//         }}
//         buttonStyle={styles.button}
//         buttonType={ButtonTypes.OPERATOR}
//       />
//       */}
//     </View>
//   );
// };

// // StyleSheet: React Native에서 제공하는 모듈로, 스타일 객체를 만들고 관리하는 데 사용됩니다.

// // .create(...): 이 메서드는 스타일 객체를 생성합니다.
// // 이 방식이 일반 JavaScript 객체를 사용하는 것보다 성능상 이점이 있고,
// // 스타일이 앱을 로드할 때 한 번만 생성되도록 최적화합니다.

// // styles: 생성된 스타일 객체를 담는 변수 이름입니다.
// // 보통 이 변수 이름을 사용하며, 컴포넌트 내의 여러 요소에 이 스타일을 가져와서 적용합니다.
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "column",
//     backgroundColor: "#fff",
//     alignItems: "stretch",
//     justifyContent: "center",
//   },
//   text: {
//     fontSize: 60,
//     fontWeigth: "700",
//     color: "#ffffff",
//     paddingBotton: 30,
//     paddingRight: 30,
//   },
//   button: {
//     width: 100,
//     height: 100,
//   },
//   error: {
//     fontSize: 30,
//     fontWeigth: "700",
//     color: "red",
//   },
//   resultContainer: {
//     flex: 1,
//     backgroundColor: "#000000",
//     justifyContent: "flex-end",
//     alignItem: "flex-end",
//   },
//   buttonContainer: {
//     flex: 1,
//     backgroundColor: "#A584FC",
//   },
// });

// export default App;
