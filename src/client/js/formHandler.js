console.log("hello Vi");
import validator from "validator";
const validator = require("validator");
export { handleSubmit };

function handleSubmit(event) {
  event.preventDefault();
  document.getElementById("submit-btn").addEventListener("click", () => {
    text = document.getElementById("name").value;
    if (text) {
      // check what text was put into the form field
      checkForName(text);
      console.log("::: Form Submitted :::");
      sortOutInput(text);
      postData(text).then((data) => console.log(data));
    }
  });
}

// set up function to clarify the input

let sortOutInput = (text) => {
  text = document.getElementById("name").value;
  console.log(text);
  if (validator.isURL(text)) {
    type = "url";
  } else {
    type = "txt";
  }
};

// set up function to post data to server
const postData = async (text) => {
  sortOutInput(text);
  const result = await fetch(`http://localhost:8000/input`, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: type,
      input: text,
    }),
  });
  if (result.status === 200) {
    const data = await result.json();
    return data;
  } else {
    throw new Error(`Unable to fetch data`);
  }
};
