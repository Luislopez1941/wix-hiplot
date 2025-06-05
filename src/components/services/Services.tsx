import React, { useState } from 'react'
import './Services.css'
import display from '../../assets/displays.svg'
import reconocimientos from '../../assets/reconocimientos.svg'
import gafetes from '../../assets/gafetes.svg'

const Services: React.FC = ({item}: any) => {
   

    return (
        <div className='services'>
            <div className='services__container'>
                {item.contenido.map((item: any) => (
                    <div className='service__Card' key={item.id}>
                        <div className='service__img'>
                            <img src={item.image} alt={item.title} />
                        </div>
                        <p>{item.title}</p>
                        <p>{item.description}</p>
                        <div>
                            <button>ver más</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Services
