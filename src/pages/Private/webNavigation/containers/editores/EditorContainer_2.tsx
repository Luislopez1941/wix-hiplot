import { useState } from "react";
import "./styles/EditorContainer_2.css";
import predefinedColors from './json/Color.json'

const EditorContainer_2 = ({
  cardsData = [],
  onDataChange,
  title = "Nuestros Servicios",
  subtitle = "Descubre todas las funcionalidades que tenemos para ofrecerte",
  onTitleChange,
  onSubtitleChange,
  backgroundColor = "#0f172a",
  onBackgroundColorChange,
  onContainerHeightChange,
  indexContainer
}: any) => {
  // const { containers }: any = useWebStore();
  // const setContainers = useWebStore(state => state.setContainers)


  const [showPalette, setShowPalette] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(backgroundColor);

    console.log(indexContainer)

  const badgeOptions = [
    { value: "", label: "Sin badge" },
    { value: "Popular", label: "Popular" },
    { value: "Nuevo", label: "Nuevo" },
    { value: "Promoción", label: "Promoción" },
  ];

  const handleCardChange = (field: string, value: any) => {
    const updatedCards = cardsData.map((card: any, index: number) =>
      index === selectedCardIndex ? { ...card, [field]: value } : card,
    );
    onDataChange(updatedCards);
  };

  const handleAddCard = () => {
    const newCard = {
      id: Date.now().toString(),
      title: "Nueva Tarjeta",
      description: "Descripción de la nueva tarjeta",
      icon: "gafetes",
      image: "/placeholder.svg",
      badge: "",
      buttonText: "Ver Más",
    };
    onDataChange([...cardsData, newCard]);
  };

  const handleRemoveCard = (indexToRemove: number) => {
    const updatedCards = cardsData.filter(
      (_: any, index: number) => index !== indexToRemove,
    );
    onDataChange(updatedCards);
    if (selectedCardIndex >= updatedCards.length) {
      setSelectedCardIndex(Math.max(0, updatedCards.length - 1));
    }
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    onBackgroundColorChange(color);
  };

  const handleCustomColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setSelectedColor(color);
    onBackgroundColorChange(color);
  };

  const handleContainerHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    onContainerHeightChange(`${e.target.value}px`);
  };

  const handleCheck = () => {
    


    setShowPalette(!showPalette);
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await convertFileToBase64(file);
        handleCardChange("image", base64);
      } catch (error) {
        console.error("Error converting file:", error);
      }
    }
  };

  const currentCard = cardsData[selectedCardIndex];

  return (
    <div className="editor-cards">
      <div className="editor-cards-container">
        {/* Header Controls */}
        <div className="editor-cards__header-controls">
          <h3 className="editor-cards__section-title">Editor de Cards</h3>

          {/* Container Settings */}
          <div className="editor-cards__row">
            <div className="editor-cards__property-group">
              <label>Altura del contenedor</label>
              <input
                type="range"
                min="400"
                max="1200"
                defaultValue="600"
                onChange={handleContainerHeight}
                className="editor-cards__range-input"
              />
            </div>
          </div>

          {/* Background Color */}
          <div className="editor-cards__property-group">
            <label>Color de fondo del contenedor</label>
            <div className="color-check-container">
              <label className="custom-checkbox">
                <input type="checkbox" onChange={handleCheck} />
                <span className="checkmark"></span>
                <span className="label-text">Activar paleta de colores</span>
              </label>

              {showPalette && (
                <div className="palette">
                  {predefinedColors.map((color) => (
                    <div
                      key={color}
                      className="color-swatch"
                      style={{
                        backgroundColor: color,
                        border:
                          selectedColor === color
                            ? "3px solid #000"
                            : "1px solid #ccc",
                      }}
                      onClick={() => handleColorSelect(color)}
                    />
                  ))}
                  <div className="custom-color">
                    <label>Personalizado: </label>
                    <input
                      type="color"
                      onChange={handleCustomColor}
                      value={selectedColor}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="editor-cards__property-group">
            <label>Título principal</label>
            <input
              type="text"
              className="editor-cards__property-input"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Título del section"
            />
          </div>

          {/* Subtitle */}
          <div className="editor-cards__property-group">
            <label>Subtítulo</label>
            <textarea
              className="editor-cards__property-input editor-cards__property-textarea"
              value={subtitle}
              onChange={(e) => onSubtitleChange(e.target.value)}
              placeholder="Descripción del section"
            />
          </div>
        </div>

        {/* Cards Management */}
        <div className="editor-cards__cards-section">
          <div className="editor-cards__cards-header">
            <h4>Gestión de Tarjetas</h4>
            <button
              onClick={handleAddCard}
              className="editor-cards__add-button"
            >
              Agregar Tarjeta
            </button>
          </div>

          {/* Card Selector */}
          <div className="editor-cards__card-selector">
            <label>Seleccionar tarjeta para editar:</label>
            <select
              value={selectedCardIndex}
              onChange={(e) => setSelectedCardIndex(Number(e.target.value))}
              className="editor-cards__select"
            >
              {cardsData.map((card: any, index: number) => (
                <option key={index} value={index}>
                  {card.title} (#{index + 1})
                </option>
              ))}
            </select>
          </div>

          {/* Card Editor */}
          {currentCard && (
            <div className="editor-cards__card-editor">
              <div className="editor-cards__card-preview">
                <img
                  src={currentCard.image || "/placeholder.svg"}
                  alt={currentCard.title}
                  className="editor-cards__preview-image"
                />
                {currentCard.badge && (
                  <div
                    className={`card-badge-preview ${currentCard.badge.toLowerCase()}`}
                  >
                    {currentCard.badge}
                  </div>
                )}
              </div>

              <div className="editor-cards__card-form">
                {/* Card Title */}
                <div className="editor-cards__property-group">
                  <label>Título de la tarjeta</label>
                  <input
                    type="text"
                    value={currentCard.title}
                    onChange={(e) => handleCardChange("title", e.target.value)}
                    className="editor-cards__property-input"
                  />
                </div>

                {/* Card Description */}
                <div className="editor-cards__property-group">
                  <label>Descripción</label>
                  <textarea
                    value={currentCard.description}
                    onChange={(e) =>
                      handleCardChange("description", e.target.value)
                    }
                    className="editor-cards__property-input editor-cards__property-textarea"
                  />
                </div>

                {/* Icon Selection */}
                <div className="editor-cards__property-group">
                  <label>Icono</label>
                  <select
                    value={currentCard.icon}
                    onChange={(e) => handleCardChange("icon", e.target.value)}
                    className="editor-cards__select"
                  >
                    {/* {iconOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))} */}
                  </select>
                </div>

                {/* Badge Selection */}
                <div className="editor-cards__property-group">
                  <label>Badge</label>
                  <select
                    value={currentCard.badge || ""}
                    onChange={(e) => handleCardChange("badge", e.target.value)}
                    className="editor-cards__select"
                  >
                    {badgeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Button Text */}
                <div className="editor-cards__property-group">
                  <label>Texto del botón</label>
                  <input
                    type="text"
                    value={currentCard.buttonText || ""}
                    onChange={(e) =>
                      handleCardChange("buttonText", e.target.value)
                    }
                    className="editor-cards__property-input"
                    placeholder="Dejar vacío para no mostrar botón"
                  />
                </div>

                {/* Image Upload */}
                <div className="editor-cards__property-group">
                  <label>Imagen de la tarjeta</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="editor-cards__file-input"
                  />
                </div>

                {/* Remove Card Button */}
                <button
                  onClick={() => handleRemoveCard(selectedCardIndex)}
                  className="editor-cards__remove-button"
                  disabled={cardsData.length <= 1}
                >
                  Eliminar Tarjeta
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorContainer_2;
