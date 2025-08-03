let customerCounter = 4;
const colors = [
    'linear-gradient(135deg, #28a745, #20c997)',
    'linear-gradient(135deg, #ffc107, #fd7e14)',
    'linear-gradient(135deg, #6f42c1, #e83e8c)',
    'linear-gradient(135deg, #17a2b8, #20c997)',
    'linear-gradient(135deg, #dc3545, #fd7e14)'
];

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('customerForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewCustomer();
        });
    }
});

function addNewCustomer() {
    const name = document.getElementById('customerName').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const contact = document.getElementById('customerContact').value.trim();
    const accountType = document.getElementById('accountType').value;
    
    if (!name || !email || !contact || !accountType) {
        showAlert('Please fill in all fields', 'warning');
        return;
    }
    
    const customerId = 'SC' + String(customerCounter).padStart(3, '0');
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newRow = document.createElement('tr');
    newRow.className = 'fade-in';
    newRow.innerHTML = `
        <td class="p-3">
            <div class="d-flex align-items-center">
                <div class="avatar me-3" style="background: ${randomColor};">${initials}</div>
                <div>
                    <div class="fw-semibold">${name}</div>
                    <small class="text-muted">ID: ${customerId}</small>
                </div>
            </div>
        </td>
        <td class="p-3">${email}</td>
        <td class="p-3">${contact}</td>
        <td class="p-3"><span class="badge bg-info">${accountType}</span></td>
        <td class="p-3">
            <button class="btn btn-outline-primary btn-sm me-1" onclick="editCustomer('${customerId}')">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-outline-danger btn-sm" onclick="deleteCustomer('${customerId}')">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    
    document.getElementById('customerTable').appendChild(newRow);
    document.getElementById('customerForm').reset();
    customerCounter++;
    
    showAlert('Customer added successfully!', 'success');
}

function editCustomer(customerId) {
    const row = findCustomerRow(customerId);
    if (row) {
        const name = row.querySelector('.fw-semibold').textContent;
        const email = row.cells[1].textContent;
        const contact = row.cells[2].textContent;
        
        const newName = prompt('Edit Name:', name);
        const newEmail = prompt('Edit Email:', email);
        const newContact = prompt('Edit Contact:', contact);
        
        if (newName && newEmail && newContact) {
            row.querySelector('.fw-semibold').textContent = newName;
            row.cells[1].textContent = newEmail;
            row.cells[2].textContent = newContact;
            
            const initials = newName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
            row.querySelector('.avatar').textContent = initials;
            
            showAlert('Customer updated successfully!', 'success');
        }
    }
}

function deleteCustomer(customerId) {
    if (confirm('Are you sure you want to delete this customer?')) {
        const row = findCustomerRow(customerId);
        if (row) {
            row.style.transition = 'all 0.3s ease';
            row.style.opacity = '0';
            row.style.transform = 'translateX(-100%)';
            
            setTimeout(() => {
                row.remove();
                showAlert('Customer deleted successfully!', 'success');
            }, 300);
        }
    }
}

function findCustomerRow(customerId) {
    const rows = document.querySelectorAll('#customerTable tr');
    return Array.from(rows).find(row => {
        const idElement = row.querySelector('small');
        return idElement && idElement.textContent.includes(customerId);
    });
}

function exportData() {
    const customers = [];
    const rows = document.querySelectorAll('#customerTable tr');
    
    rows.forEach(row => {
        if (row.cells.length > 1) {
            customers.push({
                name: row.querySelector('.fw-semibold').textContent,
                email: row.cells[1].textContent,
                contact: row.cells[2].textContent,
                accountType: row.querySelector('.badge').textContent,
                id: row.querySelector('small').textContent.replace('ID: ', '')
            });
        }
    });
    
    console.log('Customer Data:', customers);
    showAlert(`Exported ${customers.length} customers to console!`, 'info');
}

function refreshTable() {
    const tableBody = document.getElementById('customerTable');
    const rows = tableBody.querySelectorAll('tr');
    
    rows.forEach((row, index) => {
        setTimeout(() => {
            row.style.animation = 'none';
            row.offsetHeight; // Trigger reflow
            row.style.animation = 'fadeIn 0.5s ease-in';
        }, index * 100);
    });
    
    showAlert('Table refreshed!', 'info');
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 1050; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 3000);
}