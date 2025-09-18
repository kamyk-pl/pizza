# Vue 3 Countdown App

Aplikacja Vue 3 z dwoma stronami odliczania:
- **Strona zimowa**: Odliczanie do Nowego Roku z animacjami śniegu
- **Strona letnia**: Odliczanie do początku wakacji (26 czerwca 2026) z letnimi motywami

## Funkcje

- ⏰ Odliczanie w czasie rzeczywistym
- ❄️ Zimowa stylizacja z animacjami śniegu
- ☀️ Letnia stylizacja z promieniami słońca
- 📱 Responsywny design
- 🎨 Nowoczesny UI z efektami glassmorphism
- 🧭 Nawigacja między stronami

## Instalacja i uruchomienie

1. Zainstaluj zależności:
```bash
npm install
```

2. Uruchom serwer deweloperski:
```bash
npm run dev
```

3. Otwórz przeglądarkę i przejdź do `http://localhost:3000`

## Build dla produkcji

```bash
npm run build
```

## Struktura projektu

```
src/
├── main.js              # Główny plik aplikacji z konfiguracją routingu
├── App.vue              # Główny komponent z nawigacją
└── views/
    ├── NewYearCountdown.vue    # Strona odliczania do Nowego Roku
    └── SummerCountdown.vue     # Strona odliczania do wakacji
```

## Technologie

- Vue 3 (Composition API)
- Vue Router 4
- Vite
- CSS3 (animacje, gradienty, glassmorphism)
