// -----------------------LOGIN---------------------------- //

$(function () {
  $('#login-form-link').click(function (e) {
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    $('#register-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
  });

  $('#register-form-link').click(function (e) {
    $("#register-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    $('#login-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
  });

});


// -----------------------------LOGIN script-------------------------------//

var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

function logIn(usernameInput, paaswordInput) {
  API.getExamples().then(function (data) {
    var currentUser = data.find(function (usersDB) {
      if (usersDB.userName === usernameInput && usersDB.password === paaswordInput) {
        return usersDB;
      }
    });
    console.log(currentUser);
    if (currentUser === undefined) {
      alert("username or password is incorrect");
    } else {
      window.location.replace("http://localhost:3000/homepage");
      
    }
  });
}

function signUp(usernameInput, paaswordInput) {
  API.getExamples().then(function (data) {
    var checkUsername = data.find(function (DBusername) {
      return DBusername.userName === usernameInput;
    });
    console.log(checkUsername);
    if (checkUsername === undefined) {
      alert("username is avaliable");
      var user = {
        userName: usernameInput,
        password: paaswordInput
      };
      API.saveExample(user).then(function () {
        refreshExamples();
      });
      $exampleText.val("");
      $exampleDescription.val("");
    } else {
      alert("username is taken");
    }
  });
}

function register() {
  $("#register-submit").on("click", function () {
    var username = $("#username").val();
    var password = $("#password").val();
    signUp(username, password);
  });
}

$("#login-submit").on('click', function () {
  var uname = $("#login-username").val();
  var pass = $("#login-password").val();
  logIn(uname, pass);
});


$(".register").on("click", function () {
  register();
});

