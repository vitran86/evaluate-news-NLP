let arrayResultData = {
  status: 200,
  json: () => {
    return Promise.resolve([
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
  },
};

let ObjectResultData = {
  status: 200,
  json: () => {
    return Promise.resolve({
      status: {
        code: "212",
        msg: "No content to analyze",
        credits: "0",
        remaining_credits: "19181",
      },
    });
  },
};

export { arrayResultData, ObjectResultData };
