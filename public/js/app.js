console.log("client side js is loaded!");

const weatherForm = document.querySelector("form");

weatherForm.addEventListener("submit", (e) => {
  const message1 = document.querySelector("#location");
  const message2 = document.querySelector("#forecast");

  message1.textContent = "loading...";

  e.preventDefault();
  const address = document.querySelector("input").value;
  fetch(`/weather?address=${address}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error;
        message2.textContent = "";
      } else {
        const { location, forecast } = data;

        message1.textContent = location;
        message2.textContent = forecast;
      }
    });
  });
});

// const buttonElement = document.querySelector("button");
// const inputElement = document.querySelector("input");

// console.log(buttonElement);
// console.log(inputElement);

// buttonElement.addEventListener("click", (e) => {
//   e.preventDefault();
//   const address = document.querySelector("input").value;

//   fetch(`http://localhost:3000/weather?address=${address}`).then((res) => {
//     res.json().then((data) => {
//       if (data.error) {
//         console.log(data.error);
//       } else {
//         console.log(data);
//         var node = document.createElement("p"); // Create a <li> node
//         var textnode = document.createTextNode(data.location); // Create a text node
//         node.appendChild(textnode);
//         document.body.appendChild(node);
//       }
//     });
//   });
// });
