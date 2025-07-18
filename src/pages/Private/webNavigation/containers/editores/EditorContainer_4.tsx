import { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import "./styles/EditorContainer_4.css";
import { useWebStore } from "../../../../../zustand/web-page/StoreWebPage";
// import { useEditorSliderStore } from "../../../../../zustand/web-page/EditorSilder";
import { Palette } from "lucide-react";

const EditorContainer_4 = ({ indexContainer }: any) => {
  const colorInputRef = useRef<HTMLInputElement>(null)

  const handleIconClick = () => {
    colorInputRef.current?.click()
  }

  const { containers }: any = useWebStore();
  // const { dataEditContainer }: any = useEditorSliderStore();
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
          const currentData = x.contenido.data || [];
          const newId = String(currentData.length + 1); // puedes usar crypto.randomUUID() si prefieres

          return {
            ...x,
            contenido: {
              ...x.contenido,
              data: [
                ...currentData,
                {
                  id: newId,
                  image: base64,
                  name: 'Empresa sin nombre',
                },
              ],
            },
          };
        }
        return x;
      });

      setContainers(data);
    } catch (error) {
      console.error("Error al agregar imagen:", error);
    }
  };








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
                font_size: Number(e.target.value),
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
                font_size: Number(e.target.value),
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
    <div className="slider slider-editor">
      <div className="slider__editor-container">
        {/* Header Controls */}
        <div className="slider__header-controls">
          <h3 className="slider__section-title">Editor del Slider</h3>
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
            <div className="slider__property-group">
              <label>Título del Slider</label>
              <input
                type="text"
                className="slider__property-input"
                value={containers[indexContainer]?.contenido?.title?.text}
                onChange={handleTitleChange}
                placeholder="Título principal"
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
                  <span className="container_3__size_value">{containers[indexContainer]?.contenido?.description?.styles?.font_size}px</span>
                </div>
                <div className="container_3__size_slider_container">
                  <input
                    type="range"
                    min="8"
                    max="72"
                    value={containers[indexContainer]?.contenido?.description?.styles?.font_size}
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
            <div className="slider__property-group">
              <label>Subtítulo</label>
              <textarea
                className="slider__property-input slider__property-textarea"
                value={containers[indexContainer]?.contenido?.description?.text}
                onChange={handleDescriptionChange}
                placeholder="Descripción del slider"
              />
            </div>
          </div>



        </div>

        {/* Upload Area */}
        <div className="slider__upload-section">
          <h4 className="slider__section-title">Agregar Empresas</h4>
          <div
            {...getRootProps()}
            className={`slider__upload-area ${isDragActive ? "active" : ""}`}
          >
            <input {...getInputProps()} />
            <div className="slider__upload-content">
              {isUploading ? (
                <div className="slider__uploading">
                  <div className="slider__spinner"></div>
                  <p>Procesando imágenes...</p>
                </div>
              ) : (
                <>
                  <svg
                    className="slider__upload-icon"
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
                    <p className="slider__upload-text">
                      {isDragActive
                        ? "Suelta las imágenes aquí..."
                        : "Arrastra imágenes aquí o haz clic para seleccionar"}
                    </p>
                    <p className="slider__upload-subtext">
                      Soporta múltiples archivos JPG, PNG, WebP
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Companies List */}
        <div className="slider__companies-section">
          <div className="slider__section-header">
            {/* <h4 className="slider__section-title">
              Empresas ({sliderData.data.length})
            </h4> */}
            {/* <button
              className="slider__clear-btn"
              onClick={() => {
                if (confirm("¿Estás seguro de eliminar todas las empresas?")) {
                  // Clear all companies by setting empty array
                  useSliderStore.getState().reorderCompanies([]);
                }
              }}
              disabled={sliderData.data.length === 0}
            >
              Limpiar Todo 
            </button> */}
          </div>

          <div className="slider__companies-grid">
            {containers[indexContainer]?.contenido?.data?.map((company: any) => (
              <div key={company.id} className="slider__company-card">
                {/* Imagen de la empresa */}
                <div className="slider__company-image-container">
                  <img
                    src={company.image}
                    alt={company.name}
                    className="slider__company-image"
                  />
                  <div className="slider__company-overlay">
                    {/* Botón para cambiar la imagen */}


                    {/* Botón para eliminar empresa */}
                    <button
                      className="slider__remove-btn"
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
                <div className="slider__company-info">
                  <h5 className="slider__company-name">{company.name}</h5>
                </div>
              </div>
            ))}




          </div>
        </div>

      </div>
    </div>
  );
};

export default EditorContainer_4;
