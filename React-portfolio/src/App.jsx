import { useState, useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import ProjectForm from './components/ProjectForm'
import ProjectList from './components/ProjectList'

function App() {
  const [projects, setProjects] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [search, setSearch] = useState('')

    useEffect(() => {
  fetch('http://localhost:3000/projects')
    .then(res => res.json())
    .then(data => {
      console.log('Fetched:', data) // ← Add this line
      setProjects(data)
    })
    .catch(err => console.log('Fetch error:', err))
}, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newProject = { title, description, image }
    
    fetch('http://localhost:3000/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProject)
    })
      .then(res => res.json())
      .then(data => {
        setProjects([...projects, data])
        setTitle('')
        setDescription('')
        setImage('')
      })
      .catch(err => console.log(err))
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/projects/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        const updatedProjects = projects.filter(project => project.id !== id)
        setProjects(updatedProjects)
      })
      .catch(err => console.log(err))
  }

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="app">
      <NavBar />
      
      <ProjectForm 
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        image={image}
        setImage={setImage}
        handleSubmit={handleSubmit}
      />

      <input 
        type="text" 
        placeholder="Search projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <ProjectList 
        projects={filteredProjects} 
        handleDelete={handleDelete} 
      />
    </div>
  )
}

export default App