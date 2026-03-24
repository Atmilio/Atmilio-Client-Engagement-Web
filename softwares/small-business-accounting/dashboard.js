// dashboard.js - Small Business Accounting Dashboard
// Dummy data and chart rendering for dashboard

document.addEventListener('DOMContentLoaded', function() {
    // Dynamic KPIs from accounting engine
    function getKPIs() {
        const engine = window.accountingEngine;
        // Cash Balance: sum of all asset accounts (simulate)
        let cashBalance = 0;
        if (engine && engine.accounts) {
            cashBalance = engine.accounts.filter(a => a.type === 'Asset').reduce((sum, a) => sum + (a.balance || 0), 0);
        }
        // Accounts Receivable: sum of pending/overdue invoices
        let accountsReceivable = 0;
        if (engine && engine.invoices) {
            accountsReceivable = engine.invoices.filter(i => i.status !== 'Paid').reduce((sum, i) => sum + parseFloat(i.amount), 0);
        }
        // Accounts Payable: sum of pending/overdue expenses
        let accountsPayable = 0;
        if (engine && engine.expenses) {
            accountsPayable = engine.expenses.filter(e => e.status !== 'Paid').reduce((sum, e) => sum + parseFloat(e.amount), 0);
        }
        // Net Income: sum of paid invoices - paid expenses (simulate for month)
        let netIncome = 0;
        if (engine && engine.invoices && engine.expenses) {
            const paidInv = engine.invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + parseFloat(i.amount), 0);
            const paidExp = engine.expenses.filter(e => e.status === 'Paid').reduce((sum, e) => sum + parseFloat(e.amount), 0);
            netIncome = paidInv - paidExp;
        }
        // Burn Rate: average of last 3 months expenses (simulate)
        let burnRate = 0;
        if (engine && engine.expenses) {
            const last3 = engine.expenses.slice(-3);
            if (last3.length) burnRate = last3.reduce((sum, e) => sum + parseFloat(e.amount), 0) / last3.length;
        }
        // Cash Flow: last 6 months (simulate)
        let cashFlow = [12000, 11000, 13000, 12500, 14000, 12500];
        let months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
        // Expenses breakdown
        let expenseCategories = ['Payroll', 'Rent', 'Software', 'Marketing', 'Other'];
        let expenseBreakdown = [3500, 2500, 1200, 800, 500];
        if (engine && engine.expenses) {
            // Group by category if available
            // For now, just sum all
            expenseBreakdown = [engine.expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0)];
        }
        return {
            cashBalance,
            accountsReceivable,
            accountsPayable,
            netIncome,
            burnRate,
            cashFlow,
            months,
            expenseCategories,
            expenseBreakdown
        };
    }

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

    // Render KPIs
    function renderKPIs() {
        const kpis = getKPIs();
        const widgetEls = document.querySelectorAll('.dashboard-widgets .widget');
        if (widgetEls[0]) widgetEls[0].querySelector('p').textContent = `$${kpis.cashBalance.toLocaleString(undefined, {minimumFractionDigits:2})}`;
        if (widgetEls[1]) widgetEls[1].querySelector('p').textContent = `$${kpis.accountsReceivable.toLocaleString(undefined, {minimumFractionDigits:2})}`;
        if (widgetEls[2]) widgetEls[2].querySelector('p').textContent = `$${kpis.accountsPayable.toLocaleString(undefined, {minimumFractionDigits:2})}`;
        if (widgetEls[3]) widgetEls[3].querySelector('p').textContent = `+$${kpis.netIncome.toLocaleString(undefined, {minimumFractionDigits:2})}`;
        if (widgetEls[4]) widgetEls[4].querySelector('p').textContent = `$${kpis.burnRate.toLocaleString(undefined, {minimumFractionDigits:2})}`;
        if (widgetEls[5]) widgetEls[5].querySelector('p').textContent = `+$${kpis.cashFlow[kpis.cashFlow.length-1].toLocaleString(undefined, {minimumFractionDigits:2})}`;
    }
    // Render charts (using Chart.js CDN)
    const addChartJs = document.createElement('script');
    addChartJs.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    addChartJs.onload = function() {
        const kpis = getKPIs();
        // Cash Flow Chart
        const cashflowCtx = document.querySelector('#cashflow-chart canvas').getContext('2d');
        window.cashflowChart = new Chart(cashflowCtx, {
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
        window.expensesChart = new Chart(expensesCtx, {
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
        renderKPIs();
    };
    document.body.appendChild(addChartJs);
    // Listen for updates from other modules
    window.addEventListener('accountingDataChanged', function() {
        renderKPIs();
        if (window.cashflowChart && window.expensesChart) {
            const kpis = getKPIs();
            window.cashflowChart.data.datasets[0].data = kpis.cashFlow;
            window.cashflowChart.update();
            window.expensesChart.data.datasets[0].data = kpis.expenseBreakdown;
            window.expensesChart.update();
        }
    });
    // Initial render
    setTimeout(renderKPIs, 500);
});
