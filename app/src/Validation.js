function validate(input) {
    return new Promise((resolve) => {
        const msgArr = [];
        //clear error class name everytime before validation
        const error_tags = document.getElementsByClassName("is-danger");
        for (let x = 0; x < error_tags.length; x++) {
            if (!error_tags[x].classList.contains("error")) {
                error_tags[x].classList.remove("is-danger");
            }
        }
    
        if (input.hasOwnProperty("email") && input.email === "") {
            document.getElementById("email").classList.add("is-danger");
            msgArr.push("Email/Username field are required.");
        }
    
        if (input.hasOwnProperty("password") && input.password === "") {
            document.getElementById("password").classList.add("is-danger");
            msgArr.push("Password field are required.");
        }    

        resolve(msgArr);
    })
}

export default validate;