import './styles/Services.css'
import '../styles/editor.css'

const services = ({ item }: any) => {

  const editService = (x: number) => {
    editService(x)
  }



  return (
    <div className="services__web-page">
      {item?.contenido?.map((item: any, i: number) => (
        <div className='item__service'>
          <div className='container__services_img_web-page'>
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
            <div className='item'>
              {item.title}
            </div>
          </div>
          <div>
            <div className='item'>
              {item.description}
            </div>
          </div>
  
        </div>
      ))}

    </div>
  )
}

export default services
