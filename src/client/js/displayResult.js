const buildResultTable = (data) => {
  const newTable = generateTable(data);

  // function generate Table
  function generateTable(data) {
    let table = document.querySelector("#table");

    const tableBody = generateTableBody(data);
    // create table body
    function generateTableBody(data) {
      // --> for creating <tbody>
      data.forEach((object) => {
        let row = table.insertRow(); // --> create element <tr>
        // ( use (for (...in) to loop through and print out all items in an object) --> to create elements <td>
        for (let item in object) {
          let cell = row.insertCell();
          let content = document.createTextNode(object[item]);
          /* console.log(content); */
          cell.appendChild(content);
        }
      });

      return tableBody;
    }

    const tableHead = generateTableHead(data);
    //create table head
    function generateTableHead(data) {
      let textHeaders = Object.keys(data[0]); // --> return name of properties in boilerplate object (the first object)
      /* console.log(textHeaders); */
      let thead = table.createTHead(); // --> for creating <thead>
      thead.classList.add("table-header");
      let header = thead.insertRow(); // --> create element <tr>
      textHeaders.forEach((textHeader) => {
        let th = document.createElement("th"); // --> create element <th>
        /* console.log(th); */
        let text = document.createTextNode(textHeader);
        /* console.log(text); */
        th.append(text);
        header.append(th);
      });

      return tableHead;
    }

    return newTable;
  }

  return newTable;
};

export { buildResultTable };
