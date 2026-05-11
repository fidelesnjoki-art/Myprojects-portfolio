import { useState, useEffect } from 'react'
import './App.css'
import ProjectList from './components/ProjectList'
import ProjectForm from './components/ProjectForm'

function App() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

 
  useEffect(() => {
    fetch('/db.json')
      .then(res => res.json())
      .then(data => setProjects(data.projects))
      .catch(err => console.log('Fetch error:', err));
  }, []);

  const addProject = (newProject) => {
  const projectWithId = { ...newProject, id: Date.now() };
  setProjects([...projects, projectWithId]);
  };

  const deleteProject = (id) => {
  setProjects(projects.filter(project => project.id !== id));
    
   }


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