import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";
import Footer from "./Components/Footer";
import About from "./Components/About";
import {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

const App = () => {
    const [showAddTask, setShowAddTask] = useState(false)

    const [tasks, setTasks] = useState([])

    // Fetch from the db
    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        getTasks()
    }, [])

    // Fetch tasks
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        return res.json()
    }

    // Fetch task
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        return res.json()
    }

    // Add Task
    const addTask = async (task) => {
        /*const id = tasks.length + 1
        const newTask = {id, ...task}
        setTasks([...tasks, newTask])*/

        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = await res.json()
        setTasks([...tasks, data])
    }

    //  Delete Task
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
        setTasks(tasks.filter((task) => task.id !== id))
    }

    // Toggle Reminder
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updTask),
        })

        const data = await res.json()

        setTasks(
            tasks.map((task) =>
                task.id === id ? {...task, reminder: data.reminder} : task
            )
        )
    }

    return (
        <Router>
            <div className="container">
                <Header title='Task Tracker' onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>

                <Route path='/' exact render={(props) => (
                    <>
                        {showAddTask && <AddTask onAdd={addTask}/>}
                        {
                            tasks.length > 0 ? (<Tasks tasks={tasks}
                                                       onDelete={deleteTask}
                                                       onToggle={toggleReminder}
                            />) : <h3>All Completed</h3>
                        }
                    </>
                )}/>
                <Route path='/about' component={About}/>
                <Footer/>
            </div>
        </Router>
    );
}


export default App;
