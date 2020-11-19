import { sendWarningMsg, validate } from "../src/client/js/formHandler.js";

/* describe("test validate", () => {
  test("accept valid URL", () => {
    // input
    let input = "https://google.com/";
    //run function
    const result = validate(input);
    //check output
    expect(result).toBe("url");
  });
  test("accept a text", () => {
    // input
    let input = "hello Vi";
    //run function
    const result = validate(input);
    //check output
    expect(result).toBe("txt");
  });
});
 */

describe("Testing sendWarningMsg", () => {
  test("Testing sending warning message function", () => {
    //run function
    const result = sendWarningMsg();
    //check output
    expect(result).toBeDefined();
  });
});
