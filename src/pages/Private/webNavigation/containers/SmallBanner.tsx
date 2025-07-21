import './styles/SmallBanner.css'

const SmallBanner = ({copyContainer, index}: any) => {
  // Parsear el contenido JSON si existe
  const contenido = copyContainer[index]?.contenido ? 
    (typeof copyContainer[index].contenido === 'string' ? 
      JSON.parse(copyContainer[index].contenido) : 
      copyContainer[index].contenido) : 
    {};

  return (
    <div className='small-banner_web' style={{ backgroundImage: `url(${copyContainer[index].imagen})` }}>
        <div className='title__container'>
            <div>
                <div 
                  className={`title__content ${copyContainer[index].textAlign1 || ''} ${copyContainer[index].fontWeight1}`} 
                  style={{ 
                    fontSize: `${contenido.title?.styles?.font_size || copyContainer[index].fontSize1 || 14}px`, 
                    color: contenido.title?.styles?.color || copyContainer[index].color1 || '#fff'
                  }}
                >
                  {contenido.title?.text || copyContainer[index].titulo}
                </div>
                <div 
                  className={`default__class_services ${copyContainer[index].textAlign2 || '' } ${copyContainer[index].fontWeight2}`}  
                  style={{ 
                    fontSize: `${contenido.subtitle?.styles?.font_size || copyContainer[index].fontSize2 || 12}px`, 
                    color: contenido.subtitle?.styles?.color || copyContainer[index].color2 || '#fff'
                  }}
                >
                  {contenido.subtitle?.text || copyContainer[index].imagen4}
                </div>
                
                {/* Botón */}
                {contenido.button && (
                  <button 
                    className="small-banner__button"
                    style={{
                      backgroundColor: contenido.button.styles?.background || '#000',
                      color: contenido.button.styles?.color || '#fff',
                      fontSize: `${contenido.button.styles?.font_size || 14}px`,
                      padding: '10px 20px',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '500',
                      transition: 'all 0.2s ease',
                      marginTop: '12px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.8';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {contenido.button.text || 'Ver más'}
                  </button>
                )}
            </div>
        </div>
    </div>
  )
}

export default SmallBanner
