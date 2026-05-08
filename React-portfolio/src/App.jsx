import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [projects, setProjects] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch("http://localhost:3001/projects")  
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setProjects(data)
      })

  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newProject = { title, description, image }

    fetch("http://localhost:3001/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject)
    })
      .then(res => res.json())
      .then(data => {
        setProjects([...projects, data])
        setTitle('')
        setDescription('')
        setImage('')
      })
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/projects/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setProjects(projects.filter(project => project.id !== id))
      })
  }

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="app">
      <h1>My Projects</h1>
     
      <form onSubmit={handleSubmit} className="project-form">
        <h2>Add New Project</h2>
        <input 
          type="text" 
          placeholder="Title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input 
          type="text" 
          placeholder="Description" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input 
          type="text" 
          placeholder="Image URL" 
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <button type="submit">Add Project</button>
      </form>

      <input 
        type="text" 
        placeholder="Search projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <div className="project-list">
        {filteredProjects.length === 0 ? <p>No projects found...</p> : 
          filteredProjects.map(project => (
            <div key={project.id} className="project-card">
              <img src={project.image} alt={project.title} width="60" height="60" />
              <div>

                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <button onClick={() => handleDelete(project.id)}>Delete</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App


