import React, { useState } from 'react'

const AddNewNote = () => {

  const [singledata, setSingledata] = useState({
      title: '',
      content: ''
  });
  
  const handleChange = (e:any) => {
    setSingledata({
      ...singledata,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e:any) => {
    e.preventDefault();
    createNote();
  };
  
  const createNote = () => {
    fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(singledata)
    })
    .then(res => res.json())
    .then(data => {
      setSingledata({
        title: "",
        content: ""
      });
    })
    .catch(error => {
      console.error('Ha ocurrido un error:', error);
    });
  };

  return (
      <>
          <form onSubmit={handleSubmit}>
              <input 
              type="text" 
              name="title" 
              placeholder="Título" 
              onChange={handleChange} 
              value={singledata.title}
              />
              <input 
              type="text" 
              name="content" 
              placeholder="Content"
              onChange={handleChange} 
              value={singledata.content}
              />
              <button type="submit">Guardar</button>
          </form>
      </>
  )
}

export default AddNewNote