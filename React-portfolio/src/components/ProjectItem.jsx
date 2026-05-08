function ProjectItem({ project, handleDelete }) {
  return (
    <div className="project-card">
      <img src={project.image} alt={project.title} />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <button onClick={() => handleDelete(project.id)}>Delete</button>
    </div>
  )
}
export default ProjectItem