// Application Data
let appData = {
    admin_id: "1299831974",
    currentUser: null,
    currentPage: 'dashboard',
    darkMode: false,
    quizzes: [
        {
            id: 1,
            question: "Quelle est la capitale de la France ?",
            image: null,
            choices: ["Londres", "Berlin", "Paris", "Madrid"],
            correct_answer: 2,
            topic: "Géographie",
            difficulty: "Facile",
            is_exam: false
        },
        {
            id: 2,
            question: "Combien font 2 + 2 ?",
            image: null,
            choices: ["3", "4", "5", "6"],
            correct_answer: 1,
            topic: "Mathématiques",
            difficulty: "Facile",
            is_exam: false
        },
        {
            id: 3,
            question: "Qui a peint la Joconde ?",
            image: null,
            choices: ["Picasso", "Van Gogh", "Leonardo da Vinci", "Monet"],
            correct_answer: 2,
            topic: "Art",
            difficulty: "Moyen",
            is_exam: true
        },
        {
            id: 4,
            question: "Quel est le plus grand océan du monde ?",
            image: null,
            choices: ["Atlantique", "Pacifique", "Indien", "Arctique"],
            correct_answer: 1,
            topic: "Géographie",
            difficulty: "Moyen",
            is_exam: false
        },
        {
            id: 5,
            question: "En quelle année a eu lieu la Révolution française ?",
            image: null,
            choices: ["1789", "1799", "1804", "1815"],
            correct_answer: 0,
            topic: "Histoire",
            difficulty: "Moyen",
            is_exam: true
        }
    ],
    players: [
        {
            id: 1,
            username: "Alexandre_92",
            telegram_id: "123456789",
            total_score: 1250,
            questions_answered: 45,
            correct_answers: 38,
            avg_response_time: 8.5,
            join_date: "2024-01-15"
        },
        {
            id: 2,
            username: "Marie_Quiz",
            telegram_id: "987654321",
            total_score: 1180,
            questions_answered: 42,
            correct_answers: 35,
            avg_response_time: 7.2,
            join_date: "2024-01-20"
        },
        {
            id: 3,
            username: "ThomasLeBoss",
            telegram_id: "456789123",
            total_score: 980,
            questions_answered: 35,
            correct_answers: 28,
            avg_response_time: 9.1,
            join_date: "2024-02-01"
        },
        {
            id: 4,
            username: "SophieQuizz",
            telegram_id: "789123456",
            total_score: 850,
            questions_answered: 30,
            correct_answers: 23,
            avg_response_time: 10.3,
            join_date: "2024-02-10"
        },
        {
            id: 5,
            username: "JulienMaster",
            telegram_id: "321654987",
            total_score: 720,
            questions_answered: 28,
            correct_answers: 20,
            avg_response_time: 11.8,
            join_date: "2024-02-15"
        }
    ],
    contests: [
        {
            id: 1,
            name: "Quiz Spécial Géographie",
            scheduled_date: "2024-12-20T20:00:00",
            status: "scheduled",
            participants_limit: 100,
            prize: "Badge Géographie Master"
        },
        {
            id: 2,
            name: "Challenge Mathématiques",
            scheduled_date: "2024-12-25T15:00:00",
            status: "scheduled",
            participants_limit: 50,
            prize: "Calculatrice d'or virtuelle"
        }
    ],
    statistics: {
        total_players: 5,
        total_questions: 150,
        global_success_rate: 76.5,
        avg_response_time: 9.2,
        most_popular_topic: "Géographie",
        daily_active_users: 3
    },
    botSession: {
        active: false,
        currentQuiz: null,
        score: 0,
        questionIndex: 0,
        timeLeft: 15,
        timer: null
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('App initializing...');
    initializeApp();
    setupEventListeners();
    checkTheme();
});

