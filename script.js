// RAIG — Landing Page Scripts

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 20);
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Scroll animations
const animateElements = document.querySelectorAll(
  '.problem__card, .approach__step, .step, .outcomes__card, ' +
  '.founder__inner, .services__bottom-cta, .quiz__card'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

animateElements.forEach(el => {
  el.classList.add('animate-in');
  observer.observe(el);
});


// --- AI READINESS QUIZ ---
(function() {
  const questions = document.querySelectorAll('.quiz__question');
  const progressBar = document.getElementById('quizProgressBar');
  const progressText = document.getElementById('quizProgressText');
  const resultEl = document.getElementById('quizResult');
  const gradeCircle = document.getElementById('quizGradeCircle');
  const gradeLetter = document.getElementById('quizGradeLetter');
  const resultTitle = document.getElementById('quizResultTitle');
  const resultDesc = document.getElementById('quizResultDesc');
  const retakeBtn = document.getElementById('quizRetake');

  let currentQ = 0;
  let scores = [];
  const total = questions.length;

  // Grade definitions with package recommendations
  const grades = {
    A: {
      title: 'AI-Ready Leader',
      desc: 'Your business is well-positioned to implement advanced AI systems. You have the foundation in place.',
      rec: 'AI Transformation ($2,000+) or Ongoing AI Partnership',
      recDesc: 'You\'re ready to go all-in. A full transformation package or ongoing partnership will help you scale what\'s working and build new systems across your operations.'
    },
    B: {
      title: 'Strong Foundation',
      desc: 'You\'re ahead of most businesses. With a structured approach, you could see significant ROI from AI within weeks.',
      rec: 'AI Build ($1,000)',
      recDesc: 'You have the basics down. The AI Build package will implement custom systems, train your team, and turn your existing momentum into measurable results.'
    },
    C: {
      title: 'Getting Started',
      desc: 'You\'re aware of AI\'s potential but haven\'t fully tapped into it yet. That\'s exactly where most of our clients start.',
      rec: 'AI Foundation ($500)',
      recDesc: 'A structured roadmap and initial implementations will give you clarity on where AI fits and get real systems running in your business.'
    },
    D: {
      title: 'Early Stage',
      desc: 'There\'s a big opportunity here. Your business has untapped potential for AI-driven efficiency gains.',
      rec: 'AI Opportunity Audit ($250)',
      recDesc: 'A 2-hour deep-dive session will uncover the specific AI opportunities in your business and give you a clear picture of where to start.'
    },
    F: {
      title: 'Ground Floor',
      desc: 'You\'re not alone. Most small businesses are in the same spot. The good news? Starting now means you can get ahead of competitors who are also still figuring it out.',
      rec: 'Free 30-Minute Diagnostic Call',
      recDesc: 'Let\'s start with a conversation. We\'ll identify 2-3 ways AI can immediately impact your business and map out next steps. No cost, no obligation.'
    }
  };

  function getGrade(score) {
    if (score >= 17) return 'A';
    if (score >= 13) return 'B';
    if (score >= 9) return 'C';
    if (score >= 5) return 'D';
    return 'F';
  }

  function updateProgress() {
    const pct = ((currentQ + 1) / total) * 100;
    progressBar.style.width = pct + '%';
    progressText.textContent = 'Question ' + (currentQ + 1) + ' of ' + total;
  }

  function showResult() {
    const totalScore = scores.reduce((a, b) => a + b, 0);
    const grade = getGrade(totalScore);
    const info = grades[grade];

    // Hide questions + progress
    questions.forEach(q => q.classList.remove('active'));
    progressBar.parentElement.style.display = 'none';
    progressText.style.display = 'none';

    // Show result
    gradeCircle.setAttribute('data-grade', grade);
    gradeLetter.textContent = grade;
    resultTitle.textContent = info.title;
    resultDesc.textContent = info.desc;

    // Show recommendation
    const recTitle = document.getElementById('quizRecTitle');
    const recDesc = document.getElementById('quizRecDesc');
    if (recTitle) recTitle.textContent = info.rec;
    if (recDesc) recDesc.textContent = info.recDesc;

    resultEl.classList.add('active');
  }

  function reset() {
    currentQ = 0;
    scores = [];
    resultEl.classList.remove('active');
    progressBar.parentElement.style.display = '';
    progressText.style.display = '';
    questions.forEach(q => {
      q.classList.remove('active');
      q.querySelectorAll('.quiz__option').forEach(o => o.classList.remove('selected'));
    });
    questions[0].classList.add('active');
    updateProgress();
  }

  // Handle option clicks
  questions.forEach((question, qi) => {
    question.querySelectorAll('.quiz__option').forEach(option => {
      option.addEventListener('click', () => {
        // Visual feedback
        question.querySelectorAll('.quiz__option').forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');

        // Record score
        scores[qi] = parseInt(option.getAttribute('data-score'));

        // Advance after brief delay
        setTimeout(() => {
          if (currentQ < total - 1) {
            questions[currentQ].classList.remove('active');
            currentQ++;
            questions[currentQ].classList.add('active');
            updateProgress();
          } else {
            showResult();
          }
        }, 350);
      });
    });
  });

  // Retake
  retakeBtn.addEventListener('click', reset);
})();
