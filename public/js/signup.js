function validateForm() {

    var password = document.getElementById("password").value;
    var confirmpass = document.getElementById("confirmPasswordInput").value;
    var passSame = true;
    var divPassError = document.getElementById("confirmPasswordInputError");
    var passError = document.getElementById("passwordInputError");
    var isFormValid = true;

    //check 2 - no invalid characters ( <, >, #, -, {, }, (), ', ", ` )
    var elements = document.getElementsByTagName("input")
    var invalidChars = ['<', '>', '#', '-', '{', '}', '(', ')'];
    for(let i = 0; i < elements.length; i++){
        for(let j = 0; j < invalidChars.length; j++){
            if(elements[i].value.indexOf(invalidChars[j]) != -1) {
                elements[i].classList.add("hasError");
                isFormValid = false;
                var elle = document.getElementById(elements[i].id + "Error").innerHTML = "Please remove the invalid character " + invalidChars[j];

            }
        }
    }

    //check 3 - password contains small letter, capital letter and number

    var lower = false;
    var upper = false;
    var numb = false;
    
    //check for number same way checked for invalid characters except if they are contained it is good
    var nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    for(let j = 0; j < nums.length; j++){
        if(password.indexOf(nums[j]) != -1) {
            numb = true;
            passError.classList.add("invisible");
            document.getElementById("password").classList.remove("hasError");
        }
    }
    if(numb == false){
        passError.classList.remove("invisible");
        passError.innerHTML = "Password must contain a number.\n";
        document.getElementById("password").classList.add("hasError");
        isFormValid = false;
    }

    //check for lowercase
    var lowerCaseLetters = /[a-z]/g;
    if(password.match(lowerCaseLetters)) {
        lower = true;
        document.getElementById("password").classList.remove("hasError");
    }
    else {
        isFormValid = false;
        lower = false;
        passError.innerHTML = "Password must contain a lowercase letter."
        document.getElementById("password").classList.add("hasError");
    }

    //check for uppercase
    var upperCaseLetters = /[A-Z]/g;
    if(password.match(upperCaseLetters)) {
        upper = true;
        document.getElementById("password").classList.remove("hasError");
    }
    else {
        isFormValid = false;
        upper = false;
        passError.innerHTML = "Password must contain an uppercase letter."
        document.getElementById("password").classList.add("hasError");
    }


    //check 1 - same password

    if(password != confirmpass) {
        passSame = false;
        divPassError.classList.remove("invisible")
        divPassError.innerHTML = "Passwords must match, please retype"
        document.getElementById("password").classList.add("hasError");
        document.getElementById("confirmPasswordInput").classList.add("hasError");

        isFormValid = false;
    }
    else {
        divPassError.classList.add("invisible");
        document.getElementById("password").classList.remove("hasError");
        document.getElementById("confirmPasswordInput").classList.remove("hasError");
    }
     





    return isFormValid;
}

function updateSecurityQ() {
    var secQ = document.getElementById("secQ");
    var secQAnswer = document.getElementById("secQAnswer");

    if (secQ.value != ""){
        secQAnswer.classList.remove("invisible");
    }
    else{
        secQ.classList.add('invisible');
    }
}
