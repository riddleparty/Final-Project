// // Get references to page elements
// var $exampleText = $("#login-username");
// var $exampleDescription = $("#login-password");
// var $submitBtn = $("#login-submit");
// var $exampleList = $("#example-list");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function (example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function () {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function (id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function () {
//   API.getExamples().then(function (data) {
//     var $examples = data.map(function (user) {
//       var $a = $("<a>")
//         .text(user.userName)
//         .attr("href", "/example/" + user.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": user.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function (event) {
//   event.preventDefault();
//   var user = {
//     userName: $exampleText.val().trim(),
//     password: $exampleDescription.val().trim()
//   };

//   if (!(user.userName && user.password)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   // uncomment this to check username and password
//   logIn($exampleText.val().trim(), $exampleDescription.val().trim());

//   //uncomment this to test sign-ups
//   // signUp($exampleText.val().trim(), $exampleDescription.val().trim());
// };

// function logIn(usernameInput, paaswordInput) {
//   API.getExamples().then(function (data) {
//     var currentUser = data.find(function (usersDB) {
//       if (usersDB.userName === usernameInput && usersDB.password === paaswordInput) {
//         return usersDB;
//       }
//     });
//     console.log(currentUser);
//     if (currentUser === undefined) {
//       alert("username or password is incorrect");
//     } else {
//       alert("welcome back!");
//     }
//   });
// }

// function signUp(usernameInput, paaswordInput) {
//   API.getExamples().then(function (data) {
//     var checkUsername = data.find(function (DBusername) {
//       return DBusername.userName === usernameInput;
//     });
//     console.log(checkUsername);
//     if (checkUsername === undefined) {
//       alert("username is avaliable");
//       var user = {
//         userName: usernameInput,
//         password: paaswordInput
//       };
//       API.saveExample(user).then(function () {
//         refreshExamples();
//       });
//       $exampleText.val("");
//       $exampleDescription.val("");
//     } else {
//       alert("username is taken");
//     }
//   });
// }
// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function () {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function () {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
