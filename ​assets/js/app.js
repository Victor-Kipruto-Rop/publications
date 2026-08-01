// Database Simulation (Would normally be a JSON index file)
const publications = [
    {
        id: 'data-engineering-at-scale',
        title: 'Architecting Scalable Data Platforms',
        date: '2026-08-01',
        category: 'Data Engineering',
        readTime: '8 min read',
        summary: 'A deep dive into building fault-tolerant streaming systems using Apache Kafka and Snowflake.'
    },
    {
        id: 'fintech-infrastructure',
        title: 'Designing Secure FinTech Infrastructure',
        date: '2026-07-15',
        category: 'Architecture',
        readTime: '12 min read',
        summary: 'Lessons learned from structuring PesaGuard and building high-throughput microservices.'
    }
];

// Utility: Render Publication Cards (Used on Home and Publications pages)
function renderPublicationGrid(elementId) {
    const grid = document.getElementById(elementId);
    if (!grid) return;

    publications.forEach(pub => {
        const card = document.createElement('a');
        card.href = `/article.html?post=${pub.id}`;
        card.className = 'card';
        card.innerHTML = `
            <div class="card-meta">${pub.category} • ${pub.readTime}</div>
            <h3>${pub.title}</h3>
            <p>${pub.summary}</p>
            <div style="color: var(--text-primary); font-size: 0.9rem; font-weight: 500;">Read Article &rarr;</div>
        `;
        grid.appendChild(card);
    });
}

// Utility: Load Single Markdown Article
async function loadArticle() {
    const contentDiv = document.getElementById('article-content');
    if (!contentDiv) return;

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post');

    if (!postId) {
        contentDiv.innerHTML = '<h1>404 - Article Not Found</h1>';
        return;
    }

    try {
        const response = await fetch(`/content/posts/${postId}.md`);
        if (!response.ok) throw new Error('Post not found');
        
        const markdown = await response.text();
        
        // Configure Marked.js options
        marked.setOptions({
            highlight: function(code, lang) {
                if (Prism.languages[lang]) {
                    return Prism.highlight(code, Prism.languages[lang], lang);
                }
                return code;
            }
        });

        contentDiv.innerHTML = DOMPurify.sanitize(marked.parse(markdown));
    } catch (error) {
        contentDiv.innerHTML = `<h1>Error Loading Article</h1><p>${error.message}</p>`;
    }
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', () => {
    renderPublicationGrid('latest-publications'); // Home page
    renderPublicationGrid('all-publications'); // Publications page
    loadArticle(); // Article page
});
