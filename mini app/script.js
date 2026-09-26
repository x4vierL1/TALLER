const usersContainer = document.getElementById("usersContainer");
const loadButton = document.getElementById("loadButton");
const searchInput = document.getElementById("searchInput");
const status = document.getElementById("status");

let users = [];

async function fetchUsers() {
    status.textContent = "Cargando usuarios...";
    usersContainer.innerHTML = "";

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("No se pudieron obtener los usuarios.");
        }

        users = await response.json();

        status.textContent = `Se cargaron ${users.length} usuarios.`;
        displayUsers(users);
    } catch (error) {
        status.textContent = "Ocurrió un error al cargar los usuarios.";
        console.error(error);
    }
}

function displayUsers(usersToDisplay) {
    usersContainer.innerHTML = "";

    if (usersToDisplay.length === 0) {
        usersContainer.innerHTML = "<p>No se encontraron usuarios.</p>";
        return;
    }

    usersToDisplay.forEach((user) => {
        const userCard = document.createElement("article");

        userCard.classList.add("user-card");

        userCard.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Usuario:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Teléfono:</strong> ${user.phone}</p>
            <p><strong>Ciudad:</strong> ${user.address.city}</p>
            <a href="https://${user.website}" target="_blank">
                Visitar sitio web
            </a>
        `;

        usersContainer.appendChild(userCard);
    });
}

function filterUsers() {
    const searchText = searchInput.value.toLowerCase();

    const filteredUsers = users.filter((user) => {
        return (
            user.name.toLowerCase().includes(searchText) ||
            user.username.toLowerCase().includes(searchText) ||
            user.email.toLowerCase().includes(searchText)
        );
    });

    displayUsers(filteredUsers);
}

loadButton.addEventListener("click", fetchUsers);
searchInput.addEventListener("input", filterUsers);
