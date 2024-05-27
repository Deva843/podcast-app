import React from 'react'
import "./style.css"

function Loader() {
  return (
    
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}} class="chasing-dots-loader">
        <div class="div-1"></div>
        <div class="div-2"></div>
        <div class="div-3"></div>
    </div>
    
  )
}

export default Loader