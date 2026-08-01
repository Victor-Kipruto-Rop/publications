// Database Simulation
const platformData = {
    publications: [
        {
            id: 'data-engineering-at-scale',
            title: 'Architecting Scalable Data Platforms',
            category: 'Data Engineering',
            readTime: '8 min read',
            summary: 'A deep dive into building fault-tolerant streaming systems using Apache Kafka and Snowflake.'
        },
        {
            id: 'fintech-infrastructure',
            title: 'Designing Secure FinTech Microservices',
            category: 'System Design',
            readTime: '12 min read',
            summary: 'Lessons learned from structuring financial services and building high-throughput infrastructure.'
        }
    ],
    projects: [
        {
            id: 'pesaguard',
            title: 'PesaGuard',
            category: 'FinTech Security',
            summary: 'Minimalist financial security SaaS interface and corporate identity with integrated data visualization.'
        },
        {
            id: 'worknest',
            title: 'WorkNest',
            category: 'Cloud Engineering',
            summary: 'Scalable backend service deployment utilizing optimized cloud environments and CI/CD.'
        },
        {
            id: 'smartbiz',
            title: 'SmartBiz',
            category: 'Business Systems',
            summary: 'Comprehensive business management system architecture and startup pitch documentation.'
        },
        {
            id: 'mychama',
            title: 'MyChama',
            category: 'Mobile Finance',
            summary: 'Local financial group management application framework built for cross-platform accessibility.'
        }
    ]
};

// Render Cards to Grid
function renderGrid(elementId, items, basePath) {
    const grid = document.getElementById(elementId);
    if (!grid) return;
    
    items.forEach(item => {
        const card = document.createElement('a');
        card.href = `${basePath}?post=${item.id}`;
        card.className = 'card';
        card.innerHTML = `
            <div class="card-meta">${item.category} • ${item.readTime || 'Case Study'}</div>
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            <div class="card-link">View Documentation &rarr;</div>
        `;
        grid.appendChild(card);
    });
}

// Markdown Fetcher
async function loadArticle() {
    const contentDiv = document.getElementById('article-content');
    if (!contentDiv) return;

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post');

    if (!postId) {
        contentDiv.innerHTML = '<h1>404 - Document Not Found</h1><p>The requested engineering documentation could not be located.</p>';
        return;
    }

    try {
        // Fetch from either posts or projects folder
        let response = await fetch(`/content/posts/${postId}.md`);
        if (!response.ok) {
            response = await fetch(`/content/projects/${postId}.md`);
        }
        if (!response.ok) throw new Error('Document not found in repository.');
        
        const markdown = await response.text();
        
        // Configure Syntax Highlighting
        if (window.marked && window.Prism) {
            marked.setOptions({
                highlight: function(code, lang) {
                    if (Prism.languages[lang]) {
                        return Prism.highlight(code, Prism.languages[lang], lang);
                    }
                    return code;
                }
            });
            contentDiv.innerHTML = DOMPurify.sanitize(marked.parse(markdown));
        }
    } catch (error) {
        contentDiv.innerHTML = `<h1>Error Loading Article</h1><p>${error.message}</p>`;
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    renderGrid('publications-grid', platformData.publications, '/article.html');
    renderGrid('projects-grid', platformData.projects, '/article.html');
    
    if (window.location.pathname.includes('article.html')) {
        loadArticle();
    }
});
