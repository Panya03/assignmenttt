// Simple Customer Management System - Under 100 Lines

let customers = [];
let counter = 1;
const colors = ['#28a745', '#007bff', '#6f42c1', '#dc3545', '#ffc107'];

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('customerForm');
    if (form) {
        form.addEventListener('submit', addCustomer);
        console.log('Form event listener added successfully');
    } else {
        console.error('Form not found!');
    }
});

// Add new customer
function addCustomer(e) {
    e.preventDefault();
    console.log('Form submitted!');
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const type = document.getElementById('type').value;
    
    console.log('Form data:', { name, email, phone, type });
    
    // Clear previous errors
    clearErrors();
    
    // Validate all fields
    if (validateForm(name, email, phone, type)) {
        // Create customer object
        const customer = {
            id: 'C' + String(counter).padStart(3, '0'),
            name, email, phone, type,
            color: colors[Math.floor(Math.random() * colors.length)]
        };
        
        console.log('Adding customer:', customer);
        
        customers.push(customer);
        addToTable(customer);
        counter++;
        
        // Reset form and show success
        document.getElementById('customerForm').reset();
        showMessage('Customer added successfully!', 'success');
    } else {
        console.log('Validation failed');
    }
}

// Validate form data
function validateForm(name, email, phone, type) {
    let valid = true;
    
    // Name validation
    if (!name || name.length < 2) {
        showError('nameError', 'Name must be at least 2 characters');
        valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        showError('nameError', 'Name can only contain letters and spaces');
        valid = false;
    } else clearError('nameError');
    
    // Email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('emailError', 'Please enter a valid email');
        valid = false;
    } else if (customers.some(c => c.email === email)) {
        showError('emailError', 'Email already exists');
        valid = false;
    } else clearError('emailError');
    
    // Phone validation
    const phoneDigits = phone.replace(/\D/g, '');
    if (!phone || phoneDigits.length < 10) {
        showError('phoneError', 'Phone must be at least 10 digits');
        valid = false;
    } else clearError('phoneError');
    
    // Type validation
    if (!type) {
        showError('typeError', 'Please select account type');
        valid = false;
    } else clearError('typeError');
    
    return valid;
}

// Add customer to table
function addToTable(customer) {
    const table = document.getElementById('customerTable');
    const row = document.createElement('tr');
    row.className = 'fade-in';
    
    const initials = customer.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const badgeClass = customer.type.toLowerCase();
    
    // Create table cells
    row.innerHTML = `
        <td>
            <div class="customer-info">
                <div class="avatar" style="background: ${customer.color}">${initials}</div>
                <div>
                    <div class="customer-name">${customer.name}</div>
                    <div class="customer-id">ID: ${customer.id}</div>
                </div>
            </div>
        </td>
        <td>${customer.email}</td>
        <td>${customer.phone}</td>
        <td><span class="badge ${badgeClass}">${customer.type}</span></td>
        <td>
            <button class="btn-edit" onclick="editCustomer('${customer.id}')">Edit</button>
            <button class="btn-delete" onclick="deleteCustomer('${customer.id}')">Delete</button>
        </td>
    `;
    
    table.appendChild(row);
}

// Edit customer
function editCustomer(id) {
    const customer = customers.find(c => c.id === id);
    if (!customer) return;
    
    const newName = prompt('Enter new name:', customer.name);
    if (newName && newName.trim().length >= 2) {
        customer.name = newName.trim();
        updateTable();
        showMessage('Customer updated!', 'success');
    }
}

// Delete customer
function deleteCustomer(id) {
    if (confirm('Delete this customer?')) {
        customers = customers.filter(c => c.id !== id);
        updateTable();
        showMessage('Customer deleted!', 'success');
    }
}

// Update entire table
function updateTable() {
    const table = document.getElementById('customerTable');
    table.innerHTML = '';
    customers.forEach(customer => addToTable(customer));
}

// Error handling functions
function showError(id, message) {
    const errorElement = document.getElementById(id);
    const inputElement = document.getElementById(id.replace('Error', ''));
    errorElement.textContent = message;
    inputElement.classList.add('invalid');
}

function clearError(id) {
    const errorElement = document.getElementById(id);
    const inputElement = document.getElementById(id.replace('Error', ''));
    errorElement.textContent = '';
    inputElement.classList.remove('invalid');
}

function clearErrors() {
    ['nameError', 'emailError', 'phoneError', 'typeError'].forEach(clearError);
}

// Show success/error messages
function showMessage(text, type) {
    const container = document.getElementById('messages');
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    container.appendChild(message);
    setTimeout(() => message.classList.add('show'), 10);
    
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => message.remove(), 300);
    }, 3000);
}