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

        if (input.hasOwnProperty("name") && input.name === "") {
            document.getElementById("name").classList.add("is-danger");
            msgArr.push("Name cannot be empty.");
        }

        if (input.hasOwnProperty("username") && input.username === "") {
            document.getElementById("username").classList.add("is-danger");
            msgArr.push("Username cannot be empty.");
        }
    
        if (input.hasOwnProperty("email")) {
            if (input.email === "") {
                document.getElementById("email").classList.add("is-danger");
                if (window.location.pathname === "/Login") {
                    msgArr.push("Email/Username cannot be empty.");
                } else {
                    msgArr.push("Email cannot be empty.");
                }
            } else {
                if (window.location.pathname !== "/Login") {
                    const emeilRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
                    if (!emeilRegex.test(input.email)) {
                        msgArr.push("Invalid email format.");
                    }
                }
            }
        }
    
        if (input.hasOwnProperty("password")) {
            if (input.password === "") {
                document.getElementById("password").classList.add("is-danger");
                msgArr.push("Password cannot be empty.");
            } else {
                if (input.password.length < 8) {
                    document.getElementById("password").classList.add("is-danger");
                    msgArr.push("Password must be at least 8 characters long.");
                } else if(!/[a-z]/.test(input.password)) {
                    document.getElementById("password").classList.add("is-danger");
                    msgArr.push("Password must have lowercase characters.");
                } else if(!/[A-Z]/.test(input.password)) {
                    document.getElementById("password").classList.add("is-danger");
                    msgArr.push("Password must have uppercase characters.");
                } else if(!/\d/.test(input.password)) {
                    document.getElementById("password").classList.add("is-danger");
                    msgArr.push("Password must have numeric characters.");
                } else if(!/[=+\-^$*.[\]{}()?"!@#%&/\\,><':;|_~`]/.test(input.password)) {
                    document.getElementById("password").classList.add("is-danger");
                    msgArr.push("Password must have at least one of following symbol characters. (= + - ^ $ * . [ ] { } ( ) ? \" ! @ # % & / \\ , > < ' : ; | _ ~ `)");
                }
            }
        }

        if (input.hasOwnProperty("confirmpassword")) {
            if (input.confirmpassword === "") {
                document.getElementById("confirmpassword").classList.add("is-danger");
                msgArr.push("Confirm Password cannot be empty.");
            } else if (input.confirmpassword !== input.password) {
                document.getElementById("password").classList.add("is-danger");
                document.getElementById("confirmpassword").classList.add("is-danger");
                msgArr.push("Passwords didn’t match.");
            }
        }

        if (input.hasOwnProperty("address") && input.address === "") {
            document.getElementById("address").classList.add("is-danger");
            msgArr.push("Address cannot be empty.");
        }

        if (input.hasOwnProperty("phonenumber")) {
            const regex = /^[+][0-9]{5}/;
            if (input.phonenumber === "") {
                document.getElementById("phonenumber").classList.add("is-danger");
                msgArr.push("Phone Number cannot be empty.");
            } else if (!regex.test(input.phonenumber)) {
                document.getElementById("phonenumber").classList.add("is-danger");
                msgArr.push("Invalid phone number format.");
            }
        }

        resolve(msgArr);
    })
}

export default validate;