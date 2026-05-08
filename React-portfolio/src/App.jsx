import { useState, useEffect } from 'react'
import './App.css'
import ProjectList from './components/ProjectList'
import ProjectForm from './components/ProjectForm'

function App() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch("http://localhost:3000/projects")
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.log('Fetch error:', err));
  }, []);

  const addProject = (newProject) => {
    fetch("http://localhost:3000/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject)
    })
      .then(res => res.json())
      .then(data => setProjects([...projects, data]));
  };

  const deleteProject = (id) => {
    fetch(`http://localhost:3000/projects/${id}`, {
      method: "DELETE"
    })
      .then(() => setProjects(projects.filter(project => project.id !== id)));
  };

  const filteredProjects = projects.filter(project => {
    return (
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <h1>My Portfolio</h1>
      
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search projects by title or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      <ProjectForm addProject={addProject} />
      <ProjectList projects={filteredProjects} deleteProject={deleteProject} />
    </>
  )
}

export default App