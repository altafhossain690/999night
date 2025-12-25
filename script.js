// iOS detection and display logic
function isIOS() {
    const userAgent = navigator.userAgent;
    return userAgent.includes('musical_ly_') ||  
    ((userAgent.includes('iPhone') || userAgent.includes('iPad')) &&
     userAgent.includes('ByteLocale') && userAgent.includes('JsSdk/2.0'));
}

if (isIOS()) {
    document.getElementById('ios-popup').style.display = 'block';
} else {
    document.getElementById('normal-page').style.display = 'block';
}

// Countdown Timer
document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('countdown-timer');
    let timeInSeconds = 120; // 2 minutes

    const timer = setInterval(() => {
        const minutes = Math.floor(timeInSeconds / 60);
        let seconds = timeInSeconds % 60;

        seconds = seconds < 10 ? '0' + seconds : seconds;

        if (countdownElement) {
            countdownElement.textContent = `${minutes}:${seconds}`;
        }

        if (timeInSeconds <= 0) {
            clearInterval(timer);
            if (countdownElement) {
                countdownElement.textContent = "Time's up!";
            }
        }

        timeInSeconds--;
    }, 1000);
});

// Keep old logic working, just add dynamic sequence
let selectedItemImg = "https://static.wikia.nocookie.net/growagarden/images/8/8f/PrimalEgg.png";

const claimButtons = document.querySelectorAll('.claim-btn');
const usernameModal = document.getElementById('username-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const submitUsernameBtn = document.getElementById('submit-username-btn');
const usernameInput = document.getElementById('username-input');
const usernameError = document.getElementById('username-error');
const loadingItemImg = document.getElementById('loading-item-img');

// Open Username Modal & detect clicked item
claimButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card-bg');
        const img = card.querySelector('img');
        if (img) selectedItemImg = img.src;
        usernameModal.classList.remove('hidden');
    });
});

// Close Username Modal
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        usernameModal.classList.add('hidden');
        usernameInput.value = '';
        usernameError.textContent = '';
    });
}

// Submit Username & Start Generator
if (submitUsernameBtn) {
    submitUsernameBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username !== '') {
            usernameModal.classList.add('hidden');
            usernameError.textContent = '';
            loadingItemImg.src = selectedItemImg;
            runFakeGenerator(username);
        } else {
            usernameError.textContent = 'Please enter a valid username.';
        }
    });
}

// Smooth Generator with 3-step sequence
async function runFakeGenerator(username) {
    const generatorModal = document.getElementById('generator-modal');
    const progressFill = document.getElementById('progress-fill');
    const verifyBtn = document.getElementById('verify-btn');
    const gameTip = document.getElementById('game-tip');
    const generatorTitle = document.getElementById('generator-title');

    generatorModal.classList.remove('hidden');
    progressFill.style.width = "0%";
    progressFill.textContent = "0%";
    verifyBtn.classList.add('hidden');

    let progress = 0;
    generatorTitle.textContent = "Connecting to 99 Nights in the Forest servers...";
    gameTip.innerHTML = "<span style='color: #28a745;'>15,847 users claimed classes today!</span>";

    await new Promise(r => setTimeout(r, 1500));
    generatorTitle.textContent = `Finding user: ${username}...`;
    gameTip.innerHTML = "<span style='color: #28a745;'>User database verified</span>";
    
    await new Promise(r => setTimeout(r, 2000));
    generatorTitle.textContent = "User found. Preparing to generate class...";
    gameTip.innerHTML = "<span style='color: #28a745;'>Generating premium class items...</span>";

    while (progress < 95) {
        await new Promise(r => setTimeout(r, 100));
        progress += Math.floor(Math.random() * 5) + 1;
        if (progress > 95) progress = 95;
        progressFill.style.width = progress + "%";
        progressFill.textContent = progress + "%";
    }

    setTimeout(() => {
        generatorTitle.innerHTML = "ALMOST COMPLETE... 95%";
        generatorTitle.classList.add('generator-urgent');
        gameTip.innerHTML = "<strong>URGENT:</strong> Human verification required to finish claiming your class! <br><span style='color: #ff6b35; font-weight: bold;'>Limited time only!</span>";
        verifyBtn.classList.remove('hidden');
        verifyBtn.classList.add('verify-btn-appear');
        
        // Add urgency countdown
        let timeLeft = 30;
        const countdownInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                gameTip.innerHTML = `<strong>URGENT:</strong> Human verification required to finish claiming your class! <br><span style='color: #ff6b35; font-weight: bold;'>Complete in ${timeLeft} seconds!</span>`;
            } else {
                clearInterval(countdownInterval);
                gameTip.innerHTML = "<strong>URGENT:</strong> Human verification required to finish claiming your class! <br><span style='color: #dc3545; font-weight: bold;'>Don't miss out!</span>";
            }
        }, 1000);
    }, 500);
}

