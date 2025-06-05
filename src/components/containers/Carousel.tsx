import React, { useRef, useEffect, useState } from 'react';
import './styles/Carrucel.css';
import { storeArticles } from '../../zustand/Articles';
import APIs from '../../services/services/APIs';
import useUserStore from '../../zustand/General';

const Carousel: React.FC<any> = ({ selectedTypeFamily, item }: any) => {
  const carouselRef = useRef<HTMLUListElement>(null);
  const [cardWidth] = useState(0);
  const userState = useUserStore(state => state.user);
  const user_id = userState.id

  const [articles, setArticles] = useState<any>([])

  const fetch = async () => {

    // let families: any = await APIs.getFamilies(user_id)

    const data = {
      id: 0,
      activos: true,
      nombre: 0,
      codigo: 0,
      familia: selectedTypeFamily == undefined ? item.id_familia : selectedTypeFamily.id,
      proveedor: 0,
      materia_prima: 0,
      get_imagenes: true,
      page: 1,
      id_usuario: user_id
    }


    let response = await APIs.getArticles(data)
    setArticles(response)

  }

  console.log('articles', articles)
  useEffect(() => {
    fetch()
  }, [selectedTypeFamily])

  console.log(selectedTypeFamily)



  useEffect(() => {
    const handleResize = () => {

    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScroll = (scrollAmount: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className='carousel__web--page'>
      <div className='carousel__web--page_container'>
        <div className='title__families'>
          <p>{selectedTypeFamily == undefined ? item.familia : selectedTypeFamily.nombre}</p>
        </div>
        <div className="wrapper">
          <div className='angle' onClick={() => handleScroll(cardWidth)}>
            <svg width='15' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
          </div>
          <ul ref={carouselRef} className="carousel">
            {articles.map((x: any) => (
              <div className="card">
                <div className="img"><img src={x?.imagen} alt="img" draggable="false" /></div>
                <p className='title__article'>{x?.nombre}</p>
                <small className='description__text'>{x.descripcion}</small>
              </div>
            ))}

          </ul>
          <div className='angle' onClick={() => handleScroll(cardWidth)}>
            <svg width='15' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
