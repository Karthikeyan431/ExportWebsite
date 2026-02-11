/**
 * TURMERIC EXPORT PLATFORM - Admin Panel JavaScript
 */

let currentSection = 'dashboard';

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    initAdminPanel();
});

function initAdminPanel() {
    initAdminData();
    showSection('dashboard');
    renderDashboard();
}

function showSection(section) {
    currentSection = section;
    
    // Update nav active state
    document.querySelectorAll('.admin-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-section="${section}"]`)?.classList.add('active');
    
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(sec => {
        sec.style.display = 'none';
    });
    
    // Show selected section
    const targetSection = document.getElementById(`section-${section}`);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
    
    // Render section content
    switch(section) {
        case 'dashboard': renderDashboard(); break;
        case 'company': renderCompanySettings(); break;
        case 'batches': renderBatchManagement(); break;
        case 'products': renderProductManagement(); break;
        case 'documents': renderDocumentManagement(); break;
        case 'quotes': renderQuotesManagement(); break;
    }
}

function renderDashboard() {
    const data = getData();
    
    // Update stats
    document.getElementById('stat-batches').textContent = data.batches.length;
    document.getElementById('stat-products').textContent = data.products.filter(p => !p.coming_soon).length;
    document.getElementById('stat-quotes').textContent = ADMIN_DATA.quotes.length;
    document.getElementById('stat-documents').textContent = data.certificates.length;
    
    // Render recent quotes
    const recentQuotesEl = document.getElementById('recent-quotes');
    if (recentQuotesEl) {
        const recentQuotes = ADMIN_DATA.quotes.slice(-5).reverse();
        if (recentQuotes.length > 0) {
            recentQuotesEl.innerHTML = recentQuotes.map(quote => `
                <div class="quote-item">
                    <span class="quote-id">${quote.id}</span>
                    <span class="quote-product">${quote.product}</span>
                    <span class="quote-destination">${quote.destination}</span>
                    <span class="quote-status status-${quote.status}">${quote.status}</span>
                </div>
            `).join('');
        } else {
            recentQuotesEl.innerHTML = '<p class="empty-message">No quotes yet. Demo mode - submit a quote via the Request Quote page.</p>';
        }
    }
}

// Company Settings
function renderCompanySettings() {
    const data = getData();
    const form = document.getElementById('company-settings-form');
    
    if (form) {
        form.innerHTML = `
            <div class="form-group">
                <label>Company Name</label>
                <input type="text" id="company-name-input" value="${data.company.name}">
            </div>
            <div class="form-group">
                <label>Tagline</label>
                <input type="text" id="company-tagline-input" value="${data.company.tagline}">
            </div>
            <div class="form-group">
                <label>Subtitle / Description</label>
                <input type="text" id="company-subtitle-input" value="${data.company.subtitle}">
            </div>
            <div class="form-group">
                <label>Logo Text</label>
                <input type="text" id="company-logo-text-input" value="${data.company.logo_text}">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="company-email-input" value="${data.company.email}">
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="text" id="company-phone-input" value="${data.company.phone}">
            </div>
            <div class="form-group">
                <label>Address</label>
                <textarea id="company-address-input">${data.company.address}</textarea>
            </div>
            <div class="form-group">
                <label>WhatsApp</label>
                <input type="text" id="company-whatsapp-input" value="${data.company.whatsapp}">
            </div>
            <div class="form-group">
                <label>IEC Number</label>
                <input type="text" id="company-iec-input" value="${data.company.iec}">
            </div>
            <div class="form-group">
                <label>FSSAI Number</label>
                <input type="text" id="company-fssai-input" value="${data.company.fssai}">
            </div>
            <div class="form-group">
                <label>APEDA Number</label>
                <input type="text" id="company-apeda-input" value="${data.company.apeda}">
            </div>
            <button class="btn btn-primary" onclick="saveCompanySettings()">Save Changes</button>
        `;
    }
}

function saveCompanySettings() {
    ADMIN_DATA.company.name = document.getElementById('company-name-input').value;
    ADMIN_DATA.company.tagline = document.getElementById('company-tagline-input').value;
    ADMIN_DATA.company.subtitle = document.getElementById('company-subtitle-input').value;
    ADMIN_DATA.company.logo_text = document.getElementById('company-logo-text-input').value;
    ADMIN_DATA.company.email = document.getElementById('company-email-input').value;
    ADMIN_DATA.company.phone = document.getElementById('company-phone-input').value;
    ADMIN_DATA.company.address = document.getElementById('company-address-input').value;
    ADMIN_DATA.company.whatsapp = document.getElementById('company-whatsapp-input').value;
    ADMIN_DATA.company.iec = document.getElementById('company-iec-input').value;
    ADMIN_DATA.company.fssai = document.getElementById('company-fssai-input').value;
    ADMIN_DATA.company.apeda = document.getElementById('company-apeda-input').value;
    
    saveAdminData();
    alert('Company settings saved successfully!');
}

// Batch Management
function renderBatchManagement() {
    const data = getData();
    const batchesList = document.getElementById('batches-list-admin');
    
    if (batchesList) {
        batchesList.innerHTML = data.batches.map(batch => `
            <div class="batch-manage-item">
                <div class="batch-manage-info">
                    <h4>${batch.id}</h4>
                    <p>${batch.name}</p>
                    <span class="status-badge status-${batch.status.toLowerCase().replace(' ', '-')}">${batch.status}</span>
                </div>
                <div class="batch-manage-actions">
                    <button class="btn btn-secondary" onclick="editBatch('${batch.id}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteBatch('${batch.id}')">Delete</button>
                </div>
            </div>
        `).join('');
    }
}

function showAddBatchForm() {
    const modal = document.getElementById('batch-form-modal');
    if (modal) {
        modal.style.display = 'block';
        document.getElementById('batch-form').innerHTML = `
            <h3>Add New Batch</h3>
            <div class="form-group">
                <label>Batch ID</label>
                <input type="text" id="batch-id-new" placeholder="BT-2024-XXX">
            </div>
            <div class="form-group">
                <label>Name</label>
                <input type="text" id="batch-name-new" placeholder="Product name">
            </div>
            <div class="form-group">
                <label>Farm Location</label>
                <input type="text" id="batch-location-new" placeholder="Region, State, Country">
            </div>
            <div class="form-group">
                <label>Origin</label>
                <input type="text" id="batch-origin-new" placeholder="Region name">
            </div>
            <div class="form-group">
                <label>Harvest Date</label>
                <input type="date" id="batch-harvest-new">
            </div>
            <div class="form-group">
                <label>Processing Method</label>
                <input type="text" id="batch-processing-new" placeholder="e.g., Sun-Dried">
            </div>
            <div class="form-group">
                <label>Curcumin %</label>
                <input type="text" id="batch-curcumin-new" placeholder="e.g., 5.2%">
            </div>
            <div class="form-group">
                <label>Moisture %</label>
                <input type="text" id="batch-moisture-new" placeholder="e.g., 8.5%">
            </div>
            <div class="form-group">
                <label>Grade</label>
                <input type="text" id="batch-grade-new" placeholder="e.g., Premium">
            </div>
            <div class="form-group">
                <label>Status</label>
                <select id="batch-status-new">
                    <option value="Available">Available</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Sold">Sold</option>
                </select>
            </div>
            <div class="form-actions">
                <button class="btn btn-primary" onclick="saveNewBatch()">Add Batch</button>
                <button class="btn btn-secondary" onclick="closeBatchForm()">Cancel</button>
            </div>
        `;
    }
}

function closeBatchForm() {
    const modal = document.getElementById('batch-form-modal');
    if (modal) modal.style.display = 'none';
}

function saveNewBatch() {
    const newBatch = {
        id: document.getElementById('batch-id-new').value,
        name: document.getElementById('batch-name-new').value,
        farm_location: document.getElementById('batch-location-new').value,
        origin: document.getElementById('batch-origin-new').value,
        harvest_date: document.getElementById('batch-harvest-new').value,
        processing_method: document.getElementById('batch-processing-new').value,
        curcumin: document.getElementById('batch-curcumin-new').value,
        moisture: document.getElementById('batch-moisture-new').value,
        grade: document.getElementById('batch-grade-new').value,
        status: document.getElementById('batch-status-new').value,
        qr_data: document.getElementById('batch-id-new').value,
        lab_report: null
    };
    
    ADMIN_DATA.batches.push(newBatch);
    saveAdminData();
    closeBatchForm();
    renderBatchManagement();
    alert('Batch added successfully!');
}

function editBatch(batchId) {
    const batch = ADMIN_DATA.batches.find(b => b.id === batchId);
    if (!batch) return;
    
    const modal = document.getElementById('batch-form-modal');
    if (modal) {
        modal.style.display = 'block';
        document.getElementById('batch-form').innerHTML = `
            <h3>Edit Batch: ${batchId}</h3>
            <div class="form-group">
                <label>Name</label>
                <input type="text" id="batch-name-edit" value="${batch.name}">
            </div>
            <div class="form-group">
                <label>Farm Location</label>
                <input type="text" id="batch-location-edit" value="${batch.farm_location}">
            </div>
            <div class="form-group">
                <label>Origin</label>
                <input type="text" id="batch-origin-edit" value="${batch.origin}">
            </div>
            <div class="form-group">
                <label>Harvest Date</label>
                <input type="date" id="batch-harvest-edit" value="${batch.harvest_date}">
            </div>
            <div class="form-group">
                <label>Processing Method</label>
                <input type="text" id="batch-processing-edit" value="${batch.processing_method}">
            </div>
            <div class="form-group">
                <label>Curcumin %</label>
                <input type="text" id="batch-curcumin-edit" value="${batch.curcumin}">
            </div>
            <div class="form-group">
                <label>Moisture %</label>
                <input type="text" id="batch-moisture-edit" value="${batch.moisture}">
            </div>
            <div class="form-group">
                <label>Grade</label>
                <input type="text" id="batch-grade-edit" value="${batch.grade}">
            </div>
            <div class="form-group">
                <label>Status</label>
                <select id="batch-status-edit">
                    <option value="Available" ${batch.status === 'Available' ? 'selected' : ''}>Available</option>
                    <option value="In Transit" ${batch.status === 'In Transit' ? 'selected' : ''}>In Transit</option>
                    <option value="Sold" ${batch.status === 'Sold' ? 'selected' : ''}>Sold</option>
                </select>
            </div>
            <div class="form-actions">
                <button class="btn btn-primary" onclick="updateBatch('${batchId}')">Save Changes</button>
                <button class="btn btn-secondary" onclick="closeBatchForm()">Cancel</button>
            </div>
        `;
    }
}

function updateBatch(batchId) {
    const batch = ADMIN_DATA.batches.find(b => b.id === batchId);
    if (!batch) return;
    
    batch.name = document.getElementById('batch-name-edit').value;
    batch.farm_location = document.getElementById('batch-location-edit').value;
    batch.origin = document.getElementById('batch-origin-edit').value;
    batch.harvest_date = document.getElementById('batch-harvest-edit').value;
    batch.processing_method = document.getElementById('batch-processing-edit').value;
    batch.curcumin = document.getElementById('batch-curcumin-edit').value;
    batch.moisture = document.getElementById('batch-moisture-edit').value;
    batch.grade = document.getElementById('batch-grade-edit').value;
    batch.status = document.getElementById('batch-status-edit').value;
    
    saveAdminData();
    closeBatchForm();
    renderBatchManagement();
    alert('Batch updated successfully!');
}

function deleteBatch(batchId) {
    if (confirm(`Are you sure you want to delete batch ${batchId}?`)) {
        ADMIN_DATA.batches = ADMIN_DATA.batches.filter(b => b.id !== batchId);
        saveAdminData();
        renderBatchManagement();
        alert('Batch deleted successfully!');
    }
}

// Product Management
function renderProductManagement() {
    const data = getData();
    const productsList = document.getElementById('products-list-admin');
    
    if (productsList) {
        productsList.innerHTML = data.products.map(product => `
            <div class="product-manage-item">
                <div class="product-manage-info">
                    <h4>${product.name}</h4>
                    <p>${product.description.substring(0, 80)}...</p>
                    ${product.coming_soon ? '<span class="coming-soon-badge">Coming Soon</span>' : ''}
                </div>
                <div class="product-manage-actions">
                    <button class="btn btn-secondary" onclick="editProduct('${product.id}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteProduct('${product.id}')">Delete</button>
                </div>
            </div>
        `).join('');
    }
}

function showAddProductForm() {
    const modal = document.getElementById('product-form-modal');
    if (modal) {
        modal.style.display = 'block';
        document.getElementById('product-form').innerHTML = `
            <h3>Add New Product</h3>
            <div class="form-group">
                <label>Product ID</label>
                <input type="text" id="product-id-new" placeholder="e.g., raw-fingers">
            </div>
            <div class="form-group">
                <label>Name</label>
                <input type="text" id="product-name-new" placeholder="Product name">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea id="product-desc-new" placeholder="Product description"></textarea>
            </div>
            <div class="form-group">
                <label>Origin</label>
                <input type="text" id="product-origin-new" placeholder="Origin region">
            </div>
            <div class="form-group">
                <label>Curcumin Range</label>
                <input type="text" id="product-curcumin-new" placeholder="e.g., 4.0% - 5.5%">
            </div>
            <div class="form-group">
                <label>Moisture</label>
                <input type="text" id="product-moisture-new" placeholder="e.g., 8-12%">
            </div>
            <div class="form-group">
                <label>MOQ</label>
                <input type="text" id="product-moq-new" placeholder="e.g., 500 kg">
            </div>
            <div class="form-group">
                <label>Coming Soon</label>
                <select id="product-coming-new">
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                </select>
            </div>
            <div class="form-actions">
                <button class="btn btn-primary" onclick="saveNewProduct()">Add Product</button>
                <button class="btn btn-secondary" onclick="closeProductForm()">Cancel</button>
            </div>
        `;
    }
}

function closeProductForm() {
    const modal = document.getElementById('product-form-modal');
    if (modal) modal.style.display = 'none';
}

function saveNewProduct() {
    const newProduct = {
        id: document.getElementById('product-id-new').value,
        name: document.getElementById('product-name-new').value,
        description: document.getElementById('product-desc-new').value,
        origin: document.getElementById('product-origin-new').value,
        curcumin_range: document.getElementById('product-curcumin-new').value,
        moisture: document.getElementById('product-moisture-new').value,
        moq: document.getElementById('product-moq-new').value,
        coming_soon: document.getElementById('product-coming-new').value === 'true',
        grades: ['Standard'],
        packaging: ['25kg bags'],
        uses: ['General'],
        image: null
    };
    
    ADMIN_DATA.products.push(newProduct);
    saveAdminData();
    closeProductForm();
    renderProductManagement();
    alert('Product added successfully!');
}

function editProduct(productId) {
    const product = ADMIN_DATA.products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('product-form-modal');
    if (modal) {
        modal.style.display = 'block';
        document.getElementById('product-form').innerHTML = `
            <h3>Edit Product: ${productId}</h3>
            <div class="form-group">
                <label>Name</label>
                <input type="text" id="product-name-edit" value="${product.name}">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea id="product-desc-edit">${product.description}</textarea>
            </div>
            <div class="form-group">
                <label>Origin</label>
                <input type="text" id="product-origin-edit" value="${product.origin}">
            </div>
            <div class="form-group">
                <label>Curcumin Range</label>
                <input type="text" id="product-curcumin-edit" value="${product.curcumin_range}">
            </div>
            <div class="form-group">
                <label>Moisture</label>
                <input type="text" id="product-moisture-edit" value="${product.moisture}">
            </div>
            <div class="form-group">
                <label>MOQ</label>
                <input type="text" id="product-moq-edit" value="${product.moq}">
            </div>
            <div class="form-group">
                <label>Coming Soon</label>
                <select id="product-coming-edit">
                    <option value="false" ${!product.coming_soon ? 'selected' : ''}>No</option>
                    <option value="true" ${product.coming_soon ? 'selected' : ''}>Yes</option>
                </select>
            </div>
            <div class="form-actions">
                <button class="btn btn-primary" onclick="updateProduct('${productId}')">Save Changes</button>
                <button class="btn btn-secondary" onclick="closeProductForm()">Cancel</button>
            </div>
        `;
    }
}

function updateProduct(productId) {
    const product = ADMIN_DATA.products.find(p => p.id === productId);
    if (!product) return;
    
    product.name = document.getElementById('product-name-edit').value;
    product.description = document.getElementById('product-desc-edit').value;
    product.origin = document.getElementById('product-origin-edit').value;
    product.curcumin_range = document.getElementById('product-curcumin-edit').value;
    product.moisture = document.getElementById('product-moisture-edit').value;
    product.moq = document.getElementById('product-moq-edit').value;
    product.coming_soon = document.getElementById('product-coming-edit').value === 'true';
    
    saveAdminData();
    closeProductForm();
    renderProductManagement();
    alert('Product updated successfully!');
}

function deleteProduct(productId) {
    if (confirm(`Are you sure you want to delete product ${productId}?`)) {
        ADMIN_DATA.products = ADMIN_DATA.products.filter(p => p.id !== productId);
        saveAdminData();
        renderProductManagement();
        alert('Product deleted successfully!');
    }
}

// Document Management
function renderDocumentManagement() {
    const data = getData();
    const documentsList = document.getElementById('documents-list-admin');
    
    if (documentsList) {
        documentsList.innerHTML = data.certificates.map(cert => `
            <div class="document-manage-item">
                <div class="document-manage-info">
                    <h4>${cert.name}</h4>
                    <p>${cert.number}</p>
                    <span class="valid-until">Valid until: ${cert.valid_until}</span>
                </div>
                <div class="document-manage-actions">
                    <button class="btn btn-secondary" onclick="editDocument('${cert.id}')">Edit</button>
                    <button class="btn btn-primary" onclick="uploadDocument('${cert.id}')">Upload PDF</button>
                </div>
            </div>
        `).join('');
    }
}

function editDocument(docId) {
    const doc = ADMIN_DATA.certificates.find(d => d.id === docId);
    if (!doc) return;
    
    const modal = document.getElementById('document-form-modal');
    if (modal) {
        modal.style.display = 'block';
        document.getElementById('document-form').innerHTML = `
            <h3>Edit Document: ${doc.name}</h3>
            <div class="form-group">
                <label>Certificate Number</label>
                <input type="text" id="doc-number-edit" value="${doc.number}">
            </div>
            <div class="form-group">
                <label>Issuing Authority</label>
                <input type="text" id="doc-authority-edit" value="${doc.issuing_authority}">
            </div>
            <div class="form-group">
                <label>Valid Until</label>
                <input type="date" id="doc-valid-edit" value="${doc.valid_until}">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea id="doc-desc-edit">${doc.description}</textarea>
            </div>
            <div class="form-actions">
                <button class="btn btn-primary" onclick="updateDocument('${docId}')">Save Changes</button>
                <button class="btn btn-secondary" onclick="closeDocumentForm()">Cancel</button>
            </div>
        `;
    }
}

function closeDocumentForm() {
    const modal = document.getElementById('document-form-modal');
    if (modal) modal.style.display = 'none';
}

function updateDocument(docId) {
    const doc = ADMIN_DATA.certificates.find(d => d.id === docId);
    if (!doc) return;
    
    doc.number = document.getElementById('doc-number-edit').value;
    doc.issuing_authority = document.getElementById('doc-authority-edit').value;
    doc.valid_until = document.getElementById('doc-valid-edit').value;
    doc.description = document.getElementById('doc-desc-edit').value;
    
    saveAdminData();
    closeDocumentForm();
    renderDocumentManagement();
    alert('Document updated successfully!');
}

function uploadDocument(docId) {
    alert('Demo Mode: In production, this would open a file upload dialog to upload PDF documents.\n\nFor demo purposes, documents are shown as placeholders.');
}

// Quotes Management
function renderQuotesManagement() {
    const quotesList = document.getElementById('quotes-list-admin');
    
    if (quotesList) {
        if (ADMIN_DATA.quotes.length > 0) {
            quotesList.innerHTML = ADMIN_DATA.quotes.map(quote => `
                <div class="quote-manage-item">
                    <div class="quote-manage-info">
                        <h4>${quote.id}</h4>
                        <p>Product: ${quote.product} | Qty: ${quote.quantity}</p>
                        <p>Buyer: ${quote.buyer_name} (${quote.buyer_email})</p>
                        <p>Destination: ${quote.destination}</p>
                        <span class="quote-date">Submitted: ${new Date(quote.date).toLocaleDateString()}</span>
                    </div>
                    <div class="quote-manage-status">
                        <span class="status-badge status-${quote.status}">${quote.status}</span>
                        ${quote.status === 'pending' ? `
                            <button class="btn btn-primary" onclick="markQuoteResponded('${quote.id}')">Mark Responded</button>
                        ` : ''}
                    </div>
                </div>
            `).join('');
        } else {
            quotesList.innerHTML = `
                <div class="empty-state">
                    <h3>No Quotes Yet</h3>
                    <p>When buyers submit quote requests, they will appear here.</p>
                    <p><em>Demo Mode: Submit a quote via the Request Quote page to test.</em></p>
                </div>
            `;
        }
    }
}

function markQuoteResponded(quoteId) {
    const quote = ADMIN_DATA.quotes.find(q => q.id === quoteId);
    if (quote) {
        quote.status = 'responded';
        saveAdminData();
        renderQuotesManagement();
        alert(`Quote ${quoteId} marked as responded.`);
    }
}

// Demo data management
function resetDemoData() {
    if (confirm('Are you sure you want to reset all data to demo defaults? This will lose any custom data.')) {
        localStorage.removeItem('turmeric_admin_data');
        ADMIN_DATA.company = { ...DEMO_DATA.company };
        ADMIN_DATA.batches = [...DEMO_DATA.batches];
        ADMIN_DATA.products = [...DEMO_DATA.products];
        ADMIN_DATA.lab_reports = [...DEMO_DATA.lab_reports];
        ADMIN_DATA.certificates = [...DEMO_DATA.certificates];
        ADMIN_DATA.quotes = [];
        
        // Refresh current section
        showSection(currentSection);
        alert('Demo data restored!');
    }
}

// Make functions globally available
window.showSection = showSection;
window.saveCompanySettings = saveCompanySettings;
window.showAddBatchForm = showAddBatchForm;
window.closeBatchForm = closeBatchForm;
window.saveNewBatch = saveNewBatch;
window.editBatch = editBatch;
window.updateBatch = updateBatch;
window.deleteBatch = deleteBatch;
window.showAddProductForm = showAddProductForm;
window.closeProductForm = closeProductForm;
window.saveNewProduct = saveNewProduct;
window.editProduct = editProduct;
window.updateProduct = updateProduct;
window.deleteProduct = deleteProduct;
window.renderDocumentManagement = renderDocumentManagement;
window.editDocument = editDocument;
window.closeDocumentForm = closeDocumentForm;
window.updateDocument = updateDocument;
window.uploadDocument = uploadDocument;
window.renderQuotesManagement = renderQuotesManagement;
window.markQuoteResponded = markQuoteResponded;
window.resetDemoData = resetDemoData;
