import { useState } from 'react'
import Header from './Components/Header'
import ToDoList from './Components/ToDoList'

function App() {
    // Initial to-do items
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: 'Learn React Components',
            completed: true
        },
        {
            id: 2,
            text: 'Build To-Do List App',
            completed: false
        },
        {
            id: 3,
            text: 'Style with Tailwind CSS',
            completed: false
        }
    ])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Header />
                <main className="mt-8">
                    <ToDoList todos={todos} />
                </main>
                <footer className="mt-12 text-center text-gray-600 text-sm">
                    <p>Drag and drop to reorder tasks • Click to mark complete • Double click to edit</p>
                </footer>
            </div>
        </div>
    )
}

export default App