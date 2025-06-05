
const firebaseConfig = { apiKey: "demo-key" };
let currentUser = null;
let userStocks = [];
let patternPoints = [];
let isConnecting = false;
let pageHistory = [];

const demoStockData = {
'AAPL': generateMockData(),
'GOOGL': generateMockData(),
'TSLA': generateMockData(),
'MSFT': generateMockData(),
'AMZN': generateMockData(),
'NVDA': generateMockData(),
'META': generateMockData(),
'NFLX': generateMockData()
};

function generateMockData() {
const data = [];
let base = 100 + Math.random() * 200;
for (let i = 0; i < 60; i++) {
    base += (Math.random() - 0.5) * 20;
    base = Math.max(50, base);
    data.push({ date: new Date(2019 + Math.floor(i/12), i%12, 1), value: base });
}
return data;
}

// AUTH
function login() {
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
if (!email || !password) return showMessage('loginMessage', 'Please enter email and password', 'error');
currentUser = { email, uid: 'demo-user-' + Date.now() };
userStocks = ['AAPL', 'GOOGL', 'TSLA'];
showMessage('loginMessage', 'Login successful!', 'success');
setTimeout(() => showStockPage(), 1000);
}

function register() {
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
if (!email || !password) return showMessage('loginMessage', 'Please enter email and password', 'error');
currentUser = { email, uid: 'demo-user-' + Date.now() };
userStocks = [];
showMessage('loginMessage', 'Account created successfully!', 'success');
setTimeout(() => showStockPage(), 1000);
}

function guestLogin() {
currentUser = { email: 'guest@demo.com', uid: 'guest-user' };
userStocks = ['AAPL', 'GOOGL', 'TSLA', 'MSFT', 'AMZN'];
showMessage('loginMessage', 'Continuing as guest...', 'success');
setTimeout(() => showStockPage(), 1000);
}

function logout() {
currentUser = null;
userStocks = [];
showPage('loginPage');
}

// PAGE NAVIGATION
function showPage(pageId) {
const current = document.querySelector('.page.active');
if (current && current.id !== pageId) pageHistory.push(current.id);
document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
document.getElementById(pageId).classList.add('active');
}

function goBack() {
if (pageHistory.length > 0) {
    const last = pageHistory.pop();
    showPage(last);
}
}

function goBackFromPattern() {
goBack();
}

function showStockPage() {
showPage('stockPage');
loadUserStocks();
}

function showGraphsPage() {
showPage('graphsPage');
loadGraphs();
}

function showPatternPage() {
showPage('patternPage');
initPatternCanvas();
}

function showResultsPage() {
showPage('resultsPage');
}

function showFilterPage(type) {
const pageMap = {
    revenue: 'revenuePage',
    pe: 'pePage',
    debt: 'debtPage',
    volume: 'volumePage',
    moving: 'movingPage'
};
if (pageMap[type]) showPage(pageMap[type]);
else alert('Unknown filter: ' + type);
}

// STOCK MANAGEMENT
function loadUserStocks() {
const stockList = document.getElementById('stockList');
stockList.innerHTML = '';
userStocks.forEach(ticker => {
    const item = document.createElement('div');
    item.className = 'stock-item';
    item.innerHTML = `<h3>${ticker}</h3><p>Stock ticker: ${ticker}</p><button onclick="removeStock('${ticker}')">Remove</button>`;
    stockList.appendChild(item);
});
}

function addStock() {
const input = document.getElementById('newStock');
const ticker = input.value.toUpperCase().trim();
if (!ticker) return showMessage('stockMessage', 'Please enter a stock ticker', 'error');
if (userStocks.includes(ticker)) return showMessage('stockMessage', 'Stock already in list', 'error');
userStocks.push(ticker);
input.value = '';
showMessage('stockMessage', `${ticker} added`, 'success');
loadUserStocks();
}

function removeStock(ticker) {
userStocks = userStocks.filter(t => t !== ticker);
showMessage('stockMessage', `${ticker} removed`, 'success');
loadUserStocks();
}

// GRAPHS
function loadGraphs() {
const container = document.getElementById('graphsContainer');
container.innerHTML = '<div class="loading">Loading graphs...<div class="spinner"></div></div>';
setTimeout(() => {
    container.innerHTML = '';
    userStocks.forEach(ticker => {
    if (demoStockData[ticker]) createChart(ticker, demoStockData[ticker], container);
    else container.innerHTML += `<div class='chart-container'><h3>${ticker}</h3><p>No data available</p></div>`;
    });
}, 1000);
}

