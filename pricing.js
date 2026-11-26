(function () {
  const plans = {
    individual: { name: 'Individual', message: '$500 per month for personal AI learning. Enrollment and billing are not available yet.' },
    team: { name: 'Team', message: '$500 per year per team account, plus $1,000 per user per month. For 11 or more users, every user is $950 per month. Enrollment and billing are not available yet.' },
    enterprise: { name: 'Enterprise', message: '$1,000 per user per month for corporate accounts. Enrollment and billing are not available yet; contact us to discuss your needs.' }
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