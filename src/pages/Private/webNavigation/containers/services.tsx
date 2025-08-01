import './styles/Services.css'
import '../styles/editor.css'


const services = ({ editServices, item }: any) => {


  const deleteItems = () => {

  }


  return (
    <div className="services__web-page" style={{backgroundColor: item?.style?.background_color}}>
      <div className="row__one_web">
        {item?.contenido?.map((item: any, i: number) => (
          <div className='item__service' style={{backgroundColor: item?.styles?.background_card}}>
            <div className='container__services_img_web-page' onClick={() => editServices({ type: 1, index: i })}>
              <div style={{
                borderRadius: item?.styles?.border,
                // backgroundImage: `url(${item.image})`,
                backgroundColor: item?.styles?.stutusBackground ? 'transparent' : item?.styles?.color,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                padding: item?.styles?.padding
                }}>
                <img src={item.image} alt="" />
              </div>
            </div>
            <div>
              <div className='item' style={{textAlign: item?.styles?.text_aling_title, fontSize: item?.styles?.font_size_title, fontWeight: item?.styles?.font_weight_title, color: item?.styles?.color_title}}>
                {item.title}
              </div>
            </div>
            <div>
              <div className='item' style={{textAlign: item?.styles?.text_aling_description, fontSize: item?.styles?.font_size_description, fontWeight: item?.styles?.font_weight_description, color: item?.styles?.color_description}}>
                {item.description}
              </div>
            </div>
            <div className='close' onClick={deleteItems}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-square-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19 2h-14a3 3 0 0 0 -3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3 -3v-14a3 3 0 0 0 -3 -3zm-9.387 6.21l.094 .083l2.293 2.292l2.293 -2.292a1 1 0 0 1 1.497 1.32l-.083 .094l-2.292 2.293l2.292 2.293a1 1 0 0 1 -1.32 1.497l-.094 -.083l-2.293 -2.292l-2.293 2.292a1 1 0 0 1 -1.497 -1.32l.083 -.094l2.292 -2.293l-2.292 -2.293a1 1 0 0 1 1.32 -1.497z" /></svg>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default services
