document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const submitButton = document.querySelector("button[type='submit']");
    const fields = [
        "firstName",
        "lastName",
        "email",
        "password",
        "confirmPassword",
        "phone"
    ];
    const messageDiv = document.getElementById("message");

    // add input event listeners to each field
    fields.forEach(field => {
        document.getElementById(field).addEventListener("input", function () {
            validateField(field);
        });
    });

    // handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();
    });

    // add click event listener to the submit button
    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        let isValid = true;

        // validate all fields
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        // display message based on validation result
        if (isValid) {
            messageDiv.innerHTML = "User registered.";
            messageDiv.classList.add("text-success");
            messageDiv.classList.remove("text-danger");
            alert("Form Submitted");
        } else {
            messageDiv.innerHTML = "Please fix the errors above.";
            messageDiv.classList.add("text-danger");
            messageDiv.classList.remove("text-success");
        }
    });

    // validate individual field
    function validateField(field) {
        const value = document.getElementById(field).value.trim();
        let isValid = true;
        let errorMessage = "";

        // clear error message if value is empty
        if (value === "") {
            document.getElementById(field + "Error").innerHTML = "";
            return false;
        }

        switch (field) {
            case "firstName":
                if (value.length < 3) {
                    errorMessage = "First name must be at least 2 characters.";
                    isValid = false;
                }
                break;
            case "lastName":
                if (value.length < 3) {
                    errorMessage = "Last name must be at least 2 characters.";
                    isValid = false;
                }
                break;
            case "email":
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailPattern.test(value)) {
                    errorMessage = "Please enter a valid email address.";
                    isValid = false;
                }
                break;
            case "phone":
                const phonePattern = /^[0-9]{10}$/;
                if (!phonePattern.test(value)) {
                    errorMessage = "Phone must be 10 digits.";
                    isValid = false;
                }
                break;
            case "password":
                if (value.length < 6) {
                    errorMessage = "Password must be at least 6 characters.";
                    isValid = false;
                }
                break;
            case "confirmPassword":
                const password = document.getElementById("password").value.trim();
                if (value !== password) {
                    errorMessage = "Passwords do not match.";
                    isValid = false;
                }
                break;
        }

        document.getElementById(field + "Error").innerHTML = errorMessage;
        return isValid;
    }
});