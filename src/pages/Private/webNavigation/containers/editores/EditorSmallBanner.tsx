import { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Palette } from "lucide-react";
import "./styles/EditorSmallBanner.css";
import { useWebStore } from "../../../../../zustand/web-page/StoreWebPage";

const SmallBannerEditor = ({ indexContainer }: any) => {
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

  const changeBackgroundColorIcon = (color: string) => {
    const data = containers?.map((x: any, index: number) => {
      if (index === indexContainer) {
        return {
          ...x,
          contenido: {
            ...x.contenido,
            icono: {
              ...x.contenido.icono,
              styles: {
                ...x.contenido.icono.styles,
                background: color,
              }
            }
          }
        };
      }
      return x;
    });
    setContainers(data);
  }

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
              icono: {
                ...x.contenido?.icono,
                icono: base64,
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










  const handleIconClick = () => {
    colorInputRef.current?.click()
  }



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




  const changeTextColorSubtitle = (color: string) => {
    const data = containers?.map((x: any, index: number) => {
      if (index === indexContainer) {
        return {
          ...x,
          contenido: {
            ...x.contenido,
            subtitle: {
              ...x.contenido.subtitle,
              styles: {
                ...x.contenido.subtitle.styles,
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

  const changeFontSizeSubtitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = containers?.map((x: any, index: number) => {
      if (index === indexContainer) {
        return {
          ...x,
          contenido: {
            ...x.contenido,
            subtitle: {
              ...x.contenido.subtitle,
              styles: {
                ...x.contenido.subtitle.styles,
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
            subtitle: {
              ...x.contenido.subtitle,
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
    <div className="small_banner small_banner-editor">
      <div className="small_banner__editor-container">
        {/* Header Controls */}
        <div className="small_banner__header-controls">
          <h3 className="small_banner__section-title">Editor del small_banner</h3>
          <div>
            <p>Color de fondo </p>
            <div className="small_banner_container__color_picker">
              <button
                className="small_banner_container__color_button"
                onClick={handleIconClick}
                style={{ backgroundColor: containers[indexContainer]?.contenido?.style?.color }}
                type="button"
              >
                <Palette size={16} className="small_banner_container__color_icon" />
              </button>
              <input
                type="color"
                value={containers[indexContainer]?.contenido?.style?.color}
                onChange={(e) => changeBackgroundColor(e.target.value)}
                ref={colorInputRef}
                className="small_banner_container__color_input"
              />
            </div>
          </div>




          <div className="editor_title__toolbar_section">
            <label className="editor_title__toolbar_label">Color</label>
            <div>
              <div className="small_banner_title__color_picker">
                <button
                  className="small_banner_title__color_button"
                  onClick={handleIconClick}
                  style={{ backgroundColor: containers[indexContainer]?.contenido?.title?.styles?.color }}
                  type="button"
                >
                  <Palette size={16} className="small_banner_title__color_icon" />
                </button>
                <input
                  type="color"
                  value={containers[indexContainer]?.contenido?.title?.styles?.color}
                  onChange={(e) => changeTextColorTitle(e.target.value)}
                  ref={colorInputRef}
                  className="small_banner_title__color_input"
                />
              </div>
            </div>
            <div>
              <div className="editor_title__size_section">
                <div className="editor_title__size_header">
                  <label className="editor_title__toolbar_label">Tamaño de fuente</label>
                  <span className="editor_title__size_value">{containers[indexContainer]?.contenido?.title?.styles?.font_size}px</span>
                </div>
                <div className="editor_title__size_slider_container">
                  <input
                    type="range"
                    min="8"
                    max="72"
                    value={containers[indexContainer]?.contenido?.title?.styles?.font_size}
                    onChange={changeFontSizeTitle}
                    className="editor_title__size_slider"
                  />
                  <div className="editor_title__size_marks">
                    <span className="editor_title__size_mark">8px</span>
                    <span className="editor_title__size_mark">72px</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="small_banner__property-group">
              <label>Título del small_banner</label>
              <input
                type="text"
                className="small_banner__property-input"
                value={containers[indexContainer]?.contenido?.title?.text}
                onChange={handleTitleChange}
                placeholder="Título principal"
              />
            </div>
          </div>
          <div>
            <div>
              <div className="small_banner_title__color_picker">
                <button
                  className="small_banner_title__color_button"
                  onClick={handleIconClick}
                  style={{ backgroundColor: containers[indexContainer]?.contenido?.subtitle?.styles?.color }}
                  type="button"
                >
                  <Palette size={16} className="small_banner_title__color_icon" />
                </button>
                <input
                  type="color"
                  value={containers[indexContainer]?.contenido?.subtitle?.styles?.color}
                  onChange={(e) => changeTextColorSubtitle(e.target.value)}
                  ref={colorInputRef}
                  className="small_banner_title__color_input"
                />
              </div>
            </div>
            <div>
              <div className="editor_title__size_section">
                <div className="editor_title__size_header">
                  <label className="editor_title__toolbar_label">Tamaño de fuente</label>
                  <span className="editor_title__size_value">{containers[indexContainer]?.contenido?.subtitle?.styles?.font_size}px</span>
                </div>
                <div className="editor_title__size_slider_container">
                  <input
                    type="range"
                    min="8"
                    max="72"
                    value={containers[indexContainer]?.contenido?.subtitle?.styles?.font_size}
                    onChange={changeFontSizeSubtitle}
                    className="editor_title__size_slider"
                  />
                  <div className="editor_title__size_marks">
                    <span className="editor_title__size_mark">8px</span>
                    <span className="editor_title__size_mark">72px</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="small_banner__property-group">
              <label>Subtítulo</label>
              <textarea
                className="small_banner__property-input small_banner__property-textarea"
                value={containers[indexContainer]?.contenido?.subtitle?.text}
                onChange={handleDescriptionChange}
                placeholder="Descripción del small_banner"
              />
            </div>
          </div>

        </div>

        {/* Upload Area */}
        <div className="small_banner__upload-section">
          <div className="small_banner_title__color_picker">
                <button
                  className="small_banner_title__color_button"
                  onClick={handleIconClick}
                  style={{ backgroundColor: containers[indexContainer]?.contenido?.icono?.styles?.background }}
                  type="button"
                >
                  <Palette size={16} className="small_banner_title__color_icon" />
                </button>
                <input
                  type="color"
                  value={containers[indexContainer]?.contenido?.icono?.styles?.background}
                  onChange={(e) => changeBackgroundColorIcon(e.target.value)}
                  ref={colorInputRef}
                  className="small_banner_title__color_input"
                />
              </div>
          <h4 className="small_banner__section-title">Subir icono</h4>
          <div
            {...getRootProps()}
            className={`small_banner__upload-area ${isDragActive ? "active" : ""}`}
          >
            <input {...getInputProps()} />
            <div className="small_banner__upload-content">
              {isUploading ? (
                <div className="small_banner__uploading">
                  <div className="small_banner__spinner"></div>
                  <p>Procesando imágenes...</p>
                </div>
              ) : (
                <>
                  <svg className="small_banner__upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="48" height="48">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <div>
                    <p className="small_banner__upload-text">
                      {isDragActive
                        ? "Suelta las imágenes aquí..."
                        : "Arrastra imágenes aquí o haz clic para seleccionar"}
                    </p>
                    <p className="small_banner__upload-subtext">
                      Soporta múltiples archivos JPG, PNG, WebP
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Companies List */}
        <div className="small_banner__companies-section">
          <div className="small_banner__section-header">
            {/* <h4 className="small_banner__section-title">
              Empresas ({small_bannerData.data.length})
            </h4> */}
            {/* <button
              className="small_banner__clear-btn"
              onClick={() => {
                if (confirm("¿Estás seguro de eliminar todas las empresas?")) {
                  // Clear all companies by setting empty array
                  usesmall_bannerStore.getState().reorderCompanies([]);
                }
              }}
              disabled={small_bannerData.data.length === 0}
            >
              Limpiar Todo 
            </button> */}
          </div>
          <div className="small_banner__companies-grid">
            {containers[indexContainer]?.contenido?.data?.map((company: any) => (
              <div key={company.id} className="small_banner__company-card">
                {/* Imagen de la empresa */}
                <div className="small_banner__company-image-container">
                  <img
                    src={company.image}
                    alt={company.name}
                    className="small_banner__company-image"
                  />
                  <div className="small_banner__company-overlay">
                    {/* Botón para cambiar la imagen */}


                    {/* Botón para eliminar empresa */}
                    <button
                      className="small_banner__remove-btn"
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
                <div className="small_banner__company-info">
                  <h5 className="small_banner__company-name">{company.name}</h5>
                </div>
              </div>
            ))}




          </div>

        </div>

      </div>
    </div>
  );
};

export default SmallBannerEditor;
