document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('.signupform');
    const signinForm = document.querySelector('.loginform');

signupForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;

    if (!validateEmail(email)) {
    alert('Invalid email format. Please use user@gmail.com');
    return;
    }

    if (!validatePassword(password)) {
    alert('Password must be at least 6 characters, contain at least one uppercase letter, one digit, and one special symbol.');
    return;
    }

    if (!validateUsername(name)) {
        alert('username should not start with number');
        return;
        }


    const userData = {
    email: email,
    password: password
    };

    fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
    alert('Signup successful!');
    signupForm.reset();
    })
    .catch(error => {
    alert('Error during signup. Try again later.');
    });
});

signinForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;

    if (!validateEmail(email)) {
    alert('Invalid email format. Please use user@gmail.com');
    return;
    }

    if (!validatePassword(password)) {
    alert('Password must contain at least one uppercase letter, one digit, and one special symbol.');
    return;
    }

    fetch(`http://localhost:3000/users?email=${email}`)
    .then(response => response.json())
    .then(users => {
        if (users.length === 0) {
        alert('User not found!');
        return;
        }

        const user = users[0];
        if (user.password !== password) {
        alert('Incorrect Email or password!');
        } else {
        alert('Sign in successful!');
        // handleLogin();
        signinForm.reset();
        }
    })
    .catch(error => {
        alert('Error during sign-in. Try again later.');
    });
});

// function handleLogin(){
//     setTimeout(() => {
//         window.location.href = "base.html";
//     }, 1000);
// }

function validateUsername(name) {
    const emailRegex = /^[a-zA-Z._%+-]{3,}$/;
    return emailRegex.test(name);
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    return passwordRegex.test(password);
}


const logregBox = document.querySelector('.logreg-box');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
    
    registerLink.addEventListener('click', () => {
        logregBox.classList.add('active');
    });

    loginLink.addEventListener('click', () => {
        logregBox.classList.remove('active');
    });

});