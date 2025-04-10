// script.js – DateDock Main Orchestrator

const quotes = [
  "Start where you are. Use what you have. Do what you can.",
  "Focus is more important than hustle.",
  "One thing at a time. One step at a time.",
  "A calm mind brings clarity.",
  "Plan like a pro. Flow like a poet.",
  "Today’s a good day to begin again.",
  "Don’t overbook. Just dock."
];

document.addEventListener('DOMContentLoaded', () => {
  highlightToday();
  showWeekAtAGlance();
  setupThemeToggle();
  setupClearButton();
  showDailyQuote();

  // Wait a tiny bit to let calendar render before alerting
  setTimeout(() => {
    notifyTodaysTasks();
  }, 300);
});

function showDailyQuote() {
  const quoteBox = document.getElementById('daily-quote');
  if (quoteBox) {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    quoteBox.textContent = `"${random}"`;
  }
}

// 📣 Show alert with today’s tasks
function notifyTodaysTasks() {
  const dayIndex = new Date().getDay(); // 0 = Sunday
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = weekdays[dayIndex];

  const list = document.getElementById(`list-${today}`);
  if (!list) return;

  const tasks = Array.from(list.querySelectorAll('li span')).map(el => el.textContent.trim());
  
  if (tasks.length) {
    alert(`🗓️ Today is ${today}!\nYou have ${tasks.length} task(s):\n\n• ${tasks.join('\n• ')}`);
  } else {
    alert(`🗓️ Today is ${today}.\nYou have no tasks scheduled. Nice!`);
  }
}

function showWeekAtAGlance() {
  const glanceBox = document.getElementById('week-glance');
  const saved = JSON.parse(localStorage.getItem('datedock-tasks')) || {};
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const summary = weekdays.map(day => {
    const count = saved[day]?.length || 0;
    return `${day.slice(0, 3)}: ${count}`;
  });

  if (glanceBox) {
    glanceBox.textContent = `📋 Week at a Glance – ${summary.join(' · ')}`;
  }
}

// ✨ Highlight today’s column
function highlightToday() {
  const todayIndex = new Date().getDay();
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = weekdays[todayIndex];

  const todayCol = document.querySelector(`.day-column[data-day="${todayName}"]`);
  if (todayCol) {
    todayCol.classList.add('today');
  }
}

// 🌗 Theme toggle logic (cycling version with calm/light/dark)
function setupThemeToggle() {
  const toggleBtn = document.getElementById('toggle-theme');
  if (!toggleBtn) return;

  const themes = ['light', 'dark', 'calm'];
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedPref = localStorage.getItem('datedock-theme');
  const startingTheme = savedPref || (systemPrefersDark ? 'dark' : 'light');

  // Remove all possible themes
  themes.forEach(theme => document.body.classList.remove(theme));
  document.body.classList.add(startingTheme);

  let currentThemeIndex = themes.indexOf(startingTheme);
  localStorage.setItem('datedock-theme', startingTheme);

  toggleBtn.addEventListener('click', () => {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;

    // Remove all, then apply new theme
    themes.forEach(theme => document.body.classList.remove(theme));
    const newTheme = themes[currentThemeIndex];
    document.body.classList.add(newTheme);
    localStorage.setItem('datedock-theme', newTheme);
  });
}

// 🧼 Clear all tasks
function setupClearButton() {
  const clearBtn = document.getElementById('clear-tasks');
  if (!clearBtn) return;

  clearBtn.addEventListener('click', () => {
    if (confirm('Clear all tasks for the week?')) {
      localStorage.removeItem('datedock-tasks');
      location.reload();
    }
  });
}