function initializeApp() {
    console.log('Initializing app...');
    showPage('login');
    populatePublicPage();
    updateDashboard();
}

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Login form - Fixed event listener
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // Public page link - Fixed
    const publicPageLink = document.getElementById('public-page-link');
    if (publicPageLink) {
        publicPageLink.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('public');
        });
    }
    
    // Back to login - Fixed
    const backToLogin = document.getElementById('back-to-login');
    if (backToLogin) {
        backToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('login');
        });
    }
    
    // Logout
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Sidebar navigation
    document.querySelectorAll('.sidebar-menu a[data-page]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            if (page) {
                navigateTo(page);
            }
        });
    });
    
    // Dashboard quick actions
    document.querySelectorAll('.btn[data-page]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const page = this.getAttribute('data-page');
            if (page) {
                navigateTo(page);
            }
        });
    });
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Sidebar toggle for mobile
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Quiz management
    const addQuizBtn = document.getElementById('add-quiz-btn');
    if (addQuizBtn) {
        addQuizBtn.addEventListener('click', () => showQuizModal());
    }
    
    const saveQuizBtn = document.getElementById('save-quiz');
    if (saveQuizBtn) {
        saveQuizBtn.addEventListener('click', saveQuiz);
    }
    
    // Contest management
    const addContestBtn = document.getElementById('add-contest-btn');
    if (addContestBtn) {
        addContestBtn.addEventListener('click', () => showContestModal());
    }
    
    const saveContestBtn = document.getElementById('save-contest');
    if (saveContestBtn) {
        saveContestBtn.addEventListener('click', saveContest);
    }
    
    // Player management
    const resetLeaderboardBtn = document.getElementById('reset-leaderboard');
    if (resetLeaderboardBtn) {
        resetLeaderboardBtn.addEventListener('click', resetLeaderboard);
    }
    
    const exportPlayersBtn = document.getElementById('export-players');
    if (exportPlayersBtn) {
        exportPlayersBtn.addEventListener('click', exportPlayers);
    }
    
    const exportStatsBtn = document.getElementById('export-stats');
    if (exportStatsBtn) {
        exportStatsBtn.addEventListener('click', exportStats);
    }
    
    // Bot simulator
    const sendCommandBtn = document.getElementById('send-command');
    if (sendCommandBtn) {
        sendCommandBtn.addEventListener('click', sendBotCommand);
    }
    
    const botInput = document.getElementById('bot-input');
    if (botInput) {
        botInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendBotCommand();
            }
        });
    }
}

// Authentication - Fixed
function handleLogin() {
    console.log('Login attempt...');
    const adminIdInput = document.getElementById('admin-id');
    
    if (!adminIdInput) {
        console.error('Admin ID input not found');
        showNotification('Erreur: Champ de saisie non trouvé', 'error');
        return;
    }
    
    const adminId = adminIdInput.value.trim();
    console.log('Admin ID entered:', adminId);
    
    if (!adminId) {
        showNotification('Veuillez entrer votre ID administrateur', 'warning');
        return;
    }
    
    if (adminId === appData.admin_id) {
        appData.currentUser = adminId;
        showPage('admin');
        showNotification('Connexion réussie !', 'success');
        console.log('Login successful');
    } else {
        showNotification('ID administrateur incorrect', 'error');
        adminIdInput.value = '';
        adminIdInput.focus();
        console.log('Login failed: wrong ID');
    }
}

function handleLogout() {
    appData.currentUser = null;
    showPage('login');
    const adminIdInput = document.getElementById('admin-id');
    if (adminIdInput) {
        adminIdInput.value = '';
    }
    showNotification('Déconnexion réussie', 'info');
}

// Page Navigation - Fixed
function showPage(pageName) {
    console.log('Showing page:', pageName);
    
    const loginPage = document.getElementById('login-page');
    const publicPage = document.getElementById('public-page');
    const adminInterface = document.getElementById('admin-interface');
    
    // Hide all pages
    if (loginPage) loginPage.classList.add('hidden');
    if (publicPage) publicPage.classList.add('hidden');
    if (adminInterface) adminInterface.classList.add('hidden');
    
    // Show requested page
    switch(pageName) {
        case 'login':
            if (loginPage) loginPage.classList.remove('hidden');
            break;
        case 'public':
            if (publicPage) publicPage.classList.remove('hidden');
            populatePublicPage();
            break;
        case 'admin':
            if (adminInterface) adminInterface.classList.remove('hidden');
            navigateTo('dashboard');
            break;
    }
}

