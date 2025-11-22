import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NotesModel from "../context/NotesModel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import {toast} from 'react-toastify'

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [filteredNotes,setFilterNotes] = useState(false) ; 
  const [query,setQuery] = useState('') ; 
  const navigate = useNavigate();


  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onEdit = (note) => {
    setIsModalOpen(true);
    setCurrentNote(note);
  };


  useEffect(()=>{
       setFilterNotes(notes.filter((note)=> note.title.toLowerCase().includes(query.toLowerCase()) || note.description.toLowerCase().includes(query.toLowerCase()))) ; 
  },[query,notes]) ; 

  const fetchNote = async () => {
    try {
      const { data } = await axios.get("http://localhost:5001/api/note" , {
          headers : {Authorization : `Bearers ${localStorage.getItem("token")}`}
      });
      setNotes(data.notes);
      setFilterNotes(data.notes) ; 
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNote();
  }, []);

  const addNote = async (title, description) => {
    // console.log(title,description) ;
    try {
      const response = await axios.post(
        "http://localhost:5001/api/note/add",
        {
          title,
          description,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      console.log(response);

      if (response.data.success) {
        console.log(response.data.success);
        fetchNote();
        navigate("/");
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/api/note/${id}`,
        {
          title,
          description,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCurrentNote(null) ; 
     if(response.data.success){
       fetchNote() ; 
       closeModal() ; 
     }

    } catch (error) {}
  };
  const deleteNode = async (id)=>{
      try {
        const response = await axios.delete(`http://localhost:5001/api/note/${id}` , {
          headers : {Authorization : `Bearer ${localStorage.getItem("token")}`}
       })
       if(response.data.success){
         toast.success("note-deleted") ; 
          fetchNote() ; 
       }
      } catch (error) {
         console.log(error) ; 
      }
  }
  return (
    <div>
      <Navbar setQuery={setQuery}/>

      <div className="px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredNotes.length>0 ?  filteredNotes.map((note) => (
          <NoteCard note={note} onEdit={onEdit} deleteNode={deleteNode}/>
        )) : <p>No notes</p>}
      </div>

      <button
        className="fixed text-4xl right-4 bottom-4  bg-teal-500 text-white font-bold p-4 rounded-full"
        onClick={() => setIsModalOpen(true)}
      >
        +
      </button>
      {isModalOpen && (
        <NotesModel
          closeModal={closeModal}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
          setCurrentNote={setCurrentNote}
        />
      )}
    </div>
  );
};

export default Home;
