const kanjiList = [
    { kanji: "教科書", yomi: "きょうかしょ" },
    { kanji: "出発", yomi: "しゅっぱつ" },
    { kanji: "到着", yomi: "とうちゃく" },
    { kanji: "理由", yomi: "りゆう" },
    { kanji: "工夫", yomi: "くふう" },
    { kanji: "季節", yomi: "きせつ" },
    { kanji: "公園", yomi: "こうえん" },
    { kanji: "運動", yomi: "うんどう" },
    { kanji: "元気", yomi: "げんき" },
    { kanji: "生活", yomi: "せいかつ" },
    { kanji: "食事", yomi: "しょくじ" },
    { kanji: "平和", yomi: "へいわ" },
    { kanji: "世界", yomi: "せかい" },
    { kanji: "家族", yomi: "かぞく" },
    { kanji: "旅行", yomi: "りょこう" },
    { kanji: "景色", yomi: "けしき" },
    { kanji: "学習", yomi: "がくしゅう" },
    { kanji: "努力", yomi: "どりょく" },
    { kanji: "将来", yomi: "しょうらい" },
    { kanji: "安心", yomi: "あんしん" },
    { kanji: "安全", yomi: "あんぜん" },
    { kanji: "意見", yomi: "いけん" },
    { kanji: "発表", yomi: "はっぴょう" },
    { kanji: "自然", yomi: "しぜん" },
    { kanji: "動物", yomi: "どうぶつ" },
    { kanji: "植物", yomi: "しょくぶつ" },
    { kanji: "成長", yomi: "せいちょう" },
    { kanji: "成功", yomi: "せいこう" },
    { kanji: "失敗", yomi: "しっぱい" },
    { kanji: "経験", yomi: "けいけん" },
    { kanji: "感謝", yomi: "かんしゃ" },
    { kanji: "習慣", yomi: "しゅうかん" },
    { kanji: "準備", yomi: "じゅんび" },
    { kanji: "準備", yomi: "じゅんび" }, // 重複を許容する場合はそのまま
    { kanji: "確認", yomi: "かくにん" },
    { kanji: "約束", yomi: "やくそく" },
    { kanji: "連絡", yomi: "れんらく" },
    { kanji: "参加", yomi: "さんか" },
    { kanji: "協力", yomi: "きょうりょく" },
    { kanji: "計画", yomi: "けいかく" },
    { kanji: "想像", yomi: "そうぞう" },
    { kanji: "表現", yomi: "ひょうげん" },
    { kanji: "情報", yomi: "じょうほう" },
    { kanji: "技術", yomi: "ぎじゅつ" },
    { kanji: "発展", yomi: "はってん" },
    { kanji: "歴史", yomi: "れきし" },
    { kanji: "文化", yomi: "ぶんか" },
    { kanji: "伝統", yomi: "でんとう" },
    { kanji: "社会", yomi: "しゃかい" },
    { kanji: "地域", yomi: "ちいき" },
    { kanji: "経済", yomi: "けいざい" },
    { kanji: "政治", yomi: "せいじ" },
    { kanji: "法律", yomi: "ほうりつ" },
    { kanji: "教育", yomi: "きょういく" },
    { kanji: "健康", yomi: "けんこう" },
    { kanji: "医療", yomi: "いりょう" },
    { kanji: "芸術", yomi: "げいじゅつ" },
    { kanji: "科学", yomi: "かがく" },
    { kanji: "研究", yomi: "けんきゅう" },
    { kanji: "発見", yomi: "はっけん" },
    { kanji: "発明", yomi: "はつめい" },
    { kanji: "環境", yomi: "かんきょう" },
    { kanji: "資源", yomi: "しげん" },
    { kanji: "災害", yomi: "さいがい" },
    { kanji: "対策", yomi: "たいさく" },
    { kanji: "復興", yomi: "ふっこう" },
    { kanji: "交流", yomi: "こうりゅう" },
    { kanji: "国際", yomi: "こくさい" },
    { kanji: "異文化", yomi: "いぶんか" },
    { kanji: "理解", yomi: "りかい" },
    { kanji: "貢献", yomi: "こうけん" },
    { kanji: "目標", yomi: "もくひょう" },
    { kanji: "達成", yomi: "たっせい" },
    { kanji: "自信", yomi: "じしん" },
    { kanji: "向上", yomi: "こうじょう" },
    { kanji: "発展", yomi: "はってん" }, // 重複を許容する場合はそのまま
    { kanji: "創造", yomi: "そうぞう" },
    { kanji: "個性", yomi: "こせい" },
    { kanji: "尊重", yomi: "そんちょう" },
    { kanji: "課題", yomi: "かだい" },
    { kanji: "解決", yomi: "かいけつ" },
    { kanji: "努力", yomi: "どりょく" }, // 重複を許容する場合はそのまま
    { kanji: "挑戦", yomi: "ちょうせん" },
    { kanji: "学習", yomi: "がくしゅう" }, // 重複を許容する場合はそのまま
    { kanji: "習慣", yomi: "しゅうかん" }  // 重複を許容する場合はそのまま
];

