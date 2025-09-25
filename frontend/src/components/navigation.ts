// Strategic AI Platform - Navigation Component
export type Page = 'dashboard' | 'intelligence' | 'simulations' | 'agents' | 'analytics' | 'chess-bi' | 'qemasi'

export interface NavigationHandler {
  (page: Page): void | Promise<void>
}

export interface NavigationState {
  currentPage: Page
  history: Page[]
  isNavigating: boolean
}

export class NavigationManager {
  private currentPage: Page = 'dashboard'
  private pages: Page[] = ['dashboard', 'intelligence', 'simulations', 'agents', 'analytics', 'chess-bi', 'qemasi']
  private navigationHandlers: Map<Page, NavigationHandler> = new Map()
  private navigationState: NavigationState = {
    currentPage: 'dashboard',
    history: ['dashboard'],
    isNavigating: false
  }

  init(): void {
    this.setupNavigationListeners()
    this.showPage(this.currentPage)
  }

  private setupNavigationListeners(): void {
    // Add click listeners to navigation items
    this.pages.forEach(page => {
      const navItem = document.querySelector(`[data-page="${page}"]`)
      if (navItem) {
        navItem.addEventListener('click', (e: Event) => {
          e.preventDefault()
          this.navigateToPage(page)
        })
      }
    })

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e: PopStateEvent) => {
      const page = (e.state?.page as Page) || 'dashboard'
      this.showPage(page, false)
    })
  }

  navigateToPage(page: Page, updateHistory: boolean = true): void {
    if (!this.pages.includes(page)) {
      console.warn(`Invalid page: ${page}`)
      return
    }

    if (this.navigationState.isNavigating) {
      console.warn('Navigation already in progress')
      return
    }

    this.navigationState.isNavigating = true
    this.currentPage = page
    this.showPage(page)

    if (updateHistory) {
      this.navigationState.history.push(page)
      history.pushState({ page }, '', `#${page}`)
    }

    // Update active navigation state
    this.updateActiveNavigation(page)

    // Trigger page-specific handlers
    if (this.navigationHandlers.has(page)) {
      const handler = this.navigationHandlers.get(page)!
      try {
        const result = handler(page)
        if (result instanceof Promise) {
          result.finally(() => {
            this.navigationState.isNavigating = false
          })
        } else {
          this.navigationState.isNavigating = false
        }
      } catch (error) {
        console.error(`Error in navigation handler for ${page}:`, error)
        this.navigationState.isNavigating = false
      }
    } else {
      this.navigationState.isNavigating = false
    }
  }

  private showPage(page: Page, updateState: boolean = true): void {
    // Hide all pages
    this.pages.forEach(p => {
      const pageElement = document.getElementById(`${p}-page`)
      if (pageElement) {
        pageElement.style.display = 'none'
      }
    })

    // Show current page
    const currentPageElement = document.getElementById(`${page}-page`)
    if (currentPageElement) {
      currentPageElement.style.display = 'block'
    }

    if (updateState) {
      this.navigationState.currentPage = page
    }

    // Update page title
    document.title = `${this.getPageTitle(page)} - Strategic AI Platform`
  }

  private getPageTitle(page: Page): string {
    const titles: Record<Page, string> = {
      dashboard: 'Dashboard',
      intelligence: 'Intelligence',
      simulations: 'Simulations',
      agents: 'Agents',
      analytics: 'Analytics',
      'chess-bi': 'Chess Business Intelligence',
      'qemasi': 'QEMASI - Quantum Strategic Intelligence'
    }
    return titles[page] || 'Unknown Page'
  }

  private updateActiveNavigation(page: Page): void {
    // Remove active class from all navigation items
    this.pages.forEach(p => {
      const navItem = document.querySelector(`[data-page="${p}"]`)
      if (navItem) {
        navItem.classList.remove('active')
      }
    })

    // Add active class to current page navigation item
    const currentNavItem = document.querySelector(`[data-page="${page}"]`)
    if (currentNavItem) {
      currentNavItem.classList.add('active')
    }
  }

  registerHandler(page: Page, handler: NavigationHandler): void {
    this.navigationHandlers.set(page, handler)
  }

  unregisterHandler(page: Page): void {
    this.navigationHandlers.delete(page)
  }

  getCurrentPage(): Page {
    return this.currentPage
  }

  getNavigationState(): NavigationState {
    return { ...this.navigationState }
  }

  canNavigateTo(page: Page): boolean {
    return this.pages.includes(page) && !this.navigationState.isNavigating
  }

  getNavigationHistory(): Page[] {
    return [...this.navigationState.history]
  }

  goBack(): boolean {
    if (this.navigationState.history.length > 1) {
      this.navigationState.history.pop() // Remove current page
      const previousPage = this.navigationState.history[this.navigationState.history.length - 1]
      this.navigateToPage(previousPage, false)
      return true
    }
    return false
  }

  // Utility methods for page-specific operations
  refreshCurrentPage(): void {
    const currentPage = this.getCurrentPage()
    if (this.navigationHandlers.has(currentPage)) {
      const handler = this.navigationHandlers.get(currentPage)!
      handler(currentPage)
    }
  }

  isPageActive(page: Page): boolean {
    return this.currentPage === page
  }

  getAvailablePages(): Page[] {
    return [...this.pages]
  }
}

// Export singleton instance
export const navigationManager = new NavigationManager()
