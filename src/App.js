import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    // 사용자 입력 받기
    const input = await Console.readLineAsync("덧셈할 문자열을 입력해 주세요.");

    // 빈 문자열 처리
    if (input === "") {
      Console.print("결과 : 0");
      return;
    }

    // 공백만 있는 입력 처리
    if (!input.trim()) {
      throw new Error("[ERROR] 입력 값이 공백입니다.");
    }

    // 기본 구분자 설정 (쉼표, 콜론)
    let delimiter = /,|:/;
    let numbersStr = input;

    // 커스텀 구분자가 있는 경우 처리
    if (input.startsWith("//")) {
      const parts = input.split(/\r?\n/); // "//;"와 숫자 문자열 분리
      if (parts.length < 2) {
        throw new Error("[ERROR] 잘못된 입력"); // 숫자 문자열 없으면 에러
      }

      // 커스텀 구분자 추출
      let custom = parts[0].slice(2);
      // 특수문자 이스케이프 처리
      custom = custom.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      // 기본 구분자 + 커스텀 구분자를 모두 포함하도록 정규식 생성
      delimiter = new RegExp(`${custom}|,|:`);
      numbersStr = parts.slice(1).join("\n"); // 숫자 문자열만 다시 합치기
    }

    // 문자열 구분자로 나누고, 빈 문자열 제거 후 숫자로 변환
    const numbers = numbersStr
      .split(delimiter)
      .filter(s => s !== "") // **빈 문자열 제거**
      .map(Number);

    // 입력값 검증: 숫자가 아닌 값이나 음수가 있는지 체크
    if (numbers.some((num) => isNaN(num) || num < 0)) {
      throw new Error("[ERROR] 잘못된 입력");
    }

    // 합계 계산
    const sum = numbers.reduce((acc, cur) => acc + cur, 0);

    // 최종 결과 출력
    Console.print(`결과 : ${sum}`);
  }
}

export default App;

