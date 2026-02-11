/**
 * TURMERIC EXPORT PLATFORM - Main Application JavaScript
 */

// Initialize data and render pages
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    // Initialize admin data
    initAdminData();
    
    // Render current page
    renderCurrentPage();
    
    // Update header/footer with dynamic data
    updateHeader();
    updateFooter();
}

function getData() {
    initAdminData();
    return {
        company: ADMIN_DATA.company,
        batches: ADMIN_DATA.batches,
        products: ADMIN_DATA.products,
        lab_reports: ADMIN_DATA.lab_reports,
        certificates: ADMIN_DATA.certificates,
        knowledge_articles: ADMIN_DATA.knowledge_articles,
        quotes: ADMIN_DATA.quotes
    };
}

function updateHeader() {
    const data = getData();
    const companyNameEl = document.getElementById('company-name');
    const companyLogoTextEl = document.getElementById('company-logo-text');
    const taglineEl = document.getElementById('company-tagline');
    
    if (companyNameEl) {
        companyNameEl.textContent = data.company.name;
    }
    if (companyLogoTextEl) {
        companyLogoTextEl.textContent = '🌿 ' + data.company.logo_text;
    }
    if (taglineEl) {
        taglineEl.textContent = data.company.tagline;
    }
}

function updateFooter() {
    const data = getData();
    const footerCompanyEl = document.getElementById('footer-company');
    const footerEmailEl = document.getElementById('footer-email');
    const footerPhoneEl = document.getElementById('footer-phone');
    const footerCopyrightEl = document.getElementById('footer-copyright-name');
    
    if (footerCompanyEl) footerCompanyEl.textContent = data.company.name;
    if (footerEmailEl) footerEmailEl.textContent = data.company.email;
    if (footerPhoneEl) footerPhoneEl.textContent = data.company.phone;
    if (footerCopyrightEl) footerCopyrightEl.textContent = data.company.name;
}

function renderCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    
    // Render page-specific content
    if (page === 'index.html' || page === '') {
        renderHomePage();
    } else if (page === 'about.html') {
        renderAboutPage();
    } else if (page === 'products.html') {
        renderProductsPage();
    } else if (page === 'batch-traceability.html') {
        renderBatchTraceabilityPage();
    } else if (page === 'quality-reports.html') {
        renderQualityReportsPage();
    } else if (page === 'request-quote.html') {
        renderRequestQuotePage();
    } else if (page === 'knowledge-hub.html') {
        renderKnowledgeHubPage();
    } else if (page === 'documents.html') {
        renderDocumentsPage();
    } else if (page === 'contact.html') {
        renderContactPage();
    } else if (page === 'admin.html') {
        // Admin page has its own initialization
    }
}

// Home Page
function renderHomePage() {
    const data = getData();
    
    // Render features with enhanced UI
    renderFeatures();
    
    // Render featured batches
    const batchesContainer = document.getElementById('featured-batches');
    if (batchesContainer) {
        const featuredBatches = data.batches.slice(0, 3);
        batchesContainer.innerHTML = featuredBatches.map(batch => `
            <div class="batch-card">
                <div class="batch-header">
                    <span class="batch-id">📦 ${batch.id}</span>
                    <span class="status-badge status-${batch.status.toLowerCase().replace(' ', '-')}">${batch.status}</span>
                </div>
                <h3>${batch.name}</h3>
                <p class="batch-origin">📍 ${batch.farm_location}</p>
                <div class="batch-metrics">
                    <div class="metric">
                        <span class="label">Curcumin</span>
                        <span class="value">${batch.curcumin}</span>
                    </div>
                    <div class="metric">
                        <span class="label">Moisture</span>
                        <span class="value">${batch.moisture}</span>
                    </div>
                    <div class="metric">
                        <span class="label">Grade</span>
                        <span class="value">${batch.grade}</span>
                    </div>
                </div>
                <div style="display: flex; gap: 12px;">
                    <a href="batch-traceability.html?batch=${batch.id}" class="btn btn-primary btn-small" style="flex: 1;">🔍 View Details</a>
                    <a href="quality-reports.html?batch=${batch.id}" class="btn btn-secondary btn-small">🧪 Lab Report</a>
                </div>
            </div>
        `).join('');
    }
}

