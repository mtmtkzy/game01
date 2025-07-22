const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreSpan = document.getElementById('score');
const highScoreSpan = document.getElementById('highScore');
const startButton = document.getElementById('startButton');

let score = 0;
let highScore = localStorage.getItem('catchTheDotHighScore') || 0;
let dot = { x: 0, y: 0, radius: 20, color: 'red', dx: 5, dy: 5 }; // ドットの初期設定
let gameInterval;
let gameRunning = false;
let gameSpeed = 1; // ゲームの速度倍率

// ハイスコアを初期表示
highScoreSpan.textContent = highScore;

// ドットを描画する関数
function drawDot() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // キャンバスをクリア
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
    ctx.fillStyle = dot.color;
    ctx.fill();
    ctx.closePath();
}

// ドットを動かす関数
function moveDot() {
    // 壁に当たったら反射
    if (dot.x + dot.radius > canvas.width || dot.x - dot.radius < 0) {
        dot.dx *= -1;
    }
    if (dot.y + dot.radius > canvas.height || dot.y - dot.radius < 0) {
        dot.dy *= -1;
    }

    // ドットの位置を更新
    dot.x += dot.dx * gameSpeed;
    dot.y += dot.dy * gameSpeed;

    drawDot();
}

// ドットの位置をランダムに設定する関数
function setRandomDotPosition() {
    dot.x = Math.random() * (canvas.width - dot.radius * 2) + dot.radius;
    dot.y = Math.random() * (canvas.height - dot.radius * 2) + dot.radius;
    // 新しい移動方向をランダムに決定
    dot.dx = (Math.random() > 0.5 ? 1 : -1) * (5 + score / 10); // スコアに応じて速度アップ
    dot.dy = (Math.random() > 0.5 ? 1 : -1) * (5 + score / 10); // スコアに応じて速度アップ
    // ドットのサイズもスコアに応じて変更（例：小さくする）
    dot.radius = Math.max(10, 20 - Math.floor(score / 5)); // 最小10px
}

// ゲームオーバー処理
function gameOver() {
    clearInterval(gameInterval);
    gameRunning = false;
    startButton.disabled = false;
    startButton.textContent = 'ゲームスタート';
    alert(`ゲームオーバー！あなたのスコアは ${score} でした！`);

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('catchTheDotHighScore', highScore);
        highScoreSpan.textContent = highScore;
        alert('ハイスコアを更新しました！');
    }
}

// キャンバスクリックイベント
canvas.addEventListener('click', (event) => {
    if (!gameRunning) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // クリックがドットの範囲内か判定
    const distance = Math.sqrt(
        (clickX - dot.x) * (clickX - dot.x) +
        (clickY - dot.y) * (clickY - dot.y)
    );

    if (distance < dot.radius) {
        score++;
        scoreSpan.textContent = score;
        setRandomDotPosition(); // クリック成功で新しい位置に移動
    } else {
        // ドット以外をクリックしたらゲームオーバー
        gameOver();
    }
});

// ゲーム開始関数
function startGame() {
    score = 0;
    scoreSpan.textContent = score;
    gameSpeed = 1; // 速度をリセット
    setRandomDotPosition(); // 初期位置設定
    gameRunning = true;
    startButton.disabled = true;
    startButton.textContent = 'プレイ中...';
    
    // ゲームループ開始 (約60FPS)
    gameInterval = setInterval(moveDot, 1000 / 60);

    // 一定時間で難易度を上げる（例：ドットの速度を上げる）
    setTimeout(() => {
        if (gameRunning) {
            alert('時間切れ！ゲームオーバー！');
            gameOver();
        }
    }, 30000); // 30秒でゲームオーバー
}

// スタートボタンクリックイベント
startButton.addEventListener('click', startGame);

// 初期描画
drawDot();
