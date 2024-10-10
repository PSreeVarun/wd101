document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = new Date(document.getElementById('dob').value);
    const acceptedTerms = document.getElementById('acceptedTerms').checked;

    // Validate age
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const isValidAge = age >= 18 && age <= 55;

    if (!isValidAge) {
        alert('You must be between 18 and 55 years old.');
        return;
    }

    // Save to localStorage
    const userData = { name, email, password, dob: dob.toISOString(), acceptedTerms };
    localStorage.setItem(name, JSON.stringify(userData));

    // Append data to table
    const tbody = document.getElementById('userData').querySelector('tbody');
    const row = tbody.insertRow();
    row.insertCell(0).innerText = name;
    row.insertCell(1).innerText = email;
    row.insertCell(2).innerText = password;
    row.insertCell(3).innerText = dob.toISOString().split('T')[0];
    row.insertCell(4).innerText = acceptedTerms;

    // Reset form
    document.getElementById('registrationForm').reset();
});

// Load saved data on page load
window.onload = function() {
    const tbody = document.getElementById('userData').querySelector('tbody');
    for (let key in localStorage) {
        const user = JSON.parse(localStorage.getItem(key));
        const row = tbody.insertRow();
        row.insertCell(0).innerText = user.name;
        row.insertCell(1).innerText = user.email;
        row.insertCell(2).innerText = user.password;
        row.insertCell(3).innerText = new Date(user.dob).toISOString().split('T')[0];
        row.insertCell(4).innerText = user.acceptedTerms;
    }
};
