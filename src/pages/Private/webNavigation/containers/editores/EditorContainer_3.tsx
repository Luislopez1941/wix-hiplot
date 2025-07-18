import { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import "./styles/EditorContainer_3.css";
import { useWebStore } from "../../../../../zustand/web-page/StoreWebPage";
import { Palette } from "lucide-react";

const EditorContainer_3 = ({ indexContainer }: any) => {
  const colorInputRef = useRef<HTMLInputElement>(null)
  const { containers }: any = useWebStore();
  const setContainers = useWebStore(state => state.setContainers)


  const [isUploading, setIsUploading] = useState(false);

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true);
      try {
        for (const file of acceptedFiles) {
          await addCompanyImage(file);
        }
      } catch (error) {
        console.error("Error procesando imágenes:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [],
  );


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const addCompanyImage = async (file: File | null) => {
    if (!file) return;

    try {
      const base64 = await convertFileToBase64(file);
      const data = containers?.map((x: any, index: number) => {
        if (index === indexContainer) {
          return {
          ...x,
          contenido: {
            ...x.contenido,
            image: {
              ...x.contenido.image,
              image: base64
            }
          }
        };
        }
        return x;
      });

      setContainers(data);
    } catch (error) {
      console.error("Error al agregar imagen:", error);
    }
  };




  const handleIconClick = () => {
    colorInputRef.current?.click()
  }


  ///////////////////////////////CHNAGE OF BACKGROUND///////////////////////////////////////////
  const changeBackgroundColor = (color: string) => {
    const data = containers?.map((x: any, index: number) => {
      if (index === indexContainer) {
        return {
          ...x,
          style: {
            ...x.style,
            background: color,
          }
        };
      }
      return x;
    });
    setContainers(data);
  }











  ////////////////////////////////INPUT OF TITLE/////////////////////////////////////////////
  const changeTextColorTitle = (color: string) => {
    const data = containers?.map((x: any, index: number) => {
      if (index === indexContainer) {
        return {
          ...x,
          contenido: {
            ...x.contenido,
            title: {
              ...x.contenido.title,
              styles: {
                ...x.contenido.title.styles,
                color: color,
              }
            }
          }
        };
      }
      return x;
    });
    setContainers(data);
  }

  const changeFontSizeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = containers?.map((x: any, index: number) => {
      if (index === indexContainer) {
        return {
          ...x,
          contenido: {
            ...x.contenido,
            title: {
              ...x.contenido.title,
              styles: {
                ...x.contenido.title.styles,
                font_size: e.target.value,
              }
            }
          }
        };
      }
      return x;
    });
    setContainers(data);
  };



  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = containers?.map((x: any, index: number) => {
      if (index === indexContainer) {
        return {
          ...x,
          contenido: {
            ...x.contenido,
            title: {
              ...x.contenido.title,
              text: e.target.value,
            }
          }
        };
      }
      return x;
    });
    setContainers(data);
  };








    const changeTextColorDescription = (color: string) => {
    const data = containers?.map((x: any, index: number) => {
      if (index === indexContainer) {
        return {
          ...x,
          contenido: {
            ...x.contenido,
            description: {
              ...x.contenido.description,
              styles: {
                ...x.contenido.description.styles,
                color: color,
              }
            }
          }
        };
      }
      return x;
    });
    setContainers(data);
  }

  const changeFontSizeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = containers?.map((x: any, index: number) => {
      if (index === indexContainer) {
        return {
          ...x,
          contenido: {
            ...x.contenido,
            description: {
              ...x.contenido.description,
              styles: {
                ...x.contenido.description.styles,
                font_size: e.target.value,
              }
            }
          }
        };
      }
      return x;
    });
    setContainers(data);
  };


  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const data = containers?.map((x: any, index: number) => {
      if (index === indexContainer) {
        return {
          ...x,
          contenido: {
            ...x.contenido,
            description: {
              ...x.contenido.description,
              text: e.target.value,
            }
          }
        };
      }
      return x;
    });
    setContainers(data);

  };

  const handleRemoveCompany = (companyId: string) => {
    const data = containers?.map((x: any, index: number) => {
      if (index === indexContainer) {
        const filteredData = x.contenido?.data.filter(
          (item: any) => item.id !== companyId
        );

        return {
          ...x,
          contenido: {
            ...x.contenido,
            data: filteredData,
          },
        };
      }
      return x;
    });

    setContainers(data);
  };


  return (
    <div className="container_3 container_3-editor">
      <div className="container_3__editor-container">
        {/* Header Controls */}
        <div className="container_3__header-controls">
          <h3 className="container_3__section-title">Editor del container_3</h3>
          <div className="container_3__property-group">
            <div>
              <p>Color de fondo</p>
              <div className="container_3_container__color_picker">
                <button
                  className="container_3_container__color_button"
                  onClick={handleIconClick}
                  style={{ backgroundColor: containers[indexContainer]?.contenido?.style?.background }}
                  type="button"
                >
                  <Palette size={16} className="container_3_container__color_icon" />
                </button>
                <input
                  type="color"
                  value={containers[indexContainer]?.contenido?.style?.color}
                  onChange={(e) => changeBackgroundColor(e.target.value)}
                  ref={colorInputRef}
                  className="container_3_container__color_input"
                />
              </div>
            </div>

            <div>
              <label className="container_3__toolbar_label">Color</label>
              <div>
                <div className="container_3_title__color_picker">
                  <button
                    className="container_3_title__color_button"
                    onClick={handleIconClick}
                    style={{ background: containers[indexContainer]?.contenido?.title?.styles?.color }}
                    type="button"
                  >
                    <Palette size={16} className="container_3_title__color_icon" />
                  </button>
                  <input
                    type="color"
                    value={containers[indexContainer]?.contenido?.title?.styles?.color}
                    onChange={(e) => changeTextColorTitle(e.target.value)}
                    ref={colorInputRef}
                    className="container_3_title__color_input"
                  />
                </div>
              </div>
              <div>
                <div className="container_3__size_section">
                  <div className="container_3__size_header">
                    <label className="container_3__toolbar_label">Tamaño de fuente</label>
                    <span className="container_3__size_value">{containers[indexContainer]?.contenido?.title?.styles?.font_size}px</span>
                  </div>
                  <div className="container_3__size_slider_container">
                    <input
                      type="range"
                      min="8"
                      max="72"
                      value={containers[indexContainer]?.contenido?.title?.styles?.font_size}
                      onChange={changeFontSizeTitle}
                      className="container_3__size_slider"
                    />
                    <div className="container_3__size_marks">
                      <span className="container_3__size_mark">8px</span>
                      <span className="container_3__size_mark">72px</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label>Título del container_3</label>
                <input
                  type="text"
                  className="container_3__property-input"
                  value={containers[indexContainer]?.contenido?.title?.text}
                  onChange={handleTitleChange}
                  placeholder="Título principal"
                />
              </div>
            </div>




          </div>
          <label className="container_3__toolbar_label">Color</label>
          <div>
            <div className="container_3_title__color_picker">
              <button
                className="container_3_title__color_button"
                onClick={handleIconClick}
                style={{ background: containers[indexContainer]?.contenido?.title?.styles?.color }}
                type="button"
              >
                <Palette size={16} className="container_3_title__color_icon" />
              </button>
              <input
                type="color"
                value={containers[indexContainer]?.contenido?.title?.styles?.color}
                onChange={(e) => changeTextColorDescription(e.target.value)}
                ref={colorInputRef}
                className="container_3_title__color_input"
              />
            </div>
          </div>
          <div>
            <div className="container_3__size_section">
              <div className="container_3__size_header">
                <label className="container_3__toolbar_label">Tamaño de fuente</label>
                <span className="container_3__size_value">{containers[indexContainer]?.contenido?.title?.styles?.font_size}px</span>
              </div>
              <div className="container_3__size_slider_container">
                <input
                  type="range"
                  min="8"
                  max="72"
                  value={containers[indexContainer]?.contenido?.title?.styles?.font_size}
                  onChange={changeFontSizeDescription}
                  className="container_3__size_slider"
                />
                <div className="container_3__size_marks">
                  <span className="container_3__size_mark">8px</span>
                  <span className="container_3__size_mark">72px</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label>Título del container_3</label>
            <input
              type="text"
              className="container_3__property-input"
              value={containers[indexContainer]?.contenido?.title?.text}
              onChange={handleTitleChange}
              placeholder="Título principal"
            />
          </div>
          <div className="container_3__property-group">
            <label>Subtítulo</label>
            <textarea
              className="container_3__property-input container_3__property-textarea"
              value={containers[indexContainer]?.contenido?.description?.text}
              onChange={handleDescriptionChange}
              placeholder="Descripción del container_3"
            />
          </div>
        </div>

        {/* Upload Area */}
        <div className="container_3__upload-section">
          <h4 className="container_3__section-title">Agregar Empresas</h4>
          <div
            {...getRootProps()}
            className={`container_3__upload-area ${isDragActive ? "active" : ""}`}
          >
            <input {...getInputProps()} />
            <div className="container_3__upload-content">
              {isUploading ? (
                <div className="container_3__uploading">
                  <div className="container_3__spinner"></div>
                  <p>Procesando imágenes...</p>
                </div>
              ) : (
                <>
                  <svg
                    className="container_3__upload-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    width="48"
                    height="48"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <div>
                    <p className="container_3__upload-text">
                      {isDragActive
                        ? "Suelta las imágenes aquí..."
                        : "Arrastra imágenes aquí o haz clic para seleccionar"}
                    </p>
                    <p className="container_3__upload-subtext">
                      Soporta múltiples archivos JPG, PNG, WebP
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Companies List */}
        <div className="container_3__companies-section">
          <div className="container_3__section-header">
            {/* <h4 className="container_3__section-title">
              Empresas ({container_3Data.data.length})
            </h4> */}
            {/* <button
              className="container_3__clear-btn"
              onClick={() => {
                if (confirm("¿Estás seguro de eliminar todas las empresas?")) {
                  // Clear all companies by setting empty array
                  usecontainer_3Store.getState().reorderCompanies([]);
                }
              }}
              disabled={container_3Data.data.length === 0}
            >
              Limpiar Todo 
            </button> */}
          </div>

          <div className="container_3__companies-grid">
            {containers[indexContainer]?.contenido?.data?.map((company: any) => (
              <div key={company.id} className="container_3__company-card">
                {/* Imagen de la empresa */}
                <div className="container_3__company-image-container">
                  <img
                    src={company.image}
                    alt={company.name}
                    className="container_3__company-image"
                  />
                  <div className="container_3__company-overlay">
                    {/* Botón para cambiar la imagen */}


                    {/* Botón para eliminar empresa */}
                    <button
                      className="container_3__remove-btn"
                      onClick={() => handleRemoveCompany(company.id)}
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Mostrar solo el nombre, sin editar */}
                <div className="container_3__company-info">
                  <h5 className="container_3__company-name">{company.name}</h5>
                </div>
              </div>
            ))}




          </div>
        </div>

      </div>
    </div>
  );
};

export default EditorContainer_3;
