import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ImageUpload } from "../../../../../components/general/ImageUpload";
import { Save, Eye, Tag } from "lucide-react";
import "./styles/CreateArticles.css";
import APIs from "../../../../../services/services/APIs";
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


export function ArticleCreationForm() {
  const [images, setImages] = useState<File[]>([]);
  const [base64Images, setBase64Images] = useState<string[]>([]);

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
      // ⚠️ OBTENER TODOS LOS VALORES DEL FORMULARIO
      const values = form.getValues();

      // Convertir imágenes seleccionadas a base64  
      const base64s = await Promise.all(images.map(fileToBase64));

      const data: any = {
        id: 0,
        tipo: 2,
        codigo: values.codigo,
        descripcion: values.title,
        id_familia: 16,
        materia_prima: 2,
        activo: 1,
        imagenes: [{img_url: base64s[0]}],
        tipo_de_cobro: 1,
        id_plantilla: 1,
        base_max: 0,
        altura_max: 0,
        multiplos_de: 0,
        clave_sat: '',
        unidad_sat: '',
        visualizacion_web: true,
        indicaciones: '',
        notas_web: '',
        condiciones_compra: '',
        bajo_pedido: false,
        vender_sin_stock: false,
        desabasto: false,
        iva_excento: false,
        precio_libre: false,
        ultimas_piezas: false,
        fyv: false,
        consultar_cotizador: false,
        consultar_te: false,
        /////////////////////////////////Modales//////////////////////////////////////// 
        sucursales: [{ id_sucursal: 2, name: 'web', id_almacen_pred: 1, disponible: false }],
      };

      console.log(data);

      let response = await APIs.createArticles(data);
      console.log('response', response);
      Swal.fire('Artículo creado exitosamente', '', 'success');

    } catch (error) {
      console.error('Ocurrió un error al crear/actualizar el artículo', error);
      Swal.fire('Ocurrió un error al crear el artículo', '', 'error');
    }
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

      <form className="form">
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
          </div>
        </div>

        {/* Action Buttons */}
        <div className="form-actions">
          <button type="button" className="button-outline">
            <Eye className="icon-small" />
            Vista previa
          </button>

          {/* ✅ Usamos onClick, no handleSubmit */}
          <button
            onClick={createArticle}
            type="button"
            className="button-primary"
          >
            <Save className="icon-small" />
            Publicar artículo
          </button>
        </div>
      </form>
    </div>
  );
}
