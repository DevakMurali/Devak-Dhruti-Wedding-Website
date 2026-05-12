// Countdown to wedding date
const cdDays  = document.getElementById('cd-days');
const cdHours = document.getElementById('cd-hours');
const cdMins  = document.getElementById('cd-mins');
const cdSecs  = document.getElementById('cd-secs');

function updateCountdown() {
  if (!cdDays) return;
  const wedding = new Date('2026-11-22T17:00:00');
  const diff = wedding - new Date();
  if (diff <= 0) return;

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  cdDays.textContent  = String(d).padStart(2, '0');
  cdHours.textContent = String(h).padStart(2, '0');
  cdMins.textContent  = String(m).padStart(2, '0');
  cdSecs.textContent  = String(s).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Guest lookup (mock — replace with real data source)
const mockGuests = {
  'devak murali':  ['Mehndi & Sangeet', 'Wedding Ceremony', 'Brunch Send-off'],
  'dhruti':        ['Mehndi & Sangeet', 'Wedding Ceremony', 'Brunch Send-off'],
  'john smith':    ['Wedding Ceremony'],
  'jane doe':      ['Mehndi & Sangeet', 'Wedding Ceremony'],
};

function lookupGuest() {
  const name   = document.getElementById('rsvp-name').value.trim();
  const result = document.getElementById('guest-result');

  if (!name) {
    result.textContent = 'Please enter your name.';
    return;
  }

  const key   = name.toLowerCase();
  const match = Object.keys(mockGuests).find(k => key.includes(k) || k.includes(key));

  if (match) {
    const events = mockGuests[match].join(' · ');
    result.innerHTML = `✦ Welcome, ${name}! You're invited to: <strong style="color:var(--blush)">${events}</strong>`;
  } else {
    result.textContent = "We couldn't find your name. Please check your spelling or contact us directly.";
  }
}

const rsvpInput = document.getElementById('rsvp-name');
if (rsvpInput) {
  rsvpInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') lookupGuest();
  });
}