const questionKanjiElement = document.getElementById('questionKanji');
const answerInput = document.getElementById('answerInput');
const submitButton = document.getElementById('submitButton');
const resultMessageElement = document.getElementById('resultMessage');
const nextButton = document.getElementById('nextButton');
const correctCountElement = document.getElementById('correctCount');
const totalCountElement = document.getElementById('totalCount');

let currentQuestion = null;
let correctAnswers = 0;
let totalQuestions = 0;

// 問題をシャッフルするための配列
let shuffledKanjiList = [];

// 配列をシャッフルする関数 (Fisher-Yatesアルゴリズム)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // 要素を交換
    }
    return array;
}

// 新しい問題を設定する関数
function setNextQuestion() {
    if (shuffledKanjiList.length === 0) {
        // 全ての問題が出尽くしたらシャッフルし直す
        shuffledKanjiList = shuffleArray([...kanjiList]);
    }

    currentQuestion = shuffledKanjiList.pop(); // シャッフルされたリストから一つ取り出す
    questionKanjiElement.textContent = currentQuestion.kanji;
    answerInput.value = ''; // 入力欄をクリア
    resultMessageElement.textContent = ''; // 結果メッセージをクリア
    resultMessageElement.classList.remove('correct', 'incorrect');
    nextButton.classList.add('hidden'); // 次の問題ボタンを隠す
    submitButton.classList.remove('hidden'); // 回答ボタンを表示
    answerInput.disabled = false; // 入力欄を有効にする
    answerInput.focus(); // 入力欄にフォーカスを当てる
}

// スコアを更新する関数
function updateScore() {
    correctCountElement.textContent = correctAnswers;
    totalCountElement.textContent = totalQuestions;
}

// 回答をチェックする関数
function checkAnswer() {
    const userAnswer = answerInput.value.trim(); // 前後の空白を削除
    totalQuestions++;

    if (userAnswer === currentQuestion.yomi) {
        resultMessageElement.textContent = '正解！🎉';
        resultMessageElement.classList.add('correct');
        resultMessageElement.classList.remove('incorrect');
        correctAnswers++;
    } else {
        resultMessageElement.textContent = `残念！正解は「${currentQuestion.yomi}」でした。`;
        resultMessageElement.classList.add('incorrect');
        resultMessageElement.classList.remove('correct');
    }

    updateScore();
    submitButton.classList.add('hidden'); // 回答ボタンを隠す
    nextButton.classList.remove('hidden'); // 次の問題ボタンを表示
    answerInput.disabled = true; // 入力欄を無効にする
}

// イベントリスナーの設定
submitButton.addEventListener('click', checkAnswer);
nextButton.addEventListener('click', setNextQuestion);

// Enterキーで回答、Shift+Enterで次の問題（オプション）
answerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (!submitButton.classList.contains('hidden')) {
            checkAnswer();
        } else if (!nextButton.classList.contains('hidden')) {
            setNextQuestion();
        }
    }
});

// 最初の問題を設定
setNextQuestion();
updateScore();
