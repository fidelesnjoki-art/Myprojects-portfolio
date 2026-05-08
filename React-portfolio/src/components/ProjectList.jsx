import ProjectItem from './ProjectItem'

function ProjectList({ projects, handleDelete }) {
  return (
    <div className="project-list">
      {projects.map(project => (
        <ProjectItem 
          key={project.id} 
          project={project} 
          handleDelete={handleDelete} 
        />
      ))}
    </div>
  )
}
export default ProjectList