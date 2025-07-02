import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./styles/EditorSlider.css";
import { useWebStore } from "../../../../../zustand/web-page/StoreWebPage";
import { useEditorSliderStore } from "../../../../../zustand/web-page/EditorSilder";

const SliderEditor = ({ indexContainer }: any) => {

  const { containers }: any = useWebStore();
  const { dataEditContainer }: any = useEditorSliderStore();
  const setContainers = useWebStore(state => state.setContainers)

  const [content, setContent] = useState("Contenido de ejemplo para editar");
  const [description, setDescription] = useState("Contenido de ejemplo para editar");

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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);

    const data = containers?.map((x: any, index: number) => {
      if (index === indexContainer) {
        const contentIndex = x.contenido?.index;
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

          <div className="slider__property-group">
            <label>Título del Slider</label>
            <input
              type="text"
              className="slider__property-input"
              value={content}
              onChange={handleTitleChange}
              placeholder="Título principal"
            />
          </div>

          <div className="slider__property-group">
            <label>Subtítulo</label>
            <textarea
              className="slider__property-input slider__property-textarea"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Descripción del slider"
            />
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

export default SliderEditor;
