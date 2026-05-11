const searchBtn = document.getElementById('search-btn');
const userContainer = document.getElementById('user-container');
const noUser = document.getElementById('no-user');
let input;


async function getData() {
    try {
        const response = await fetch("/data.json");
        const data = await response.json();

        return search(data);
    } catch (error) {
        console.error("failed to get data: ", error);
    };
};


const search = (data) => {
    console.log('this is the search function: ');

    const userIndex = data.findIndex(user =>
        user.username.toLowerCase().includes(input.toLowerCase()) ||
        user.full_name.toLowerCase().includes(input.toLowerCase())
    );

    if (userIndex !== -1) {
        console.log('user found: ', data[userIndex]);
        displayUser(data[userIndex]);
        return userIndex;
    } else {
        console.log('could not find user');
        userContainer.style.display = 'none';
        noUser.style.display = 'block';
        return -1;
    };
};


const displayUser = (users) => {
    noUser.style.display = 'none';
    userContainer.style.display = 'block';
    console.log('name', users.full_name);

    document.getElementById('name').textContent = users.full_name;
    document.getElementById('email').textContent = users.email;
    document.getElementById('username').textContent = users.username;
    document.getElementById('age').textContent = users.age;
    document.getElementById('gender').textContent = users.gender;
    document.getElementById('date').textContent = users.date_of_birth;
    document.getElementById('occupation').textContent = users.occupation;
    document.getElementById('company').textContent = users.company;
    document.getElementById('account-create').textContent = users.account_created;
    document.getElementById('last-login').textContent = users.last_login;
    document.getElementById('subscription').textContent = users.subscription;
    document.getElementById('city').textContent = users.location.city;
    document.getElementById('state').textContent = users.location.state;
    document.getElementById('country').textContent = users.location.country;
    document.getElementById('zip').textContent = users.location.zip;
    document.getElementById('twitter').textContent = users.social_links.twitter;
    document.getElementById('linkedin').textContent = users.social_links.linkedin;
    document.getElementById('github').textContent = users.social_links.github;

    document.getElementById('profile-image').src = users.profile_picture;
};

document.getElementById('search-input').addEventListener('input', () => {
    input = document.getElementById('search-input').value;
    
    if (input === '') {
        userContainer.style.display = 'none';
    };
});

searchBtn.addEventListener('click', () => {
    getData();

    console.log('input: ', input);
});

document.getElementById('search-input').addEventListener('keydown', () => {
    getData();

    console.log('input: ', input);
});