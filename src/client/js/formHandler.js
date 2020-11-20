import { postData } from "./api";
import { buildResultTable } from "./displayResult";

// declare variables using for functions
var validator = require("validator");
const msg = document.getElementById("warning-msg");
const confirmBtn = document.querySelector("#confirm-btn");

// set up function send input message for user, in case input is not a valid URL, require their confirmation
export const sendInputMsg = (type) => {
  const msg = document.getElementById("warning-msg");
  let message = "";
  if (type === "txt") {
    message = "Your input is a text";
    msg.innerHTML = message;
  } else if (type === "url") {
    message = "Your input is an URL";
    msg.innerHTML = message;
  } else if (type === "invalidURL") {
    message =
      "WARNING!!!Input is not a valid URL. (It should start with http:// or https:// and contain no spaces). Please revise your input, otherwise, click Confirm for further process.";
    msg.innerHTML = message;
    confirmBtn.classList.add("active");
    document.querySelector("#table").classList.add("hide");
  }
  return message;
};

// set up function handle user's confirmation
const handleConfirm = () => {
  confirmBtn.addEventListener("click", () => {
    msg.innerHTML = `Your input is treated as a text.`;
    confirmBtn.classList.remove("active");
    document.querySelector("#table").classList.remove("hide");
  });
  return "txt";
};

// set up function to clarify the input whether it's a text or a URL
export const getType = (input) => {
  let type = "";
  if (validator.isURL(input)) {
    type = "url";
  } else if (!validator.isURL(input) && input.substring(0, 4) !== "http") {
    type = "txt";
  } else if (!validator.isURL(input) && input.substring(0, 4) === "http") {
    type = "invalidURL";
  }
  return type;
};

function setUpEvent() {
  // add eventlistener for Submit button
  document.getElementById("submit-btn").addEventListener("click", () => {
    let input = document.getElementById("name").value;

    // get type of input -->pass it in PostData function to fetch data --> display result
    let type = getType(input);
    sendInputMsg(type);
    if (type === "invalidURL") {
      type = handleConfirm();
      appFuntion();
    } else {
      appFuntion();
    }
    async function appFuntion() {
      const APIData = await postData(input, type);
      console.log(APIData);
      // then display result
      if (!Array.isArray(APIData)) {
        msg.innerHTML = APIData;
      } else {
        const data = await APIData;
        console.log(data);
        buildResultTable(data);
      }
    }

    // active the result box
    document.querySelector(".display-result").classList.add("active");

    // reset value in input box & result box:
    document.getElementById("name").value = "";
    document.querySelector("#table").innerHTML = "";
  });
}

export { setUpEvent };
