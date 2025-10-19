import {Console} from "@woowacourse/mission-utils";

class App {
  async run() {

    // 사용자 입력 받기
    const input = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.') ;
    

    // 빈 문자열 처리
    if (input === ""){
      Console.print("결과 : 0");
      return;
    }

    // 공백만 있는 입력 처리
    if (!input.trim()){
      throw new Error ("ERROR] 입력이 비어있거나 공백입니다.");
    }
  }
}

export default App;
