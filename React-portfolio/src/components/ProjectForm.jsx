// 

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

function ProjectForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    try {
      const docRef = await addDoc(collection(db, "projects"), { 
        title, 
        description 
      });
      onAdd({ id: docRef.id, title, description });
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Project title"
        required 
      />
      <input 
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Project description"
        required 
      />
      <button type="submit">Add Project</button>
    </form>
  );
}

export default ProjectForm;