function navigateTo(pageName) {
    if (!appData.currentUser) {
        console.log('No user logged in, redirecting to login');
        showPage('login');
        return;
    }
    
    console.log('Navigating to:', pageName);
    
    // Update sidebar active state
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-page="${pageName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Show content page
    document.querySelectorAll('.content-page').forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(`${pageName}-content`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    appData.currentPage = pageName;
    
    // Load page specific data
    switch(pageName) {
        case 'dashboard':
            updateDashboard();
            break;
        case 'quiz':
            populateQuizList();
            break;
        case 'players':
            populatePlayersList();
            break;
        case 'contests':
            populateContestsList();
            break;
        case 'stats':
            loadStatistics();
            break;
        case 'bot-simulator':
            initializeBotSimulator();
            break;
    }
}

// Dashboard
function updateDashboard() {
    const stats = calculateStatistics();
    
    const dashTotalPlayers = document.getElementById('dash-total-players');
    const dashTotalQuestions = document.getElementById('dash-total-questions');
    const dashSuccessRate = document.getElementById('dash-success-rate');
    const dashAvgTime = document.getElementById('dash-avg-time');
    
    if (dashTotalPlayers) dashTotalPlayers.textContent = stats.totalPlayers;
    if (dashTotalQuestions) dashTotalQuestions.textContent = stats.totalQuestions;
    if (dashSuccessRate) dashSuccessRate.textContent = stats.successRate + '%';
    if (dashAvgTime) dashAvgTime.textContent = stats.avgTime + 's';
    
    populateDashboardLeaderboard();
}

function calculateStatistics() {
    const totalPlayers = appData.players.length;
    const totalQuestions = appData.players.reduce((sum, player) => sum + player.questions_answered, 0);
    const totalCorrect = appData.players.reduce((sum, player) => sum + player.correct_answers, 0);
    const successRate = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(1) : 0;
    const avgTime = totalPlayers > 0 ? (appData.players.reduce((sum, player) => sum + player.avg_response_time, 0) / totalPlayers).toFixed(1) : 0;
    
    return { totalPlayers, totalQuestions, successRate, avgTime };
}

function populateDashboardLeaderboard() {
    const container = document.getElementById('dashboard-leaderboard');
    if (!container) return;
    
    const top5 = appData.players.slice(0, 5);
    
    container.innerHTML = `
        <div class="table-responsive">
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th>Rang</th>
                        <th>Joueur</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    ${top5.map((player, index) => `
                        <tr class="${index < 3 ? 'rank-' + (index + 1) : ''}">
                            <td>${index + 1}</td>
                            <td>${player.username}</td>
                            <td>${player.total_score}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Public Page
function populatePublicPage() {
    populatePublicLeaderboard();
    populateUpcomingContests();
    updatePublicStats();
}

function populatePublicLeaderboard() {
    const container = document.getElementById('public-leaderboard');
    if (!container) return;
    
    const sortedPlayers = appData.players.sort((a, b) => b.total_score - a.total_score);
    
    container.innerHTML = `
        <table class="table leaderboard-table">
            <thead>
                <tr>
                    <th>Rang</th>
                    <th>Joueur</th>
                    <th>Score</th>
                    <th>% Réussite</th>
                </tr>
            </thead>
            <tbody>
                ${sortedPlayers.map((player, index) => `
                    <tr class="${index < 3 ? 'rank-' + (index + 1) : ''}">
                        <td>
                            ${index + 1}
                            ${index === 0 ? '<i class="fas fa-crown text-warning"></i>' : ''}
                        </td>
                        <td>${player.username}</td>
                        <td>${player.total_score}</td>
                        <td>${((player.correct_answers / player.questions_answered) * 100).toFixed(1)}%</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function populateUpcomingContests() {
    const container = document.getElementById('upcoming-contests');
    if (!container) return;
    
    const upcomingContests = appData.contests.filter(contest => contest.status === 'scheduled');
    
    if (upcomingContests.length === 0) {
        container.innerHTML = '<p class="text-muted">Aucun concours programmé</p>';
        return;
    }
    
    container.innerHTML = upcomingContests.map(contest => `
        <div class="contest-card">
            <div class="contest-date">
                ${formatDate(contest.scheduled_date)}
            </div>
            <div class="contest-name">${contest.name}</div>
            <div class="contest-prize">
                <i class="fas fa-gift"></i> ${contest.prize}
            </div>
        </div>
    `).join('');
}

function updatePublicStats() {
    const stats = calculateStatistics();
    
    const publicTotalPlayers = document.getElementById('public-total-players');
    const publicTotalQuestions = document.getElementById('public-total-questions');
    const publicSuccessRate = document.getElementById('public-success-rate');
    
    if (publicTotalPlayers) publicTotalPlayers.textContent = stats.totalPlayers;
    if (publicTotalQuestions) publicTotalQuestions.textContent = stats.totalQuestions;
    if (publicSuccessRate) publicSuccessRate.textContent = stats.successRate + '%';
}

// Quiz Management
function populateQuizList() {
    const container = document.getElementById('quiz-list');
    if (!container) return;
    
    container.innerHTML = appData.quizzes.map(quiz => `
        <tr>
            <td>${quiz.id}</td>
            <td>${quiz.question.substring(0, 50)}${quiz.question.length > 50 ? '...' : ''}</td>
            <td><span class="badge bg-primary">${quiz.topic}</span></td>
            <td><span class="badge bg-info">${quiz.difficulty}</span></td>
            <td>
                ${quiz.is_exam ? '<span class="badge bg-warning">Oui</span>' : '<span class="badge bg-secondary">Non</span>'}
            </td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="editQuiz(${quiz.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteQuiz(${quiz.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function showQuizModal(quizId = null) {
    const modal = new bootstrap.Modal(document.getElementById('quiz-modal'));
    const form = document.getElementById('quiz-form');
    const title = document.getElementById('quiz-modal-title');
    
    if (quizId) {
        const quiz = appData.quizzes.find(q => q.id === quizId);
        if (quiz) {
            title.textContent = 'Modifier le Quiz';
            
            document.getElementById('quiz-question').value = quiz.question;
            document.getElementById('quiz-topic').value = quiz.topic;
            document.getElementById('quiz-difficulty').value = quiz.difficulty;
            document.getElementById('quiz-choice1').value = quiz.choices[0];
            document.getElementById('quiz-choice2').value = quiz.choices[1];
            document.getElementById('quiz-choice3').value = quiz.choices[2];
            document.getElementById('quiz-choice4').value = quiz.choices[3];
            document.getElementById('quiz-correct').value = quiz.correct_answer;
            document.getElementById('quiz-exam').checked = quiz.is_exam;
            
            document.getElementById('save-quiz').dataset.quizId = quizId;
        }
    } else {
        title.textContent = 'Ajouter un Quiz';
        form.reset();
        delete document.getElementById('save-quiz').dataset.quizId;
    }
    
    modal.show();
}

function saveQuiz() {
    const quizId = document.getElementById('save-quiz').dataset.quizId;
    
    const quizData = {
        question: document.getElementById('quiz-question').value,
        topic: document.getElementById('quiz-topic').value,
        difficulty: document.getElementById('quiz-difficulty').value,
        choices: [
            document.getElementById('quiz-choice1').value,
            document.getElementById('quiz-choice2').value,
            document.getElementById('quiz-choice3').value,
            document.getElementById('quiz-choice4').value
        ],
        correct_answer: parseInt(document.getElementById('quiz-correct').value),
        is_exam: document.getElementById('quiz-exam').checked,
        image: null
    };
    
    if (quizId) {
        // Update existing quiz
        const quiz = appData.quizzes.find(q => q.id === parseInt(quizId));
        if (quiz) {
            Object.assign(quiz, quizData);
            showNotification('Quiz modifié avec succès !', 'success');
        }
    } else {
        // Add new quiz
        const newId = Math.max(...appData.quizzes.map(q => q.id)) + 1;
        appData.quizzes.push({ id: newId, ...quizData });
        showNotification('Quiz ajouté avec succès !', 'success');
    }
    
    populateQuizList();
    const modalElement = document.getElementById('quiz-modal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
        modalInstance.hide();
    }
}

function editQuiz(quizId) {
    showQuizModal(quizId);
}

function deleteQuiz(quizId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce quiz ?')) {
        appData.quizzes = appData.quizzes.filter(q => q.id !== quizId);
        populateQuizList();
        showNotification('Quiz supprimé avec succès !', 'success');
    }
}

// Players Management
function populatePlayersList() {
    const container = document.getElementById('players-list');
    if (!container) return;
    
    const sortedPlayers = appData.players.sort((a, b) => b.total_score - a.total_score);
    
    container.innerHTML = sortedPlayers.map((player, index) => `
        <tr class="${index < 3 ? 'rank-' + (index + 1) : ''}">
            <td>
                ${index + 1}
                ${index === 0 ? '<i class="fas fa-crown text-warning ms-1"></i>' : ''}
            </td>
            <td>${player.username}</td>
            <td>${player.total_score}</td>
            <td>${player.questions_answered}</td>
            <td>${((player.correct_answers / player.questions_answered) * 100).toFixed(1)}%</td>
            <td>${player.avg_response_time}s</td>
            <td>${formatDate(player.join_date)}</td>
        </tr>
    `).join('');
}

function resetLeaderboard() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser tout le classement ? Cette action est irréversible.')) {
        appData.players.forEach(player => {
            player.total_score = 0;
            player.questions_answered = 0;
            player.correct_answers = 0;
        });
        populatePlayersList();
        updateDashboard();
        showNotification('Classement réinitialisé !', 'success');
    }
}

function exportPlayers() {
    const csvData = convertToCSV(appData.players);
    downloadCSV(csvData, 'players_data.csv');
    showNotification('Données exportées !', 'success');
}

// Contests Management
function populateContestsList() {
    const container = document.getElementById('contests-list');
    if (!container) return;
    
    container.innerHTML = appData.contests.map(contest => `
        <tr>
            <td>${contest.name}</td>
            <td>${formatDate(contest.scheduled_date)}</td>
            <td><span class="status-badge status-${contest.status}">${contest.status}</span></td>
            <td>${contest.participants_limit}</td>
            <td>${contest.prize}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteContest(${contest.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function showContestModal() {
    const modal = new bootstrap.Modal(document.getElementById('contest-modal'));
    document.getElementById('contest-form').reset();
    modal.show();
}

function saveContest() {
    const contestData = {
        id: Math.max(...appData.contests.map(c => c.id)) + 1,
        name: document.getElementById('contest-name').value,
        scheduled_date: document.getElementById('contest-date').value,
        participants_limit: parseInt(document.getElementById('contest-limit').value),
        prize: document.getElementById('contest-prize').value,
        status: 'scheduled'
    };
    
    appData.contests.push(contestData);
    populateContestsList();
    populateUpcomingContests();
    
    const modalElement = document.getElementById('contest-modal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
        modalInstance.hide();
    }
    
    showNotification('Concours programmé avec succès !', 'success');
}

function deleteContest(contestId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce concours ?')) {
        appData.contests = appData.contests.filter(c => c.id !== contestId);
        populateContestsList();
        populateUpcomingContests();
        showNotification('Concours supprimé !', 'success');
    }
}

// Statistics
function loadStatistics() {
    setTimeout(() => {
        createTopicsChart();
        createScoresChart();
    }, 100);
}

function createTopicsChart() {
    const canvas = document.getElementById('topics-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const topics = {};
    
    appData.quizzes.forEach(quiz => {
        topics[quiz.topic] = (topics[quiz.topic] || 0) + 1;
    });
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(topics),
            datasets: [{
                data: Object.values(topics),
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function createScoresChart() {
    const canvas = document.getElementById('scores-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const sortedPlayers = appData.players.sort((a, b) => b.total_score - a.total_score);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedPlayers.map(p => p.username),
            datasets: [{
                label: 'Score Total',
                data: sortedPlayers.map(p => p.total_score),
                backgroundColor: '#1FB8CD'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function exportStats() {
    const stats = {
        general: calculateStatistics(),
        players: appData.players,
        quizzes: appData.quizzes.length,
        contests: appData.contests.length
    };
    
    const csvData = convertToCSV([stats.general]);
    downloadCSV(csvData, 'statistics.csv');
    showNotification('Statistiques exportées !', 'success');
}

// Bot Simulator
function initializeBotSimulator() {
    const chatArea = document.getElementById('chat-area');
    if (!chatArea) return;
    
    chatArea.innerHTML = `
        <div class="welcome-message">
            <p><strong>🤖 Quiz Bot Simulator</strong></p>
            <p>Bienvenue dans le simulateur du bot Quiz Telegram !</p>
            <p>Commandes disponibles :</p>
            <ul>
                <li><code>/start</code> - Commencer</li>
                <li><code>/quiz</code> - Lancer un quiz</li>
                <li><code>/stats</code> - Voir vos statistiques</li>
                <li><code>/leaderboard</code> - Voir le classement</li>
            </ul>
        </div>
    `;
    
    resetBotSession();
}

function resetBotSession() {
    if (appData.botSession.timer) {
        clearInterval(appData.botSession.timer);
    }
    
    appData.botSession = {
        active: false,
        currentQuiz: null,
        score: 0,
        questionIndex: 0,
        timeLeft: 15,
        timer: null
    };
    
    updateQuizState();
}

function sendBotCommand() {
    const input = document.getElementById('bot-input');
    if (!input) return;
    
    const command = input.value.trim();
    
    if (!command) return;
    
    addChatMessage(command, 'user');
    input.value = '';
    
    setTimeout(() => {
        processBotCommand(command);
    }, 500);
}

function addChatMessage(message, type) {
    const chatArea = document.getElementById('chat-area');
    if (!chatArea) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.innerHTML = message;
    
    chatArea.appendChild(messageDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function processBotCommand(command) {
    switch(command.toLowerCase()) {
        case '/start':
            addChatMessage('🎉 Bienvenue sur Quiz Bot ! Je suis votre assistant pour jouer aux quiz. Tapez /quiz pour commencer une partie !', 'bot');
            break;
            
        case '/quiz':
            startQuizSession();
            break;
            
        case '/stats':
            showBotStats();
            break;
            
        case '/leaderboard':
            showBotLeaderboard();
            break;
            
        default:
            if (appData.botSession.active && !isNaN(command)) {
                handleQuizAnswer(parseInt(command) - 1);
            } else {
                addChatMessage('❌ Commande non reconnue. Tapez /start pour voir les commandes disponibles.', 'bot');
            }
    }
}

function startQuizSession() {
    resetBotSession();
    appData.botSession.active = true;
    appData.botSession.score = 0;
    appData.botSession.questionIndex = 0;
    
    addChatMessage('🎯 Nouveau quiz commencé ! Vous allez répondre à 3 questions. Chaque bonne réponse rapporte 1 point.', 'bot');
    
    setTimeout(() => {
        showNextQuestion();
    }, 1000);
}

function showNextQuestion() {
    if (appData.botSession.questionIndex >= 3) {
        endQuizSession();
        return;
    }
    
    const randomQuiz = appData.quizzes[Math.floor(Math.random() * appData.quizzes.length)];
    appData.botSession.currentQuiz = randomQuiz;
    appData.botSession.timeLeft = 15;
    
    const questionHtml = `
        <div class="quiz-question">
            <h5>Question ${appData.botSession.questionIndex + 1}/3</h5>
            <p><strong>${randomQuiz.question}</strong></p>
            <div class="quiz-options">
                ${randomQuiz.choices.map((choice, index) => `
                    <div class="quiz-option" onclick="selectAnswer(${index})">
                        ${index + 1}. ${choice}
                    </div>
                `).join('')}
            </div>
            <div class="quiz-timer" id="quiz-timer">⏰ ${appData.botSession.timeLeft}s</div>
        </div>
    `;
    
    addChatMessage(questionHtml, 'bot');
    startQuizTimer();
    updateQuizState();
}

function startQuizTimer() {
    appData.botSession.timer = setInterval(() => {
        appData.botSession.timeLeft--;
        const timerElement = document.getElementById('quiz-timer');
        if (timerElement) {
            timerElement.textContent = `⏰ ${appData.botSession.timeLeft}s`;
        }
        
        if (appData.botSession.timeLeft <= 0) {
            clearInterval(appData.botSession.timer);
            handleQuizAnswer(-1); // Timeout
        }
    }, 1000);
}

function selectAnswer(answerIndex) {
    if (!appData.botSession.active) return;
    
    // Visual feedback
    document.querySelectorAll('.quiz-option').forEach((option, index) => {
        if (index === answerIndex) {
            option.classList.add('selected');
        }
    });
    
    setTimeout(() => {
        handleQuizAnswer(answerIndex);
    }, 500);
}

function handleQuizAnswer(answerIndex) {
    if (!appData.botSession.active) return;
    
    clearInterval(appData.botSession.timer);
    
    const currentQuiz = appData.botSession.currentQuiz;
    const isCorrect = answerIndex === currentQuiz.correct_answer;
    
    if (answerIndex === -1) {
        addChatMessage('⏰ Temps écoulé ! La bonne réponse était : ' + currentQuiz.choices[currentQuiz.correct_answer], 'bot');
    } else if (isCorrect) {
        appData.botSession.score++;
        addChatMessage('✅ Bonne réponse ! +1 point', 'bot');
    } else {
        addChatMessage('❌ Mauvaise réponse. La bonne réponse était : ' + currentQuiz.choices[currentQuiz.correct_answer], 'bot');
    }
    
    appData.botSession.questionIndex++;
    
    setTimeout(() => {
        showNextQuestion();
    }, 2000);
}

function endQuizSession() {
    appData.botSession.active = false;
    const score = appData.botSession.score;
    const total = 3;
    const percentage = ((score / total) * 100).toFixed(0);
    
    let message = `🏁 Quiz terminé !\n\n`;
    message += `📊 Votre score : ${score}/${total} (${percentage}%)\n`;
    
    if (score === total) {
        message += `🏆 Parfait ! Vous êtes un champion !`;
    } else if (score >= 2) {
        message += `👏 Très bien joué !`;
    } else {
        message += `💪 Continuez à vous entraîner !`;
    }
    
    addChatMessage(message, 'bot');
    updateQuizState();
}

function showBotStats() {
    const stats = calculateStatistics();
    const message = `
        📈 <strong>Statistiques du Bot</strong><br><br>
        👥 Joueurs actifs : ${stats.totalPlayers}<br>
        📝 Questions jouées : ${stats.totalQuestions}<br>
        ✅ Taux de réussite : ${stats.successRate}%<br>
        ⏱️ Temps moyen : ${stats.avgTime}s
    `;
    addChatMessage(message, 'bot');
}

function showBotLeaderboard() {
    const top5 = appData.players.slice(0, 5);
    let message = '🏆 <strong>Top 5 Joueurs</strong><br><br>';
    
    top5.forEach((player, index) => {
        const trophy = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅';
        message += `${trophy} ${player.username}: ${player.total_score} pts<br>`;
    });
    
    addChatMessage(message, 'bot');
}

function updateQuizState() {
    const container = document.getElementById('quiz-state');
    if (!container) return;
    
    if (appData.botSession.active) {
        container.innerHTML = `
            <div class="text-center">
                <h6>Quiz en cours</h6>
                <div class="quiz-score">Score: ${appData.botSession.score}/3</div>
                <p class="mt-2 mb-0">Question ${appData.botSession.questionIndex + 1}/3</p>
                ${appData.botSession.timeLeft > 0 ? `<p class="text-warning">⏰ ${appData.botSession.timeLeft}s</p>` : ''}
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="text-center text-muted">
                <p>Aucun quiz en cours</p>
                <p class="small">Tapez /quiz pour commencer</p>
            </div>
        `;
    }
}

// Theme Management
function toggleTheme() {
    appData.darkMode = !appData.darkMode;
    const root = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    
    if (appData.darkMode) {
        root.setAttribute('data-color-scheme', 'dark');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        root.setAttribute('data-color-scheme', 'light');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

function checkTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark && !appData.darkMode) {
        toggleTheme();
    }
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

function convertToCSV(data) {
    if (!data.length) return '';
    
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n');
    
    return csvContent;
}

function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('show');
    }
}

// Global functions for inline event handlers
window.editQuiz = editQuiz;
window.deleteQuiz = deleteQuiz;
window.deleteContest = deleteContest;
window.selectAnswer = selectAnswer;