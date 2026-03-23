// accountingEngine.js
// Core accounting data model and double-entry logic for Atmilio Accounting

// --- Chart of Accounts ---
// Each account has: id, name, type, parentId (for hierarchy)
const accounts = [
  { id: 1, name: 'Cash', type: 'asset', parentId: null },
  { id: 2, name: 'Accounts Receivable', type: 'asset', parentId: null },
  { id: 3, name: 'Accounts Payable', type: 'liability', parentId: null },
  { id: 4, name: 'Sales Revenue', type: 'revenue', parentId: null },
  { id: 5, name: 'Office Supplies', type: 'expense', parentId: null },
  { id: 6, name: 'Equity', type: 'equity', parentId: null },
  // Add more as needed
];

// --- Transactions & Entries ---
// Each transaction has: id, date, description, entries[]
// Each entry: accountId, debit, credit
let transactions = [];
let nextTransactionId = 1;

function addTransaction({ date, description, entries }) {
  // Validate double-entry: total debits = total credits
  const totalDebits = entries.reduce((sum, e) => sum + (e.debit || 0), 0);
  const totalCredits = entries.reduce((sum, e) => sum + (e.credit || 0), 0);
  if (totalDebits !== totalCredits) {
    throw new Error('Transaction not balanced: debits must equal credits');
  }
  const transaction = {
    id: nextTransactionId++,
    date,
    description,
    entries: entries.map(e => ({ ...e })),
  };
  transactions.push(transaction);
  return transaction;
}

// --- General Ledger ---
// Returns all entries for an account, with running balance
function getLedger(accountId, { fromDate, toDate } = {}) {
  let balance = 0;
  const ledger = [];
  transactions.forEach(tx => {
    if ((fromDate && tx.date < fromDate) || (toDate && tx.date > toDate)) return;
    tx.entries.forEach(e => {
      if (e.accountId === accountId) {
        balance += (e.debit || 0) - (e.credit || 0);
        ledger.push({
          date: tx.date,
          description: tx.description,
          debit: e.debit || 0,
          credit: e.credit || 0,
          balance,
        });
      }
    });
  });
  return ledger;
}

// --- Manual Journal Entry Example ---
// addTransaction({
//   date: '2026-03-23',
//   description: 'Initial capital',
//   entries: [
//     { accountId: 1, debit: 10000 }, // Cash
//     { accountId: 6, credit: 10000 }, // Equity
//   ],
// });

// Export for use in modules
window.accountingEngine = {
  accounts,
  transactions,
  addTransaction,
  getLedger,
};