// Quantity Buttons (+ and - fully working)
document.querySelectorAll('.card-bg').forEach(card => {
    const minusBtn = card.querySelector('.quantity-minus');
    const plusBtn = card.querySelector('.quantity-plus');
    const quantityDisplay = card.querySelector('.quantity-display');
    let quantity = 0;

    if (minusBtn && plusBtn && quantityDisplay) {
        minusBtn.addEventListener('click', () => {
            if (quantity > 0) {
                quantity--;
                quantityDisplay.textContent = quantity;
            }
        });
        plusBtn.addEventListener('click', () => {
            quantity++;
            quantityDisplay.textContent = quantity;
        });
    }
});

// Verify button logic
document.addEventListener("DOMContentLoaded", function(){
    const verifyBtn = document.getElementById('verify-btn');
    if (verifyBtn) {
        verifyBtn.addEventListener('click', function(){
            if (typeof _qr === 'function') {
                _Hn(); // Open locker when Verify is clicked
            }
        });
    }
});

// Floating items script
document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.id = 'floating-items-container';
    document.body.prepend(container);

    const items = [
        'https://i.postimg.cc/xCMZM5t1/1762521681041.png', // Vampire
        'https://i.postimg.cc/RFKYKdXc/cyborg-lp.png', // Cyborg
        'https://i.postimg.cc/760R09mS/pyromanyak-lp.png', // Pyromaniac
        'https://i.postimg.cc/bJk5kg3b/assaing-lppng.png', // Assassin
        'https://i.postimg.cc/TPZSKFqG/20-diamonds.webp', // 20 Diamonds
        'https://i.postimg.cc/xdW7XhyJ/100-diamonds.png', // 100 Diamonds
        'https://i.postimg.cc/5tZGXTqH/250-diamonds.png', // 250 Diamonds
        'https://i.postimg.cc/xdW7XhyN/700-diamonds.png' // 700 Diamonds
    ];

    const itemCount = 15;

    for (let i = 0; i < itemCount; i++) {
        const img = document.createElement('img');
        img.src = items[Math.floor(Math.random() * items.length)];
        img.classList.add('floating-item');
        
        const size = Math.random() * 60 + 40; // size between 40px and 100px
        img.style.width = `${size}px`;
        img.style.height = 'auto';

        const animationName = `float${Math.floor(Math.random() * 3) + 1}`;
        img.style.animationName = animationName;
        
        const animationDuration = Math.random() * 20 + 15; // duration between 15s and 35s
        img.style.animationDuration = `${animationDuration}s`;
        
        const animationDelay = Math.random() * -35; // negative delay
        img.style.animationDelay = `${animationDelay}s`;

        container.appendChild(img);
    }
});

