<template>
  <div class="countdown-container winter-theme">
    <div class="snowflakes">
      <div class="snowflake" v-for="n in 50" :key="n" :style="getSnowflakeStyle()"></div>
    </div>
    
    <div class="content">
      <h1 class="title">❄️ Odliczanie do Nowego Roku ❄️</h1>
      <p class="subtitle">Zimowa magia już wkrótce!</p>
      
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
        <p v-if="timeLeft.days > 0">Zostało jeszcze {{ timeLeft.days }} dni do Nowego Roku!</p>
        <p v-else-if="timeLeft.hours > 0">Zostało jeszcze {{ timeLeft.hours }} godzin!</p>
        <p v-else-if="timeLeft.minutes > 0">Zostało jeszcze {{ timeLeft.minutes }} minut!</p>
        <p v-else>Szczęśliwego Nowego Roku! 🎉</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'NewYearCountdown',
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
      const newYear = new Date(now.getFullYear() + 1, 0, 1) // 1 stycznia następnego roku
      
      const difference = newYear - now
      
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

    const getSnowflakeStyle = () => {
      return {
        left: Math.random() * 100 + '%',
        animationDelay: Math.random() * 3 + 's',
        animationDuration: (Math.random() * 3 + 2) + 's'
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
      getSnowflakeStyle
    }
  }
}
</script>

<style scoped>
.winter-theme {
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 50%, #6c5ce7 100%);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.snowflakes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.snowflake {
  position: absolute;
  top: -10px;
  color: white;
  font-size: 1em;
  animation: fall linear infinite;
}

@keyframes fall {
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

.content {
  text-align: center;
  z-index: 1;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
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
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 20px;
  min-width: 100px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
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
}
</style>
