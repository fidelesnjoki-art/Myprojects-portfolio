// import { useEffect, useState } from "react";
// import ProjectItem from "./ProjectItem";

// function ProjectList() {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://localhost:3000/projects")
//       .then(res => res.json())
//       .then(data => {
//         setProjects(data.projects || data);
//         setLoading(false);
//       });
//   }, []);

//   const handleDelete = (id) => {
//     setProjects(projects.filter(p => p.id !== id));
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="container">
//       <div className="project-list">
//         <h2>My Projects</h2>
//         {projects.length === 0 ? (
//           <p className="no-projects">No projects yet</p>
//         ) : (
//           <div className="projects-grid">
//             {projects.map(project => (
//               <ProjectItem key={project.id} project={project} onDelete={handleDelete} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProjectList;


import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snapshot = await getDocs(collection(db, "projects"));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "projects", id));
      setProjects(projects.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  if (loading) return <p>Loading projects...</p>;
  if (projects.length === 0) return <p>No projects yet. Add one!</p>;

  return (
    <div className="project-list">
      {projects.map(project => (
        <div key={project.id} className="project-item">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <button onClick={() => handleDelete(project.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;