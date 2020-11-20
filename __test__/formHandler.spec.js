import { getType, sendInputMsg } from "../src/client/js/formHandler.js";

describe("test getType", () => {
  test("accept valid URL", () => {
    // input
    let input = "https://google.com/";
    //run function
    const result = getType(input);
    //check output
    expect(result).toBe("url");
  });
  test("accept a text", () => {
    // input
    let input = "hello Vi";
    //run function
    const result = getType(input);
    //check output
    expect(result).toBe("txt");
  });
  test("detect invalid URL", () => {
    // input
    let input = "http//google.com/";
    //run function
    const result = getType(input);
    //check output
    expect(result).toBe("invalidURL");
  });
});

describe("Testing sendInputMsg", () => {
  test("Testing sending message for a URL", () => {
    // input
    let type = "url";
    //run function
    const message = sendInputMsg(type);
    //check output
    expect(message).toBe("Your input is an URL");
  });
  test("Testing sending message for a text", () => {
    // input
    let type = "txt";
    //run function
    const result = sendInputMsg(type);
    //check output
    expect(result).toBe("Your input is a text");
  });
  test("Testing sending warning message for a invalid URL input", () => {
    // input
    let type = "invalidURL";
    //run function
    const message = sendInputMsg(type);
    //check output
    expect(message).toBe(
      "WARNING!!!Input is not a valid URL. (It should start with http:// or https:// and contain no spaces). Please revise your input, otherwise, click Confirm for further process."
    );
  });
});
