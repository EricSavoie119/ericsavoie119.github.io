/**
 * BlogManager - Handles loading, parsing, and rendering blog posts
 */
class BlogManager {
    constructor(config = {}) {
        this.postsDirectory = config.postsDirectory || '/blog/posts/';
        this.manifestPath = config.manifestPath || '/blog/posts-manifest.json';
        this.posts = [];
        this.filteredPosts = [];
        this.currentFilter = 'all';
        this.currentPage = 1;
        this.postsPerPage = config.postsPerPage || 9;
    }

    /**
     * Load posts from the manifest file
     * @returns {Promise<Array>} Array of post objects
     */
    async loadPosts() {
        try {
            const response = await fetch(this.manifestPath);
            if (!response.ok) {
                throw new Error(`Failed to load posts manifest: ${response.status}`);
            }
            
            const data = await response.json();
            this.posts = data.posts || [];
            
            // Sort by date (newest first)
            this.posts.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
            });
            
            // Initialize filtered posts with all posts
            this.filteredPosts = [...this.posts];
            
            return this.posts;
        } catch (error) {
            console.error('Error loading posts:', error);
            return [];
        }
    }

    /**
     * Parse YAML front matter from markdown content
     * @param {string} content - Raw markdown content with front matter
     * @returns {Object} Object with frontMatter and content properties
     */
    parseFrontMatter(content) {
        const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
        const match = content.match(frontMatterRegex);
        
        if (!match) {
            return {
                frontMatter: {},
                content: content
            };
        }
        
        const frontMatterText = match[1];
        const markdownContent = match[2];
        
        // Parse YAML front matter (simple key-value parser)
        const frontMatter = {};
        const lines = frontMatterText.split('\n');
        let currentKey = null;
        let currentValue = [];
        
        lines.forEach(line => {
            const trimmedLine = line.trim();
            
            // Skip empty lines
            if (!trimmedLine) return;
            
            // Check if it's a key-value pair
            const keyValueMatch = trimmedLine.match(/^(\w+):\s*(.*)$/);
            
            if (keyValueMatch) {
                // Save previous key-value if exists
                if (currentKey) {
                    frontMatter[currentKey] = currentValue.length === 1 
                        ? currentValue[0] 
                        : currentValue;
                }
                
                currentKey = keyValueMatch[1];
                const value = keyValueMatch[2].trim();
                
                // Check if value is a quoted string
                if (value.startsWith('"') && value.endsWith('"')) {
                    currentValue = [value.slice(1, -1)];
                } else if (value) {
                    currentValue = [value];
                } else {
                    currentValue = [];
                }
            } else if (trimmedLine.startsWith('-') && currentKey) {
                // Array item
                const item = trimmedLine.substring(1).trim();
                currentValue.push(item);
            }
        });
        
        // Save last key-value
        if (currentKey) {
            frontMatter[currentKey] = currentValue.length === 1 
                ? currentValue[0] 
                : currentValue;
        }
        
        return {
            frontMatter,
            content: markdownContent
        };
    }

    /**
     * Parse markdown content to HTML
     * @param {string} markdown - Markdown content
     * @returns {string} HTML content
     */
    parseMarkdown(markdown) {
        if (typeof marked === 'undefined') {
            console.error('Marked.js library not loaded');
            return markdown;
        }
        
        try {
            return marked.parse(markdown);
        } catch (error) {
            console.error('Error parsing markdown:', error);
            return `<p>Error rendering content</p>`;
        }
    }

    /**
     * Render blog post list on landing page
     * @param {HTMLElement} container - Container element for blog cards
     * @param {Array} posts - Array of post objects (optional, uses filteredPosts if not provided)
     */
    renderPostList(container, posts = null) {
        if (!container) {
            console.error('Container element not found');
            return;
        }
        
        const postsToRender = posts || this.filteredPosts;
        
        if (postsToRender.length === 0) {
            // Check if we're in a filtered state
            const isFiltered = this.filteredPosts.length !== this.posts.length;
            
            container.innerHTML = `
                <div class="blog-empty-state">
                    <p>${isFiltered ? 'No posts found with this tag.' : 'No posts found. Check back soon!'}</p>
                    ${isFiltered ? '<p>Try selecting a different tag or <a href="/blog" class="link">view all posts</a>.</p>' : ''}
                </div>
            `;
            return;
        }
        
        container.innerHTML = '';
        
        postsToRender.forEach(post => {
            const card = this.createPostCard(post);
            container.appendChild(card);
        });
    }

    /**
     * Create a blog post card element
     * @param {Object} post - Post object
     * @returns {HTMLElement} Blog card element
     */
    createPostCard(post) {
        const article = document.createElement('article');
        article.className = 'blog-card';
        
        // Format date
        const date = new Date(post.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        
        // Create card HTML
        article.innerHTML = `
            <div class="blog-card__image">
                <img src="${post.featuredImage || '/assets/images/default-app-icon.svg'}" 
                     alt="${post.title}" 
                     loading="lazy"
                     onerror="this.src='/assets/images/default-app-icon.svg'">
                <div class="blog-card__date">${formattedDate}</div>
            </div>
            <div class="blog-card__content">
                ${post.tags && post.tags.length > 0 ? `
                    <div class="blog-card__tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
                <h3 class="blog-card__title">${post.title}</h3>
                <p class="blog-card__excerpt">${post.excerpt}</p>
                <div class="blog-card__meta">
                    <span class="blog-card__reading-time">${post.readingTime || 5} min read</span>
                </div>
            </div>
        `;
        
        // Make card clickable
        article.style.cursor = 'pointer';
        article.addEventListener('click', () => {
            window.location.href = `/blog/post-template.html?slug=${post.slug}`;
        });
        
        return article;
    }

    /**
     * Render full blog post on detail page
     * @param {string} slug - Post slug
     * @param {HTMLElement} container - Container element for post content
     */
    async renderPost(slug, container) {
        if (!container) {
            console.error('Container element not found');
            return;
        }
        
        try {
            // Find post in manifest
            const post = this.posts.find(p => p.slug === slug);
            
            if (!post) {
                container.innerHTML = `
                    <div class="blog-post-error">
                        <h1>Post Not Found</h1>
                        <p>The blog post you're looking for doesn't exist.</p>
                        <a href="/blog" class="btn btn--primary">← Back to Blog</a>
                    </div>
                `;
                return;
            }
            
            // Fetch markdown file
            const response = await fetch(`${this.postsDirectory}${slug}.md`);
            if (!response.ok) {
                throw new Error(`Failed to load post: ${response.status}`);
            }
            
            const markdownContent = await response.text();
            const { frontMatter, content } = this.parseFrontMatter(markdownContent);
            const htmlContent = this.parseMarkdown(content);
            
            // Format date
            const date = new Date(post.date);
            const formattedDate = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
            
            // Get related posts based on shared tags
            const relatedPosts = this.getRelatedPosts(post, 3);
            
            // Render post
            container.innerHTML = `
                <article class="blog-post">
                    <header class="blog-post__header">
                        <div class="blog-post__meta">
                            <time datetime="${post.date}">${formattedDate}</time>
                            <span class="blog-post__reading-time">${post.readingTime || 5} min read</span>
                        </div>
                        <h1 class="blog-post__title">${post.title}</h1>
                        ${post.tags && post.tags.length > 0 ? `
                            <div class="blog-post__tags">
                                ${post.tags.map(tag => `<a href="/blog?tag=${encodeURIComponent(tag)}" class="tag">${tag}</a>`).join('')}
                            </div>
                        ` : ''}
                    </header>
                    
                    ${post.featuredImage ? `
                        <div class="blog-post__featured-image">
                            <img src="${post.featuredImage}" alt="${post.title}" loading="lazy">
                        </div>
                    ` : ''}
                    
                    <div class="blog-post__content">
                        ${htmlContent}
                    </div>
                    
                    <footer class="blog-post__footer">
                        <div class="blog-post__navigation">
                            <a href="/blog" class="btn btn--secondary">← Back to Blog</a>
                        </div>
                        ${relatedPosts.length > 0 ? `
                            <div class="blog-post__related">
                                <h3>Related Posts</h3>
                                <div class="related-posts-grid">
                                    ${relatedPosts.map(relatedPost => this.createRelatedPostCard(relatedPost)).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </footer>
                </article>
            `;
            
            // Apply syntax highlighting to code blocks
            if (typeof hljs !== 'undefined') {
                container.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightElement(block);
                });
            }
            
            // Update page meta tags and title
            this.updateMetaTags(post);
            
        } catch (error) {
            console.error('Error rendering post:', error);
            container.innerHTML = `
                <div class="blog-post-error">
                    <h1>Error Loading Post</h1>
                    <p>There was an error loading this blog post. Please try again later.</p>
                    <a href="/blog" class="btn btn--primary">← Back to Blog</a>
                </div>
            `;
        }
    }

    /**
     * Get related posts based on shared tags
     * @param {Object} currentPost - Current post object
     * @param {number} limit - Maximum number of related posts to return
     * @returns {Array} Array of related post objects
     */
    getRelatedPosts(currentPost, limit = 3) {
        if (!currentPost.tags || currentPost.tags.length === 0) {
            return [];
        }
        
        // Calculate relevance score for each post based on shared tags
        const scoredPosts = this.posts
            .filter(post => post.slug !== currentPost.slug) // Exclude current post
            .map(post => {
                if (!post.tags || post.tags.length === 0) {
                    return { post, score: 0 };
                }
                
                // Count shared tags
                const sharedTags = post.tags.filter(tag => 
                    currentPost.tags.includes(tag)
                ).length;
                
                return { post, score: sharedTags };
            })
            .filter(item => item.score > 0) // Only include posts with at least one shared tag
            .sort((a, b) => b.score - a.score); // Sort by score (highest first)
        
        // Return top N posts
        return scoredPosts.slice(0, limit).map(item => item.post);
    }

    /**
     * Create a related post card HTML string
     * @param {Object} post - Post object
     * @returns {string} HTML string for related post card
     */
    createRelatedPostCard(post) {
        const date = new Date(post.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        
        return `
            <a href="/blog/post-template.html?slug=${post.slug}" class="related-post-card">
                ${post.featuredImage ? `
                    <div class="related-post-card__image">
                        <img src="${post.featuredImage}" alt="${post.title}" loading="lazy">
                    </div>
                ` : ''}
                <div class="related-post-card__content">
                    <h4>${post.title}</h4>
                    <p class="related-post-card__date">${formattedDate}</p>
                </div>
            </a>
        `;
    }

    /**
     * Update page meta tags for SEO
     * @param {Object} post - Post object
     */
    updateMetaTags(post) {
        // Update page title
        document.title = `${post.title} | Eric Savoie Blog`;
        
        // Get current URL
        const currentUrl = window.location.href;
        const canonicalUrl = `https://ericsavoie.com/blog/post-template.html?slug=${post.slug}`;
        
        // Update or create meta tags
        this.setMetaTag('name', 'description', post.excerpt || '');
        this.setMetaTag('name', 'keywords', post.tags ? post.tags.join(', ') : '');
        
        // Open Graph tags
        this.setMetaTag('property', 'og:type', 'article');
        this.setMetaTag('property', 'og:title', post.title);
        this.setMetaTag('property', 'og:description', post.excerpt || '');
        this.setMetaTag('property', 'og:image', post.featuredImage || '');
        this.setMetaTag('property', 'og:url', canonicalUrl);
        this.setMetaTag('property', 'article:published_time', post.date);
        this.setMetaTag('property', 'article:author', 'Eric Savoie');
        
        // Add article tags
        if (post.tags && post.tags.length > 0) {
            post.tags.forEach(tag => {
                this.setMetaTag('property', 'article:tag', tag, true);
            });
        }
        
        // Twitter Card tags
        this.setMetaTag('name', 'twitter:card', 'summary_large_image');
        this.setMetaTag('name', 'twitter:title', post.title);
        this.setMetaTag('name', 'twitter:description', post.excerpt || '');
        this.setMetaTag('name', 'twitter:image', post.featuredImage || '');
        
        // Update canonical URL
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink) {
            canonicalLink.href = canonicalUrl;
        } else {
            canonicalLink = document.createElement('link');
            canonicalLink.rel = 'canonical';
            canonicalLink.href = canonicalUrl;
            document.head.appendChild(canonicalLink);
        }
        
        // Add JSON-LD structured data
        this.addStructuredData(post);
    }

    /**
     * Set or update a meta tag
     * @param {string} attribute - Attribute name ('name' or 'property')
     * @param {string} key - Attribute value
     * @param {string} content - Content value
     * @param {boolean} allowMultiple - Allow multiple tags with same key
     */
    setMetaTag(attribute, key, content, allowMultiple = false) {
        if (!content) return;
        
        let metaTag = document.querySelector(`meta[${attribute}="${key}"]`);
        
        if (metaTag && !allowMultiple) {
            metaTag.content = content;
        } else if (!metaTag || allowMultiple) {
            metaTag = document.createElement('meta');
            metaTag.setAttribute(attribute, key);
            metaTag.content = content;
            document.head.appendChild(metaTag);
        }
    }

    /**
     * Add JSON-LD structured data for blog post
     * @param {Object} post - Post object
     */
    addStructuredData(post) {
        // Remove existing structured data if present
        const existingScript = document.querySelector('script[type="application/ld+json"]');
        if (existingScript) {
            existingScript.remove();
        }
        
        // Create structured data
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt || '',
            "image": post.featuredImage || '',
            "datePublished": post.date,
            "dateModified": post.date,
            "author": {
                "@type": "Person",
                "name": "Eric Savoie",
                "url": "https://ericsavoie.com"
            },
            "publisher": {
                "@type": "Person",
                "name": "Eric Savoie"
            },
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://ericsavoie.com/blog/post-template.html?slug=${post.slug}`
            }
        };
        
        // Add keywords if available
        if (post.tags && post.tags.length > 0) {
            structuredData.keywords = post.tags.join(', ');
        }
        
        // Create and append script tag
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }

    /**
     * Get posts filtered by tag
     * @param {string} tag - Tag to filter by
     * @returns {Array} Filtered posts
     */
    filterByTag(tag) {
        if (!tag || tag === 'all') {
            this.filteredPosts = [...this.posts];
            this.currentFilter = 'all';
        } else {
            this.filteredPosts = this.posts.filter(post => 
                post.tags && post.tags.includes(tag)
            );
            this.currentFilter = tag;
        }
        return this.filteredPosts;
    }

    /**
     * Get all unique tags from posts
     * @returns {Array} Array of unique tags
     */
    getAllTags() {
        const tagsSet = new Set();
        this.posts.forEach(post => {
            if (post.tags && Array.isArray(post.tags)) {
                post.tags.forEach(tag => tagsSet.add(tag));
            }
        });
        return Array.from(tagsSet).sort();
    }

    /**
     * Get current filter state
     * @returns {string} Current filter tag ('all' if no filter)
     */
    getCurrentFilter() {
        return this.currentFilter || 'all';
    }

    /**
     * Check if posts are currently filtered
     * @returns {boolean} True if filtered, false if showing all posts
     */
    isFiltered() {
        return this.currentFilter && this.currentFilter !== 'all';
    }

    /**
     * Clear all filters and show all posts
     * @returns {Array} All posts
     */
    clearFilter() {
        return this.filterByTag('all');
    }
}

// Export for use in other modules
export { BlogManager };
export default BlogManager;
