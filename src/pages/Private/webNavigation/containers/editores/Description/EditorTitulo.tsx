"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useEditorStore } from "../../../../../../zustand/web-page/Editor"
import FontWeight from "./fontWeight.json"
import { useWebStore } from "../../../../../../zustand/web-page/StoreWebPage"
import { ChevronDown, AlignLeft, AlignCenter, AlignRight, Palette } from 'lucide-react'
import './styles/EditorTitulo.css'

interface EditorTituloProps {
  typeName: string
  update: any
  indexEditSection: number
  selectedTypeSection: any
}

const EditorTitulo = ({ typeName, update, indexEditSection, selectedTypeSection }: EditorTituloProps) => {
  const { sections }: any = useWebStore()
  const setSections = useWebStore((state) => state.setSections)

  const { data, setData } = useEditorStore()
  const instanceData = data[typeName] || {}

  const [selectTypesFontWeight, setSelectTypesFontWeight] = useState(false)
  const [selectedTypeFontWeight, setSelectedTypeFontWeight] = useState(instanceData.fontWeight || 400)
  const [selectedColor, setSelectedColor] = useState(instanceData.color || "#000000")
  const [fontSize, setFontSize] = useState(instanceData.fontSize || 14)
  const [textAlign, setTextAlign] = useState(instanceData.textAlign || "left")
  const [content, setContent] = useState(instanceData.content || "")
  const colorInputRef = useRef<HTMLInputElement>(null)

  // 1. Este se encarga solo de actualizar el contenido desde selectedTypeSection
  useEffect(() => {
    if (selectedTypeSection) {
      setContent(selectedTypeSection.seccion)
    }
  }, [selectedTypeSection])

  // 2. Este se encarga de sincronizar con el store cuando cambia el contenido u otros valores
  useEffect(() => {
    setData(typeName, {
      fontWeight: selectedTypeFontWeight,
      color: selectedColor,
      fontSize,
      textAlign,
      content,
      typeName,
    })
  }, [selectedTypeFontWeight, selectedColor, fontSize, textAlign, content, setData, typeName])

  const openSelectFontWeightSections = () => {
    setSelectTypesFontWeight(!selectTypesFontWeight)
  }

  const handleFontWeightChange = (font: any) => {
    setSelectedTypeFontWeight(font.id)
    setSelectTypesFontWeight(false)
  }

  const changeTextColor = (color: string) => {
    const data = sections?.map((x: any, index: number) => {
      if (index === indexEditSection) {
        return {
          ...x,
          imagen: {
            ...x.imagen,
            color: color,
          },
        }
      }
      return x
    })

    setSections(data)
    setSelectedColor(color)
  }

  const handleIconClick = () => {
    colorInputRef.current?.click()
  }

  const changeFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(Number(e.target.value))
  }

  const textCentering = (alignment: string) => {
    const data = sections?.map((x: any, index: number) => {
      if (index === indexEditSection) {
        return {
          ...x,
          imagen: {
            ...x.imagen,
            textAlign: alignment,
          },
        }
      }
      return x
    })
    setSections(data)
    setTextAlign(alignment)
  }

  const handleTitleContainerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    const data = sections?.map((x: any, index: number) => {
      if (index === indexEditSection) {
        return { ...x, seccion: e.target.value }
      }
      return x
    })
    setSections(data)
  }

  const alignmentButtons = [
    { alignment: "left", icon: AlignLeft, label: "Alinear izquierda" },
    { alignment: "center", icon: AlignCenter, label: "Alinear centro" },
    { alignment: "right", icon: AlignRight, label: "Alinear derecha" },
  ]

  return (
    <div className="editor_title">
      <div className="editor_title__container">
        {/* Header */}
        <div className="editor_title__header">
          <h3 className="editor_title__header_title">Editor de Título</h3>
          <div className="editor_title__header_badge">
            <span className="editor_title__header_badge_text">{typeName}</span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="editor_title__toolbar">
          {/* Font Weight Selector */}
          <div className="editor_title__toolbar_section">
            <label className="editor_title__toolbar_label">Peso de fuente</label>
            <div className="editor_title__font_weight_selector">
              <button
                className={`editor_title__font_weight_button ${selectTypesFontWeight ? "editor_title__font_weight_button--active" : ""}`}
                onClick={openSelectFontWeightSections}
                type="button"
              >
                <span className="editor_title__font_weight_text">
                  {FontWeight.find((s) => s.id === selectedTypeFontWeight)?.name || "Peso"}
                </span>
                <ChevronDown
                  className={`editor_title__font_weight_icon ${selectTypesFontWeight ? "editor_title__font_weight_icon--rotated" : ""}`}
                  size={16}
                />
              </button>

              {selectTypesFontWeight && (
                <div className="editor_title__font_weight_dropdown">
                  <ul className="editor_title__font_weight_list">
                    {FontWeight.map((font: any) => (
                      <li
                        key={font.id}
                        className={`editor_title__font_weight_item ${selectedTypeFontWeight === font.id ? "editor_title__font_weight_item--selected" : ""}`}
                        onClick={() => handleFontWeightChange(font)}
                      >
                        <span dangerouslySetInnerHTML={{ __html: font.name }} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Text Alignment */}
          <div className="editor_title__toolbar_section">
            <label className="editor_title__toolbar_label">Alineación</label>
            <div className="editor_title__alignment_group">
              {alignmentButtons.map(({ alignment, icon: Icon, label }) => (
                <button
                  key={alignment}
                  className={`editor_title__alignment_button ${textAlign === alignment ? "editor_title__alignment_button--active" : ""}`}
                  onClick={() => textCentering(alignment)}
                  title={label}
                  type="button"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Color Picker */}
          <div className="editor_title__toolbar_section">
            <label className="editor_title__toolbar_label">Color</label>
            <div className="editor_title__color_picker">
              <button
                className="editor_title__color_button"
                onClick={handleIconClick}
                style={{ backgroundColor: selectedColor }}
                type="button"
              >
                <Palette size={16} className="editor_title__color_icon" />
              </button>
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => changeTextColor(e.target.value)}
                ref={colorInputRef}
                className="editor_title__color_input"
              />
            </div>
          </div>
        </div>

        {/* Font Size Slider */}
        <div className="editor_title__size_section">
          <div className="editor_title__size_header">
            <label className="editor_title__toolbar_label">Tamaño de fuente</label>
            <span className="editor_title__size_value">{fontSize}px</span>
          </div>
          <div className="editor_title__size_slider_container">
            <input
              type="range"
              min="8"
              max="72"
              value={fontSize}
              onChange={changeFontSize}
              className="editor_title__size_slider"
            />
            <div className="editor_title__size_marks">
              <span className="editor_title__size_mark">8px</span>
              <span className="editor_title__size_mark">72px</span>
            </div>
          </div>
        </div>

        {/* Text Editor */}
        <div className="editor_title__editor_section">
          <label className="editor_title__toolbar_label">Contenido</label>
          <div className="editor_title__editor_container">
            <textarea
              className="editor_title__textarea"
              style={{
                textAlign: textAlign as any,
                fontWeight: selectedTypeFontWeight,
                fontSize: `${fontSize}px`,
                color: selectedColor,
              }}
              value={content}
              onChange={handleTitleContainerChange}
              placeholder="Escribe tu título aquí..."
              rows={4}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditorTitulo
