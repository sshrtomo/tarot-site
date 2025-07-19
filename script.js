const cards = [
    { name: '愚者', image: 'images/00.jpg', meaning: '自由、無邪気、始まり、冒険' },
    { name: '魔術師', image: 'images/01.jpg', meaning: '創造、意志、コミュニケーション' },
    { name: '女教皇', image: 'images/02.jpg', meaning: '知性、静けさ、秘密' },
    { name: '女帝', image: 'images/03.jpg', meaning: '豊穣、母性、愛情' },
    { name: '皇帝', image: 'images/04.jpg', meaning: '支配、安定、父性' },
    { name: '教皇', image: 'images/05.jpg', meaning: '慈悲、伝統、教え' },
    { name: '恋人', image: 'images/06.jpg', meaning: '恋愛、選択、調和' },
    { name: '戦車', image: 'images/07.jpg', meaning: '勝利、行動、自己制御' },
    { name: '力', image: 'images/08.jpg', meaning: '勇気、忍耐、理性' },
    { name: '隠者', image: 'images/09.jpg', meaning: '探求、内省、孤独' },
    { name: '運命の輪', image: 'images/10.jpg', meaning: '転機、幸運、運命' },
    { name: '正義', image: 'images/11.jpg', meaning: '公平、均衡、正当性' },
    { name: '吊るされた男', image: 'images/12.jpg', meaning: '試練、忍耐、自己犠牲' },
    { name: '死神', image: 'images/13.jpg', meaning: '終焉、変化、再生' },
    { name: '節制', image: 'images/14.jpg', meaning: '調和、バランス、献身' },
    { name: '悪魔', image: 'images/15.jpg', meaning: '束縛、誘惑、物質主義' },
    { name: '塔', image: 'images/16.jpg', meaning: '崩壊、衝撃、解放' },
    { name: '星', image: 'images/17.jpg', meaning: '希望、閃き、理想' },
    { name: '月', image: 'images/18.jpg', meaning: '不安、幻想、曖昧' },
    { name: '太陽', image: 'images/19.jpg', meaning: '成功、喜び、生命力' },
    { name: '審判', image: 'images/20.jpg', meaning: '復活、結果、決断' },
    { name: '世界', image: 'images/21.jpg', meaning: '完成、達成、完璧' }
];

const drawButton = document.getElementById('draw-button');
const tarotCard = document.getElementById('tarot-card');
const cardImage = document.getElementById('card-image');
const cardMeaningArea = document.getElementById('card-meaning-area');
const cardName = document.getElementById('card-name');
const cardMeaning = document.getElementById('card-meaning');

let cardData = {}; // CSVから読み込んだデータを格納するオブジェクト

const descriptionContainer = document.getElementById('description-container');
const categoryContainer = document.getElementById('card-category-container');

drawButton.addEventListener('click', () => {
    // Hide the meaning area and flip the card back if it's already flipped
    cardMeaningArea.classList.remove('visible');
descriptionContainer.classList.remove('visible');
categoryContainer.classList.remove('visible');
    categoryContainer.classList.remove('visible');
    if (tarotCard.classList.contains('is-flipped')) {
        tarotCard.classList.remove('is-flipped');
    }

    // Wait for the card to flip back before showing the new card
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * cards.length);
        const card = cards[randomIndex];

        cardImage.src = card.image;
        cardImage.alt = card.name;
        cardName.textContent = card.name;

        // CSVから対応する説明文と分類を取得して設定
        const imageName = card.image.split('/').pop(); // 'images/00.jpg' -> '00.jpg'
        const data = cardData[imageName] || { category: '', message: card.meaning }; // CSVになければデフォルトを使用
        cardMeaning.textContent = card.meaning;
        descriptionContainer.textContent = data.message;
        categoryContainer.textContent = data.category;

        // Flip the card
        tarotCard.classList.add('is-flipped');

        // Show the meaning after the card has flipped
        setTimeout(() => {
            cardMeaningArea.classList.add('visible');
            descriptionContainer.classList.add('visible');
            categoryContainer.classList.add('visible');
        }, 800); // Adjust timing to match CSS transition

    }, 400); // Delay to allow card to flip back
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('discription.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.trim().split('\n').slice(1); // ヘッダー行をスキップ
            rows.forEach(row => {
                const columns = row.split(',');
                const filename = columns[0].trim();
                const category = columns[1].replace(/"/g, '').trim();
                const message = columns[2].replace(/"/g, '').trim();
                cardData[filename] = { category, message };
            });
        })
        .catch(error => console.error('Error fetching the CSV file:', error));
});