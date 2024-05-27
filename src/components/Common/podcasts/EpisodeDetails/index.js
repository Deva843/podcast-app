import React from 'react'
import Button from '../../Button'

function EpisodeDetails({tittle,index,description,audioFile,onClick}) {
  return (
    <div style={{width:"100%",borderBottom:"2px dotted var(--purple-grey)"}}>
        <h1 style ={{textAlign:"left",marginBottom:"0"}}>{index}.{tittle}</h1>
        <p style = {{marginLeft:"1.5rem"}} className='podcast-desc'>{description}</p>
        <Button style = {{width :"120px",marginLeft:"1rem"}} text = {"play"} onClick={()=>onClick(audioFile)}/>
        {/* <hr style={{margin:"10px" ,visibility:"hidden"}}/> */}
    </div>
  )
}

export default EpisodeDetails