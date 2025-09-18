<template>
  <div id="app">
    <nav class="navigation">
      <router-link to="/new-year" class="nav-link winter">
        ❄️ Nowy Rok
      </router-link>
      <router-link to="/summer" class="nav-link summer">
        ☀️ Wakacje
      </router-link>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navigation {
  display: flex;
  justify-content: center;
  padding: 20px;
  gap: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.nav-link {
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 25px;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.nav-link.winter {
  background: linear-gradient(135deg, #74b9ff, #0984e3);
  color: white;
}

.nav-link.summer {
  background: linear-gradient(135deg, #fdcb6e, #e17055);
  color: white;
}

.nav-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.nav-link.router-link-active {
  border-color: white;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
</style>