// Features Section - Enhanced
function renderFeatures() {
    const featuresContainer = document.getElementById('features-container');
    if (featuresContainer) {
        const features = [
            {
                icon: '🔍',
                title: 'Batch Traceability',
                description: 'Track your turmeric from farm to export with complete transparency and QR code verification.'
            },
            {
                icon: '🧪',
                title: 'Lab Tested Quality',
                description: 'Every batch verified for curcumin content, moisture levels, and safety parameters.'
            },
            {
                icon: '🌍',
                title: 'Export Ready',
                description: 'Compliant with international standards. IEC, FSSAI, and APEDA certified.'
            }
        ];
        featuresContainer.innerHTML = features.map(feature => `
            <div class="feature-card">
                <span class="feature-icon">${feature.icon}</span>
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
            </div>
        `).join('');
    }
}

// About Page
function renderAboutPage() {
    const data = getData();
    
    // Page content is static but company name is dynamic
    const companyNameEl = document.getElementById('about-company-name');
    if (companyNameEl) {
        companyNameEl.textContent = data.company.name;
    }
}

// Products Page
function renderProductsPage() {
    const data = getData();
    const productsContainer = document.getElementById('products-container');
    
    if (productsContainer) {
        productsContainer.innerHTML = data.products.map(product => `
            <div class="product-card ${product.coming_soon ? 'coming-soon' : ''}">
                ${product.coming_soon ? '<span class="coming-soon-badge">Coming Soon</span>' : ''}
                <div style="font-size: 3rem; margin-bottom: 16px;">
                    ${product.id === 'raw-fingers' ? '🌿' : product.id === 'polished-turmeric' ? '✨' : '🧡'}
                </div>
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-specs">
                    <div class="spec">
                        <span class="label">Origin</span>
                        <span class="value">${product.origin}</span>
                    </div>
                    <div class="spec">
                        <span class="label">Curcumin</span>
                        <span class="value">${product.curcumin_range}</span>
                    </div>
                    <div class="spec">
                        <span class="label">Moisture</span>
                        <span class="value">${product.moisture}</span>
                    </div>
                    <div class="spec">
                        <span class="label">MOQ</span>
                        <span class="value">${product.moq}</span>
                    </div>
                </div>
                <div class="product-grades">
                    <span class="grades-label">Available Grades:</span>
                    ${product.grades.map(grade => `<span class="grade-badge">${grade}</span>`).join('')}
                </div>
                <div class="product-packaging">
                    <span class="packaging-label">Packaging:</span>
                    <span style="font-size: 0.85rem; color: #666;">${product.packaging.join(', ')}</span>
                </div>
                ${!product.coming_soon ? '<a href="request-quote.html?product=' + product.id + '" class="btn btn-primary" style="width: 100%;">📋 Request Quote</a>' : ''}
            </div>
        `).join('');
    }
}

// Batch Traceability Page
function renderBatchTraceabilityPage() {
    const data = getData();
    const urlParams = new URLSearchParams(window.location.search);
    const selectedBatchId = urlParams.get('batch');
    
    const batchesListContainer = document.getElementById('batches-list');
    const batchDetailContainer = document.getElementById('batch-detail');
    
    // Render batches list
    if (batchesListContainer) {
        batchesListContainer.innerHTML = data.batches.map(batch => `
            <div class="batch-item ${selectedBatchId === batch.id ? 'selected' : ''}" onclick="showBatchDetail('${batch.id}')">
                <div class="batch-item-header">
                    <span class="batch-id">${batch.id}</span>
                    <span class="status-badge status-${batch.status.toLowerCase().replace(' ', '-')}">${batch.status}</span>
                </div>
                <h4>${batch.name}</h4>
                <p class="batch-location">📍 ${batch.farm_location}</p>
            </div>
        `).join('');
    }
    
    // Render batch detail if selected
    if (selectedBatchId && batchDetailContainer) {
        const batch = data.batches.find(b => b.id === selectedBatchId);
        if (batch) {
            renderBatchDetail(batch);
        }
    }
}

function showBatchDetail(batchId) {
    const batch = ADMIN_DATA.batches.find(b => b.id === batchId);
    if (batch) {
        renderBatchDetail(batch);
        // Update URL
        window.history.pushState({}, '', `?batch=${batchId}`);
    }
}

