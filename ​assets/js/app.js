// Data Models for Project Showcase
const portfolioData = {
    projects: [
        {
            id: 'pesaguard',
            title: 'PesaGuard',
            category: 'FinTech / Security',
            description: 'Minimalist financial security SaaS interface and corporate identity with integrated data visualization.',
            tags: ['FinTech', 'SaaS', 'UI/UX', 'Data Vis'],
            link: '/projects/pesaguard.html'
        },
        {
            id: 'worknest',
            title: 'WorkNest',
            category: 'Web Application',
            description: 'Scalable backend service deployment utilizing optimized cloud environments and automated release cycles.',
            tags: ['Backend', 'Deployment', 'CI/CD'],
            link: '/projects/worknest.html'
        },
        {
            id: 'smartbiz',
            title: 'SmartBiz',
            category: 'Business Management',
            description: 'Comprehensive business management system architecture and technical startup pitch documentation.',
            tags: ['System Design', 'Architecture'],
            link: '/projects/smartbiz.html'
        },
        {
            id: 'mychama',
            title: 'MyChama',
            category: 'FinTech / Mobile',
            description: 'Local financial group management application framework built for cross-platform accessibility.',
            tags: ['Mobile Framework', 'FinTech'],
            link: '/projects/mychama.html'
        }
    ]
};

// Render Featured Projects
function renderProjects() {
    const grid = document.getElementById('project-showcase');
    if (!grid) return;

    portfolioData.projects.forEach(project => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-meta">${project.category}</div>
            <h3 class="card-title">${project.title}</h3>
            <p class="card-desc">${project.description}</p>
            <div class="card-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="${project.link}" class="card-link">View Architecture &rarr;</a>
        `;
        grid.appendChild(card);
    });
}

// Markdown Fetcher (For Publications)
async function loadArticle(markdownFilePath) {
    try {
        const response = await fetch(markdownFilePath);
        const text = await response.text();
        
        // Parse and sanitize markdown
        const htmlContent = DOMPurify.sanitize(marked.parse(text));
        document.getElementById('article-content').innerHTML = htmlContent;
        
        // Trigger syntax highlighting
        if (window.Prism) Prism.highlightAll();
    } catch (error) {
        console.error("Error loading article:", error);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
});

