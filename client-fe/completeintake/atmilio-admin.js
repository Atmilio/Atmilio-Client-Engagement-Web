// atmilio-admin.js
// Handles admin portal features: client selection, invoice generation, PDF printing, and cost tracking

let clients = [];
let selectedClient = null;

// Fetch clients on load
fetch('../data/clients.json')
  .then(res => res.json())
  .then(data => {
    clients = data;
    renderClientList();
  });

function renderClientList() {
  const select = document.getElementById('clientSelect');
  select.innerHTML = clients.map((c, i) => `<option value="${i}">${c.name}</option>`).join('');
  if (clients.length) {
    select.selectedIndex = 0;
    selectClient(0);
  }
}

function selectClient(idx) {
  selectedClient = clients[idx];
  document.getElementById('clientCost').textContent = selectedClient.upcoming_payments
    ? selectedClient.upcoming_payments.map(p => p.amount).join(', ')
    : 'No cost data';
  document.getElementById('invoiceClientName').textContent = selectedClient.name;
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('clientSelect').addEventListener('change', function(e) {
    selectClient(e.target.value);
  });
  document.getElementById('generateInvoiceBtn').addEventListener('click', generateInvoice);
  document.getElementById('printInvoiceBtn').addEventListener('click', function() {
    window.print();
  });
});

function generateInvoice() {
  if (!selectedClient) return;
  const invoiceDetails = selectedClient.upcoming_payments || [];
  let rows = invoiceDetails.map(p => `<tr><td>${p.date}</td><td>${p.description}</td><td>${p.amount}</td></tr>`).join('');
  document.getElementById('invoiceTableBody').innerHTML = rows || '<tr><td colspan="3">No payments</td></tr>';
  document.getElementById('invoiceSection').classList.remove('hidden');
}