function renderBatchDetail(batch) {
    const container = document.getElementById('batch-detail');
    if (!container) return;
    
    // Generate QR code placeholder
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(batch.qr_data || batch.id)}`;
    
    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
            <div>
                <h2 style="font-size: 1.75rem; margin-bottom: 8px;">${batch.name}</h2>
                <span class="batch-id-large" style="font-size: 0.9rem; color: #D4A017; font-weight: 600;">📦 ${batch.id}</span>
            </div>
            <span class="status-badge status-${batch.status.toLowerCase().replace(' ', '-')}">${batch.status}</span>
        </div>
        
        <div class="demo-badge" style="margin-bottom: 24px;">
            📋 Demo Data - Replace via Admin Panel
        </div>
        
        <div class="batch-detail-grid">
            <div class="detail-section">
                <h3>🌱 Origin & Harvest</h3>
                <table class="detail-table">
                    <tr>
                        <td class="label">Farm Location</td>
                        <td class="value">${batch.farm_location}</td>
                    </tr>
                    <tr>
                        <td class="label">Origin Region</td>
                        <td class="value">${batch.origin}</td>
                    </tr>
                    <tr>
                        <td class="label">Harvest Date</td>
                        <td class="value">${batch.harvest_date}</td>
                    </tr>
                    <tr>
                        <td class="label">Processing Method</td>
                        <td class="value">${batch.processing_method}</td>
                    </tr>
                </table>
            </div>
            
            <div class="detail-section">
                <h3>📊 Quality Parameters</h3>
                <table class="detail-table">
                    <tr>
                        <td class="label">Curcumin Content</td>
                        <td class="value highlight">${batch.curcumin || batch.curumin}</td>
                    </tr>
                    <tr>
                        <td class="label">Moisture Content</td>
                        <td class="value highlight">${batch.moisture}</td>
                    </tr>
                    <tr>
                        <td class="label">Grade</td>
                        <td class="value">${batch.grade}</td>
                    </tr>
                    <tr>
                        <td class="label">Status</td>
                        <td class="value"><span class="status-badge status-${batch.status.toLowerCase().replace(' ', '-')}">${batch.status}</span></td>
                    </tr>
                </table>
            </div>
        </div>
        
        <div class="batch-actions">
            <div class="qr-section">
                <img src="${qrCodeUrl}" alt="QR Code" class="qr-code">
                <p>📱 Scan to verify batch</p>
            </div>
            <div class="action-buttons">
                <a href="quality-reports.html?batch=${batch.id}" class="btn btn-primary">🧪 View Lab Report</a>
                <a href="request-quote.html?batch=${batch.id}" class="btn btn-secondary">📋 Request Quote</a>
            </div>
        </div>
    `;
}

// Quality Reports Page
function renderQualityReportsPage() {
    const data = getData();
    const urlParams = new URLSearchParams(window.location.search);
    const selectedBatchId = urlParams.get('batch');
    
    const reportsContainer = document.getElementById('quality-reports-container');
    
    if (reportsContainer) {
        const filteredReports = selectedBatchId 
            ? data.lab_reports.filter(r => r.batch_id === selectedBatchId)
            : data.lab_reports;
        
        if (filteredReports.length > 0) {
            reportsContainer.innerHTML = filteredReports.map(report => `
                <div class="lab-report-card">
                    <div class="report-header">
                        <div>
                            <h3>🧪 Lab Report: ${report.batch_id}</h3>
                            <p style="font-size: 0.9rem; color: #888; margin-top: 4px;">${report.lab_name}</p>
                        </div>
                        <span class="demo-badge-small">📋 Demo Report</span>
                    </div>
                    
                    <div class="report-meta">
                        <span>📅 Report Date: ${report.report_date}</span>
                        <span>🏷️ Batch: ${report.batch_id}</span>
                    </div>
                    
                    <div class="report-section">
                        <h4>Quality Parameters</h4>
                        <div class="report-grid">
                            <div class="report-item">
                                <span class="label">Curcumin</span>
                                <span class="value">${report.curcumin}</span>
                            </div>
                            <div class="report-item">
                                <span class="label">Moisture</span>
                                <span class="value">${report.moisture}</span>
                            </div>
                            <div class="report-item">
                                <span class="label">Volatile Oil</span>
                                <span class="value">${report.volatile_oil}</span>
                            </div>
                            <div class="report-item">
                                <span class="label">Total Ash</span>
                                <span class="value">${report.ash}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="report-section">
                        <h4>Heavy Metals (ppm)</h4>
                        <div class="report-grid">
                            <div class="report-item">
                                <span class="label">Lead (Pb)</span>
                                <span class="value">${report.lead}</span>
                            </div>
                            <div class="report-item">
                                <span class="label">Arsenic (As)</span>
                                <span class="value">${report.arsenic}</span>
                            </div>
                            <div class="report-item">
                                <span class="label">Cadmium (Cd)</span>
                                <span class="value">${report.cadmium}</span>
                            </div>
                            <div class="report-item">
                                <span class="label">Mercury (Hg)</span>
                                <span class="value">${report.mercury}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="report-section">
                        <h4>Microbiological Tests</h4>
                        <div class="report-grid">
                            <div class="report-item">
                                <span class="label">Aerobic Plate Count</span>
                                <span class="value">${report.aerobic_plate_count}</span>
                            </div>
                            <div class="report-item">
                                <span class="label">Yeast & Mold</span>
                                <span class="value">${report.yeast_mold}</span>
                            </div>
                            <div class="report-item">
                                <span class="label">E. coli</span>
                                <span class="value">${report.ecoli}</span>
                            </div>
                            <div class="report-item">
                                <span class="label">Salmonella</span>
                                <span class="value">${report.salmonella}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="report-actions">
                        <button class="btn btn-secondary" onclick="downloadDemoReport('${report.batch_id}')">
                            📥 Download PDF (Demo)
                        </button>
                        <a href="batch-traceability.html?batch=${report.batch_id}" class="btn btn-primary">
                            🔍 View Batch Details
                        </a>
                    </div>
                </div>
            `).join('');
        } else {
            reportsContainer.innerHTML = `
                <div class="empty-state">
                    <div style="font-size: 4rem; margin-bottom: 16px;">📋</div>
                    <h3>No Lab Reports Found</h3>
                    <p>No lab reports available for the selected batch.</p>
                </div>
            `;
        }
    }
}

