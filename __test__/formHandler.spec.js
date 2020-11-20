import { getType } from "../src/client/js/formHandler.js";

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
