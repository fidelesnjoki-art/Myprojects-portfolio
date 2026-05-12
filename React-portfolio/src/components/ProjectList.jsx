import { useEffect, useState } from "react";
import ProjectItem from "./ProjectItem";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/projects")
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects || data);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="project-list">
        <h2>My Projects</h2>
        {projects.length === 0 ? (
          <p className="no-projects">No projects yet</p>
        ) : (
          <div className="projects-grid">
            {projects.map(project => (
              <ProjectItem key={project.id} project={project} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectList;