/**
 * BlogFilters - Handles tag filtering UI and logic for blog posts
 */
class BlogFilters {
    constructor(blogManager, config = {}) {
        this.blogManager = blogManager;
        this.filterContainer = config.filterContainer || null;
        this.postsContainer = config.postsContainer || null;
        this.currentFilter = 'all';
        this.onFilterChange = config.onFilterChange || null;
    }

    /**
     * Render filter buttons based on available tags
     * @param {HTMLElement} container - Container element for filter buttons
     */
    renderFilters(container = null) {
        const filterContainer = container || this.filterContainer;
        
        if (!filterContainer) {
            console.error('Filter container element not found');
            return;
        }

        // Get all unique tags from posts
        const tags = this.blogManager.getAllTags();
        
        // Clear existing filters
        filterContainer.innerHTML = '';
        
        // Create "All Posts" button
        const allButton = this.createFilterButton('all', 'All Posts', this.currentFilter === 'all');
        filterContainer.appendChild(allButton);
        
        // Create button for each tag
        tags.forEach(tag => {
            const button = this.createFilterButton(tag, tag, this.currentFilter === tag);
            filterContainer.appendChild(button);
        });
    }

    /**
     * Create a filter button element
     * @param {string} tag - Tag value
     * @param {string} label - Button label
     * @param {boolean} isActive - Whether button is active
     * @returns {HTMLElement} Button element
     */
    createFilterButton(tag, label, isActive = false) {
        const button = document.createElement('button');
        button.className = `blog-filter${isActive ? ' blog-filter--active' : ''}`;
        button.textContent = label;
        button.setAttribute('data-tag', tag);
        button.setAttribute('aria-pressed', isActive.toString());
        
        // Add click event listener
        button.addEventListener('click', () => {
            this.filterByTag(tag);
        });
        
        return button;
    }

    /**
     * Filter posts by tag and update UI
     * @param {string} tag - Tag to filter by ('all' for no filter)
     */
    filterByTag(tag) {
        // Update current filter
        this.currentFilter = tag;
        
        // Filter posts using BlogManager
        const filteredPosts = this.blogManager.filterByTag(tag);
        
        // Update URL with query parameter
        this.updateURL(tag);
        
        // Update filter button states
        this.updateFilterButtons(tag);
        
        // Render filtered posts
        if (this.postsContainer) {
            this.renderFilteredPosts(filteredPosts);
        }
        
        // Call custom callback if provided
        if (this.onFilterChange) {
            this.onFilterChange(tag, filteredPosts);
        }
    }

    /**
     * Update URL with tag query parameter
     * @param {string} tag - Current filter tag
     */
    updateURL(tag) {
        const url = new URL(window.location);
        
        if (tag === 'all') {
            // Remove tag parameter
            url.searchParams.delete('tag');
        } else {
            // Set tag parameter
            url.searchParams.set('tag', tag);
        }
        
        // Update URL without reloading page
        window.history.pushState({}, '', url);
    }

    /**
     * Update filter button active states
     * @param {string} activeTag - Currently active tag
     */
    updateFilterButtons(activeTag) {
        if (!this.filterContainer) return;
        
        const buttons = this.filterContainer.querySelectorAll('.blog-filter');
        
        buttons.forEach(button => {
            const buttonTag = button.getAttribute('data-tag');
            const isActive = buttonTag === activeTag;
            
            if (isActive) {
                button.classList.add('blog-filter--active');
                button.setAttribute('aria-pressed', 'true');
            } else {
                button.classList.remove('blog-filter--active');
                button.setAttribute('aria-pressed', 'false');
            }
        });
    }

    /**
     * Render filtered posts with empty state handling
     * @param {Array} posts - Filtered posts array
     */
    renderFilteredPosts(posts) {
        if (!this.postsContainer) {
            console.error('Posts container element not found');
            return;
        }
        
        if (posts.length === 0) {
            // Show empty state with clear filter option
            this.postsContainer.innerHTML = `
                <div class="blog-empty-state">
                    <p>No posts found with this tag.</p>
                    <button class="btn btn--secondary" id="clear-filter">View all posts</button>
                </div>
            `;
            
            // Add event listener to clear filter button
            const clearButton = this.postsContainer.querySelector('#clear-filter');
            if (clearButton) {
                clearButton.addEventListener('click', () => {
                    this.clearFilter();
                });
            }
        } else {
            // Render posts using BlogManager
            this.blogManager.renderPostList(this.postsContainer, posts);
        }
    }

    /**
     * Clear active filter and show all posts
     */
    clearFilter() {
        this.filterByTag('all');
    }

    /**
     * Initialize filters from URL query parameter
     */
    initializeFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const tagParam = urlParams.get('tag');
        
        if (tagParam) {
            // Check if tag exists in posts
            const tags = this.blogManager.getAllTags();
            if (tags.includes(tagParam)) {
                this.currentFilter = tagParam;
                this.filterByTag(tagParam);
            } else {
                // Invalid tag, show all posts
                this.clearFilter();
            }
        } else {
            // No tag parameter, show all posts
            this.currentFilter = 'all';
        }
    }

    /**
     * Initialize the filter component
     * @param {HTMLElement} filterContainer - Container for filter buttons
     * @param {HTMLElement} postsContainer - Container for blog posts
     */
    initialize(filterContainer = null, postsContainer = null) {
        if (filterContainer) {
            this.filterContainer = filterContainer;
        }
        
        if (postsContainer) {
            this.postsContainer = postsContainer;
        }
        
        // Render filter buttons
        this.renderFilters();
        
        // Initialize from URL
        this.initializeFromURL();
    }
}

// Export for use in other modules
export { BlogFilters };
export default BlogFilters;
