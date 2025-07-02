import { useState, useRef } from "react";
import { useWebStore } from "../../../../../zustand/web-page/StoreWebPage";
import './styles/EditorBanner.css'
import "./styles/EditorBanner.css";
import { useEditorBannerStore } from "../../../../../zustand/web-page/EditorBanner";


interface BannerData {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  backgroundColor: string;
  textColor: string;
  buttonText: string;
  buttonLink: string;
}

const fontWeights = [
  { id: 100, name: "Thin" },
  { id: 200, name: "Extra Light" },
  { id: 300, name: "Light" },
  { id: 400, name: "Normal" },
  { id: 500, name: "Medium" },
  { id: 600, name: "Semi Bold" },
  { id: 700, name: "Bold" },
  { id: 800, name: "Extra Bold" },
  { id: 900, name: "Black" },
];

const EditorBanner = ({ indexContainer }: any) => {
  const { containers }: any = useWebStore();
  const { dataEditContainer }: any = useEditorBannerStore();

  const setContainers = useWebStore(state => state.setContainers)

  

  // Text styling states
  const [selectTypesFontWeight, setSelectTypesFontWeight] = useState(false);
  const [selectedTypeFontWeight, setSelectedTypeFontWeight] = useState(400);
  const [selectedColor, setSelectedColor] = useState("#000000");
  // const [fontSize, setFontSize] = useState(14);
  // const [textAlign, setTextAlign] = useState("left");
  const [content, setContent] = useState("Contenido de ejemplo para editar");
  const [description, setDescription] = useState("Contenido de ejemplo para editar");
  const [heightContainer, setHeightContainer] = useState(600);

  // Banner properties states
  const [bannerData, setBannerData] = useState<BannerData>({
    title: "Discover Amazing\nExperiences",
    subtitle: "Welcome to Innovation",
    description:
      "Transform your digital presence with cutting-edge solutions designed for the modern world.",
    backgroundImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    backgroundColor: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    textColor: "#ffffff",
    buttonText: "Get Started",
    buttonLink: "#",
  });



  const colorInputRef = useRef<HTMLInputElement>(null);

  const openSelectFontWeightSections = () => {
    setSelectTypesFontWeight(!selectTypesFontWeight);
  };

  const handleFontWeightChange = (font: any) => {
    setSelectedTypeFontWeight(font.id);
    setSelectTypesFontWeight(false);
  };

  const changeTextColor = (color: string) => {
    setSelectedColor(color);
  };

  const handleIconClick = () => {
    colorInputRef.current?.click();
  };

  // const changeFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFontSize(Number(e.target.value));
  // };

  const textCentering = (_: string) => {
    // setTextAlign(alignment);
  };



  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);

    const data = containers?.map((x: any, index: number) => {
      if (index === indexContainer) {
        const contentIndex = x.contenido?.index; // obtenemos el índice desde contenido
        const updatedData = x.contenido?.data?.map((item: any, subIndex: number) => {
          if (subIndex === contentIndex) {
            return {
              ...item,
              title: e.target.value,
            };
          }
          return item;
        });

        return {
          ...x,
          contenido: {
            ...x.contenido,
            data: updatedData,
          },
        };
      }
      return x;
    });

    setContainers(data);
  };


  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);

    const data = containers?.map((x: any, index: number) => {
      if (index === dataEditContainer?.index) {
        const contentIndex = x.contenido?.index;
        const updatedData = x.contenido?.data.map((item: any, subIndex: number) => {
          if (subIndex === contentIndex) {
            return {
              ...item,
              description: e.target.value,
            };
          }
          return item;
        });

        return {
          ...x,
          contenido: {
            ...x.contenido,
            data: updatedData,
          },
        };
      }
      return x;
    });

    setContainers(data);
  };




  const containerEditor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeightContainer(Number(e.target.value));
  };


  const updateBannerProperty = (property: keyof BannerData, value: string) => {
    setBannerData((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  return (
    <div className="editor__banner">
      <div className="editor-container_banner">
        {/* Text Styling Tools */}
        <div className="editing__tools_banner">
          <h3 className="section-title">Editor banner</h3>
          <div className="row__one">
            <div className="row__one">
              <div className="select__container-font-weight">
                <div className="select-btn__general">
                  <div className={`select-btn ${selectTypesFontWeight ? "active" : ""}`} onClick={openSelectFontWeightSections}>
                    <div className="select__container_title">
                      <p>
                        {fontWeights.find((s) => s.id === selectedTypeFontWeight)
                          ?.name || "Peso"}
                      </p>
                    </div>
                    <svg className="chevron__down" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                      <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                    </svg>
                  </div>
                  <div className={`content ${selectTypesFontWeight ? "active" : ""}`}>
                    <ul className={`options ${selectTypesFontWeight ? "active" : ""}`} style={{ opacity: selectTypesFontWeight ? "1" : "0" }}>
                      {fontWeights.map((font: any) => (
                        <li key={font.id} onClick={() => handleFontWeightChange(font)} >
                          <div dangerouslySetInnerHTML={{ __html: font.name }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <svg className="icon_text" onClick={() => textCentering("left")} width="24" height="24" focusable="false">
                <path d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2Zm0 4h8c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2Zm0 8h8c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2Zm0-4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2Z" fillRule="evenodd" />
              </svg>
              <svg className="icon_text" onClick={() => textCentering("center")} width="24" height="24" focusable="false" >
                <path d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2Zm3 4h8c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 1 1 0-2Zm0 8h8c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 0 1 0-2Zm-3-4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2Z" fillRule="evenodd" />
              </svg>
              <svg className="icon_text" onClick={() => textCentering("right")} width="24" height="24" focusable="false">
                <path d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2Zm6 4h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm0 8h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm-6-4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2Z" fillRule="evenodd" />
              </svg>
            </div>
            <div className="color__editor_container">
              <svg onClick={handleIconClick} xmlns="http://www.w3.org/2000/svg" width="22px" height="18px" className="symbol-textForeColor">
                <path fill="#000000" fillRule="evenodd" d="M 17 3C 17 3 27.03 17 17 17 6.9 17 17 3 17 3Z" />
                <path fillRule="evenodd" d="M 16.96 18C 13.35 18 12 14.95 12 13.03 12 9.97 15.69 4.09 16.12 3.43 16.12 3.43 16.95 2.12 16.95 2.12 16.95 2.12 17.8 3.42 17.8 3.42 18.23 4.08 22 9.97 22 13.03 22 15.09 20.44 18 16.96 18ZM 16.96 3.97C 16.96 3.97 13 10.18 13 13.03 13 14.52 14.02 16.99 16.96 16.99 19.89 16.99 21 14.52 21 13.03 21 10.18 16.96 3.97 16.96 3.97ZM 3.6 9.02C 3.6 9.02 2 13.03 2 13.03 2 13.03-0 13.03-0 13.03-0 13.03 5 1 5 1 5 1 6 0 6 0 6 0 7 0 7 0 7 0 8 1 8 1 8 1 11 7.01 11 7.01 11 7.01 11 11.02 11 11.02 11 11.02 9.4 9.02 9.4 9.02 9.4 9.02 3.6 9.02 3.6 9.02ZM 7 3.01C 7 3.01 6 3.01 6 3.01 6 3.01 4.4 7.01 4.4 7.01 4.4 7.01 8.6 7.01 8.6 7.01 8.6 7.01 7 3.01 7 3.01Z" />
              </svg>
              <input type="color" value={selectedColor} onChange={(e) => changeTextColor(e.target.value)} ref={colorInputRef} className="color-picker-input" />
            </div>
          </div>
        </div>

        {/* Content Editor */}
        {/* <div className="content-editor">
          <label className="section-title">Contenido del Editor</label>
          <textarea
            className="input__editor"
            style={{
              textAlign: textAlign as any,
              fontWeight: selectedTypeFontWeight,
              fontSize: fontSize,
              color: selectedColor,
            }}
            value={content}
            onChange={handleTitleContainerChange}
          />
        </div> */}

        {/* Container Height */}
        <div className="row__two">
          <div className="slider-container-height">
            <div>
              <p>Tamaño del contenedor</p>
              <input
                type="range"
                min="200"
                max="1000"
                value={heightContainer}
                onChange={containerEditor}
                className="slider__editor_wep-page"
              />
            </div>
            <div className="container__px">{`${heightContainer} px`}</div>
          </div>
        </div>

        {/* Banner Properties */}
        <div className="banner-properties">
          <h3 className="section-title">Propiedades del Banner</h3>

          <div className="property-group">
            <label>Título</label>
            <textarea
              className="property-input property-textarea"
              value={content}
              onChange={handleTitleChange}
              placeholder="Título principal del banner"
            />
          </div>

          <div className="property-group">
            <label>Subtítulo</label>
            <input
              type="text"
              className="property-input"
              value={bannerData.subtitle}
              onChange={(e) => updateBannerProperty("subtitle", e.target.value)}
              placeholder="Subtítulo del banner"
            />
          </div>

          <div className="property-group">
            <label>Descripción</label>
            <textarea
              className="property-input property-textarea"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Descripción del banner"
            />
          </div>

          <div className="property-group">
            <label>Imagen de Fondo (URL)</label>
            <input
              type="url"
              className="property-input"
              value={bannerData.backgroundImage}
              onChange={(e) =>
                updateBannerProperty("backgroundImage", e.target.value)
              }
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div className="property-group">
            <label>Color de Fondo (CSS)</label>
            <input
              type="text"
              className="property-input"
              value={bannerData.backgroundColor}
              onChange={(e) =>
                updateBannerProperty("backgroundColor", e.target.value)
              }
              placeholder="linear-gradient(135deg, #1e293b 0%, #334155 100%)"
            />
          </div>

          <div className="property-group">
            <label>Color del Texto</label>
            <div className="color-input-wrapper">
              <div
                className="color-preview"
                style={{ backgroundColor: bannerData.textColor }}
                onClick={() => {
                  const colorInput = document.createElement("input");
                  colorInput.type = "color";
                  colorInput.value = bannerData.textColor;
                  colorInput.onchange = (e) => {
                    const hex = (e.target as HTMLInputElement).value;
                    updateBannerProperty("textColor", hex);
                  };
                  colorInput.click();
                }}
              />
              <input
                type="text"
                className="property-input"
                value={bannerData.textColor}
                onChange={(e) =>
                  updateBannerProperty("textColor", e.target.value)
                }
                placeholder="#ffffff"
              />
            </div>
          </div>

          <div className="property-group">
            <label>Texto del Botón</label>
            <input
              type="text"
              className="property-input"
              value={bannerData.buttonText}
              onChange={(e) =>
                updateBannerProperty("buttonText", e.target.value)
              }
              placeholder="Texto del botón"
            />
          </div>

          <div className="property-group">
            <label>Enlace del Botón</label>
            <input
              type="url"
              className="property-input"
              value={bannerData.buttonLink}
              onChange={(e) =>
                updateBannerProperty("buttonLink", e.target.value)
              }
              placeholder="#"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditorBanner;
