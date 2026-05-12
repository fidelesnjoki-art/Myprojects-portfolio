// // src/App.jsx

// import { useState, useEffect } from "react"
// import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"
// import { db } from "./firebase"
// import ProjectList from "./components/ProjectList"

// function App() {
//   const [projects, setProjects] = useState([])
//   const [newTitle, setNewTitle] = useState("")
//   const [newDesc, setNewDesc] = useState("")
//   const [loading, setLoading] = useState(true)

//   const projectsRef = collection(db, "projects")

//   // Load projects from Firestore when app starts
//   useEffect(() => {
//     const getProjects = async () => {
//       const data = await getDocs(projectsRef)
//       setProjects(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
//       setLoading(false)
//     }
//     getProjects()
//   }, [])

//   // Add project to Firestore
//   const addProject = async (e) => {
//     e.preventDefault()
//     if (!newTitle.trim()) return

//     const newProject = {
//       title: newTitle,
//       description: newDesc,
//       image: ""
//     }

//     const docRef = await addDoc(projectsRef, newProject)
//     setProjects([...projects, { ...newProject, id: docRef.id }])
//     setNewTitle("")
//     setNewDesc("")
//   }

//   // Delete project from Firestore
//   const deleteProject = async (id) => {
//     await deleteDoc(doc(db, "projects", id))
//     setProjects(projects.filter(p => p.id !== id))
//   }

//   return (
//     <div className="app">
//       <h1>Projects</h1>

//       <form onSubmit={addProject}>
//         <input 
//           type="text" 
//           placeholder="Project title"
//           value={newTitle}
//           onChange={(e) => setNewTitle(e.target.value)}
//         />
//         <input 
//           type="text" 
//           placeholder="Description"
//           value={newDesc}
//           onChange={(e) => setNewDesc(e.target.value)}
//         />
//         <button type="submit">Add Project</button>
//       </form>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <ProjectList projects={projects} deleteProject={deleteProject} />
//       )}
//     </div>
//   )
// }

// export default App


import { useState, useEffect } from 'react'
import './App.css'
import ProjectList from './components/ProjectList'
import ProjectForm from './components/ProjectForm'

function App() {
  const [projects, setProjects] = useState([]);

  // GET all projects
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

  return (
    <>
      <h1>My Portfolio</h1>
      <ProjectForm addProject={addProject} />
      <ProjectList projects={projects} deleteProject={deleteProject} />
    </>
  )
}

export default App