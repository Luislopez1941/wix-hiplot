import './styles/Banner.css'

const Banner = ({ banners, item, index, dataEditContainer}: any) => {



  return (
    <div className='banner_web' style={{ backgroundImage: `url(${item.imagen})`, height:  item?.style?.heightContainer}} >
      <div className='title__container'>
        <div className={`default__class_services`} style={{ fontSize: `${item.style.fontSize}px`, color: item.style.color}}>
          {item.titulo.split('\n').map((line: any, lineIndex: any) => (
              <p key={lineIndex}>{line}</p>
            ))}
        </div>
      </div>    
    </div>
  )
}

export default Banner;
