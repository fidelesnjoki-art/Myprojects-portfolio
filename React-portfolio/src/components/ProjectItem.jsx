import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

function ProjectItem({ project, onDelete }) {
  
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'projects', project.id))
      onDelete(project.id)
    } catch (error) {
      console.error("Error deleting project: ", error)
    }
  };

  return (
    <div className="project-item">
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <button className="delete-btn" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default ProjectItem;