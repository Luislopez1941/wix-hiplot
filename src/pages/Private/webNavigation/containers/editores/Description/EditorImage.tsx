import { useState, useRef } from "react";
import { useWebStore } from "../../../../../../zustand/web-page/StoreWebPage";
import './styles/EditorImage.css'

const EditorImage = ({ dataEditContainer, dataNumberService, subItems }: any) => {

  const { containers }: any = useWebStore();
  const setContainers = useWebStore(state => state.setContainers)


  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const imageURL = URL.createObjectURL(file);
    if (subItems) {
      const data = containers?.map((x: any, index: number) => {
        if (index === dataEditContainer?.index) {
          const updatedSubItems = x.contenido.map((item: any, indexTwo: number) => {
            if (dataNumberService.index === indexTwo) {
              return {
                ...item,
                image: imageURL
              };
            }
            return item;
          });

          return {
            ...x,
            contenido: updatedSubItems // Aquí se reemplaza SOLO la parte necesaria
          };
        }

        return x;
      });

      setContainers(data);
    } else {
      const data = containers?.map((x: any, index: number) => {
        if (index === dataEditContainer?.index) {
          return {
            ...x,
            imagen: imageURL
          };
        }
        return x;
      });

      setContainers(data);

    }


  }

  const [statusBackground, setStatusBackground] = useState(false)





  const borderEditor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const border = Number(e.target.value);
    if (subItems) {
      const data = containers?.map((x: any, index: number) => {
        if (index === dataEditContainer?.index) {
          const updatedSubItems = x.contenido.map((item: any, indexTwo: number) => {
            if (dataNumberService.index === indexTwo) {
              return {
                ...item,
                styles: {
                  ...item.styles,
                  border: border
                }
              };
            }
            return item;
          });

          return {
            ...x,
            contenido: updatedSubItems
          };
        }
        return x;
      });
      setContainers(data);
    } else {
      const data = containers?.map((x: any, index: number) => {
        if (index === dataEditContainer?.index) {
          return {
            ...x,
            style: {
              ...x?.style,
              border: border
            }
          };
        }
        return x;
      });


      setContainers(data);

    }


  };

  const paddingEditor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const padding = Number(e.target.value);
    if (subItems) {
      const data = containers?.map((x: any, index: number) => {
        if (index === dataEditContainer?.index) {
          const updatedSubItems = x.contenido.map((item: any, indexTwo: number) => {
            if (dataNumberService.index === indexTwo) {
              return {
                ...item,
                styles: {
                  ...item.styles,
                  padding: padding
                }
              };
            }
            return item;
          });

          return {
            ...x,
            contenido: updatedSubItems
          };
        }
        return x;
      });
      setContainers(data);
    } else {
      const data = containers?.map((x: any, index: number) => {
        if (index === dataEditContainer?.index) {
          return {
            ...x,
            style: {
              ...x?.style,
              padding: padding
            }
          };
        }
        return x;
      });
      setContainers(data);
    }
  };


  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    colorInputRef.current?.click();
  };
  const changeTextColor = (color: string) => {
    if (subItems) {
      const data = containers?.map((x: any, index: number) => {
        if (index === dataEditContainer?.index) {
          const updatedSubItems = x.contenido.map((item: any, indexTwo: number) => {
            if (dataNumberService.index === indexTwo) {
              return {
                ...item,
                styles: {
                  ...item.styles,
                  color: color
                }
              };
            }
            return item;
          });
          return {
            ...x,
            contenido: updatedSubItems
          };
        }
        return x;
      });
      setContainers(data);
    } else {
      const data = containers?.map((x: any, index: number) => {
        if (index === dataEditContainer?.index) {
          return {
            ...x,
            style: {
              ...x?.style,
              color: color
            }
          };
        }
        return x;
      });


      setContainers(data);
    }


  };


  const background = () => {
    setStatusBackground(!statusBackground)
    if (subItems) {
      const data = containers?.map((x: any, index: number) => {
        if (index === dataEditContainer?.index) {
          const updatedSubItems = x.contenido.map((item: any, indexTwo: number) => {
            if (dataNumberService.index === indexTwo) {
              return {
                ...item,
                styles: {
                  ...item.styles,
                  stutusBackground: statusBackground
                }
              };
            }
            return item;
          });
          return {
            ...x,
            contenido: updatedSubItems
          };
        }
        return x;
      });
      setContainers(data);
    } else {
      const data = containers?.map((x: any, index: number) => {
        if (index === dataEditContainer?.index) {
          return {
            ...x,
            style: {
              ...x?.style,
              stutusBackground: statusBackground
            }
          };
        }
        return x;
      });
      setContainers(data);
    }
  }



  return (
    <div className="item_web-page">

      <div className="editing__tools_image">
        <div className="row__one">
          <div>
            <p>Imagen</p>
            <div className="container__change_banner_update item_web-page" >
              <div className='image' style={{ backgroundImage: `url(${dataEditContainer?.item?.contenido[dataEditContainer.index]?.image})` }}>

              </div>
              <label className="custom-file-upload">
                <small> Seleccionar archivo</small>
                <input id="file-upload1" type="file" onChange={handleImageChange} />
              </label>
            </div>

          </div>
        </div>
        <div>
          <div className="slider-container-height">
            <div>
              <p>Border</p>
              <input
                type="range"
                min="1"
                max="500"
                className="slider__editor_wep-page"
                onChange={borderEditor}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="slider-container-height">
            <div>
              <p>Pading</p>
              <input
                type="range"
                min="1"
                max="50"
                className="slider__editor_wep-page"
                onChange={paddingEditor}
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            <p>Background</p>
            {statusBackground ? <button onClick={background}>Desactivar</button> : <button onClick={background}>Activar</button>}
          </div>
          {statusBackground ?
            <div className="color__editor_container">
              <svg onClick={handleIconClick} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="22px" height="18px" className="symbol-textForeColor">
                <path fill="#000000" fillRule="evenodd" d="M 17 3C 17 3 27.03 17 17 17 6.9 17 17 3 17 3Z" />
                <path fillRule="evenodd" d="M 16.96 18C 13.35 18 12 14.95 12 13.03 12 9.97 15.69 4.09 16.12 3.43 16.12 3.43 16.95 2.12 16.95 2.12 16.95 2.12 17.8 3.42 17.8 3.42 18.23 4.08 22 9.97 22 13.03 22 15.09 20.44 18 16.96 18ZM 16.96 3.97C 16.96 3.97 13 10.18 13 13.03 13 14.52 14.02 16.99 16.96 16.99 19.89 16.99 21 14.52 21 13.03 21 10.18 16.96 3.97 16.96 3.97ZM 3.6 9.02C 3.6 9.02 2 13.03 2 13.03 2 13.03-0 13.03-0 13.03-0 13.03 5 1 5 1 5 1 6 0 6 0 6 0 7 0 7 0 7 0 8 1 8 1 8 1 11 7.01 11 7.01 11 7.01 11 11.02 11 11.02 11 11.02 9.4 9.02 9.4 9.02 9.4 9.02 3.6 9.02 3.6 9.02ZM 7 3.01C 7 3.01 6 3.01 6 3.01 6 3.01 4.4 7.01 4.4 7.01 4.4 7.01 8.6 7.01 8.6 7.01 8.6 7.01 7 3.01 7 3.01Z" />
              </svg>
              <input type="color" onChange={(e) => changeTextColor(e.target.value)} ref={colorInputRef} className="color-picker-input" />
            </div>
            :
            ''
          }
        </div>
      </div>
    </div>
  );
};

export default EditorImage;
