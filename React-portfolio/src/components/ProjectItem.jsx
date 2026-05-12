function ProjectItem({ project, onDelete }) {
  const handleDelete = () => {
    fetch(`http://localhost:3000/projects/${project.id}`, {
      method: "DELETE"
    }).then(() => onDelete(project.id));
  };

  return (
    <div className="project-item">
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <button className="delete-btn" onClick={handleDelete}>×</button>
    </div>
  );
}

export default ProjectItem;