function downloadDemoReport(batchId) {
    alert('Demo Mode: PDF download would be implemented with real lab reports uploaded via Admin Panel.\n\nThis is sample data for demonstration purposes only.');
}

// Request Quote Page
function renderRequestQuotePage() {
    const data = getData();
    const urlParams = new URLSearchParams(window.location.search);
    const preSelectedProduct = urlParams.get('product');
    const preSelectedBatch = urlParams.get('batch');
    
    // Populate product dropdown
    const productSelect = document.getElementById('quote-product');
    if (productSelect) {
        productSelect.innerHTML = '<option value="">Select Product</option>' +
            data.products.map(p => `<option value="${p.id}" ${preSelectedProduct === p.id ? 'selected' : ''}>${p.name}</option>`).join('');
    }
    
    // Populate batch dropdown
    const batchSelect = document.getElementById('quote-batch');
    if (batchSelect) {
        batchSelect.innerHTML = '<option value="">Any Batch (Optional)</option>' +
            data.batches.map(b => `<option value="${b.id}" ${preSelectedBatch === b.id ? 'selected' : ''}>${b.id} - ${b.name}</option>`).join('');
    }
}

function submitQuoteForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const quote = {
        id: 'QT-' + Date.now(),
        date: new Date().toISOString(),
        product: formData.get('product'),
        batch: formData.get('batch'),
        quantity: formData.get('quantity'),
        destination: formData.get('destination'),
        packaging: formData.get('packaging'),
        buyer_name: formData.get('buyer_name'),
        buyer_email: formData.get('buyer_email'),
        buyer_company: formData.get('buyer_company'),
        buyer_phone: formData.get('buyer_phone'),
        message: formData.get('message'),
        status: 'pending'
    };
    
    // Save to admin data
    ADMIN_DATA.quotes.push(quote);
    saveAdminData();
    
    // Show success message
    alert('✅ Thank you for your inquiry!\n\nWe will respond within 24-48 business hours.\n\nThis is a demo - in production, this would be sent to your email and admin panel.');
    
    form.reset();
}

// Knowledge Hub Page
function renderKnowledgeHubPage() {
    const data = getData();
    const articlesContainer = document.getElementById('knowledge-articles');
    
    if (articlesContainer) {
        articlesContainer.innerHTML = data.knowledge_articles.map(article => `
            <div class="knowledge-card" onclick="showArticle('${article.id}')">
                <span class="article-category">${article.category}</span>
                <h3>${article.title}</h3>
                <p class="article-preview">${article.content.substring(0, 150)}...</p>
                <div class="article-meta">
                    <span>📊 HS Code: ${article.hs_code}</span>
                    <span>📅 Updated: ${article.last_updated}</span>
                </div>
            </div>
        `).join('');
    }
}

