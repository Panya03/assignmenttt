
let customerCounter = 4;

// form submission
document.addEventListener('DOMContentLoaded', function() {
    const customerForm = document.getElementById('customerForm');
    if (customerForm) {
        customerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewCustomer();
        });
    }
});

// Function to add new customer
function addNewCustomer() {
    const name = document.getElementById('customerName').value;
    const email = document.getElementById('customerEmail').value;
    const contact = document.getElementById('customerContact').value;
    const accountType = document.getElementById('accountType').value;
    
    if (!name || !email || !contact || !accountType) {
        alert('Please fill in all fields');
        return;
    }
    
    // Create customer ID
    const customerId = 'SC' + String(customerCounter).padStart(3, '0');
    customerCounter++;
    
    // Get initials for avatar
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    
    // Create new row
    // Get the template and clone it
    const template = document.getElementById('customerrow');
    const newRow = template.content.cloneNode(true);
    
    // Fill in the customer data
    newRow.querySelector('.customer-initials').textContent = initials;
    newRow.querySelector('.customer-name').textContent = name;
    newRow.querySelector('.customer-id').textContent = customerId;
    newRow.querySelector('.customer-email').textContent = email;
    newRow.querySelector('.customer-contact').textContent = contact;
    newRow.querySelector('.customer-account-type').textContent = accountType;
    
    // Add event listeners to buttons
    const editBtn = newRow.querySelector('.edit-btn');
    const deleteBtn = newRow.querySelector('.delete-btn');
    
    editBtn.addEventListener('click', () => editCustomer(customerId));
    deleteBtn.addEventListener('click', () => deleteCustomer(customerId));
    
    // Add to table
    const tableBody = document.getElementById('customerbody');
    tableBody.appendChild(newRow);
    
    // Clear form
    document.getElementById('customerForm').reset();
    
    // Show success message
    alert('Customer added successfully!');
}

// Function to edit customer
function editCustomer(customerId) {
    alert('Edit customer: ' + customerId);
}

// Function to delete customer
function deleteCustomer(customerId) {
    if (confirm('Are you sure you want to delete this customer?')) {
        // Find and remove the row
        const rows = document.querySelectorAll('#customerbody tr');
        rows.forEach(row => {
            const idElement = row.querySelector('small');
            if (idElement && idElement.textContent.includes(customerId)) {
                row.remove();
            }
        });
        alert('Customer deleted successfully!');
    }
}

// Function to export data
function exportData() {
    alert('Exporting customer data...');
}

// Function to refresh table
function refreshTable() {
    alert('Refreshing customer data...');
} 