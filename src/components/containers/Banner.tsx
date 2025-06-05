import './styles/Banner.css'

const Banner = ({item}: any) => {

  return (
    <div className='banner_web' style={{ backgroundImage: `url(${item?.imagen})`, height: item?.style?.heightContainer || '' }} >
      <div className='title__container'>
        <div className={`default__class_services`}>
          {item?.titulo.split('\n').map((line: any, lineIndex: any) => (
              <p key={lineIndex}>{line}</p>
          ))}
        </div>
      </div>    
    </div>
  )
}

export default Banner;
