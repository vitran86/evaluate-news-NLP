// declare variables using for functions
var validator = require("validator");
const msg = document.getElementById("warning-msg");
const confirmBtn = document.querySelector("#confirm-btn");

// set up function to sending a warning message for user incase input is not a valid URL, require their confirmation
const sendWarningMsg = () => {
  msg.innerHTML = `Input is not a valid URL. (It should start with http:// or https:// and contain no spaces). Please revise your input, otherwise, click Confirm for further process.`;
  confirmBtn.classList.add("active");
  document.querySelector("#table").classList.add("hide");
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

// set up function to clarify the input
export const validate = (input) => {
  // check if input is not a valid URL and not start with "http", then it's a text
  if (!validator.isURL(input) && input.substring(0, 4) !== "http") {
    msg.innerHTML = `Your input is a text`;
    return "txt";
  } else if (!validator.isURL(input) && input.substring(0, 4) === "http") {
    sendWarningMsg();
    const txt = handleConfirm();
    return txt;
  } else {
    msg.innerHTML = `Your input is an URL`;
    return "url";
  }
};

// set up function to post data to server
const postData = async (input) => {
  let type = validate(input);

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
    const data = await result.json(); // data can be either formatted array or original data object
    console.log(data);
    if (data.length > 1) {
      return data; // --> formated data is an array of objects
    } else {
      msg.innerHTML = data.status.msg;
    }
  } else {
    console.log("error", error);
  }
};

function displayResult(objects) {
  let table = document.querySelector("#table");
  const newTable = generateTable(objects);

  // declare function generateTable as below:
  function generateTable(objects) {
    const generateTableBody = (objects) => {
      // --> for creating <tbody>
      objects.forEach((object) => {
        let row = table.insertRow(); // --> create element <tr>
        // ( use (for (...in) to loop through and print out all items in an object) --> to create elements <td>
        for (let item in object) {
          let cell = row.insertCell();
          let content = document.createTextNode(object[item]);
          cell.appendChild(content);
        }
      });
    };
    generateTableBody(objects);

    const generateTableHead = (objects) => {
      let textHeaders = Object.keys(objects[0]); // --> return name of properties in boilerplate object (the first object)
      let thead = table.createTHead(); // --> for creating <thead>
      thead.classList.add("table-header");
      let header = thead.insertRow(); // --> create element <tr>
      textHeaders.forEach((textHeader) => {
        let th = document.createElement("th"); // --> create element <th>
        let text = document.createTextNode(textHeader);
        th.append(text);
        header.append(th);
      });
    };
    generateTableHead(objects);
  }
}

function setUpEvent() {
  // add eventlistener for Submit button

  document.getElementById("submit-btn").addEventListener("click", () => {
    let input = document.getElementById("name").value;
    postData(input).then((data) => displayResult(data));

    // active the result box
    document.querySelector(".display-result").classList.add("active");

    // reset value in input box & result box:
    document.getElementById("name").value = "";
    document.querySelector("#table").innerHTML = "";
  });
}

export { setUpEvent };
