class CommentManager {
    constructor() {
        this.allComments = [];
        this.filteredComments = [];
        this.currentSort = 'dateNewest';
        this.currentPage = 0;
        this.pageSize = 50; // Increase page size to show more comments initially
        this.filters = {
            keywords: '',
            startDate: null,
            endDate: null,
            minLikes: 0,
            length: 'all' // 添加默认评论长度筛选条件
        };
    }

    // 设置所有评论数据（追加）
    setComments(comments) {
        this.allComments = [...this.allComments, ...comments];
        this.applyFilters();
    }
    
    // 设置所有评论数据（替换）
    setCommentsReplace(comments) {
        this.allComments = [...comments];
        this.applyFilters();
    }

    // 应用筛选器
    applyFilters() {
        this.filteredComments = this.allComments.filter(comment => {
            // 关键词筛选
            if (this.filters.keywords && this.filters.keywords.length > 0) {
                const keywords = this.filters.keywords.toLowerCase();
                const textMatch = comment.textDisplay && comment.textDisplay.toLowerCase().includes(keywords);
                const authorMatch = comment.authorDisplayName && comment.authorDisplayName.toLowerCase().includes(keywords);
                if (!textMatch && !authorMatch) {
                    return false;
                }
            }

            // 日期筛选
            if (this.filters.startDate || this.filters.endDate) {
                const commentDate = new Date(comment.publishedAt);
                if (this.filters.startDate && commentDate < this.filters.startDate) {
                    return false;
                }
                if (this.filters.endDate && commentDate > this.filters.endDate) {
                    return false;
                }
            }

            // 点赞数筛选
            if (this.filters.minLikes > 0) {
                const likeCount = parseInt(comment.likeCount) || 0;
                if (likeCount < this.filters.minLikes) {
                    return false;
                }
            }

            // 评论长度筛选
            if (this.filters.length && this.filters.length !== 'all') {
                const commentLength = comment.textDisplay ? comment.textDisplay.length : 0;
                switch (this.filters.length) {
                    case 'short':
                        if (commentLength < 1 || commentLength > 50) return false;
                        break;
                    case 'medium':
                        if (commentLength < 51 || commentLength > 200) return false;
                        break;
                    case 'long':
                        if (commentLength < 201) return false;
                        break;
                }
            }

            return true;
        });

        // 应用排序
        this.sortComments();
        
        // 确保当前页码在合理范围内
        const totalPages = this.getTotalPages();
        if (this.currentPage >= totalPages) {
            this.currentPage = Math.max(0, totalPages - 1);
        }
    }

    // 排序评论
    sortComments() {
        this.filteredComments.sort((a, b) => {
            switch (this.currentSort) {
                case 'dateNewest':
                    return new Date(b.publishedAt) - new Date(a.publishedAt);
                case 'dateOldest':
                    return new Date(a.publishedAt) - new Date(b.publishedAt);
                case 'likesMost':
                    return (parseInt(b.likeCount) || 0) - (parseInt(a.likeCount) || 0);
                case 'likesLeast':
                    return (parseInt(a.likeCount) || 0) - (parseInt(b.likeCount) || 0);
                default:
                    return 0;
            }
        });
    }

    // 获取当前页面的评论
    getCurrentPageComments() {
        const start = this.currentPage * this.pageSize;
        const end = start + this.pageSize;
        return this.filteredComments.slice(start, end);
    }

    // 获取总页数
    getTotalPages() {
        return Math.ceil(this.filteredComments.length / this.pageSize);
    }

    // 下一页
    nextPage() {
        if (this.currentPage < this.getTotalPages() - 1) {
            this.currentPage++;
            return true;
        }
        return false;
    }

    // 上一页
    prevPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            return true;
        }
        return false;
    }

    // 设置当前页
    setCurrentPage(page) {
        if (page >= 0 && page < this.getTotalPages()) {
            this.currentPage = page;
            return true;
        }
        return false;
    }

    // 获取当前页码
    getCurrentPage() {
        return this.currentPage;
    }

    // 设置排序方式
    setSort(sortType) {
        if (this.currentSort !== sortType) {
            this.currentSort = sortType;
            this.sortComments();
            // 重置到第一页
            this.currentPage = 0;
        }
    }

    // 设置筛选器
    setFilters(filters) {
        this.filters = { ...this.filters, ...filters };
        this.applyFilters();
        // 重置到第一页
        this.currentPage = 0;
    }

    // 获取统计信息
    getStats() {
        return {
            totalComments: this.allComments.length,
            filteredCount: this.filteredComments.length,
            currentPage: this.currentPage + 1,
            totalPages: this.getTotalPages()
        };
    }

    // 清除所有数据
    clear() {
        this.allComments = [];
        this.filteredComments = [];
        this.currentPage = 0;
        this.filters = {
            keywords: '',
            startDate: null,
            endDate: null,
            minLikes: 0,
            length: 'all'
        };
    }
}

// 导出CommentManager类
window.CommentManager = CommentManager;