function showArticle(articleId) {
    const article = DEMO_DATA.knowledge_articles.find(a => a.id === articleId);
    if (!article) return;
    
    const modal = document.getElementById('article-modal');
    const modalContent = document.getElementById('article-modal-content');
    
    if (modal && modalContent) {
        modalContent.innerHTML = `
            <span class="demo-badge" style="margin-bottom: 16px;">📋 Demo Content - Replace via Admin Panel</span>
            <span class="article-category">${article.category}</span>
            <h2 style="margin: 16px 0;">${article.title}</h2>
            <div class="article-meta" style="margin-bottom: 24px;">
                <span>📊 HS Code: ${article.hs_code}</span>
                <span>📅 Last Updated: ${article.last_updated}</span>
            </div>
            <div class="article-body">
                <p>${article.content}</p>
                <p style="margin-top: 16px; padding: 16px; background: #F5F3EF; border-radius: 12px;">
                    <em>📋 Full article content would be displayed here. This is demo content for demonstration purposes only. Replace with real content via Admin Panel.</em>
                </p>
            </div>
            <button class="btn btn-secondary" onclick="closeArticle()" style="margin-top: 24px;">✕ Close</button>
        `;
        modal.classList.add('active');
    }
}

function closeArticle() {
    const modal = document.getElementById('article-modal');
    if (modal) modal.classList.remove('active');
}

// Documents & Certifications Page
function renderDocumentsPage() {
    const data = getData();
    const documentsContainer = document.getElementById('documents-container');
    
    if (documentsContainer) {
        const icons = {
            iec: '📋',
            fssai: '🍽️',
            apeda: '🌍',
            organic: '🌿'
        };
        documentsContainer.innerHTML = data.certificates.map(cert => `
            <div class="document-card">
                <div class="document-header">
                    <span class="document-icon">${icons[cert.id] || '📄'}</span>
                    <div class="document-info">
                        <h3>${cert.name}</h3>
                        <p class="document-number">${cert.number}</p>
                    </div>
                </div>
                <div class="document-details">
                    <p><strong>🏛️ Issuing Authority:</strong> ${cert.issuing_authority}</p>
                    <p><strong>📅 Valid Until:</strong> ${cert.valid_until}</p>
                    <p><strong>📝 Description:</strong> ${cert.description}</p>
                </div>
                <div class="document-actions">
                    <button class="btn btn-secondary" onclick="viewDemoDocument('${cert.id}')">👁️ View Document</button>
                </div>
                <div class="demo-badge-small">📋 Demo Document</div>
            </div>
        `).join('');
    }
}

function viewDemoDocument(certId) {
    const cert = DEMO_DATA.certificates.find(c => c.id === certId);
    if (cert) {
        alert(`📋 Demo Mode\n\nDocument: ${cert.name}\n\nThis is sample data for demonstration purposes only.\n\nReplace with real document via Admin Panel.`);
    }
}

// Contact Page
function renderContactPage() {
    const data = getData();
    
    const contactInfo = document.getElementById('contact-info');
    if (contactInfo) {
        contactInfo.innerHTML = `
            <div class="contact-item">
                <span class="contact-icon">📧</span>
                <div>
                    <strong>Email</strong>
                    <p>${data.company.email}</p>
                </div>
            </div>
            <div class="contact-item">
                <span class="contact-icon">📞</span>
                <div>
                    <strong>Phone</strong>
                    <p>${data.company.phone}</p>
                </div>
            </div>
            <div class="contact-item">
                <span class="contact-icon">📍</span>
                <div>
                    <strong>Address</strong>
                    <p>${data.company.address}</p>
                </div>
            </div>
            <div class="contact-item">
                <span class="contact-icon">💬</span>
                <div>
                    <strong>WhatsApp</strong>
                    <p>${data.company.whatsapp}</p>
                </div>
            </div>
        `;
    }
}

// Make functions globally available
window.showBatchDetail = showBatchDetail;
window.renderBatchDetail = renderBatchDetail;
window.downloadDemoReport = downloadDemoReport;
window.submitQuoteForm = submitQuoteForm;
window.showArticle = showArticle;
window.closeArticle = closeArticle;
window.viewDemoDocument = viewDemoDocument;
