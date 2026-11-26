(function () {
  const plans = {
    individual: { name: 'Individual', message: 'For one learner. Pricing and enrollment are not available yet.' },
    team: { name: 'Team', message: 'For multiple learners. Team features, pricing, and enrollment are not available yet.' },
    enterprise: { name: 'Enterprise', message: 'For larger programs. Contact us to discuss your needs; terms are not yet available.' }
  };
  const storageKey = 'atmilio-plan-interest-v1';
  const buttons = [...document.querySelectorAll('[data-plan]')];
  const title = document.querySelector('#plan-selection-title');
  const copy = document.querySelector('#plan-selection-copy');
  const contact = document.querySelector('#plan-selection-contact');
  let selected = null;
  let storageAvailable = true;
  function render() {
    buttons.forEach(button => {
      const active = button.dataset.plan === selected;
      button.setAttribute('aria-pressed', String(active));
      button.firstChild.textContent = active ? `Selected: ${plans[selected].name} ` : `Select ${plans[button.dataset.plan].name} `;
    });
    title.textContent = selected ? `${plans[selected].name} selected` : 'Compare your options';
    copy.textContent = selected ? `${plans[selected].message}${storageAvailable ? '' : ' Your selection will not be saved after leaving this page.'}` : 'Pricing, billing, and plan features are being finalized.';
    contact.hidden = selected !== 'team' && selected !== 'enterprise';
  }
  try { const saved = localStorage.getItem(storageKey); if (Object.hasOwn(plans, saved)) selected = saved; } catch (error) { storageAvailable = false; }
  buttons.forEach(button => button.addEventListener('click', () => {
    selected = button.dataset.plan;
    try { localStorage.setItem(storageKey, selected); storageAvailable = true; } catch (error) { storageAvailable = false; }
    render();
  }));
  render();
})();