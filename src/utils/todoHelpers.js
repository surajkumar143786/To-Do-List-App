// Utility functions for To-Do List operations

// Generate unique ID
export const generateId = () => {
    return Date.now() + Math.random().toString(36).substr(2, 9)
}

// Priority validation
export const validatePriority = (priority) => {
    const validPriorities = ['low', 'medium', 'high']
    return validPriorities.includes(priority) ? priority : 'medium'
}

// Format date for display
export const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
        return 'Today'
    } else if (diffDays === 1) {
        return 'Yesterday'
    } else if (diffDays < 7) {
        return `${diffDays} days ago`
    } else {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }
}

// Get priority color scheme
export const getPriorityColor = (priority) => {
    switch (priority) {
        case 'high':
            return {
                bg: 'bg-red-100',
                text: 'text-red-800',
                border: 'border-red-300',
                dot: 'bg-red-500'
            }
        case 'medium':
            return {
                bg: 'bg-yellow-100',
                text: 'text-yellow-800',
                border: 'border-yellow-300',
                dot: 'bg-yellow-500'
            }
        case 'low':
            return {
                bg: 'bg-green-100',
                text: 'text-green-800',
                border: 'border-green-300',
                dot: 'bg-green-500'
            }
        default:
            return {
                bg: 'bg-gray-100',
                text: 'text-gray-800',
                border: 'border-gray-300',
                dot: 'bg-gray-500'
            }
    }
}

// Calculate todo statistics
export const calculateStats = (todos) => {
    const total = todos.length
    const completed = todos.filter(todo => todo.completed).length
    const pending = total - completed
    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0

    // Calculate by priority
    const byPriority = {
        high: todos.filter(todo => todo.priority === 'high').length,
        medium: todos.filter(todo => todo.priority === 'medium').length,
        low: todos.filter(todo => todo.priority === 'low').length
    }

    return {
        total,
        completed,
        pending,
        completionPercentage,
        byPriority
    }
}

// Sort todos by various criteria
export const sortTodos = (todos, sortBy) => {
    const sorted = [...todos]

    switch (sortBy) {
        case 'priority':
            const priorityOrder = { high: 3, medium: 2, low: 1 }
            return sorted.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])

        case 'name':
            return sorted.sort((a, b) => a.text.localeCompare(b.text))

        case 'date-asc':
            return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

        case 'date-desc':
        default:
            return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
}

// Filter todos by completion status
export const filterTodos = (todos, filter) => {
    switch (filter) {
        case 'active':
            return todos.filter(todo => !todo.completed)
        case 'completed':
            return todos.filter(todo => todo.completed)
        default:
            return todos
    }
}

// Validate todo object
export const validateTodo = (todo) => {
    const errors = []

    if (!todo.text || todo.text.trim().length === 0) {
        errors.push('Task description is required')
    }

    if (todo.text && todo.text.trim().length > 200) {
        errors.push('Task description must be less than 200 characters')
    }

    return {
        isValid: errors.length === 0,
        errors
    }
}

// Get initial sample todos
export const getSampleTodos = () => [
    {
        id: generateId(),
        text: 'Learn React Components',
        completed: true,
        priority: 'high',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
        id: generateId(),
        text: 'Build To-Do List App',
        completed: false,
        priority: 'high',
        createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
        id: generateId(),
        text: 'Style with Tailwind CSS',
        completed: false,
        priority: 'medium',
        createdAt: new Date().toISOString()
    },
    {
        id: generateId(),
        text: 'Test application functionality',
        completed: false,
        priority: 'medium',
        createdAt: new Date().toISOString()
    },
    {
        id: generateId(),
        text: 'Deploy to GitHub',
        completed: false,
        priority: 'low',
        createdAt: new Date().toISOString()
    }
]