// ? =============> Global ===============>
const inputs = document.querySelectorAll("input");
const btnLogin = document.getElementById("btnLogin");
const formData = document.querySelector("form");
const mode = document.getElementById('mode');

let isValid = false;
// * =============> Events ===============>
document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();

  isValid = validationEmail(inputs[0]) && validationPassword(inputs[1]);

  if (isValid) {
    setForm();
  }
});

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("blur", function () {
    switch (i) {
      case 0:
        isValid = validationEmail(inputs[i]);
        break;
      case 1:
        isValid = validationPassword(inputs[i]);
        break;
    }
  });
}

if (localStorage.getItem("theme") != null) {
  const themeData = localStorage.getItem("theme");

  if (themeData === "light") {
    mode.classList.replace("fa-sun", "fa-moon");
  }else{
    mode.classList.replace("fa-moon", "fa-sun");

  }
  document.querySelector("html").setAttribute("data-theme", themeData);

}

mode.addEventListener("click", function (e) {
  if (mode.classList.contains("fa-sun")) {
    document.querySelector("html").setAttribute("data-theme", "light");
    mode.classList.replace("fa-sun", "fa-moon");

    localStorage.setItem("theme", "light");
  } else {
    document.querySelector("html").setAttribute("data-theme", "dark");
    mode.classList.replace("fa-moon", "fa-sun");

    localStorage.setItem("theme", "dark");
  }
});
// ! =============> Functions ===============>
function setForm() {
  const user = {
    email: inputs[0].value,
    password: inputs[1].value,
  };
  console.log(user);
  loginForm(user);
}

async function loginForm(userData) {
  const api = await fetch(`https://movies-api.routemisr.com/signin`, {
    method: "Post",
    body: JSON.stringify(userData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const response = await api.json();

  if (response.message === "success") {
    localStorage.setItem('uToken', response.token);
    
    toastr.success('Log in Success', { timeOut: 10000 });
    
    location.href = "./home.html";
  } else {
    toastr.error('Email does not exist');
    document.getElementById("msg").innerHTML = response.message;
  }
  
  console.log(response);
}
  toastr.options = {
    "closeButton": true,
    "positionClass": "toast-top-right",
  };
  

//  =============> Validation ===============>
function validationEmail() {
  const regexStyle =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (regexStyle.test(inputs[0].value)) {
    inputs[0].classList.add("is-valid");
    inputs[0].classList.remove("is-invalid");
    return true;
  } else {
    inputs[0].classList.add("is-invalid");
    inputs[0].classList.remove("is-valid");
    return false;
  }
}

function validationPassword() {
  const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (regexStyle.test(inputs[1].value)) {
    inputs[1].classList.add("is-valid");
    inputs[1].classList.remove("is-invalid");
    return true;
  } else {
    inputs[1].classList.add("is-invalid");
    inputs[1].classList.remove("is-valid");
    return false;
  }
}
