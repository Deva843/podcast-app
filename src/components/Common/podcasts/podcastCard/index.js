import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

export default function PodcastCard({id,tittle,displayImage}) {
  return (<>
  <Link to={`/podcast/${id}`}>
    <div className='podcast-card'>
        <img  className="display-image-podcast" src={displayImage} alt={tittle} />
        <p className='tittle-podcast'>{tittle}</p>
    </div>
    </Link>
    </>
  )
}
