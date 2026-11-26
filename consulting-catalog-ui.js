(function () {
  const search = document.querySelector('#integration-search');
  const category = document.querySelector('#integration-category');
  const results = document.querySelector('#integration-results');
  const count = document.querySelector('#integration-count');
  const empty = document.querySelector('#integration-empty');
  consultingDomains.forEach(domain => {
    const option = document.createElement('option');
    option.value = domain.id;
    option.textContent = domain.name;
    category.append(option);
  });
  function node(tag, text, className) {
    const element = document.createElement(tag);
    element.textContent = text;
    if (className) element.className = className;
    return element;
  }
  function render() {
    const query = search.value.trim().toLowerCase();
    const matching = consultingDomains.filter(domain => {
      if (category.value && domain.id !== category.value) return false;
      if (!query) return Boolean(category.value);
      const examples = consultingExamples[domain.id] || [];
      return [domain.name, domain.teams, domain.workflows, domain.opportunities, ...domain.systems, ...examples.flatMap(example => [example.work, example.ai])].join(' ').toLowerCase().includes(query);
    });
    count.textContent = !category.value && !query ? 'Select a category or search' : `${matching.length} ${matching.length === 1 ? 'area' : 'areas'}`;
    empty.hidden = matching.length > 0 || (!category.value && !query);
    results.replaceChildren();
    matching.forEach(domain => {
      const details = document.createElement('details');
      details.className = 'integration-domain';
      const summary = document.createElement('summary');
      const heading = node('span', domain.name, 'integration-domain-title');
      const total = node('span', `${domain.systems.length} systems`, 'integration-domain-count');
      summary.append(heading, total);
      const content = node('div', '', 'integration-domain-content');
      const teams = node('p', domain.teams, 'integration-teams');
      const workflowHeading = node('h3', 'Workflows');
      const workflow = node('p', domain.workflows);
      const opportunityHeading = node('h3', 'Potential AI opportunities');
      const opportunity = node('p', domain.opportunities);
      const systemHeading = node('h3', 'Systems and examples');
      const examples = node('div', '', 'integration-examples');
      (consultingExamples[domain.id] || []).forEach(example => {
        const row = node('section', '', 'integration-example');
        const name = node('h4', example.systems.join(' / '));
        const work = node('p', example.work);
        const ai = node('p', '', 'integration-example-ai');
        ai.append(node('strong', 'Potential AI use: '), document.createTextNode(example.ai));
        row.append(name, work, ai);
        examples.append(row);
      });
      content.append(teams, workflowHeading, workflow, opportunityHeading, opportunity, systemHeading, examples);
      details.append(summary, content);
      details.open = true;
      results.append(details);
    });
  }
  category.addEventListener('change', () => { search.value = ''; render(); });
  search.addEventListener('input', render);
  render();
})();