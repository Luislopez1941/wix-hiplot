import React from 'react';
import './styles/Description.css';


const Description: React.FC<any> = ({ item }) => {

    return (
        <div className='collections__web-page'>
            <div className='collections__web-page_container'>
                <div style={{ borderRadius: item?.style?.border, backgroundColor: item?.style?.stutusBackground ? 'transparent' : item?.style?.color, padding: item?.style?.padding }}>
                    <img className='imagen__description' src={item.imagen} alt="" />
                </div>
                <div className='right'>
                    <div>
                        <div className={`default__class_services `} style={{ fontSize: `${item.fontSize1}px`, color: item.color1 }}>{item.titulo}</div>
                        <p className={`default__class_services `} style={{ fontSize: `${item.fontSize2}px`, color: item.color2 }}>{item.descripcion}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Description;
