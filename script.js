/**
 * ExporTech 2026 — Convite Digital Interativo
 * Fluxo: Mistério → Convite direto
 */

(function () {
  'use strict';

  // ========== CONFIGURAÇÃO ==========
  const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzMMT1Mwkiqgs5wXsbbZvoFfxROCZyGcpf7H_bHBpDqF0MLawmSAPsMRcI4Q7KCdreZ/exec';

  // Data do evento: 05 de novembro de 2026, 18:30 (horário de Brasília)
  const EVENT_DATE = new Date('2026-11-05T18:30:00-03:00');

  // ========== ELEMENTOS ==========
  const screenMystery = document.getElementById('screen-mystery');
  const screenInvite = document.getElementById('screen-invite');
  const btnDiscover = document.getElementById('btn-discover');
  const rsvpForm = document.getElementById('rsvp-form');
  const successMessage = document.getElementById('success-message');
  const errorMessage = document.getElementById('error-message');
  const btnRetry = document.getElementById('btn-retry');
  const btnShare = document.getElementById('btn-share');
  const btnCopy = document.getElementById('btn-copy');
  const copyFeedback = document.getElementById('copy-feedback');
  const privacyModal = document.getElementById('privacy-modal');
  const btnPrivacy = document.getElementById('btn-privacy');
  const closePrivacy = document.getElementById('close-privacy');

  // ========== PARTÍCULAS ==========
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId = null;
  let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    const count = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 18000), 70);
    particles = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * 0.5 + 0.15,
        color: Math.random() > 0.6 ? '34, 211, 238' : '30, 111, 255'
      });
    }
  }

  function drawParticles() {
    if (reducedMotion) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(30, 111, 255, ${0.12 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
      ctx.fill();
    });

    animationId = requestAnimationFrame(drawParticles);
  }

  function initParticles() {
    if (reducedMotion) {
      canvas.style.display = 'none';
      return;
    }

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });
  }

  // ========== NAVEGAÇÃO ==========
  function showScreen(screen) {
    [screenMystery, screenInvite].forEach(s => {
      s.classList.remove('active');
      s.setAttribute('aria-hidden', 'true');
    });

    screen.classList.add('active');
    screen.setAttribute('aria-hidden', 'false');

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function cinematicTransition(fromScreen, toScreen, callback) {
    fromScreen.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fromScreen.style.opacity = '0';
    fromScreen.style.transform = 'scale(0.97)';

    setTimeout(() => {
      showScreen(toScreen);
      toScreen.style.opacity = '0';
      toScreen.style.transform = 'scale(1.02)';

      requestAnimationFrame(() => {
        toScreen.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        toScreen.style.opacity = '1';
        toScreen.style.transform = 'scale(1)';
      });

      if (callback) callback();
    }, 500);
  }

  // Clique em "Descobrir meu convite" → vai direto para o convite
  btnDiscover.addEventListener('click', () => {
    cinematicTransition(screenMystery, screenInvite, () => {
      startCountdown();
    });
  });

  // ========== CONTADOR REGRESSIVO ==========
  function startCountdown() {
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');

    function update() {
      const now = new Date();
      const diff = EVENT_DATE - now;

      if (diff <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minsEl.textContent = '00';
        secsEl.textContent = '00';
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      daysEl.textContent = String(d).padStart(2, '0');
      hoursEl.textContent = String(h).padStart(2, '0');
      minsEl.textContent = String(m).padStart(2, '0');
      secsEl.textContent = String(s).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
  }

  // ========== FORMULÁRIO ==========
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearErrors() {
    document.querySelectorAll('.error-msg').forEach(el => {
      el.textContent = '';
    });
  }

  function showFieldError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
  }

  rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const fullName = document.getElementById('fullName').value.trim();
    const serie = document.getElementById('serie').value.trim();
    const category = document.getElementById('category').value;
    const institution = document.getElementById('institution').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const presence = document.querySelector('input[name="presence"]:checked')?.value;

    let valid = true;

    // Verifica se a categoria selecionada é de estudante
    const isStudent = [
      'Estudante da escola',
      'Estudante visitante de outra escola'
    ].includes(category);

    // Nome completo continua obrigatório para todos
    if (!fullName) {
      showFieldError('error-name', 'Informe o nome completo');
      valid = false;
    }

    // Série obrigatória somente para estudantes
    if (isStudent && !serie) {
      showFieldError('error-serie', 'Informe sua série de escolaridade');
      valid = false;
    }

    // Categoria continua obrigatória para todos
    if (!category) {
      showFieldError('error-category', 'Selecione a categoria');
      valid = false;
    }

    // Instituição de ensino obrigatória somente para estudantes
    if (isStudent && !institution) {
      showFieldError('error-institution', 'Informe sua instituição de ensino');
      valid = false;
    }

    // E-mail continua obrigatório para todos
    if (!email) {
      showFieldError('error-email', 'Informe o e-mail');
      valid = false;
    } else if (!validateEmail(email)) {
      showFieldError('error-email', 'E-mail inválido');
      valid = false;
    }

    // Confirmação de presença continua obrigatória para todos
    if (!presence) {
      showFieldError('error-presence', 'Selecione uma opção de presença');
      valid = false;
    }

    if (!valid) return;

    const btn = document.getElementById('btn-submit');
    const btnText = btn.querySelector('.btn-text');
    const btnLoader = btn.querySelector('.btn-loader');

    btn.disabled = true;
    btnText.hidden = true;
    btnLoader.hidden = false;

    const payload = {
      fullName,
      serie,
      category,
      institution,
      email,
      phone: phone || '—',
      presence,
      submittedAt: new Date().toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo'
      }),
      _subject: `Confirmação ExporTech 2026 — ${fullName}`
    };

    try {
      // Envia para o Google Apps Script
      // mode: 'no-cors' é mantido conforme o código original
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      // Com no-cors não conseguimos ler a resposta
      rsvpForm.hidden = true;
      errorMessage.hidden = true;
      successMessage.hidden = false;
      successMessage.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

    } catch (err) {
      console.error(err);

      rsvpForm.hidden = true;
      successMessage.hidden = true;
      errorMessage.hidden = false;

      document.getElementById('error-text').textContent =
        'Não foi possível registrar sua presença no momento. Verifique sua conexão e tente novamente.';

    } finally {
      btn.disabled = false;
      btnText.hidden = false;
      btnLoader.hidden = true;
    }
  });

  btnRetry.addEventListener('click', () => {
    errorMessage.hidden = true;
    rsvpForm.hidden = false;
  });

  // ========== COMPARTILHAR ==========
  btnShare.addEventListener('click', async () => {
    const shareData = {
      title: 'ExporTech 2026 — Convite Especial',
      text: 'Você recebeu um convite especial para a ExporTech 2026 — Educação e Tecnologia!',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Usuário cancelou o compartilhamento
      }
    } else {
      copyLink();
    }
  });

  function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      copyFeedback.hidden = false;
      setTimeout(() => {
        copyFeedback.hidden = true;
      }, 2500);

    }).catch(() => {
      const input = document.createElement('input');
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);

      copyFeedback.hidden = false;
      setTimeout(() => {
        copyFeedback.hidden = true;
      }, 2500);
    });
  }

  btnCopy.addEventListener('click', copyLink);

  // ========== PRIVACIDADE ==========
  btnPrivacy.addEventListener('click', (e) => {
    e.preventDefault();
    privacyModal.hidden = false;
  });

  closePrivacy.addEventListener('click', () => {
    privacyModal.hidden = true;
  });

  privacyModal.addEventListener('click', (e) => {
    if (e.target === privacyModal) {
      privacyModal.hidden = true;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !privacyModal.hidden) {
      privacyModal.hidden = true;
    }
  });

  // ========== INICIALIZAÇÃO ==========
  initParticles();

})();
