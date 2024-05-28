import React from 'react'
import Button from '../../Button'

function EpisodeDetails({tittle,index,description,audioFile,onClick}) {
  return (
    <div style={{width:"100%",boxShadow:"1px 1px 10px grey",borderRadius:"10px",padding:"1rem",margin:"1rem"}}>
        <h1 style ={{textAlign:"left",marginBottom:"0"}}>{index}.{tittle}</h1>
        <p style = {{marginLeft:"1.5rem"}} className='podcast-desc'>{description}</p>
        <Button style = {{width :"120px",marginLeft:"1rem"}} text = {"play"} onClick={()=>onClick(audioFile)}/>
        {/* <hr style={{margin:"10px" ,visibility:"hidden"}}/> */}
    </div>
  )
}

export default EpisodeDetails