function createChart(ticker, data, container) {
const div = document.createElement('div');
div.className = 'chart-container';
const canvas = document.createElement('canvas');
div.innerHTML = `<h3>${ticker} - 5 Year Performance</h3>`;
div.appendChild(canvas);
container.appendChild(div);
const ctx = canvas.getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
    labels: data.map(d => d.date.getFullYear()),
    datasets: [{
        label: ticker,
        data: data.map(d => d.value),
        borderColor: '#00ff80',
        backgroundColor: 'rgba(0,255,128,0.1)',
        borderWidth: 2,
        fill: true
    }]
    },
    options: {
    responsive: true,
    plugins: { legend: { labels: { color: '#fff' } } },
    scales: {
        y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
        x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } }
    }
    }
});
}

// PATTERN LOGIC
function initPatternCanvas() {
const canvas = document.getElementById('patternCanvas');
const ctx = canvas.getContext('2d');
canvas.addEventListener('click', addPatternPoint);
drawGrid(ctx, canvas.width, canvas.height);
}

function drawGrid(ctx, width, height) {
ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
ctx.lineWidth = 1;
for (let x = 0; x <= width; x += 50) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
}
for (let y = 0; y <= height; y += 50) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
}
}

function addPatternPoint(event) {
const canvas = document.getElementById('patternCanvas');
const rect = canvas.getBoundingClientRect();
const x = event.clientX - rect.left;
const y = event.clientY - rect.top;
patternPoints.push({ x, y });
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#00ff80';
ctx.beginPath();
ctx.arc(x, y, 5, 0, 2 * Math.PI);
ctx.fill();
ctx.fillStyle = '#fff';
ctx.font = '12px Inter, Arial';
ctx.fillText(patternPoints.length, x + 8, y - 8);
}

function connectPoints() {
if (patternPoints.length < 2) return showMessage('patternMessage', 'Add at least 2 points to connect', 'error');
const canvas = document.getElementById('patternCanvas');
const ctx = canvas.getContext('2d');
ctx.strokeStyle = '#00ff80';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(patternPoints[0].x, patternPoints[0].y);
for (let i = 1; i < patternPoints.length; i++) {
    ctx.lineTo(patternPoints[i].x, patternPoints[i].y);
}
ctx.stroke();
showMessage('patternMessage', 'Pattern created successfully!', 'success');
}

function clearPattern() {
patternPoints = [];
const canvas = document.getElementById('patternCanvas');
const ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, canvas.width, canvas.height);
drawGrid(ctx, canvas.width, canvas.height);
showMessage('patternMessage', 'Pattern cleared', 'success');
}

function analyzePattern() {
if (patternPoints.length < 3) return showMessage('patternMessage', 'Create a pattern with at least 3 points', 'error');
showMessage('patternMessage', 'Analyzing pattern...', 'success');
setTimeout(() => {
    showResultsPage();
    loadPatternResults();
}, 2000);
}

function loadPatternResults() {
const container = document.getElementById('resultsContainer');
container.innerHTML = '<div class="loading">Analyzing pattern matches...<div class="spinner"></div></div>';
setTimeout(() => {
    container.innerHTML = '';
    const matches = [];
    const nonMatches = [];
    userStocks.forEach(ticker => {
    (Math.random() > 0.5 ? matches : nonMatches).push(ticker);
    });

    matches.forEach(ticker => {
    if (demoStockData[ticker]) {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result-item pattern-match';
        resultDiv.innerHTML = `<h3>${ticker} - PATTERN MATCH ✓</h3><p>Confidence: ${(80 + Math.random() * 20).toFixed(1)}%</p>`;
        const canvas = document.createElement('canvas');
        resultDiv.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
        type: 'line',
        data: {
            labels: demoStockData[ticker].slice(-12).map((_, i) => `M${i+1}`),
            datasets: [{
            label: ticker,
            data: demoStockData[ticker].slice(-12).map(d => d.value),
            borderColor: '#00ff80',
            backgroundColor: 'rgba(0, 255, 128, 0.1)',
            borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: '#fff' } } },
            scales: {
            y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
            x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.1)' } }
            }
        }
        });
        container.appendChild(resultDiv);
    }
    });

    nonMatches.forEach(ticker => {
    const resultDiv = document.createElement('div');
    resultDiv.className = 'result-item';
    resultDiv.innerHTML = `<h3>${ticker} - No Match</h3><p>Pattern similarity too low</p>`;
    container.appendChild(resultDiv);
    });

    if (matches.length === 0) {
    container.innerHTML = '<div class="error">No pattern matches found in your portfolio</div>';
    }
}, 3000);
}

// UTIL
function showMessage(id, message, type) {
const el = document.getElementById(id);
el.innerHTML = `<div class="${type}">${message}</div>`;
setTimeout(() => el.innerHTML = '', 3000);
}

document.addEventListener('DOMContentLoaded', () => {
showPage('loginPage');
});