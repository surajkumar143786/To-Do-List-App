import { useState } from 'react'

function HelpModal() {
    const [isOpen, setIsOpen] = useState(false)

    const shortcuts = [
        { key: 'Enter', action: 'Save edited task' },
        { key: 'Escape', action: 'Cancel editing' },
        { key: 'Double Click', action: 'Edit task' },
        { key: 'Click Checkbox', action: 'Toggle completion' },
        { key: 'Delete Icon', action: 'Remove task' }
    ]

    const features = [
        'Add tasks with priority levels (High, Medium, Low)',
        'Filter tasks by status (All, Active, Completed)',
        'Sort tasks by date, priority, or name',
        'Edit tasks with double-click or edit button',
        'Export/Import tasks as JSON files',
        'Data automatically saved to browser storage',
        'Clear completed tasks or reset to sample data',
        'Track progress with statistics and progress bar'
    ]

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center"
                title="Help & Tips"
                aria-label="Open help modal"
            >
                <span className="text-2xl">?</span>
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal */}
                    <div className="fixed inset-x-4 top-1/2 transform -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 max-w-2xl mx-auto max-h-[90vh] overflow-hidden fade-in">
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6 pb-4 border-b">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Help & Tips</h2>
                                    <p className="text-gray-600">Learn how to use the To-Do List App</p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    aria-label="Close help modal"
                                >
                                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Keyboard Shortcuts */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <span className="mr-2">⌨️</span> Keyboard Shortcuts
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {shortcuts.map((shortcut, index) => (
                                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <span className="px-3 py-1 bg-gray-200 text-gray-800 font-mono rounded text-sm mr-3">
                                                {shortcut.key}
                                            </span>
                                            <span className="text-gray-700">{shortcut.action}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Features */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <span className="mr-2">🚀</span> Features
                                </h3>
                                <ul className="space-y-2">
                                    {features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-green-500 mr-2 mt-1">✓</span>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Priority Guide */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <span className="mr-2">🎯</span> Priority Guide
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                                        <div className="flex items-center mb-2">
                                            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                                            <span className="font-semibold text-red-700">High Priority</span>
                                        </div>
                                        <p className="text-sm text-red-600">Urgent tasks that need immediate attention</p>
                                    </div>
                                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                                        <div className="flex items-center mb-2">
                                            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                                            <span className="font-semibold text-yellow-700">Medium Priority</span>
                                        </div>
                                        <p className="text-sm text-yellow-600">Important tasks for today or tomorrow</p>
                                    </div>
                                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                                        <div className="flex items-center mb-2">
                                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                            <span className="font-semibold text-green-700">Low Priority</span>
                                        </div>
                                        <p className="text-sm text-green-600">Tasks that can wait or are less critical</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tips */}
                            <div className="bg-linear-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                    <span className="mr-2">💡</span> Pro Tips
                                </h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">•</span>
                                        Use the export feature to backup your tasks regularly
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">•</span>
                                        Mark tasks as completed instead of deleting to track your progress
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">•</span>
                                        Use priority levels to focus on what matters most
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">•</span>
                                        The app automatically saves your data to browser storage
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t p-4 bg-gray-50">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">
                                    To-Do List App v1.0.0 • Made with React & Tailwind CSS
                                </span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-md transition-all"
                                >
                                    Got it!
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default HelpModal