import React, { useState } from 'react'
import "./style.css"
import { toast } from 'react-toastify'

function FileInput({accept,id,fileHandlefn,text,type}) {
    const [fileSelected,setFileSelected] = useState("")
    const onChange = (e)=>{
        console.log("files",e.target.files)
        setFileSelected(e.target.files[0].name || "");
        toast.success(`${type ? type +" file":"image"} added`);
        fileHandlefn(e.target.files[0],setFileSelected)

    }
    
  return (
    <div  >
    <label htmlFor={id} className={`custom-input-lable ${fileSelected && "Active"}`}>
        {fileSelected ? `${type=="audio"?"audio file":"image"} selected`:text}
    </label>
    <input type={"file"}
     accept={accept}
     id={id}
     name={id}
     style ={{display:"none"}}
     onChange={onChange}/>
    </div>
  )
}

export default FileInput