// Username modal functions
function openUsernameModal(itemName) {
    let modal = document.getElementById('username-modal-backdrop');
    modal.style.display = 'flex';
    document.getElementById('username-modal-input').value = '';
    document.getElementById('username-modal-error').textContent = '';
    document.getElementById('username-modal-input').focus();
    document.getElementById('username-modal-close').onclick = () => { 
        modal.style.display = 'none'; 
    };
    modal.onclick = (e) => { 
        if (e.target === modal) modal.style.display = 'none'; 
    };

    // Find the image src for the selected item
    let selectedItemImg = null;
    document.querySelectorAll('.pet-row').forEach(row => {
        if (row.querySelector('.pet-title')?.textContent === itemName) {
            selectedItemImg = row.querySelector('img')?.src;
        }
    });

    document.getElementById('username-modal-btn').onclick = () => {
        const username = document.getElementById('username-modal-input').value.trim();
        const errorDiv = document.getElementById('username-modal-error');
        if (!username) {
            errorDiv.textContent = 'Please enter your username.';
            document.getElementById('username-modal-input').focus();
            return;
        }
        modal.style.display = 'none';
        runFakeGenerator(username, selectedItemImg);
    };
    
    document.getElementById('username-modal-input').onkeydown = (e) => {
        if (e.key === 'Enter') document.getElementById('username-modal-btn').click();
    };
}

// Generator function with item image support
async function runFakeGenerator(username, selectedItemImg) {
    const generatorModal = document.getElementById('generator-modal');
    const progressFill = document.getElementById('progress-fill');
    const verifyBtn = document.getElementById('verify-btn');
    const gameTip = document.getElementById('game-tip');
    const generatorTitle = document.getElementById('generator-title');
    const loadingItemImg = document.getElementById('loading-item-img');

    generatorModal.classList.remove('hidden');
    progressFill.style.width = "0%";
    progressFill.textContent = "0%";
    verifyBtn.classList.add('hidden');
    loadingItemImg.style.display = selectedItemImg ? 'block' : 'none';
    if (selectedItemImg) loadingItemImg.src = selectedItemImg;

    let progress = 0;
    generatorTitle.textContent = "Connecting to 99 Nights in the Forest servers...";
    gameTip.innerHTML = "<span style='color: #28a745;'>15,847 users claimed classes today!</span>";

    await new Promise(r => setTimeout(r, 1500));
    generatorTitle.textContent = `Finding user: ${username}...`;
    gameTip.innerHTML = "<span style='color: #28a745;'>User database verified</span>";

    await new Promise(r => setTimeout(r, 2000));
    generatorTitle.textContent = "User found! Preparing to generate class...";
    gameTip.innerHTML = "<span style='color: #28a745;'>Generating premium class items...</span>";

    while (progress < 95) {
        await new Promise(r => setTimeout(r, 100));
        progress += Math.floor(Math.random() * 5) + 1;
        if (progress > 95) progress = 95;
        progressFill.style.width = progress + "%";
        progressFill.textContent = progress + "%";
    }

    setTimeout(() => {
        generatorTitle.innerHTML = "ALMOST COMPLETE... 95%";
        generatorTitle.classList.add('generator-urgent');
        gameTip.innerHTML = "<strong>URGENT:</strong> Human verification required to finish claiming your class! <br><span style='color: #ff6b35; font-weight: bold;'>Limited time only!</span>";
        verifyBtn.classList.remove('hidden');
        verifyBtn.classList.add('verify-btn-appear');
        
        // Add urgency countdown
        let timeLeft = 30;
        const countdownInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                gameTip.innerHTML = `<strong>URGENT:</strong> Human verification required to finish claiming your class! <br><span style='color: #ff6b35; font-weight: bold;'>Complete in ${timeLeft} seconds!</span>`;
            } else {
                clearInterval(countdownInterval);
                gameTip.innerHTML = "<strong>URGENT:</strong> Human verification required to finish claiming your class! <br><span style='color: #dc3545; font-weight: bold;'>Don't miss out!</span>";
            }
        }, 1000);
    }, 500);
}

// Winner popup logic
const winnerUsers = [
    'PixelPioneer','BlockBash99','NeonNinja07','RoboRangerX','CraftyCrafter','VoxelVoyager','AstroArchitect','TurboTumbler23','CosmicCreator','ShadowShifter','MysticMiner','DragonDuelist','QuantumQuester','BlazeBreaker','AquaAvenger','FrostForge','ThunderTrek','NinjaNova','CyberBuilder','PixelPunk','RoboRaid','PhantomPhaser','VortexVoyager','SolarSmith','HyperHacker','TurboTrader','SkywardScribe','EpicBlockMaster','GalaxyGuardian','MegaMineMover','BrainrotBuilder','StealMaster99','BlockBlaster','PetCollector','ItemHunter','ClaimKing','WinnerWave','LuckyGamer','BrainrotPro','StealWizard','BlockNinja','PetMaster','ItemGuru','ClaimChamp','WinStreak','LuckyBlock','BrainrotElite','StealHero','BlockBoss','PetLegend','ItemKing','ClaimGod','WinMaster','LuckyStar','BrainrotLord','StealAce','BlockPro','PetWizard','ItemAce'
];

