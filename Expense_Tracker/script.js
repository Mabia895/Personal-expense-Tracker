// Get references to DOM elements
const form = document.getElementById('expense-form');
const tableBody = document.querySelector('#expense-table tbody');
const filterCategory = document.getElementById('filter-category');

// Handle form submission
form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Get input values
  const name = document.getElementById('expense-name').value.trim();
  const amount = parseFloat(document.getElementById('expense-amount').value);
  const date = document.getElementById('expense-date').value;
  const category = document.getElementById('expense-category').value;

  // Validate input
  if (!name || isNaN(amount) || !date || !category) {
    alert("Please fill out all fields correctly.");
    return;
  }

  // Create expense object
  const expense = { name, amount, date, category };

  // Save to LocalStorage
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // Reset form and refresh table
  form.reset();
  displayExpenses();
});

// Handle filter change
filterCategory.addEventListener('change', displayExpenses);

// Display expenses in table
function displayExpenses() {
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  const selectedCategory = filterCategory.value;
  tableBody.innerHTML = '';

  expenses.forEach((exp, index) => {
    if (selectedCategory === 'All' || exp.category === selectedCategory) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${exp.name}</td>
        <td>${exp.amount}</td>
        <td>${exp.date}</td>
        <td>${exp.category}</td>
        <td><button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button></td>
      `;
      tableBody.appendChild(row);
    }
  });
}

// Delete expense by index
function deleteExpense(index) {
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  displayExpenses();
}

// Load expenses on page load
window.onload = displayExpenses;