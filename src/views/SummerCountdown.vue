<template>
  <div class="countdown-container summer-theme">
    <div class="sun-rays">
      <div class="ray" v-for="n in 12" :key="n" :style="getRayStyle(n)"></div>
    </div>
    
    <div class="content">
      <h1 class="title">☀️ Odliczanie do Wakacji ☀️</h1>
      <p class="subtitle">Lato już blisko!</p>
      
      <div class="countdown-display">
        <div class="time-unit">
          <div class="number">{{ timeLeft.days }}</div>
          <div class="label">Dni</div>
        </div>
        <div class="time-unit">
          <div class="number">{{ timeLeft.hours }}</div>
          <div class="label">Godzin</div>
        </div>
        <div class="time-unit">
          <div class="number">{{ timeLeft.minutes }}</div>
          <div class="label">Minut</div>
        </div>
        <div class="time-unit">
          <div class="number">{{ timeLeft.seconds }}</div>
          <div class="label">Sekund</div>
        </div>
      </div>
      
      <div class="message">
        <p v-if="timeLeft.days > 0">Zostało jeszcze {{ timeLeft.days }} dni do wakacji!</p>
        <p v-else-if="timeLeft.hours > 0">Zostało jeszcze {{ timeLeft.hours }} godzin!</p>
        <p v-else-if="timeLeft.minutes > 0">Zostało jeszcze {{ timeLeft.minutes }} minut!</p>
        <p v-else>Wakacje się zaczynają! 🏖️</p>
      </div>
      
      <div class="beach-elements">
        <div class="palm-tree">🌴</div>
        <div class="sun">☀️</div>
        <div class="waves">🌊</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'SummerCountdown',
  setup() {
    const timeLeft = ref({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    })

    let interval = null

    const calculateTimeLeft = () => {
      const now = new Date()
      const summerStart = new Date(2026, 5, 26) // 26 czerwca 2026 (miesiąc 5 = czerwiec)
      
      const difference = summerStart - now
      
      if (difference > 0) {
        timeLeft.value = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        }
      } else {
        timeLeft.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }
    }

    const getRayStyle = (index) => {
      const angle = (index * 30) - 90 // 30 stopni między promieniami
      return {
        transform: `rotate(${angle}deg)`,
        animationDelay: (index * 0.1) + 's'
      }
    }

    onMounted(() => {
      calculateTimeLeft()
      interval = setInterval(calculateTimeLeft, 1000)
    })

    onUnmounted(() => {
      if (interval) {
        clearInterval(interval)
      }
    })

    return {
      timeLeft,
      getRayStyle
    }
  }
}
</script>

<style scoped>
.summer-theme {
  background: linear-gradient(135deg, #fdcb6e 0%, #e17055 50%, #fd79a8 100%);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sun-rays {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  pointer-events: none;
}

.ray {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 60px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2));
  transform-origin: 50% 0;
  border-radius: 2px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

.content {
  text-align: center;
  z-index: 1;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
}

.title {
  font-size: 2.5rem;
  color: white;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
}

.countdown-display {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.time-unit {
  background: rgba(255, 255, 255, 0.25);
  border-radius: 15px;
  padding: 20px;
  min-width: 100px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(5px);
  transition: transform 0.3s ease;
}

.time-unit:hover {
  transform: translateY(-5px);
}

.number {
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 5px;
}

.label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.message {
  font-size: 1.1rem;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
}

.beach-elements {
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  font-size: 2rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.palm-tree {
  animation-delay: 0s;
}

.sun {
  animation-delay: 1s;
  font-size: 2.5rem;
}

.waves {
  animation-delay: 2s;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  
  .countdown-display {
    gap: 10px;
  }
  
  .time-unit {
    min-width: 80px;
    padding: 15px;
  }
  
  .number {
    font-size: 2rem;
  }
  
  .content {
    padding: 20px;
    margin: 20px;
  }
  
  .beach-elements {
    font-size: 1.5rem;
  }
  
  .sun {
    font-size: 2rem;
  }
}
</style>
