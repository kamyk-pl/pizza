// Funkcja do obliczania czasu do końca roku
function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const newYear = new Date(currentYear + 1, 0, 1, 0, 0, 0, 0); // 1 stycznia następnego roku
    
    const timeLeft = newYear - now;
    
    // Jeśli już minął Nowy Rok, przejdź do następnego roku
    if (timeLeft <= 0) {
        const nextNewYear = new Date(currentYear + 1, 0, 1, 0, 0, 0, 0);
        const timeToNextYear = nextNewYear - now;
        updateDisplay(timeToNextYear);
        return;
    }
    
    updateDisplay(timeLeft);
}

function updateDisplay(timeLeft) {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    // Aktualizuj elementy DOM
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    // Sprawdź czy to już Nowy Rok
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        showNewYearMessage();
    }
}

function showNewYearMessage() {
    const messageElement = document.getElementById('message');
    messageElement.textContent = '🎉 SZCZĘŚLIWEGO NOWEGO ROKU! 🎉';
    messageElement.style.color = '#ffd700';
    messageElement.style.fontSize = '3rem';
    
    // Dodaj efekt fajerwerków
    createFireworks();
}

function createFireworks() {
    const fireworksContainer = document.querySelector('.fireworks');
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = Math.random() * 100 + '%';
            firework.style.background = getRandomColor();
            firework.style.animation = 'firework 2s ease-out forwards';
            
            fireworksContainer.appendChild(firework);
            
            // Usuń fajerwerk po animacji
            setTimeout(() => {
                if (firework.parentNode) {
                    firework.parentNode.removeChild(firework);
                }
            }, 2000);
        }, i * 100);
    }
}

function getRandomColor() {
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Dodaj efekty wizualne dla liczników
function addVisualEffects() {
    const timeUnits = document.querySelectorAll('.time-unit');
    
    timeUnits.forEach(unit => {
        unit.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 15px 40px rgba(255, 215, 0, 0.6)';
        });
        
        unit.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(255, 215, 0, 0.3)';
        });
    });
}

// Funkcja do animacji liczb
function animateNumber(element, newValue) {
    const currentValue = parseInt(element.textContent);
    const increment = Math.ceil((newValue - currentValue) / 10);
    
    if (currentValue < newValue) {
        element.textContent = (currentValue + increment).toString().padStart(2, '0');
        setTimeout(() => animateNumber(element, newValue), 50);
    } else {
        element.textContent = newValue.toString().padStart(2, '0');
    }
}

// Dodaj efekt migania dla sekund
function addBlinkEffect() {
    const secondsElement = document.getElementById('seconds');
    let isBlinking = false;
    
    setInterval(() => {
        if (isBlinking) {
            secondsElement.style.opacity = '0.5';
        } else {
            secondsElement.style.opacity = '1';
        }
        isBlinking = !isBlinking;
    }, 500);
}

// Inicjalizacja
document.addEventListener('DOMContentLoaded', function() {
    // Uruchom odliczanie
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Dodaj efekty wizualne
    addVisualEffects();
    addBlinkEffect();
    
    // Dodaj efekt śniegu
    createSnowEffect();
});

// Efekt śniegu
function createSnowEffect() {
    const snowContainer = document.createElement('div');
    snowContainer.style.position = 'fixed';
    snowContainer.style.top = '0';
    snowContainer.style.left = '0';
    snowContainer.style.width = '100%';
    snowContainer.style.height = '100%';
    snowContainer.style.pointerEvents = 'none';
    snowContainer.style.zIndex = '1';
    document.body.appendChild(snowContainer);
    
    for (let i = 0; i < 50; i++) {
        createSnowflake(snowContainer);
    }
}

function createSnowflake(container) {
    const snowflake = document.createElement('div');
    snowflake.innerHTML = '❄';
    snowflake.style.position = 'absolute';
    snowflake.style.left = Math.random() * 100 + '%';
    snowflake.style.top = '-10px';
    snowflake.style.fontSize = Math.random() * 20 + 10 + 'px';
    snowflake.style.color = '#ffffff';
    snowflake.style.opacity = Math.random() * 0.8 + 0.2;
    snowflake.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
    
    container.appendChild(snowflake);
    
    // Usuń płatek śniegu po animacji
    setTimeout(() => {
        if (snowflake.parentNode) {
            snowflake.parentNode.removeChild(snowflake);
        }
        // Stwórz nowy płatek śniegu
        createSnowflake(container);
    }, 5000);
}

// Dodaj CSS dla animacji śniegu
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);
