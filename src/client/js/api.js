// set up function to post data to server
const postData = async (input, type) => {
  const result = await fetch(`http://localhost:3000/input`, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "text/plain",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      method: type,
      content: input,
    }),
  });
  if (result.status === 200) {
    const data = await result.json(); // data can be either formatted array or original data objec

    if (Array.isArray(data)) {
      return data; // --> formated data is an array of objects
    } else {
      return data.status.msg;
    }
  } else {
    console.log("error", error);
  }
};

export { postData };
