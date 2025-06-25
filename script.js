// TravelSmart JavaScript
console.log('Script loaded');

function performBrokerLogin() {
  var email = document.getElementById('brokerEmail').value.trim();
  var pass = document.getElementById('brokerPassword').value;
  if (email === masterUser.email && pass === masterUser.password) {
    currentUserRole = 'master';
    showBrokerScreen();
  } else {
    var agency = agencies.find(a => a.email === email && a.password === pass);
    if (agency) {
      currentUserRole = 'agency';
      currentAgency = agency;
      showScreen('dashboardScreen');
      updateDashboardForAgency();
    } else {
      showAlert('Грешка', 'Невалидни данни!');
    }
  }
  document.getElementById('brokerPassword').value = '';
}

function toggleBrokerPassword() {
  var input = document.getElementById('brokerPassword');
  input.type = input.type === 'password' ? 'text' : 'password';
}

function logoutBroker() {
  currentUserRole = null;
  currentAgency = null;
  showScreen('loginScreen');
}
