import { useState } from 'react'
import './App.css'

function App() {
  const [projects, setProjects] = useState([
    { id: 1, title: 'react-recap', description: 'a recap about react' },
  
  ])
  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [search, setSearch] = useState('')



  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !description) return
    
    const newProject = {
      id: Date.now(),
      title,
      description
    }
    setProjects([newProject, ...projects])
    setTitle('')
    setDescription('')
  }

  const handleDelete = (id) => {
    setProjects(projects.filter(p => p.id !== id))
  }

  // const filteredProjects = projects.filter(p => 
  //   p.title.toLowerCase().includes(search.toLowerCase()) ||
  //   p.description.toLowerCase().includes(search.toLowerCase())
  // )

  return (
    <div className="app-container">
      <h1>My Portfolio</h1>
      
      <div className="project-form">
        <h2>Add New Project</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Project Title"
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
          <button type="submit">Add Project</button>
        </form>
      </div>

      <div className="project-form">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <div className="projects-grid">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <div key={project.id} className="project-item">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <button onClick={() => handleDelete(project.id)}>Delete</button>
            </div>
          ))
        ) : (
          <p style={{ color: '#666', textAlign: 'center', gridColumn: '1 / -1' }}>
            No projects found
          </p>
        )}
      </div>
    </div>
  )
}

export default App