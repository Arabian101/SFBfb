document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.page-section');

  // Simple Router to show/hide pages based on URL hash
  function handleRoute() {
    const hash = window.location.hash || '#home';
    
    sections.forEach(section => {
      if ('#' + section.id === hash) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    navLinks.forEach(link => {
      if (link.getAttribute('href') === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', handleRoute);
  handleRoute(); // Run on initial load

  // Category Filter Functionality in Shop
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
