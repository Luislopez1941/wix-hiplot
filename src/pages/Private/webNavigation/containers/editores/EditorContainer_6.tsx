import { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Palette } from "lucide-react";
import "./styles/EditorSmallBanner.css";
import { useWebStore } from "../../../../../zustand/web-page/StoreWebPage";

const EditorContainer_6 = ({ indexContainer }: any) => {
  const colorInputRef = useRef<HTMLInputElement>(null)
  const buttonColorInputRef = useRef<HTMLInputElement>(null)
  const buttonTextColorInputRef = useRef<HTMLInputElement>(null)
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

  const handleButtonColorClick = () => {
    buttonColorInputRef.current?.click()
  }

  const handleButtonTextColorClick = () => {
    buttonTextColorInputRef.current?.click()
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

  // Nuevas funciones para editar el botón
  const handleButtonTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = containers?.map((x: any, index: number) => {
      if (index === indexContainer) {
        return {
          ...x,
          contenido: {
            ...x.contenido,
            button: {
              ...x.contenido.button,
              text: e.target.value,
            }
          }
        };
      }
      return x;
    });
    setContainers(data);
  };

  const changeButtonBackgroundColor = (color: string) => {
    const data = containers?.map((x: any, index: number) => {
      if (index === indexContainer) {
        return {
          ...x,
          contenido: {
            ...x.contenido,
            button: {
              ...x.contenido.button,
              styles: {
                ...x.contenido.button.styles,
                background: color,
              }
            }
          }
        };
      }
      return x;
    });
    setContainers(data);
  };

  const changeButtonTextColor = (color: string) => {
    const data = containers?.map((x: any, index: number) => {
      if (index === indexContainer) {
        return {
          ...x,
          contenido: {
            ...x.contenido,
            button: {
              ...x.contenido.button,
              styles: {
                ...x.contenido.button.styles,
                color: color,
              }
            }
          }
        };
      }
      return x;
    });
    setContainers(data);
  };

  const changeButtonFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = containers?.map((x: any, index: number) => {
      if (index === indexContainer) {
        return {
          ...x,
          contenido: {
            ...x.contenido,
            button: {
              ...x.contenido.button,
              styles: {
                ...x.contenido.button.styles,
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
    <div className="editor_container_06 editor_container_06-editor">
      <div className="editor_container_06__editor-container">
        {/* Header Controls */}
        <div className="editor_container_06__header-controls">
          <h3 className="editor_container_06__section-title">Editor del Small Banner</h3>
          
          {/* Color de fondo del contenedor */}
          <div className="editor_container_06__property-group">
            <label>Color de fondo del contenedor</label>
            <div className="editor_container_06__color_picker">
              <button
                className="editor_container_06__color_button"
                onClick={handleIconClick}
                style={{ backgroundColor: containers[indexContainer]?.style?.background || '#000' }}
                type="button"
              >
                <Palette size={16} className="editor_container_06__color_icon" />
              </button>
              <input
                type="color"
                value={containers[indexContainer]?.style?.background || '#000'}
                onChange={(e) => changeBackgroundColor(e.target.value)}
                ref={colorInputRef}
                className="editor_container_06__color_input"
              />
            </div>
          </div>

          {/* Título */}
          <div className="editor_container_06__property-group">
            <label>Título</label>
            <input
              type="text"
              className="editor_container_06__property-input"
              value={containers[indexContainer]?.contenido?.title?.text || ''}
              onChange={handleTitleChange}
              placeholder="Título principal"
            />
            
            <div className="editor_container_06__toolbar">
              <div className="editor_container_06__color_picker">
                <button
                  className="editor_container_06__color_button"
                  onClick={handleIconClick}
                  style={{ backgroundColor: containers[indexContainer]?.contenido?.title?.styles?.color || '#fff' }}
                  type="button"
                >
                  <Palette size={16} className="editor_container_06__color_icon" />
                </button>
                <input
                  type="color"
                  value={containers[indexContainer]?.contenido?.title?.styles?.color || '#fff'}
                  onChange={(e) => changeTextColorTitle(e.target.value)}
                  ref={colorInputRef}
                  className="editor_container_06__color_input"
                />
              </div>
              
              <div className="editor_container_06__size_section">
                <div className="editor_container_06__size_header">
                  <label>Tamaño de fuente</label>
                  <span className="editor_container_06__size_value">{containers[indexContainer]?.contenido?.title?.styles?.font_size || 14}px</span>
                </div>
                <div className="editor_container_06__size_slider_container">
                  <input
                    type="range"
                    min="8"
                    max="72"
                    value={containers[indexContainer]?.contenido?.title?.styles?.font_size || 14}
                    onChange={changeFontSizeTitle}
                    className="editor_container_06__size_slider"
                  />
                  <div className="editor_container_06__size_marks">
                    <span className="editor_container_06__size_mark">8px</span>
                    <span className="editor_container_06__size_mark">72px</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subtítulo */}
          <div className="editor_container_06__property-group">
            <label>Subtítulo</label>
            <textarea
              className="editor_container_06__property-input editor_container_06__property-textarea"
              value={containers[indexContainer]?.contenido?.subtitle?.text || ''}
              onChange={handleDescriptionChange}
              placeholder="Descripción del banner"
            />
            
            <div className="editor_container_06__toolbar">
              <div className="editor_container_06__color_picker">
                <button
                  className="editor_container_06__color_button"
                  onClick={handleIconClick}
                  style={{ backgroundColor: containers[indexContainer]?.contenido?.subtitle?.styles?.color || '#fff' }}
                  type="button"
                >
                  <Palette size={16} className="editor_container_06__color_icon" />
                </button>
                <input
                  type="color"
                  value={containers[indexContainer]?.contenido?.subtitle?.styles?.color || '#fff'}
                  onChange={(e) => changeTextColorSubtitle(e.target.value)}
                  ref={colorInputRef}
                  className="editor_container_06__color_input"
                />
              </div>
              
              <div className="editor_container_06__size_section">
                <div className="editor_container_06__size_header">
                  <label>Tamaño de fuente</label>
                  <span className="editor_container_06__size_value">{containers[indexContainer]?.contenido?.subtitle?.styles?.font_size || 12}px</span>
                </div>
                <div className="editor_container_06__size_slider_container">
                  <input
                    type="range"
                    min="8"
                    max="72"
                    value={containers[indexContainer]?.contenido?.subtitle?.styles?.font_size || 12}
                    onChange={changeFontSizeSubtitle}
                    className="editor_container_06__size_slider"
                  />
                  <div className="editor_container_06__size_marks">
                    <span className="editor_container_06__size_mark">8px</span>
                    <span className="editor_container_06__size_mark">72px</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botón */}
          <div className="editor_container_06__property-group">
            <label>Texto del botón</label>
            <input
              type="text"
              className="editor_container_06__property-input"
              value={containers[indexContainer]?.contenido?.button?.text || 'Ver más'}
              onChange={handleButtonTextChange}
              placeholder="Texto del botón"
            />
            
            <div className="editor_container_06__toolbar">
              <div className="editor_container_06__color_picker">
                <label>Color de fondo del botón</label>
                <button
                  className="editor_container_06__color_button"
                  onClick={handleButtonColorClick}
                  style={{ backgroundColor: containers[indexContainer]?.contenido?.button?.styles?.background || '#000' }}
                  type="button"
                >
                  <Palette size={16} className="editor_container_06__color_icon" />
                </button>
                <input
                  type="color"
                  value={containers[indexContainer]?.contenido?.button?.styles?.background || '#000'}
                  onChange={(e) => changeButtonBackgroundColor(e.target.value)}
                  ref={buttonColorInputRef}
                  className="editor_container_06__color_input"
                />
              </div>
              
              <div className="editor_container_06__color_picker">
                <label>Color del texto del botón</label>
                <button
                  className="editor_container_06__color_button"
                  onClick={handleButtonTextColorClick}
                  style={{ backgroundColor: containers[indexContainer]?.contenido?.button?.styles?.color || '#fff' }}
                  type="button"
                >
                  <Palette size={16} className="editor_container_06__color_icon" />
                </button>
                <input
                  type="color"
                  value={containers[indexContainer]?.contenido?.button?.styles?.color || '#fff'}
                  onChange={(e) => changeButtonTextColor(e.target.value)}
                  ref={buttonTextColorInputRef}
                  className="editor_container_06__color_input"
                />
              </div>
              
              <div className="editor_container_06__size_section">
                <div className="editor_container_06__size_header">
                  <label>Tamaño de fuente del botón</label>
                  <span className="editor_container_06__size_value">{containers[indexContainer]?.contenido?.button?.styles?.font_size || 14}px</span>
                </div>
                <div className="editor_container_06__size_slider_container">
                  <input
                    type="range"
                    min="8"
                    max="72"
                    value={containers[indexContainer]?.contenido?.button?.styles?.font_size || 14}
                    onChange={changeButtonFontSize}
                    className="editor_container_06__size_slider"
                  />
                  <div className="editor_container_06__size_marks">
                    <span className="editor_container_06__size_mark">8px</span>
                    <span className="editor_container_06__size_mark">72px</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Area para Icono */}
        <div className="editor_container_06__upload-section">
          <h4 className="editor_container_06__section-title">Subir icono</h4>
          
          <div className="editor_container_06__property-group">
            <label>Color de fondo del icono</label>
            <div className="editor_container_06__color_picker">
              <button
                className="editor_container_06__color_button"
                onClick={handleIconClick}
                style={{ backgroundColor: containers[indexContainer]?.contenido?.icono?.styles?.background || '#000' }}
                type="button"
              >
                <Palette size={16} className="editor_container_06__color_icon" />
              </button>
              <input
                type="color"
                value={containers[indexContainer]?.contenido?.icono?.styles?.background || '#000'}
                onChange={(e) => changeBackgroundColorIcon(e.target.value)}
                ref={colorInputRef}
                className="editor_container_06__color_input"
              />
            </div>
          </div>
          
          <div
            {...getRootProps()}
            className={`editor_container_06__upload-area ${isDragActive ? "active" : ""}`}
          >
            <input {...getInputProps()} />
            <div className="editor_container_06__upload-content">
              {isUploading ? (
                <div className="editor_container_06__uploading">
                  <div className="editor_container_06__spinner"></div>
                  <p>Procesando imágenes...</p>
                </div>
              ) : (
                <>
                  <svg className="editor_container_06__upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="48" height="48">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <div>
                    <p className="editor_container_06__upload-text">
                      {isDragActive
                        ? "Suelta las imágenes aquí..."
                        : "Arrastra imágenes aquí o haz clic para seleccionar"}
                    </p>
                    <p className="editor_container_06__upload-subtext">
                      Soporta múltiples archivos JPG, PNG, WebP
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Companies List */}
        <div className="editor_container_06__companies-section">
          <div className="editor_container_06__section-header">
            <h4 className="editor_container_06__section-title">
              Empresas ({containers[indexContainer]?.contenido?.data?.length || 0})
            </h4>
          </div>
          <div className="editor_container_06__companies-grid">
            {containers[indexContainer]?.contenido?.data?.map((company: any) => (
              <div key={company.id} className="editor_container_06__company-card">
                <div className="editor_container_06__company-image-container">
                  <img
                    src={company.image}
                    alt={company.name}
                    className="editor_container_06__company-image"
                  />
                  <div className="editor_container_06__company-overlay">
                    <button
                      className="editor_container_06__remove-btn"
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
                <div className="editor_container_06__company-info">
                  <h5 className="editor_container_06__company-name">{company.name}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorContainer_6;