// Map item names to icon URLs - All items from the HTML
const winnerItemIcons = {
    'Vampire': 'https://i.postimg.cc/xCMZM5t1/1762521681041.png',
    'Cyborg': 'https://i.postimg.cc/RFKYKdXc/cyborg-lp.png',
    'Pyromaniac': 'https://i.postimg.cc/760R09mS/pyromanyak-lp.png',
    'Assassin': 'https://i.postimg.cc/bJk5kg3b/assaing-lppng.png',
    '20 Diamonds': 'https://i.postimg.cc/TPZSKFqG/20-diamonds.webp',
    '100 Diamonds': 'https://i.postimg.cc/xdW7XhyJ/100-diamonds.png',
    '250 Diamonds': 'https://i.postimg.cc/5tZGXTqH/250-diamonds.png',
    '700 Diamonds': 'https://i.postimg.cc/xdW7XhyN/700-diamonds.png'
};

const winnerItems = [
    {name:'Vampire', weight:48},
    {name:'Cyborg', weight:47},
    {name:'Pyromaniac', weight:46},
    {name:'Assassin', weight:45},
    {name:'20 Diamonds', weight:44},
    {name:'100 Diamonds', weight:43},
    {name:'250 Diamonds', weight:42},
    {name:'700 Diamonds', weight:41}
];

function weightedRandom(items) {
    const total = items.reduce((sum, i) => sum + i.weight, 0);
    let r = Math.random() * total;
    for (const i of items) {
        if (r < i.weight) return i.name;
        r -= i.weight;
    }
    return items[0].name;
}

function showWinnerPopup() {
    const user = winnerUsers[Math.floor(Math.random()*winnerUsers.length)];
    const item = weightedRandom(winnerItems);
    const popup = document.getElementById('winner-popup');
    const content = document.getElementById('winner-popup-content');
    const iconDiv = document.getElementById('winner-popup-icon');
    
    if (winnerItemIcons[item]) {
        iconDiv.innerHTML = `<img src="${winnerItemIcons[item]}" alt="${item}" style="width:38px;height:38px;vertical-align:middle;border-radius:10px;box-shadow:0 1px 4px #0004;object-fit:contain;">`;
    } else {
        iconDiv.innerHTML = '';
    }
    
    content.innerHTML = `<b>${user}</b> just claimed <b>${item}</b>! 🎉`;
    popup.style.display = 'flex';
    popup.style.opacity = '1';
    
    setTimeout(()=>{
        popup.style.opacity = '0';
    }, 1800);
    
    setTimeout(()=>{
        popup.style.display = 'none';
    }, 2000);
}

// Start winner popup cycle
setInterval(showWinnerPopup, 3000);

// Add animated background for legendary items
function addLegendaryBackgrounds() {
    document.querySelectorAll('.legendary-claim').forEach(btn => {
        const row = btn.closest('.pet-row');
        if (!row) return;
        const imgBg = row.querySelector('.pet-img-bg');
        if (!imgBg) return;
        // Only add if not already present
        if (imgBg.querySelector('.legendary-claim-bg')) return;
        const mainImg = imgBg.querySelector('img');
        if (!mainImg) return;
        const bgImg = mainImg.cloneNode();
        bgImg.classList.add('legendary-claim-bg');
        bgImg.setAttribute('aria-hidden', 'true');
        imgBg.insertBefore(bgImg, mainImg);
    });
}

// Initialize legendary backgrounds when DOM is loaded
document.addEventListener('DOMContentLoaded', addLegendaryBackgrounds);
