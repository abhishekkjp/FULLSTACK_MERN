import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotesModel = ({ closeModal,addNote ,currentNote,editNote}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(currentNote){
        editNote(currentNote._id , title , description) ; 
    }else{
        addNote(title,description) ; 
    }
  };

  useEffect(()=>{
    setTitle(currentNote?.title) ; 
    setDescription(currentNote?.description) ; 
  },[currentNote]) ; 

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded">
        <h2 className="text-xl font-bold mb-4">{currentNote ? "Edit note" : "Add New Note"} </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="border p-2 w-full mb-4"
          />
          <textarea
            value={ description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note Description"
            className="border p-2 w-full mb-4 resize-none h-[300px]"
          />
          <button
            type="submit"
            className="bg-blue-500  text-white px-4 py-2 rounded"
          >
            {currentNote ? "Update Note" : "Add Note"}  
          </button>
        </form>
        <button className="text-red-500 mt-4" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NotesModel;
