import React from 'react';
import './Services.css';

const Services: React.FC<any> = ({ item }: any) => {
  return (
    <div className="services" style={{ backgroundColor: item?.style?.background_color }}>
      <div className="services__container">
        {item.contenido.map((item: any) => (
          <div className="service__Card" style={{ backgroundColor: item?.styles?.background_card }} key={item.id}>
            <div className="service__img">
              <img src={item.image} alt={item.title} />
            </div>
            <div>
              <div className='item' style={{ textAlign: item?.styles?.text_aling_title, fontSize: item?.styles?.font_size_title, fontWeight: item?.styles?.font_weight_title, color: item?.styles?.color_title }}>
                {item.title}
              </div>
            </div>
            <div>
              <div className='item' style={{ textAlign: item?.styles?.text_aling_description, fontSize: item?.styles?.font_size_description, fontWeight: item?.styles?.font_weight_description, color: item?.styles?.color_description }}>
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
