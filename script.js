// ===== BURGER MENU =====
const burger = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (mobileMenu.classList.contains('active') && 
      !mobileMenu.contains(e.target) && 
      !burger.contains(e.target)) {
    burger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== LOGO CLICK TO HOME =====
document.querySelector('.logo').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

console.log('🌱 EcoNova — built with care for the planet.');
// ===== TELEGRAM FORM HANDLER =====
const TELEGRAM_TOKEN = '8889370510:AAG9BPMEazCMLE8Zx6hW9KG35LsNVtCTPK4'; // ВАШ ТОКЕН
const CHAT_ID = '7381554878'; // ВАШ ID

document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // Собираем данные из формы
  const name = this.querySelector('input[type="text"]').value;
  const email = this.querySelector('input[type="email"]').value;
  const message = this.querySelector('textarea').value;
  
  // Формируем текст сообщения
  const text = `🌱 НОВОЕ СООБЩЕНИЕ EcoNova

👤 Имя: ${name}
📧 Email: ${email}
💬 Сообщение: ${message}`;

  // Отправляем в Telegram
  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'HTML'
      })
    });
    
    const data = await response.json();
    
    if (data.ok) {
      alert('✅ The message has been sent, we will respond soon.');
      this.reset();
    } else {
      alert('❌ Something went wrong');
    }
  } catch (error) {
    alert('❌ Conection error');
  }
});