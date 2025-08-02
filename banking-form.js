// Banking form functionality
let customerCounter = 4;

// Handle form submission
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
    const newRow = `
        <tr>
            <td style="padding: 15px; vertical-align: middle;">
                <div class="d-flex align-items-center">
                    <div class="avatar me-3" style="background: linear-gradient(135deg, #17a2b8, #20c997);">
                        ${initials}
                    </div>
                    <div>
                        <div class="fw-semibold">${name}</div>
                        <small class="text-muted">Customer ID: ${customerId}</small>
                    </div>
                </div>
            </td>
            <td style="padding: 15px; vertical-align: middle;">${email}</td>
            <td style="padding: 15px; vertical-align: middle;">${contact}</td>
            <td style="padding: 15px; vertical-align: middle;">
                <span class="badge bg-info">${accountType}</span>
            </td>
            <td style="padding: 15px; vertical-align: middle;">
                <div class="btn-group" role="group">
                    <button class="btn btn-outline-primary btn-sm" onclick="editCustomer('${customerId}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-outline-danger btn-sm" onclick="deleteCustomer('${customerId}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
    
    // Add to table
    const tableBody = document.getElementById('customerTableBody');
    tableBody.insertAdjacentHTML('beforeend', newRow);
    
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
        const rows = document.querySelectorAll('#customerTableBody tr');
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