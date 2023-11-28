document.addEventListener('DOMContentLoaded', function() {
    // Gestion des onglets
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            // Enlèvement de la classe 'active' de tous les onglets et de leur contenu
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(content => content.classList.remove('active'));

            // Ajout de la classe 'active' à l'onglet cliqué et à son contenu
            tab.classList.add('active');
            const contentId = tab.getAttribute('data-tab');
            document.getElementById(contentId).classList.add('active');
        });
    });

    fetchUserData();
    fetchGameProgress();
    fetchRewardsData();
});

// Fonction pour mettre à jour les informations de l'utilisateur
function UserData(data) {
    const userNameElement = document.querySelector('.user-info h1');
    if (userNameElement) {
        userNameElement.textContent = data.name; // Faut changer 'name' pour mettre la propriété correcte 
    }

}

// Fonction pour mettre à jour la progression des jeux
function GameProgress(data) {
    const gameProgressContainer = document.getElementById('progression');
    gameProgressContainer.innerHTML = ''; // Réinitialiser le contenu

    data.games.forEach(game => {
        const gameInfo = document.createElement('p');
        gameInfo.textContent = `${game.name} - ${game.points}/300 pts`;
        gameProgressContainer.appendChild(gameInfo);
    });
}

// Fonction pour mettre à jour les récompenses disponibles
function Rewards(data) {
    const rewardsContainer = document.getElementById('recompense');
    rewardsContainer.innerHTML = ''; // Réinitialiser le contenu

    data.rewards.forEach(reward => {
        const rewardElement = document.createElement('div');
        rewardElement.className = 'reward';
        rewardElement.innerHTML = `
            <h3>${reward.title}</h3>
            <p>Coût : ${reward.cost} points</p>
        `;
        rewardsContainer.appendChild(rewardElement);
    });

    // Mise à jour des points de l'utilisateur
    const userPointsElement = document.getElementById('user-points');
    if (userPointsElement) {
        userPointsElement.textContent = data.userPoints;
    }
}

