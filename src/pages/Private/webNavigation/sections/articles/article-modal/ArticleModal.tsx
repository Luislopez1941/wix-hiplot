import React, { useState, useCallback, useEffect } from "react";
import { X, Save, Package, Edit2, Upload, Image, Trash2 } from "lucide-react";
import "./ArticleModal.css";
import Swal from "sweetalert2";
import APIs from "../../../../../../services/services/APIs";
import useUserStore from "../../../../../../zustand/General";
import { storeArticles } from "../../../../../../zustand/Articles";



interface UploadedImage {
  name: string;
  content: string;
}

interface Familia {
  id: number;
  nombre: string;
}

const ArticleModal: React.FC<any> = ({
  isOpen,
  onClose,
  article,
  typeModal
}) => {
  const [formData, setFormData] = useState<any>({
    codigo: article?.codigo || "",
    descripcion: article?.descripcion || "",
    familia: article?.id_familia || 0,
    activo: article?.activo ?? true,
    imagenes: (article?.imagenes as UploadedImage[]) || [],
  });

  const setArticles: any = storeArticles((state) => state.setArticles);

  const urlImg: any = useUserStore((state) => state.url_img);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [families, setFamilies] = useState<Familia[]>([]);

  useEffect(() => {
    if (article) {
      setFormData((prev: any) => ({
        ...prev,
        codigo: article.codigo || "",
        descripcion: article.descripcion || "",
        familia: article.id_familia || 0,
        activo: article.activo ?? true,
        imagenes: (article.imagenes as UploadedImage[]) || [],
      }));
    }
  }, [article])


  useEffect(() => {
    const fetch = async () => {
      try {
        const response: any = await APIs.getFamilies(3);
        setFamilies(response);
      } catch (error) {
        console.error("Error fetching families", error);
      }
    };
    fetch();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.codigo.trim()) {
      newErrors.codigo = "El código es requerido";
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es requerida";
    }

    if (formData.familia === 0) {
      newErrors.familia = "Debe seleccionar una familia";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [imagenes_elim, setImagenes_elim] = useState<any>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const dataGet = {
      id: 0,
      activos: true,
      nombre: '',
      codigo: '',
      familia: 0,
      proveedor: 0,
      materia_prima: 99,
      get_sucursales: false,
      get_proveedores: false,
      get_max_mins: false,
      get_plantilla_data: false,
      get_areas_produccion: false,
      coleccion: false,
      get_stock: false,
      get_web: false,
      get_unidades: false,
      for_vendedor: false,
      get_imagenes: true,
      page: 1,
    };

    try {
      const data: any = {
        id: typeModal == 'create' ? 0 : article.id,
        tipo: 2,
        codigo: formData.codigo,
        descripcion: formData.descripcion,
        id_familia: formData.familia,
        materia_prima: 2,
        activo: 1,
        imagenes: formData.imagenes,
        tipo_de_cobro: 1,
        id_plantilla: 1,
        base_max: 0,
        altura_max: 0,
        multiplos_de: 0,
        clave_sat: "",
        unidad_sat: "",
        visualizacion_web: true,
        indicaciones: "",
        notas_web: "",
        condiciones_compra: "",
        bajo_pedido: false,
        vender_sin_stock: false,
        desabasto: false,
        iva_excento: false,
        precio_libre: false,
        ultimas_piezas: false,
        fyv: false,
        consultar_cotizador: false,
        consultar_te: false,
        imagenes_elim,
        sucursales: [
          {
            id_sucursal: 2,
            name: "web",
            id_almacen_pred: 1,
            disponible: false,
          },
        ],
      };

      if (typeModal == 'create') {
        await APIs.createArticles(data);
        const result: any = await APIs.getArticles(dataGet);
        setArticles(result);
        Swal.fire("Artículo creado exitosamente", "", "success");
        setFormData({
          codigo: "",
          descripcion: "",
          familia: 0,
          imagenes: [],
        });
      } else {

        await APIs.updateArticles(data);
        const result: any = await APIs.getArticles(dataGet);
        setArticles(result);
        Swal.fire("Artículo creado exitosamente", "", "success");
        setFormData({
          codigo: "",
          descripcion: "",
          familia: 0,
          imagenes: [],
        });
      }
      onClose();
    } catch (error) {
      console.error("Ocurrió un error al crear/actualizar el artículo", error);
      Swal.fire("Ocurrió un error al crear el artículo", "", "error");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const convertFilesToBase64 = (files: File[]) => {
    const promises = files.map(
      (file) =>
        new Promise<UploadedImage>((resolve: any, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              img_url: reader.result as string,
            });
          };
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(file);
        })
    );

    Promise.all(promises)
      .then((images) => {
        setFormData((prev: any) => ({
          ...prev,
          imagenes: [...prev.imagenes, ...images],
        }));
      })
      .catch((error) => {
        console.error("Error converting images", error);
        Swal.fire("Error al procesar imágenes", "", "error");
      });
  };

  const handleImageDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/")
      );

      convertFilesToBase64(files);
    },
    []
  );

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      convertFilesToBase64(files);
    }
  };

  const removeImage = (img: any, index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      imagenes: prev.imagenes.filter((_: any, i: any) => i !== index),
    }));


    if (typeModal == 'update') {
      setImagenes_elim([...imagenes_elim, img.id])
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-article">
          <div className="modal-title-container">
            <div className="modal-icon">
              {article ? (
                <Edit2 className="icon-lg" />
              ) : (
                <Package className="icon-lg" />
              )}
            </div>
            <h2 className="modal-title">
              {article ? "Editar Artículo" : "Crear Nuevo Artículo"}
            </h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X className="icon-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="codigo">
                Código <span className="required">*</span>
              </label>
              <input
                id="codigo"
                name="codigo"
                type="text"
                value={formData.codigo}
                onChange={handleInputChange}
                className={errors.codigo ? "error" : ""}
                placeholder="Ej: PROD001"
              />
              {errors.codigo && (
                <span className="error-message">{errors.codigo}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="descripcion">
                Descripción <span className="required">*</span>
              </label>
              <input
                id="descripcion"
                name="descripcion"
                type="text"
                value={formData.descripcion}
                onChange={handleInputChange}
                className={errors.descripcion ? "error" : ""}
                placeholder="Descripción del producto"
              />
              {errors.descripcion && (
                <span className="error-message">{errors.descripcion}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="familia">
                Familia <span className="required">*</span>
              </label>
              <select
                id="familia"
                name="familia"
                value={formData.familia}
                onChange={handleInputChange}
                className={errors.familia ? "error" : ""}
              >
                <option value={0}>Seleccionar familia</option>
                {families.map((familia) => (
                  <option key={familia.id} value={familia.id}>
                    {familia.nombre}
                  </option>
                ))}
              </select>
              {errors.familia && (
                <span className="error-message">{errors.familia}</span>
              )}
            </div>

            <div className="form-group image-upload-group">
              <label>
                <Image className="icon-sm" />
                Imágenes del Producto
              </label>
              <div
                className="dropzone"
                onDrop={handleImageDrop}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}>
                <div className="dropzone-content">
                  <Upload className="dropzone-icon" />
                  <p className="dropzone-text">Arrastra las imágenes aquí o</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="file-input"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="upload-button">
                    Seleccionar archivos
                  </label>
                </div>
              </div>

              {formData.imagenes.length > 0 && (
                <div className="image-preview-grid">
                  {formData.imagenes.map((img: any, index: number) => (
                    <div key={index} className="image-preview">
                      <img src={img?.img_url && img.img_url.startsWith("data:image")
                        ? img.img_url
                        : `${urlImg}${(img?.img_url).replace(/\\/g, "/")}`} alt={`Preview ${index + 1}`} className="preview-image" />
                      <button type="button" className="remove-image" onClick={() => removeImage(img, index)}> <Trash2 className="icon-sm" /></button>
                      <span className="image-name">{img.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-outline" onClick={onClose}>
              <X className="icon-sm" />
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              <Save className="icon-sm" />
              {article ? "Actualizar" : "Crear"} Artículo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleModal;
