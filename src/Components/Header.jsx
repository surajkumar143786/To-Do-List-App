function Header() {
    return (
        <header className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                📝 To-Do List
            </h1>
            <p className="text-gray-600 text-lg">
                Organize your tasks efficiently and boost your productivity
            </p>
            <div className="mt-6 flex justify-center space-x-4">
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-gray-700">Completed</span>
                </div>
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-gray-700">Pending</span>
                </div>
            </div>
        </header>
    )
}

export default Header