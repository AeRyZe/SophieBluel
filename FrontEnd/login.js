// Fonction qui effectue la tentative de connexion avec les infos du formulaire
async function tryToLogin(ids) {
  let answer = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Accept': 'application/json'
    },
    body: JSON.stringify(ids)
  })
  .then(response => response.json());

  // Vérifie si l'utilisateur existe ou non, si oui, connecte et redirige à l'index
  if (!answer.userId) {
    alert("Utilisateur non trouvé !")
  } else {
    window.location.href = "./index.html";
    window.sessionStorage.setItem("token", answer.token)
  }
};

document.querySelector('#login-btn').addEventListener('click', (e) => {
  // Empêcher le comportement par défaut (à mettre en premier)
  e.preventDefault();

  // Récupère les valeurs des inputs du formulaire de connexion
  const ids = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };

  tryToLogin(ids)
});