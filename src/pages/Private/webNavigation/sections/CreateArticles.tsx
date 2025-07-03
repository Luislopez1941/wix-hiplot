import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ImageUpload } from "../../../../components/general/ImageUpload";
import { Save, Eye, Tag, DollarSign } from "lucide-react";
import "./styles/CreateArticles.css";
import APIs from "../../../../services/services/APIs";
import Swal from 'sweetalert2';

const articleSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  codigo: z.string().min(1, "El código es requerido"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  content: z.string().min(50, "El contenido debe tener al menos 50 caracteres"),
  price: z.string().min(1, "El precio es requerido"),
  category: z.string().min(1, "La categoría es requerida"),
  tags: z.string().optional(),
  condition: z.string().min(1, "La condición es requerida"),
});

type ArticleFormData = z.infer<typeof articleSchema>;

const categories = [
  "Electrónicos",
  "Ropa y Accesorios",
  "Hogar y Jardín",
  "Deportes y Ocio",
  "Vehículos",
  "Libros y Medios",
  "Salud y Belleza",
  "Juguetes y Niños",
  "Arte y Coleccionables",
  "Otros",
];

const conditions = ["Nuevo", "Como nuevo", "Muy bueno", "Bueno", "Aceptable"];

export function ArticleCreationForm() {
  const [images, setImages] = useState<File[]>([]);
  const [base64Images, setBase64Images] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      codigo: "",
      description: "",
      content: "",
      price: "",
      category: "",
      tags: "",
      condition: "",
    },
  });

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      const newTags = [...tags, currentTag.trim()];
      setTags(newTags);
      form.setValue("tags", newTags.join(", "));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    form.setValue("tags", newTags.join(", "));
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const createArticle = async () => {
    try {
      // Convertir imágenes seleccionadas a base64
      const base64s = await Promise.all(images.map(fileToBase64));

      const data: any = {
        id: 0,
        tipo: 3,
        codigo: 'values.codigo',
        descripcion: 'values.description',
        id_familia: 1,
        activo: 0,
        imagenes: '',
        tipo_de_cobro: 1,
        id_plantilla: 1,
        base_max: '',
        altura_max: '',
        multiplos_de: '',
        clave_sat: '',
        unidad_sat: 1,
        visualizacion_web: true,
        indicaciones: '',
        notas_web: '',
        condiciones_compra: '',
        bajo_pedido: '',
        vender_sin_stock: true,
        desabasto: false,
        iva_excento: '',
        precio_libre: '',
        ultimas_piezas: '',
        fyv: '',
        consultar_cotizador: '',
        consultar_te: '',

        /////////////////////////////////Modales//////////////////////////////////////// 
        sucursales: { id_sucursal: 1, name: 'web' },
      };

      console.log(data)

      let response = await APIs.createArticles(data);
      console.log('response',response)
      Swal.fire('Artículo creado exitosamente', '', 'success');

    } catch (error) {
      console.error('Ocurrió un error al crear/actualizar el artículo', error);
      Swal.fire('Ocurrió un error al crear el artículo', '', 'error');
    }
  };

  const formatPrice = (value: string) => {
    const number = value.replace(/[^\d]/g, "");
    return number ? `$${parseInt(number).toLocaleString()}` : "";
  };

  return (
    <div className="article-form-container">
      <div className="article-form-header">
        <h1 className="article-form-title">
          Crear Nuevo Artículo
        </h1>
        <p className="article-form-subtitle">
          Completa la información para publicar tu artículo
        </p>
      </div>

      <form  className="form">
        <div className="form-grid">
          {/* Left Column - Main Info */}
          <div className="form-section">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  <Tag className="icon" />
                  Información Principal
                </h3>
                <p className="card-description">
                  Datos básicos de tu artículo
                </p>
              </div>
              <div className="card-content">
                <div className="form-field">
                  <label className="form-label">Título del artículo</label>
                  <input
                    className="form-input"
                    placeholder="Ej: iPhone 15 Pro Max 256GB"
                    {...form.register("title")}
                  />
                  {form.formState.errors.title && (
                    <span className="form-error">
                      {form.formState.errors.title.message}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <label className="form-label">Código del artículo</label>
                  <input
                    className="form-input"
                    placeholder="Ej: IPHONE15PM256"
                    {...form.register("codigo")}
                  />
                  {form.formState.errors.codigo && (
                    <span className="form-error">
                      {form.formState.errors.codigo.message}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <label className="form-label">Descripción corta</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Descripción breve y atractiva de tu artículo..."
                    {...form.register("description")}
                  />
                  <p className="form-description">
                    Esta descripción aparecerá en las búsquedas
                  </p>
                  {form.formState.errors.description && (
                    <span className="form-error">
                      {form.formState.errors.description.message}
                    </span>
                  )}
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label className="form-label">Categoría</label>
                    <select className="form-select" {...form.register("category")}>
                      <option value="">Seleccionar</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {form.formState.errors.category && (
                      <span className="form-error">
                        {form.formState.errors.category.message}
                      </span>
                    )}
                  </div>

                  <div className="form-field">
                    <label className="form-label">Condición</label>
                    <select className="form-select" {...form.register("condition")}>
                      <option value="">Seleccionar</option>
                      {conditions.map((condition) => (
                        <option key={condition} value={condition}>
                          {condition}
                        </option>
                      ))}
                    </select>
                    {form.formState.errors.condition && (
                      <span className="form-error">
                        {form.formState.errors.condition.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  <DollarSign className="icon" />
                  Precio
                </h3>
              </div>
              <div className="card-content">
                <div className="form-field">
                  <label className="form-label">Precio de venta</label>
                  <input
                    className="form-input"
                    placeholder="$0"
                    {...form.register("price")}
                    onChange={(e) => {
                      const formatted = formatPrice(e.target.value);
                      form.setValue("price", formatted);
                    }}
                  />
                  <p className="form-description">
                    Ingresa el precio en pesos colombianos
                  </p>
                  {form.formState.errors.price && (
                    <span className="form-error">
                      {form.formState.errors.price.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Images and Details */}
          <div className="form-section">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Imágenes del artículo</h3>
                <p className="card-description">
                  Sube hasta 5 imágenes de alta calidad
                </p>
              </div>
              <div className="card-content">
                <ImageUpload
                  onImagesChange={async (selectedFiles) => {
                    setImages(selectedFiles);

                    const converted = await Promise.all(
                      selectedFiles.map(fileToBase64)
                    );

                    setBase64Images(converted);
                  }}
                />

                {base64Images.length > 0 && (
                  <div className="preview-images" style={{ marginTop: "10px" }}>
                    {base64Images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`preview-${index}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          marginRight: "10px",
                          borderRadius: "8px",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Etiquetas</h3>
                <p className="card-description">
                  Añade palabras clave para ayudar a otros a encontrar tu
                  artículo
                </p>
              </div>
              <div className="card-content">
                <div className="tags-container">
                  <input
                    className="form-input tags-input"
                    placeholder="Añadir etiqueta..."
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <button type="button" className="add-tag-button" onClick={addTag}>
                    Añadir
                  </button>
                </div>
                {tags.length > 0 && (
                  <div className="tags-list">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="tag-badge"
                        onClick={() => removeTag(tag)}
                      >
                        {tag} ×
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button type="button" className="button-outline">
            <Eye className="icon-small" />
            Vista previa
          </button>
          <button onClick={createArticle} type="button" className="button-primary">
            <Save className="icon-small" />
            Publicar artículo
          </button>
        </div>
      </form>
    </div>
  );
}
