import './styles/Services.css'
import '../styles/editor.css'

const services = ({ item }: any) => {

  const editService = (x: number) => {
    editService(x)
  }

  return (
   <div className="services__web-page">
      <div className="services__container">
        {item?.contenido?.map((item: any, i: number) => (
          <div className="service__Card" style={{backgroundColor: item?.style?.background_card}} key={i}>
            <div className="service__img">
              <div
                style={{
                  borderRadius: item?.styles?.border,
                  backgroundColor: item?.styles?.stutusBackground
                    ? 'transparent'
                    : item?.styles?.color,
                  padding: item?.styles?.padding,
                }}>
                <img src={item.image} alt="" />
              </div>
            </div>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default services
