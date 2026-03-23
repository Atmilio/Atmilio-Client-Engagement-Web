// dashboard.js - Small Business Accounting Dashboard
// Dummy data and chart rendering for dashboard

document.addEventListener('DOMContentLoaded', function() {
    // Dummy data
    const kpis = {
        cashBalance: 12500,
        accountsReceivable: 2300,
        accountsPayable: 1200,
        netIncome: 3000,
        burnRate: 4000,
        cashFlow: [12000, 11000, 13000, 12500, 14000, 12500],
        months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
        expenses: [1200, 900, 1100, 950, 1300, 1200],
        expenseCategories: ['Payroll', 'Rent', 'Software', 'Marketing', 'Other'],
        expenseBreakdown: [3500, 2500, 1200, 800, 500],
        revenue: [8000, 9000, 9500, 10000, 11000, 12000]
    };

    // AI Insights (dummy)
    const aiInsights = [
        'You are projected to run out of cash in 42 days.',
        'Top expense category increased 18% MoM.'
    ];

    // Render AI Insights
    const main = document.querySelector('.main-content');
    const aiDiv = document.createElement('section');
    aiDiv.className = 'ai-insights';
    aiDiv.innerHTML = `<h3>AI Insights</h3><ul>${aiInsights.map(i => `<li>${i}</li>`).join('')}</ul>`;
    main.insertBefore(aiDiv, main.children[1]);

    // Render charts (using Chart.js CDN)
    const addChartJs = document.createElement('script');
    addChartJs.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    addChartJs.onload = function() {
        // Cash Flow Chart
        const cashflowCtx = document.querySelector('#cashflow-chart canvas').getContext('2d');
        new Chart(cashflowCtx, {
            type: 'line',
            data: {
                labels: kpis.months,
                datasets: [{
                    label: 'Cash Flow',
                    data: kpis.cashFlow,
                    borderColor: '#232946',
                    backgroundColor: 'rgba(35,41,70,0.08)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: false } }
            }
        });
        // Expenses Chart
        const expensesCtx = document.querySelector('#expenses-chart canvas').getContext('2d');
        new Chart(expensesCtx, {
            type: 'pie',
            data: {
                labels: kpis.expenseCategories,
                datasets: [{
                    label: 'Expenses',
                    data: kpis.expenseBreakdown,
                    backgroundColor: ['#eebf63','#232946','#b8c1ec','#d4d8f0','#f7f9fb']
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    };
    document.body.appendChild(addChartJs);
});
