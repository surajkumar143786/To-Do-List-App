import { useState, useEffect } from 'react'

function Notification({ message, type = 'info', duration = 3000, onClose }) {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                setIsVisible(false)
                onClose?.()
            }, duration)

            return () => clearTimeout(timer)
        }
    }, [duration, onClose])

    const handleClose = () => {
        setIsVisible(false)
        onClose?.()
    }

    if (!isVisible) return null

    const typeStyles = {
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        info: 'bg-blue-50 border-blue-200 text-blue-800'
    }

    const typeIcons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    }

    return (
        <div className={`fixed top-4 right-4 z-50 border rounded-xl p-4 shadow-lg max-w-md slide-up ${typeStyles[type]}`}>
            <div className="flex items-start">
                <span className="text-xl mr-3">{typeIcons[type]}</span>
                <div className="flex-1">
                    <p className="font-medium">{message}</p>
                </div>
                <button
                    onClick={handleClose}
                    className="ml-4 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Close notification"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Notification