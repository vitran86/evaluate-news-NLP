import { postData } from "../src/client/js/api.js";
import { arrayResultData, ObjectResultData } from "./mock/APImock";

global.fetch = jest.fn(() => Promise.resolve(arrayResultData));

describe("test PostData", () => {
  test("get array data when success", async () => {
    //input
    let input = "https://google.com";
    let type = "url";
    //run function

    let result = await postData(input, type);
    console.log(result);

    //output
    expect(result.length).toBe(2);
    expect(result).toEqual([
      {
        Level: "Global",
        Text: `The text is subjectivity and does not has irony`,
        Score_tag: "Positive",
        Agreement: "Agreement",
        Confidence: 100,
      },
      {
        Level: "Sentence",
        Text: `Hello`,
        Score_tag: "Positive",
        Agreement: "Agreement",
        Confidence: 100,
      },
    ]);
  });
  test("get object data when error", async () => {
    fetch.mockImplementationOnce(() => Promise.resolve(ObjectResultData));

    // input
    let input = "www.messenger.com";
    let type = "url";

    // run function
    let result = await postData(input, type);
    console.log(result);

    // output
    expect(result).toBe("No content to analyze");
  });
});
