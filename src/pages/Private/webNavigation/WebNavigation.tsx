
import { storeWebPages } from "../../../zustand/WebPages";
import useUserStore from "../../../zustand/General";
import { useEffect, useState, useRef } from "react";
import './styles/WebNavigation.css'

import ModernCarousel from "./containers/Carousel";
import Description from "./containers/Description";
import Banner from "./containers/Banner";
import SmallBanner from './containers/InfoBanner'
import Form from "./containers/Form";
import { Reorder } from "framer-motion";
import serviceJson from "./jsons/services.json";
import './styles/editor.css'
import { useEditorStore } from "../../../zustand/web-page/Editor";
import { useWebStore } from "../../../zustand/web-page/StoreWebPage";

import ban from '../../../assets/web-navigation/img/banner.png'
import serv from '../../../assets/web-navigation/img/servicios.png'
import desc from '../../../assets/web-navigation/img/descripcion.png'
import sli from '../../../assets/web-navigation/img/slider.png'
import car from '../../../assets/web-navigation/img/carrusel.png'
import sb from '../../../assets/web-navigation/containers/image.png'
import APIs from "../../../services/services/APIs";
import EditorTitulo from "./containers/editores/Description/EditorTitulo";
import { editorContainerStore } from "../../../zustand/web-page/EditorContainer";
import EditorContainers from "./containers/editores/Description/EditorTitleContainers";
import EditorCDescription from "./containers/editores/Description/EditorDescriptionContainers";
import EditorImage from "./containers/editores/Description/EditorImage";
import EditorTitleContainers from "./containers/editores/Description/EditorTitleContainers";
import EditorDescriptionContainers from "./containers/editores/Description/EditorDescriptionContainers";
import Slider from "./containers/Slider";
import Testimonials from "../../../components/containers/Testimonials";
import EditorBanner from "./containers/editores/EditorBanner";
import EditorSlider from "./containers/editores/EditorSlider";
import Cards from "../../../components/containers/Cards";
import Promotions from "./containers/Promotions";
import AboutUs from "./containers/AboutUs";
import { BranchSection } from "./containers/BranchSection";
import ProductCatalog from "./containers/ProductCatalog";
import { useEditorBannerStore } from "../../../zustand/web-page/EditorBanner";
import SmallBannerEditor from "./containers/editores/EditorSmallBanner";
import { ArticleCreationForm } from "./sections/CreateArticles";

const WebNavigation = () => {
  const userState = useUserStore(state => state.user);

  const { HeaderAndFooter, headerAndFooter, updateWeb, updateSectionWeb,
    createContenedor, getContenedor, updateContenedor, deleteContenedor, createSectionsWeb, getSectionsWeb, deleteSectionsWeb,
    createProductsWeb, updateProductsWeb, deleteProductsWeb, updateContenedorOrder }: any = storeWebPages();

  const { dataEditContainer }: any = useEditorBannerStore();
  const setDataEditContainer = useEditorBannerStore(state => state.setDataEditContainer);
  const setCurrentSlide = useEditorBannerStore(state => state.setCurrentSlide);

  const { data }: any = useEditorStore();
  const { dataContainer }: any = editorContainerStore();

  const { sections, containers }: any = useWebStore();
  const setSections = useWebStore(state => state.setSections)
  const setContainers = useWebStore(state => state.setContainers)

  console.log(data)

  const safeJSONParse = (str: string, fallback: any = {}) => {
    try {
      if (!str || typeof str !== 'string') return fallback;
      return JSON.parse(str);
    } catch (error) {
      console.warn('JSON inválido:', str);
      return fallback;
    }
  };

  const [families, setFamilies] = useState<any>()

  const id_sucursal = localStorage.getItem('id_sucursal');

  const [banners, setBanners] = useState<any>([]);

  const [idContainerH] = useState<any>(null)

  const setHeaderAndFooter = storeWebPages(state => state.setHeaderAndFooter)

  const idConatinerHeader = async (x: any) => {
    setSectinId(x.id)
    const container = await getContenedor(x.id);
    const parsedContainer = container?.map((x: any) => ({
      ...x,
      contenido: safeJSONParse(x.contenido),
      style: safeJSONParse(x.style),
    }));
    setContainers(parsedContainer)

  }

  const [logoImage, setlogoImage] = useState<any>(null)

  const fetch = async () => {
    let response: any = await APIs.getHeaderAndFooter(39)
    if (response?.color_primario != undefined) {
      document.documentElement.style.setProperty('--color-header-web-page', response?.color_primario);
    }

    document.documentElement.style.setProperty('--secondary-color-web-page', response?.color_secundario);
    setlogoImage(response?.logo)

    setHeaderAndFooter(response)

  }


  const [sectionId, setSectinId] = useState<any>(null)


  useEffect(() => {
    fetch()

    const hyf = async () => {
      const re = await HeaderAndFooter(39)
      setlogoImage(re?.logo)
      return re
    }

    const safeJSONParsed = (str: any, fallback: any = {}) => {
      try {
        if (!str || typeof str !== "string") return str || fallback;
        return JSON.parse(str);
      } catch (error) {
        console.warn("JSON inválido:", str);
        return fallback;
      }
    };

    const fetchData = async () => {

      const sections = await getSectionsWeb(39);
      setSectinId(sections[0].id)

      // Convertimos cada sección, parseando `imagen` de string a objeto
      const parsedSections = sections?.map((section: any) => ({
        ...section,
        imagen: JSON.parse(section.imagen), // ← aquí está la conversión

      }));

      setSections(parsedSections);

      const container = await getContenedor(sections[0].id);
      const parsedContainer = container?.map((x: any) => ({
        ...x,
        contenido: safeJSONParsed(x.contenido),
        style: safeJSONParsed(x.style),
      }));

      setContainers(parsedContainer)

    };
    fetchData()
    hyf()

  }, [id_sucursal, idContainerH]);





  const [web] = useState<any>([])

  const [stateResponse, setStateResponse] = useState<boolean>(false)

  const responseWeb = () => {
    setStateResponse(!stateResponse)
  }



  const [selectTypesFamilies, setSelectTypesFamilies] = useState<any>()
  const [selectedTypeFamily, setSelectedTypeFamily] = useState<any>()


  const openSelectFamilies = () => {
    setSelectTypesFamilies(!selectTypesFamilies)
  }

  const handleTypesFamiliesChange = (family: any) => {
    setSelectedTypeFamily(family.id)
    const data = containers?.map((x: any, index: number) => {
      if (index === dataEditContainer?.index) {
        return {
          ...x,
          id_familia: family.id
        };
      }
      return x;
    });

    setContainers(data)
    setSelectTypesFamilies(false)
  }






  // useEffect(() => {

  // }, [selectedTypeFamily])


  const [categories, setCategories] = useState<any>([])
  const [products, setProducts] = useState<any>([])

  const [selectTypesSections, setSelectTypesSections] = useState<boolean>(false);
  const [selectedTypeSection, setSelectedTypeSection] = useState<any>(null)

  const [setInputUpdateCategories] = useState<any>('')
  const [setImgUpdateCategories] = useState<any>('')
  const [setTypeUpdateCategories] = useState<any>('')
  const [setViewUpdateCategories] = useState<any>('')


  const openSelectTypesSections = () => {
    setSelectTypesSections(!selectTypesSections)
  }

  const [indexEditSection, setIndexEditSection] = useState<any>()

  const handleTypesSectionsChange = (x: any, index?: number) => {
    setSelectedTypeSection(x);
    setSelectTypesSections(false);

    setIndexEditSection(index)

    useEditorStore.getState().setData('input_section_edit', { seccion: x.seccion });



    // Buscamos la sección correspondiente al tipo seleccionado
    const selectedSection = web.secciones.find((section: any) => section.id === x.id);

    if (selectedSection) {
      setCategories(selectedSection.categorias);

    }



  }





  const [selectTypesCategories, setSelectTypesCategories] = useState<boolean>(false);
  const [selectedTypeCategory, setSelectedTypeCategory] = useState<number | null>(null)



  const openSelectCategories = () => {
    setSelectTypesCategories(!selectTypesCategories)

  }

  const handleCategoriesChange = (x: any) => {
    setSelectedTypeCategory(x.id)
    setInputUpdateCategories(x.nombre)
    setTypeUpdateCategories(x.tipo)
    setViewUpdateCategories(x.vista)
    setImgUpdateCategories(x.imagen)
    setSelectTypesCategories(false)
    console.log(x.id)

    // Si hay categorías y al menos una tiene productos, establecemos los productos de la primera categoría
    if (x) {
      const x = categories.find((category: any) => category.id === selectedTypeCategory);
      if (x) {
        // Si la categoría existe, buscamos los productos que pertenecen a esa categoría
        const productosSeleccionados = x.productos.filter((producto: any) => producto.id_categoria === selectedTypeCategory);

        if (productosSeleccionados.length > 0) {
          setProducts(productosSeleccionados);
        } else {
          // Si no hay productos disponibles, limpiamos la lista de productos
          setProducts([]);
        }
      } else {
        // Si no hay categorías disponibles, limpiamos la lista de productos
        setProducts([]);
      }
    }
  }




  const [selectTypesProducts, setSelectTypesProducts] = useState<boolean>(false);
  const [selectedTypeProduct, setSelectedTypeProduct] = useState<number | null>(null)


  const [nameProducts, setNameProducts] = useState<string>('')
  const [descriptionProducts, setDescriptionProducts] = useState<string>('')
  const [imgProducts, setImgProducts] = useState<any>('')

  const handleImgProductsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const image = reader.result as string; // Asegurar que image sea de tipo string
        setImgProducts(image);
      };
      reader.onerror = (error) => {
        console.error('Error al leer el archivo:', error);
      };
      reader.readAsDataURL(file);
    }
  };


  const openSelectProducts = () => {
    setSelectTypesProducts(!selectTypesProducts)

  }

  const handleProductsChange = (x: any) => {
    setSelectedTypeProduct(x.id)
    setNameProducts(x.nombre)
    setDescriptionProducts(x.descripcion)
    setImgProducts(x.imagen)
    setSelectTypesProducts(false)
  }




  const createProducts = async () => {
    let data;
    data = {
      id_categoria: selectedTypeCategory,
      nombre: nameProducts,
      descripcion: descriptionProducts,
      imagen: imgProducts
    };

    try {
      await createProductsWeb(data);
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
    }
  };



  const updateProducts = async () => {
    const data = {
      id: selectedTypeProduct,
      id_categoria: selectedTypeCategory,
      nombre: nameProducts,
      descripcion: descriptionProducts,
      imagen: imgProducts
    };

    try {
      await updateProductsWeb(data); // Llamar a la función para actualizar la categoría
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
    }
  };

  const deleteProducts = async () => {
    const id = selectedTypeProduct
    await deleteProductsWeb({ id })
  }



  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const image = reader.result as string; // Asegurar que image sea de tipo string
        setlogoImage(image);
        console.log('Imagen convertida a Base64:', image);
      };
      reader.onerror = (error) => {
        console.error('Error al leer el archivo:', error);
      };
      reader.readAsDataURL(file);
    }
  };






  ////////////////////////////////////////////////////////////////////////
  ////////////////////////////// ENCABEZADO //////////////////////////////
  ////////////////////////////////////////////////////////////////////////


  const [primaryColor, setPrimaryColor] = useState<any>('');
  const [textColor, setTextColor] = useState<string>('');

  const handlePrimaryColorChange = (newColor: string) => {
    setPrimaryColor(newColor);
    document.documentElement.style.setProperty('--color-header-web-page', newColor);
  };

  const handleTextColorChange = (newColor: string) => {
    document.documentElement.style.setProperty('--secondary-color-web-page', newColor);
    setTextColor(newColor);
  };



  const updateGeneral = async () => {
    const data = {
      id: headerAndFooter.id,
      id_sucursal: headerAndFooter.id_sucursal,
      logo: logoImage || '',
      color_primario: primaryColor,
      color_secundario: textColor
    };

    await updateWeb(data)
  }



  const [secondsCategory] = useState<any>(null);







  useEffect(() => {

  }, [sections])


  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [activeSidebar] = useState<boolean>(false)

  const toggleSubMenu = (index: any) => {
    setActiveMenuIndex((prevIndex) => (prevIndex === index ? null : index));

  };


  const sales = {
    backgroundColor: activeMenuIndex === 1 && activeSidebar === true ? '#5d35b0' : ''
  }


  const [validateSection, setValidateSection] = useState<number>(1)

  const changeSection = (value: any) => {
    setValidateSection(value)
  }

  ///////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////Footer/////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////



  const [stateToggle, setStateToggle] = useState<boolean>(false)

  const toggleMenu = () => {
    setStateToggle(!stateToggle)

  }

  const overFlow = {
    overflow: stateToggle === true ? 'hidden' : ''
  };




  function stripHtml(html: any) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }



  const [testProd, settestProd] = useState<any>([])

  const [currentTextIndex] = useState(0);
  const mainWebpageRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (secondsCategory && secondsCategory) {
      settestProd(secondsCategory[0].productos)
    }


    const handleResize = () => {
      // Obtener las dimensiones del contenedor principal
      const { current: mainWebpage } = mainWebpageRef;

      if (mainWebpage) {
        const width = mainWebpage.getBoundingClientRect().width;
        if (width <= 600) {
          setIsMobile(true);
          console.log('Es menor')
        } else {
          setIsMobile(false);
        }
      }
    };

    // Llamamos a handleResize para establecer el estado inicial
    handleResize();

  }, [testProd.length, testProd, mainWebpageRef, isMobile, currentTextIndex]);








  const createSections = async (e: React.FormEvent) => {
    e.preventDefault()
    const dat = {
      id_pagina: headerAndFooter.id,
      seccion: data.input_section.content,
      titulo: '',
      imagen: JSON.stringify(data.input_section_edit),
      imagen2: ''

    }

    await createSectionsWeb(dat)
    const sections = await getSectionsWeb(headerAndFooter.id_sucursal);
    setSections(sections)
  }


  const deleteSections = async () => {

    await deleteSectionsWeb(selectedTypeSection)

    const sections = await getSectionsWeb(39);
    setSections(sections)
  }

  const updateSections = async (e: React.FormEvent) => {
    e.preventDefault()
    const dat = {
      id: selectedTypeSection.id,
      seccion: data.input_section_edit.content,
      titulo: '',
      imagen: JSON.stringify(sections[indexEditSection].imagen),
      imagen2: ''

    }
    await updateSectionWeb(dat)
    const section = await getSectionsWeb(39);
    const parsedSections = section?.map((section: any) => ({
      ...section,
      imagen: JSON.parse(section.imagen), // ← aquí está la conversión
    }));

    setSections(parsedSections)
  }




  const [dataServices] = useState<any>([

  ]);








  //////////////////////// BANNER /////////////////




  //////////////////////// SERVICIOS /////////////////////////

  const [dataNumberService] = useState<any>()

  // const editServicePadre = (x: any) => {
  //   console.log('x', x)
  //   setDataNumberService(x);

  // };
  console.log('dataNumberService', dataNumberService)
  useEffect(() => {

  }, [dataNumberService])

  console.log(dataNumberService)

  const [stateUpdateC] = useState<boolean>(true)



  const deleteContainer = async (item: any, i?: number) => {
    let filter = containers.filter((_: any, index: number) => index !== i);
    setContainers(filter);
    await deleteContenedor(item.id)
  }


  const SaveContainer = async (e: React.FormEvent) => {
    e.preventDefault();

    // let id = selectedTypeSection;
    // let id_pagina = headerAndFooter.id;
    // let seccion = nameSection;
    // let id_familia = 0;

    if (dataNumberService === 1) {
      const newData = {
        titulo: dataServices[0].titulo,
        imagen: dataServices[0].imagen,
        imagen2: dataServices[0].imagen2
      };

      // Define la función setData fuera del objeto newData
      const setData = async () => await updateSectionWeb(newData);
      await setData();

    }

    if (dataNumberService === 2) {
      const newData = {
        titulo: dataServices[0].titulo,
        imagen: dataServices[0].imagen,
        imagen2: dataServices[0].imagen2
      };

      // Define la función setData fuera del objeto newData
      const setData = async () => await updateSectionWeb(newData);
      await setData();

    }
    if (dataNumberService === 5) {
      const newData = {
        titulo: dataServices[0].titulo,
        imagen: dataServices[0].imagen,
        imagen2: dataServices[0].imagen2
      };

      // Define la función setData fuera del objeto newData
      const setData = async () => await updateSectionWeb(newData);
      await setData();

    }

    const container = await getContenedor(sections[0]?.id);
    if (container && Array.isArray(container)) {
      const updatedContainer = container.map(item => {
        const [
          textAlign1, fontSize1, fontWeight1, color1,
          textAlign2, fontSize2, fontWeight2, color2,
          textAlign3, fontSize3, fontWeight3, color3,
          textAlign4, fontSize4, fontWeight4, color4,
          textAlign5, fontSize5, fontWeight5, color5,
          textAlign6, fontSize6, fontWeight6, color6,
        ] = item.imagen6.split('|');

        return {
          ...item,
          textAlign1: textAlign1, fontSize1: fontSize1, fontWeight1: fontWeight1, color1: color1,
          textAlign2: textAlign2, fontSize2: fontSize2, fontWeight2: fontWeight2, color2: color2,
          textAlign3: textAlign3, fontSize3: fontSize3, fontWeight3: fontWeight3, color3: color3,
          textAlign4: textAlign4, fontSize4: fontSize4, fontWeight4: fontWeight4, color4: color4,
          textAlign5: textAlign5, fontSize5: fontSize5, fontWeight5: fontWeight5, color5: color5,
          textAlign6: textAlign6, fontSize6: fontSize6, fontWeight6: fontWeight6, color6: color6,

        };
      });

      setBanners(updatedContainer);
    }

  }



  //////////////////////////////////////////////////
  ///////////////CREAR CONTENEDORES////////////////
  /////////////////////////////////////////////////

  const [indexContainer, setIndexContainer] = useState<number>(0)

  const saveContainer = async (x: any) => {

    const id_seccion = sectionId;
    const id_familia = 0;
    const tipo_contenedor = x;



    ///////////////////////////////
    ////CONTENEDRO DE BANNER///////
    ///////////////////////////////

    if (x === 1) {
      const data = {
        id_seccion,
        id_familia,
        tipo_contenedor,
        imagen: '',
        titulo: '',
        contenido: JSON.stringify({
          index: 0,
          data: [
            {
              title: "Discover Amazing\nExperiences",
              subtitle: "Welcome to Innovation",
              description:
                "Transform your digital presence with cutting-edge solutions designed for the modern world.",
              backgroundImage:
                "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
              backgroundColor: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
              textColor: "#ffffff",
              buttonText: "Get Started",
              buttonLink: "#"
            },
            {
              title: "Discover Amazing\nExperiences",
              subtitle: "Welcome to Innovation",
              description:
                "Transform your digital presence with cutting-edge solutions designed for the modern world.",
              backgroundImage:
                "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
              backgroundColor: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
              textColor: "#ffffff",
              buttonText: "Get Started",
              buttonLink: "#"
            },
            {
              title: "Discover Amazing\nExperiences",
              subtitle: "Welcome to Innovation",
              description:
                "Transform your digital presence with cutting-edge solutions designed for the modern world.",
              backgroundImage:
                "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
              backgroundColor: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
              textColor: "#ffffff",
              buttonText: "Get Started",
              buttonLink: "#"
            },
            {
              title: "Discover Amazing\nExperiences",
              subtitle: "Welcome to Innovation",
              description:
                "Transform your digital presence with cutting-edge solutions designed for the modern world.",
              backgroundImage:
                "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
              backgroundColor: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
              textColor: "#ffffff",
              buttonText: "Get Started",
              buttonLink: "#"
            }
          ]
        })
      }

      // Define la función setData fuera del objeto newData
      setBanners([...banners, data])
      const setData = async () => await createContenedor(data);
      await setData();
    }

    ////CONTENEDRO DE SERVICIOS///////

    if (x === 2) {
      const data = {
        id_seccion,
        id_familia,
        tipo_contenedor,
        contenido: JSON.stringify([
          {
            image: serviceJson.imagen,
            title: 'Lorem ipsum dolor sit',
            description: 'Lorem ipsum dolor sit'
          },
          {
            image: serviceJson.imagen,
            title: 'Lorem ipsum dolor sit',
            description: 'Lorem ipsum dolor sit'
          },
          {
            image: serviceJson.imagen,
            title: 'Lorem ipsum dolor sit',
            description: 'Lorem ipsum dolor sit'
          }
        ])
      }

      await createContenedor(data);
      const container = await getContenedor(sectionId);
      const parsedContainer = container?.map((x: any) => ({
        ...x,
        contenido: safeJSONParse(x.contenido),
      }));
      setContainers(parsedContainer)
    }

    ////CONTENEDRO DE 3 ///////
    if (x == 3) {
      const data: any = {
        id_seccion,
        id_familia,
        tipo_contenedor,

      }

      // Define la función setData fuera del objeto newData
      setBanners([...banners, data])
      const setData = async () => await createContenedor(data);
      await setData();
    }

    ////CONTENEDRO DE SLIDER ///////
    if (x == 4) {
      const data = {
        id_seccion,
        id_familia,
        tipo_contenedor,
        contenido: JSON.stringify({
          index: 0,
          title: "Empresas que confían en nosotros",
          subtitle: "Más de 500 empresas han elegido nuestros servicios profesionales",
          company: '',
          experiency: '',
          tailor: '',
          data: [
            {
              id: "1",
              name: "TechCorp",
              image:
                "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop",
            },
            {
              id: "2",
              name: "GlobalSoft",
              image:
                "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop",
            },
            {
              id: "3",
              name: "Innovate Inc",
              image:
                "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop",
            },
            {
              id: "4",
              name: "Digital Plus",
              image:
                "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=200&h=100&fit=crop",
            },
            {
              id: "5",
              name: "FutureTech",
              image:
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=100&fit=crop",
            },
            {
              id: "6",
              name: "Smart Solutions",
              image:
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=100&fit=crop",
            },
            {
              id: "7",
              name: "Pro Systems",
              image:
                "https://images.unsplash.com/photo-1553028826-f4804151e626?w=200&h=100&fit=crop",
            },
            {
              id: "8",
              name: "Elite Group",
              image:
                "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=100&fit=crop",
            },
          ]
        })

      }

      // Define la función setData fuera del objeto newData
      setBanners([...banners, data])
      const setData = async () => await createContenedor(data);
      await setData();
    }

    ////CONTENEDRO DE SLIDER ///////
    if (x == 6) {
      const data = {
        id_seccion,
        id_familia,
        tipo_contenedor,
        imagen: '',
        titulo: '',
        contenido: JSON.stringify({
          title: "Nuevos productos disponibles",
          subtitle: "Gafetes profesionales y tarjetas personalizadas con acabados premium",
        })
      }

      // Define la función setData fuera del objeto newData
      setBanners([...banners, data])
      const setData = async () => await createContenedor(data);
      await setData();
    }

    /////CONTENEDRO DE FORM ///////
    if (x == 7) {
      const data = {
        id_seccion,
        // id_familia: selectedTypeFamily.id,
        tipo_contenedor,
        imagen: '',

      }

      // Define la función setData fuera del objeto newData
      setBanners([...banners, data])
      const setData = async () => await createContenedor(data);
      await setData();
    }


    ////CONTENEDRO DE SLIDER ///////
    if (x == 8) {
      const data = {
        id_seccion,
        id_familia,
        tipo_contenedor,
        imagen: '',
        titulo: '',
        imagen4: ''
      }

      // Define la función setData fuera del objeto newData
      setBanners([...banners, data])
      const setData = async () => await createContenedor(data);
      await setData();
    }


    /////CONTENEDRO DE SLIDER ///////
    if (x == 5) {
      const data = {
        id_seccion,
        // id_familia: selectedTypeFamily.id,
        tipo_contenedor,
        imagen: '',
        // titulo: serviceJson.titulo,
        // imagen4: serviceJson.descripcion
      }

      // Define la función setData fuera del objeto newData
      setBanners([...banners, data])
      const setData = async () => await createContenedor(data);
      await setData();
    }


    /////CONTENEDRO DE SLIDER ///////
    if (x == 9) {
      const data = {
        id_seccion,
        // id_familia: selectedTypeFamily.id,
        tipo_contenedor,
        imagen: '',

      }

      // Define la función setData fuera del objeto newData
      setBanners([...banners, data])
      const setData = async () => await createContenedor(data);
      await setData();
    }

    /////CONTENEDRO DE SLIDER ///////
    if (x == 10) {
      const data = {
        id_seccion,
        // id_familia: selectedTypeFamily.id,
        tipo_contenedor,
        imagen: '',

      }
      // Define la función setData fuera del objeto newData
      setBanners([...banners, data])
      const setData = async () => await createContenedor(data);
      await setData();
    }

    /////CONTENEDRO DE SLIDER ///////
    if (x == 11) {
      const data = {
        id_seccion,
        // id_familia: selectedTypeFamily.id,
        tipo_contenedor,
        imagen: '',

      }
      // Define la función setData fuera del objeto newData
      setBanners([...banners, data])
      const setData = async () => await createContenedor(data);
      await setData();
    }
    /////CONTENEDRO DE SLIDER ///////
    if (x == 12) {
      const data = {
        id_seccion,
        // id_familia: selectedTypeFamily.id,
        tipo_contenedor,
        imagen: '',

      }
      // Define la función setData fuera del objeto newData
      setBanners([...banners, data])
      const setData = async () => await createContenedor(data);
      await setData();
    }
  }

  /////////////////////////////////////////////////////
  ///////////////EDITOR DE LOS CONTENEDORES///////////
  ////////////////////////////////////////////////////

  console.log(userState)

  console.log('dataEditContainer', dataEditContainer)

  const containerEditor = async (item: any, index: any) => {
    setCurrentSlide(0)
    setDataEditContainer({ item: item, index: 0 });
    setIndexContainer(index)
    // const data = containers?.map((x: any, i: number) => {
    //   if (i === index) {
    //     return {
    //       ...x,
    //       contenido: {
    //         ...x.contenido,
    //         index: 0,
    //       },
    //     };
    //   }
    //   return x;
    // });
    // setContainers(data);
    if (item.tipo_contenedor == 5) {
      let response = await APIs.getFamilies(3)
      setFamilies(response)
    }
  };

  console.log('item', containers)


  /////////////////////////////////////////////////////
  ///////////////UPDATE DE LOS CONTENEDORES///////////
  ////////////////////////////////////////////////////

  console.log('dataContainer', dataContainer)

  const SaveUpdateContainer = async (e: React.FormEvent) => {
    e.preventDefault();


    const index = indexContainer;
    const containerToUpdate = {
      ...containers[index],
      contenido: JSON.stringify(containers[index]?.contenido),
      style: JSON.stringify(containers[index]?.style),
    };

    console.log('containerToUpdate', containerToUpdate)

    try {
      await updateContenedor(containerToUpdate);

      const container = await getContenedor(sectionId);
      const parsedContainer = container?.map((x: any) => ({
        ...x,
        contenido: safeJSONParse(x.contenido),
        style: safeJSONParse(x.style),

      }));
      setContainers(parsedContainer)
    } catch (error) {
      console.error("Error al actualizar el contenedor:", error);
    }
  };



  const updateContainerOrder = async (item: any, index: number) => {
    // Mapear todos los contenedores para aplicar las transformaciones necesarias
    const updatedContainers = containers.map((container: any, i: any) => ({
      ...container,
      contenido: JSON.stringify(container.contenido),
      style: JSON.stringify(container.style),
      orden: i
    }));

    // Encontrar el índice del item a actualizar
    const itemIndex = updatedContainers.findIndex((el: any) => el.id === item.id);

    // Si existe, actualizar su orden manualmente también
    if (itemIndex !== -1) {
      updatedContainers[itemIndex] = {
        ...updatedContainers[itemIndex],
        tipo_contenedor: item.tipo_contenedor,
        order: index
      };
    }

    // Enviar array actualizado al backend o lógica correspondiente
    await updateContenedorOrder(updatedContainers);
  };





  const [linkButtons, setLinkButtons] = useState<any>([])
  const [linkBotton, setLinkBotton] = useState<any>()
  const [linkImage, setLinkImage] = useState<any>()

  const handleLinkBottonChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imageUrl = reader.result;
      setLinkImage(imageUrl);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };



  const addLinkButtons = () => {
    const data = {
      image: linkImage,
      link: linkBotton
    }
    setLinkButtons([...linkButtons, data])
  }

  const addServiceItem = (i: number) => {
    const data = containers?.map((x: any, index: number) => {
      if (index === i) {
        return {
          ...x,
          contenido: [
            ...(x.contenido || []),
            {
              image: serviceJson.imagen,
              title: 'Lorem ipsum dolor sit',
              description: 'Lorem ipsum dolor sit'
            }
          ]
        };
      }
      return x;
    });
    setContainers(data);
  };




  const handleImageContainerChange = (i: any) => {
    const data = containers?.map((x: any, index: number) => {
      if (index === i) {
        return {
          ...x,
          imagenes: [
            ...(x.contenido || []),
            {
              image: serviceJson.imagen,
              title: 'Lorem ipsum dolor sit',
              description: 'Lorem ipsum dolor sit'
            }
          ]
        };
      }
      return x;
    });
    setContainers(data);
  }



  const [enabled, setEnabled] = useState(false);

  const toggleSwitch = () => {
    setEnabled(!enabled);
    const data = containers?.map((x: any, index: number) => {
      if (index === dataEditContainer?.index) {
        return {
          ...x,
          style: {
            ...x.style,
            order: {
              ...x.style.order,
              order: enabled ? 0 : 1,
            },
          },
        }
      }
      return x
    })
    setContainers(data)
  };

  const [showPalette, setShowPalette] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');

  const handleCheck = () => {
    setShowPalette(!showPalette);
  };

  const handleColorSelect = (color: any) => {
    setSelectedColor(color);
    const data = containers?.map((x: any, index: number) => {
      if (index === dataEditContainer?.index) {
        return {
          ...x,
          style: {
            ...x.style,
            color: color,
          },
        };
      }
      return x
    })
    setContainers(data)

  };

  const handleCustomColor = (e: any) => {
    const color = e.target.value;
    setSelectedColor(color);
    const data = containers?.map((x: any, index: number) => {
      if (index === dataEditContainer?.index) {
        return {
          ...x,
          style: {
            ...x.style,
            color: color,
          },
        };
      }
      return x
    })
    setContainers(data)
  };

  const predefinedColors = [
    '#f44336', '#e91e63', '#9c27b0',
    '#3f51b5', '#03a9f4', '#4caf50',
    '#ffeb3b', '#ff9800', '#795548', '#607d8b'
  ];

  const containerEditorH = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = Number(e.target.value);
    // setStyles((prev: any) => ({
    //   ...prev,
    //   heightContainer: newHeight,
    // }));

    // Actualizar el contenedor editado
    const data = containers?.map((x: any, index: number) => {
      if (index === dataEditContainer?.index) {
        return {
          ...x,
          style: {
            ...x.style,
            heightContainer: newHeight
          }
        };
      }
      return x;
    });

    // Guardar los contenedores actualizados
    setContainers(data);
  };



  //////////////////////////////////SERVICES//////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  const colorServicesBackground = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    // Actualizar el contenedor editado
    const data = containers?.map((x: any, index: number) => {
      if (index === dataEditContainer?.index) {
        return {
          ...x,
          style: {
            ...x.style,
            background_color: color
          }
        };
      }
      return x;
    });

    // Guardar los contenedores actualizados
    setContainers(data);
  };

  const containerServicesCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    const border = Number(e.target.value);
    // Actualizar el contenedor editado
    const data = containers?.map((x: any, index: number) => {
      if (index === dataEditContainer?.index) {
        const updatedSubItems = x.contenido.map((item: any, indexTwo: number) => {
          if (dataNumberService.index === indexTwo) {
            return {
              ...item,
              styles: {
                ...item?.styles,
                border: border
              }
            };

          }
          return item;
        });
        return {
          ...x,
          contenido: updatedSubItems
        };
      }
      return x;
    });
    // Guardar los contenedores actualizados
    setContainers(data);
  };

  console.log(containers)
  const handleCustomColorService = (e: any) => {
    const color = e.target.value;
    setSelectedColor(color);
    const data = containers?.map((x: any, index: number) => {
      if (index === dataEditContainer?.index) {
        const updatedSubItems = x.contenido.map((item: any, indexTwo: number) => {
          if (dataNumberService.index === indexTwo) {
            return {
              ...item,
              styles: {
                ...item?.styles,
                background_card: color
              }
            };
          }
          return item;
        });
        return {
          ...x,
          contenido: updatedSubItems
        };
      }
      return x;
    });
    setContainers(data);
  };

  const handleColorSelectService = (color: any) => {
    setSelectedColor(color);
    const data = containers?.map((x: any, index: number) => {
      if (index === dataEditContainer?.index) {
        const updatedSubItems = x.contenido.map((item: any, indexTwo: number) => {
          if (dataNumberService.index === indexTwo) {
            return {
              ...item,
              styles: {
                ...item?.styles,
                background_card: color
              }
            };
          }
          return item;
        });
        return {
          ...x,
          contenido: updatedSubItems
        };
      }
      return x;
    });
    setContainers(data);
  };

  return (
    <div className="web_page">
      <header className='hero__web'>
        <form className='hero__web_container'>
          <nav className='nav__hero_web'>
            <ul className='nav__links_web'>
              <div onClick={responseWeb}>
                <svg id="fi_7835702" viewBox="0 0 24 24" width="25" xmlns="http://www.w3.org/2000/svg"><path d="m18 4v16c0 1.1046-.8954 2-2 2h-8c-1.1046 0-2-.8954-2-2v-16c0-1.1046.8954-2 2-2h8c1.1046 0 2 .8954 2 2z" fill="#fff"></path><path d="m16 1.5h-8c-1.3789 0-2.5 1.1216-2.5 2.5v16c0 1.3784 1.1211 2.5 2.5 2.5h8c1.3789 0 2.5-1.1216 2.5-2.5v-16c0-1.3784-1.1211-2.5-2.5-2.5zm1.5 18.5c0 .8271-.6729 1.5-1.5 1.5h-8c-.8271 0-1.5-.6729-1.5-1.5v-16c0-.8271.6729-1.5 1.5-1.5h1.25l.4736.9472c.1694.3388.5156.5528.8944.5528h2.7639c.3788 0 .725-.214.8944-.5528l.4736-.9472h1.25c.8271 0 1.5.6729 1.5 1.5v16zm-3-2c0 .2764-.2236.5-.5.5h-4c-.2764 0-.5-.2236-.5-.5s.2236-.5.5-.5h4c.2764 0 .5.2236.5.5z" ></path></svg>
              </div>
              <div>
                <svg id="fi_4529370" viewBox="0 0 48 48" width="25" xmlns="http://www.w3.org/2000/svg"><path d="m41 6h-34a4 4 0 0 0 -4 4v22a4 4 0 0 0 4 4h11.87l-.75 6h-4.12a1 1 0 0 0 0 2h20a1 1 0 0 0 0-2h-4.12l-.75-6h11.87a4 4 0 0 0 4-4v-22a4 4 0 0 0 -4-4zm-36 4a2 2 0 0 1 2-2h34a2 2 0 0 1 2 2v19h-38zm22.87 32h-7.74l.75-6h6.23zm15.13-10a2 2 0 0 1 -2 2h-34a2 2 0 0 1 -2-2v-1h38z"></path></svg>
              </div>
            </ul>
          </nav>
        </form>
      </header>
      <div className="main__web">
        <div className="sidebar__web-page-one">
          <button className="item" onClick={() => changeSection(1)}>
            Encabezado
          </button>
          <button className="item" onClick={() => changeSection(2)}>
            Contenedores
          </button>
          <button className="item" onClick={() => changeSection(4)}>
            Productos
          </button>
          <button className="item"onClick={() => changeSection(5)}>
            Articulos
          </button>
          <div>
          </div>
        </div>
        {validateSection === 1 &&
          <div className="sidebar__web-page">
            <div className={`links ${activeMenuIndex === 4 ? 'activeMenu' : ''}`}>
              <button className="link" style={sales} onClick={() => toggleSubMenu(4)}>
                <span>General</span>
                <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
              </button>
              <div className='sub__menu'>
                <div className="sub__menu_container">
                  <div>
                    <div>
                      <p>Color de la cabecera</p>
                      <input className="container__color" type="color" value={primaryColor} onChange={(e) => handlePrimaryColorChange(e.target.value)} />
                    </div>
                    <div>
                      <p>Color del texto de la cabecera</p>
                      <input className="container__color" type="color" value={textColor} onChange={(e) => handleTextColorChange(e.target.value)} />
                    </div>
                    <div>
                      <p>Botones flotantes</p>
                      <div>
                        <div className="container__change_banner_update item_web-page"  >
                          <label className="custom-file-upload">
                            <small>Agregar</small>
                            <input id="file-upload1" type="file" onChange={handleLinkBottonChange} />
                          </label>
                        </div>
                      </div>
                      <input type="text" value={linkBotton} onChange={(e) => setLinkBotton(e.target.value)} className="input__editor" placeholder="Link del boton" />
                      <button className="btn__general-green-web" onClick={addLinkButtons}>Agregar</button>
                    </div>
                    <div className="item_web">
                      <p>Logo</p>
                      <div className="container__change_banner" style={{ backgroundImage: `url(${logoImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <label htmlFor="file-upload12" className="custom-file-upload">
                          <small> Seleccionar archivo</small>
                          <input id="file-upload12" type="file" onChange={handleLogoChange} />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="container__btn_web-page">
                    <button className="btn__general-green-web" onClick={updateGeneral}>Actualizar</button>
                  </div>
                </div>
              </div>
            </div>
            <div className={`links ${activeMenuIndex === 1 ? 'activeMenu' : ''}`}>
              <button className="link" style={sales} onClick={() => toggleSubMenu(1)}>
                <span>Secciones</span>
                <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
              </button>
              <div className='sub__menu'>
                <div className="sub__menu_container">
                  <div className="item_web">
                    <label>Nombre de la seccion</label>
                    <div className="conatiner__input_hero">
                      <EditorTitulo typeName={'input_section'} />
                    </div>
                  </div>
                  <div className="container__btn_web-page">
                    <button className="btn__general-green-web" onClick={createSections}>Crear</button>
                  </div>
                </div>
              </div>
            </div>
            <div className={`links ${activeMenuIndex === 2 ? 'activeMenu' : ''}`}>
              <button className="link" style={sales} onClick={() => toggleSubMenu(2)}>
                <span>Actualizar</span>
                <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
              </button>
              <div className='sub__menu'>
                <div className="sub__menu_container">
                  <div className="item_web">
                    <div className='select__container'>
                      <label className='label__general'>Tipo de seccion</label>
                      <div className='select-btn__general'>
                        <div className={`select-btn ${selectTypesSections ? 'active' : ''}`} onClick={openSelectTypesSections}>
                          <div className='select__container_title'>
                            <p>
                              {selectedTypeSection ?
                                (sections.find((s: { id: number }) => s.id === selectedTypeSection.id) ?
                                  <p>{stripHtml(sections.find((s: { id: number }) => s.id === selectedTypeSection.id)?.seccion)}</p>
                                  : '')
                                : 'Selecciona'}
                            </p>
                          </div>
                          <svg className='chevron__down' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                        </div>
                        <div className={`content ${selectTypesSections ? 'active' : ''}`} >
                          <ul className={`options ${selectTypesSections ? 'active' : ''}`} style={{ opacity: selectTypesSections ? '1' : '0' }}>
                            {sections && sections.map((section: any, index: number) => (
                              <li key={section.id} onClick={() => handleTypesSectionsChange(section, index)}>
                                <div dangerouslySetInnerHTML={{ __html: section.seccion }} />
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="item_web">
                          <label>Nombre de la seccion</label>
                          <div className="conatiner__input_hero">
                            <EditorTitulo typeName={'input_section_edit'} indexEditSection={indexEditSection} selectedTypeSection={selectedTypeSection} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className="btn__general-green-web" onClick={updateSections}>Guardar</button>
                  </div>
                </div>
              </div>
            </div>
            <div className={`links ${activeMenuIndex === 3 ? 'activeMenu' : ''}`}>
              <button className="link" style={sales} onClick={() => toggleSubMenu(3)}>
                <span>Eliminar</span>
                <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
              </button>
              <div className='sub__menu'>
                <div className="sub__menu_container">
                  <div className="item_web">
                    <div className='select__container'>
                      <label className='label__general'>Tipo de seccion</label>
                      <div className='select-btn__general'>
                        <div className={`select-btn ${selectTypesSections ? 'active' : ''}`} onClick={openSelectTypesSections}>
                          <div className='select__container_title'>
                            <p>
                              {selectedTypeSection ?
                                (sections.find((s: { id: number }) => s.id === selectedTypeSection) ?
                                  <p>{stripHtml(sections.find((s: { id: number }) => s.id === selectedTypeSection)?.seccion)}</p>
                                  : '')
                                : 'Selecciona'}
                            </p>
                          </div>
                          <svg className='chevron__down' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                        </div>
                        <div className={`content ${selectTypesSections ? 'active' : ''}`} >
                          <ul className={`options ${selectTypesSections ? 'active' : ''}`} style={{ opacity: selectTypesSections ? '1' : '0' }}>
                            {sections && sections.map((section: any, index: number) => (
                              <li key={section.id} onClick={() => handleTypesSectionsChange(section, index)}>
                                <div dangerouslySetInnerHTML={{ __html: section.seccion }} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className="btn__general-green-web" onClick={deleteSections}>Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {validateSection === 2 &&
          <div className="sidebar__web-page">
            <div className={`links ${activeMenuIndex === 1 ? 'activeMenu' : ''}`}>
              <button className="link" style={sales} onClick={() => toggleSubMenu(1)}>
                <span>Agregar contenedores</span>
                <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
              </button>
              <div className='sub__menu'>
                <div className="sub__menu_container">
                  <div className='select__container'>
                    <label className='label__general'>Tipo de seccion</label>
                    <div className='select-btn__general'>
                      <div className={`select-btn ${selectTypesSections ? 'active' : ''}`} onClick={openSelectTypesSections}>
                        <div className='select__container_title'>
                          <p>
                            {selectedTypeSection ?
                              (sections.find((s: { id: number }) => s.id === selectedTypeSection) ?
                                <p>{stripHtml(sections.find((s: { id: number }) => s.id === selectedTypeSection)?.seccion)}</p>
                                : '')
                              : 'Selecciona'}
                          </p>
                        </div>
                        <svg className='chevron__down' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                      </div>
                      <div className={`content ${selectTypesSections ? 'active' : ''}`} >
                        <ul className={`options ${selectTypesSections ? 'active' : ''}`} style={{ opacity: selectTypesSections ? '1' : '0' }}>
                          {sections && sections.map((section: any, index: number) => (
                            <li key={section.id} onClick={() => handleTypesSectionsChange(section, index)}>
                              <div dangerouslySetInnerHTML={{ __html: section.seccion }} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>Banner</p>
                    <div className="container__change_banner_create" onClick={() => saveContainer(1)} style={{ backgroundImage: `url(${ban})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      <div >
                        <p className="file__input_text">Agregar</p>
                      </div>
                      {/* <label for="file-upload1" class="custom-file-upload">
                      <small> Seleccionar archivo</small>
                      <input id="file-upload1" type="file" onChange={handleImageChange}/>
                    </label> */}
                    </div>
                  </div>
                  <div>
                    <p>Servicios</p>
                    <div className="container__change_banner_create" onClick={() => saveContainer(2)} style={{ backgroundImage: `url(${serv})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      <div >
                        <b><p className="file__input_text">Agregar</p></b>
                      </div>
                      {/* <label for="file-upload1" class="custom-file-upload">
                      <small> Seleccionar archivo</small>
                      <input id="file-upload1" type="file" onChange={handleImageChange}/>
                    </label> */}
                    </div>
                  </div>
                  <div>
                    <p>Descripcion</p>
                    <div className="container__change_banner_create" onClick={() => saveContainer(3)} style={{ backgroundImage: `url(${desc})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      <div>
                        <b><p className="file__input_text">Agregar</p></b>
                      </div>
                      {/* <label for="file-upload1" class="custom-file-upload">
                      <small> Seleccionar archivo</small>
                      <input id="file-upload1" type="file" onChange={handleImageChange}/>
                    </label> */}
                    </div>
                  </div>
                  <div>
                    <p>Slider</p>
                    <div className="container__change_banner_create" onClick={() => saveContainer(4)} style={{ backgroundImage: `url(${sli})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      <div >
                        <b><p className="file__input_text">Agregar</p></b>
                      </div>
                      {/* <label for="file-upload1" class="custom-file-upload">
                      <small> Seleccionar archivo</small>
                      <input id="file-upload1" type="file" onChange={handleImageChange}/>
                    </label> */}
                    </div>
                  </div>
                  <div>
                    <p>Carrucel</p>
                    <div className="container__change_banner_create" onClick={() => saveContainer(5)} style={{ backgroundImage: `url(${car})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      <div>
                        <b><p className="file__input_text">Agregar</p></b>
                      </div>
                      {/* <label for="file-upload1" class="custom-file-upload">
                      <small> Seleccionar archivo</small>
                      <input id="file-upload1" type="file" onChange={handleImageChange}/>
                    </label> */}
                    </div>
                  </div>
                  <div>
                    <p>Small Banner</p>
                    <div className="container__change_banner_create" onClick={() => saveContainer(6)} style={{ backgroundImage: `url(${sb})`, backgroundSize: 'container', backgroundPosition: 'center' }}>
                      <div >
                        <b><p className="file__input_text">Agregar</p></b>
                      </div>
                      {/* <label for="file-upload1" class="custom-file-upload">
                      <small> Seleccionar archivo</small>
                      <input id="file-upload1" type="file" onChange={handleImageChange}/>
                    </label> */}
                    </div>
                  </div>
                  <div>
                    <p>Formulario</p>
                    <div className="container__change_banner_create" onClick={() => saveContainer(7)}>
                      <div>
                        <p className="file__input_text">Agregar</p>
                      </div>
                      {/* <label for="file-upload1" class="custom-file-upload">
                      <small> Seleccionar archivo</small>
                      <input id="file-upload1" type="file" onChange={handleImageChange}/>
                    </label> */}
                    </div>
                  </div>
                  <div>
                    <p>Testimonios</p>
                    <div className="container__change_banner_create" onClick={() => saveContainer(8)}>
                      <div>
                        <p className="file__input_text">Agregar</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>Catalago</p>
                    <div className="container__change_banner_create" onClick={() => saveContainer(9)}>
                      <div>
                        <p className="file__input_text">Agregar Catalago</p>
                      </div>
                      {/* <label for="file-upload1" class="custom-file-upload">
                      <small> Seleccionar archivo</small>
                      <input id="file-upload1" type="file" onChange={handleImageChange}/>
                    </label> */}
                    </div>
                  </div>
                  <div>
                    <p>Promociones</p>
                    <div className="container__change_banner_create" onClick={() => saveContainer(10)}>
                      <div>
                        <p className="file__input_text">Agregar Promociones</p>
                      </div>
                      {/* <label for="file-upload1" class="custom-file-upload">
                      <small> Seleccionar archivo</small>
                      <input id="file-upload1" type="file" onChange={handleImageChange}/>
                    </label> */}
                    </div>
                  </div>
                  <div>
                    <p>Sobre nosotros</p>
                    <div className="container__change_banner_create" onClick={() => saveContainer(11)}>
                      <div>
                        <p className="file__input_text">Agregar Promociones</p>
                      </div>
                      {/* <label for="file-upload1" class="custom-file-upload">
                      <small> Seleccionar archivo</small>
                      <input id="file-upload1" type="file" onChange={handleImageChange}/>
                    </label> */}
                    </div>
                  </div>
                  <div>
                    <p>Card Sucursales</p>
                    <div className="container__change_banner_create" onClick={() => saveContainer(12)}>
                      <div>
                        <p className="file__input_text">Agregar Card Sucursales</p>
                      </div>
                      {/* <label for="file-upload1" class="custom-file-upload">
                      <small> Seleccionar archivo</small>
                      <input id="file-upload1" type="file" onChange={handleImageChange}/>
                    </label> */}
                    </div>
                  </div>
                  <div className="container__btn_web-page">
                    <button className="btn__general-green-web" onClick={SaveContainer}>Guardar</button>
                  </div>
                </div>
              </div>
            </div>
            <div className={`links ${activeMenuIndex === 2 ? 'activeMenu' : ''}`}>
              <button className="link" style={sales} onClick={() => toggleSubMenu(2)}>
                <span>Actualizar contenedores</span>
                <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
              </button>
              <div className='sub__menu'>
                <div className="sub__menu_container">
                  <div className={`container__change_update ${stateUpdateC ? 'active' : ''}`}>
                    {dataEditContainer?.item?.tipo_contenedor === 1 ?
                      <div>
                        <div className="item_web-page">
                          <EditorBanner indexContainer={indexContainer} />
                        </div>
                      </div>
                      :
                      ''
                    }
                    {dataEditContainer?.item?.tipo_contenedor === 2 ?
                      <div>
                        <div className="row__two">
                          <div className="slider-container-height">
                            <div>
                              <p>Tamaño del contendor</p>
                              <input
                                type="range"
                                min="200"
                                max="1000"
                                onChange={containerServicesCard}
                                className="slider__editor_wep-page"
                              />
                            </div>

                          </div>
                        </div>
                        <div>
                          <p>Colo de background</p>
                          <div className="custom-color">

                            <input type="color" onChange={colorServicesBackground} value={selectedColor} />
                          </div>
                        </div>
                        <div>
                          <p>Color de fondo</p>
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
                                      border: selectedColor === color ? '3px solid #000' : 'none',
                                    }}
                                    onClick={() => handleColorSelectService(color)}
                                  />
                                ))}
                                <div className="custom-color">
                                  <label>Personalizado: </label>
                                  <input type="color" onChange={handleCustomColorService} value={selectedColor} />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {dataNumberService?.type == 1 ?
                          <div>
                            <EditorImage typeName={'input_services_image'} subItems={true} dataEditContainer={dataEditContainer} selectedTypeSection={selectedTypeSection} dataNumberService={dataNumberService} />
                            <div className="item_web-page">
                              <p>Titulo</p>
                              <EditorTitleContainers typeName={'input_services_title'} subItems={true} dataEditContainer={dataEditContainer} selectedTypeSection={selectedTypeSection} dataNumberService={dataNumberService} />
                            </div>
                            <div className="item_web-page">
                              <p className="title__editor">Titulo del banner</p>
                              <EditorDescriptionContainers typeName={'input_container_description'} subItems={true} dataEditContainer={dataEditContainer} selectedTypeSection={selectedTypeSection} dataNumberService={dataNumberService} />
                            </div>
                          </div>
                          :
                          ''
                        }
                        {dataNumberService?.type == 2 ?
                          <div>
                            <EditorImage typeName={'input_services_image'} subItems={true} dataEditContainer={dataEditContainer} selectedTypeSection={selectedTypeSection} dataNumberService={dataNumberService} />

                            <div className="item_web-page">
                              <p>Titulo</p>
                            </div>
                            <div className="item_web-page">
                              <p className="title__editor">Descripción</p>
                            </div>
                          </div>
                          :
                          ''
                        }
                        {dataNumberService?.type == 3 ?
                          <div>
                            <EditorImage typeName={'input_services_image'} subItems={true} dataEditContainer={dataEditContainer} selectedTypeSection={selectedTypeSection} dataNumberService={dataNumberService} />
                            <div className="item_web-page">
                              <p>Titulo</p>
                            </div>
                            <div className="item_web-page">
                              <p className="title__editor">Titulo del banner</p>
                            </div>
                          </div>
                          :
                          ''
                        }
                      </div>
                      :
                      ''
                    }
                    {dataEditContainer?.item?.tipo_contenedor === 3 ?
                      <div>
                        <div>
                          <p>Invertir pocisiones</p>
                          <label className="ios-switch">
                            <input type="checkbox" checked={enabled} onChange={toggleSwitch} />
                            <span className="slider" />
                          </label>
                        </div>
                        <div className="row__two">
                          <div className="slider-container-height">
                            <div>
                              <p>Tamaño del contendor</p>
                              <input
                                type="range"
                                min="200"
                                max="1000"

                                onChange={containerEditorH}
                                className="slider__editor_wep-page"
                              />
                            </div>

                          </div>
                        </div>
                        <div>
                          <p>Color de fondo</p>
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
                                      border: selectedColor === color ? '3px solid #000' : 'none',
                                    }}
                                    onClick={() => handleColorSelect(color)}
                                  />
                                ))}
                                <div className="custom-color">
                                  <label>Personalizado: </label>
                                  <input type="color" onChange={handleCustomColor} value={selectedColor} />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <EditorImage typeName={'input_services_image'} dataEditContainer={dataEditContainer} selectedTypeSection={selectedTypeSection} dataNumberService={dataNumberService} />

                        <div className="item_web-page">
                          <p>Titulo</p>
                          <EditorTitleContainers typeName={'input_description_title'} dataEditContainer={dataEditContainer} selectedTypeSection={selectedTypeSection} dataNumberService={dataNumberService} />
                        </div>
                        <div className="item_web-page">
                          <p>Descripción</p>
                          <EditorDescriptionContainers typeName={'input_description_description'} dataEditContainer={dataEditContainer} selectedTypeSection={selectedTypeSection} dataNumberService={dataNumberService} />
                        </div>
                      </div>
                      :
                      ''
                    }
                    {dataEditContainer?.item?.tipo_contenedor === 4 ?
                      <div>
                        <EditorSlider indexContainer={indexContainer} />
                      </div>
                      :
                      ''
                    }
                    {dataEditContainer?.item?.tipo_contenedor === 5 ?
                      <div>
                        <div>
                          <p>Colo de background</p>
                          <div className="custom-color">

                            <input type="color" onChange={colorServicesBackground} value={selectedColor} />
                          </div>
                        </div>
                        <div className="item_web">
                          <div className='select__container'>
                            <label className='label__general'>Tipo de familia</label>
                            <div className='select-btn__general'>
                              <div className={`select-btn ${selectTypesFamilies ? 'active' : ''}`} onClick={openSelectFamilies}>
                                <div className='select__container_title'>
                                  <p>{selectedTypeFamily ? families && families.find((s: { id: number }) => s.id === selectedTypeFamily.id)?.nombre : 'Selecciona'}</p>
                                </div>
                                <svg className='chevron__down' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                              </div>
                              <div className={`content ${selectTypesFamilies ? 'active' : ''}`} >
                                <ul className={`options ${selectTypesFamilies ? 'active' : ''}`} style={{ opacity: selectTypesFamilies ? '1' : '0' }}>
                                  {families?.map((family: any) => (
                                    <li key={family.id} onClick={() => handleTypesFamiliesChange(family)}>
                                      <div>{family.nombre}</div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      :
                      ''
                    }
                    {dataEditContainer?.item?.tipo_contenedor === 6 ?
                      <div>
                        
                        <SmallBannerEditor />
                      </div>
                      :
                      ''
                    }
                    {dataEditContainer?.item?.tipo_contenedor == 8 ?
                      <div>
                        <div className="item_web-page">
                          <p>Titulo</p>
                          <EditorContainers />
                        </div>
                        <div>
                          <p>Descripccion</p>
                          <EditorCDescription />
                        </div>
                        <div className="item_web-page">
                          <p>Imagen del item</p>
                          <div className="container__change_banner_update" style={{ backgroundImage: `url(${dataEditContainer?.item?.imagen})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <label className="custom-file-upload">
                              <small> Seleccionar archivo</small>
                              <input id="file-upload1" type="file" onChange={handleImageContainerChange} />
                            </label>
                          </div>
                        </div>
                      </div>
                      :
                      ''
                    }
                  </div>
                  <div className="container__btn_web-page">
                    <button className="btn__general-green-web" onClick={SaveUpdateContainer}>Actualizar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {validateSection === 4 &&
          <div className="sidebar__web-page">
            <div className={`links ${activeMenuIndex === 1 ? 'activeMenu' : ''}`}>
              <button className="link" style={sales} onClick={() => toggleSubMenu(1)}>
                <span>Agregar productos</span>
                <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
              </button>
              <div className='sub__menu'>
                <div className='select__container'>
                  <label className='label__general'>Tipo de seccion</label>
                  <div className='select-btn__general'>
                    <div className={`select-btn ${selectTypesSections ? 'active' : ''}`} onClick={openSelectTypesSections}>
                      <div className='select__container_title'>
                        <p>
                          {selectedTypeSection ?
                            (web.secciones.find((s: { id: number }) => s.id === selectedTypeSection) ?
                              <p>{stripHtml(web.secciones.find((s: { id: number }) => s.id === selectedTypeSection)?.seccion)}</p>
                              : '')
                            : 'Selecciona'}
                        </p>
                      </div>
                      <svg className='chevron__down' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                    </div>
                    <div className={`content ${selectTypesSections ? 'active' : ''}`} >
                      <ul className={`options ${selectTypesSections ? 'active' : ''}`} style={{ opacity: selectTypesSections ? '1' : '0' }}>
                        {web.secciones && web.secciones.map((section: any, index: number) => (
                          <li key={section.id} onClick={() => handleTypesSectionsChange(section, index)}>
                            <div dangerouslySetInnerHTML={{ __html: section.seccion }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='select__container'>
                  <label className='label__general'>Tipo de categoría</label>
                  <div className='select-btn__general'>
                    <div className={`select-btn ${selectTypesCategories ? 'active' : ''}`} onClick={openSelectCategories}>
                      <div className='select__container_title'>
                        <p>
                          {selectedTypeCategory ?
                            (categories.find((s: { id: number }) => s.id === selectedTypeCategory) ?
                              <p>{stripHtml(categories.find((s: { id: number }) => s.id === selectedTypeCategory)?.nombre)}</p>
                              : '')
                            : 'Selecciona'}
                        </p>
                      </div>
                      <svg className='chevron__down' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                    </div>
                    <div className={`content ${selectTypesCategories ? 'active' : ''}`} >
                      <ul className={`options ${selectTypesCategories ? 'active' : ''}`} style={{ opacity: selectTypesCategories ? '1' : '0' }}>
                        {categories && categories.map((category: any) => (
                          <li key={category.id} onClick={() => handleCategoriesChange(category)}>
                            <div dangerouslySetInnerHTML={{ __html: category.nombre }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <label>Nombre del porducto</label>

                </div>
                <div>
                  <label>Descripcion del producto</label>

                </div>
                <div>
                  <p>Imagen del producto</p>
                  <div className="container__change_banner" style={{ backgroundImage: `url(${imgProducts})` }}>
                    <label htmlFor="file-upload4" className="custom-file-upload">
                      <small> Seleccionar archivo</small>
                      <input id="file-upload4" type="file" onChange={handleImgProductsChange} />
                    </label>
                  </div>
                </div>
                <div className="container__btn">
                  <button className="btn__general-green-web" onClick={createProducts}>Agregar producto</button>
                </div>
              </div>
            </div>
            <div className={`links ${activeMenuIndex === 2 ? 'activeMenu' : ''}`}>
              <button className="link" style={sales} onClick={() => toggleSubMenu(2)}>
                <span>Actualizar productos</span>
                <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
              </button>
              <div className='sub__menu'>
                <div className='select__container'>
                  <label className='label__general'>Tipo de seccion</label>
                  <div className='select-btn__general'>
                    <div className={`select-btn ${selectTypesSections ? 'active' : ''}`} onClick={openSelectTypesSections}>
                      <div className='select__container_title'>
                        <p>
                          {selectedTypeSection ?
                            (web.secciones.find((s: { id: number }) => s.id === selectedTypeSection) ?
                              <p>{stripHtml(web.secciones.find((s: { id: number }) => s.id === selectedTypeSection)?.seccion)}</p>
                              : '')
                            : 'Selecciona'}
                        </p>

                      </div>
                      <svg className='chevron__down' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                    </div>
                    <div className={`content ${selectTypesSections ? 'active' : ''}`} >
                      <ul className={`options ${selectTypesSections ? 'active' : ''}`} style={{ opacity: selectTypesSections ? '1' : '0' }}>
                        {web.secciones && web.secciones.map((section: any, index: number) => (
                          <li key={section.id} onClick={() => handleTypesSectionsChange(section, index)}>
                            <p>{stripHtml(section.seccion)}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='select__container'>
                  <label className='label__general'>Tipo de categoría</label>
                  <div className='select-btn__general'>
                    <div className={`select-btn ${selectTypesCategories ? 'active' : ''}`} onClick={openSelectCategories}>
                      <div className='select__container_title'>
                        <p>
                          {selectedTypeCategory ?
                            (categories.find((s: { id: number }) => s.id === selectedTypeCategory) ?
                              <p>{stripHtml(categories.find((s: { id: number }) => s.id === selectedTypeCategory)?.nombre)}</p>
                              : '')
                            : 'Selecciona'}
                        </p>
                      </div>
                      <svg className='chevron__down' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                    </div>
                    <div className={`content ${selectTypesCategories ? 'active' : ''}`} >
                      <ul className={`options ${selectTypesCategories ? 'active' : ''}`} style={{ opacity: selectTypesCategories ? '1' : '0' }}>
                        {categories && categories.map((category: any) => (
                          <li key={category.id} onClick={() => handleCategoriesChange(category)}>
                            <p>{stripHtml(category.nombre)}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='select__container'>
                  <label className='label__general'>Productos</label>
                  <div className='select-btn__general'>
                    <div className={`select-btn ${selectTypesProducts ? 'active' : ''}`} onClick={openSelectProducts}>
                      <div className='select__container_title'>
                        <p>
                          {selectedTypeProduct ?
                            (products.find((s: { id: number }) => s.id === selectedTypeProduct) ?
                              <p>{stripHtml(products.find((s: { id: number }) => s.id === selectedTypeProduct)?.nombre)}</p>
                              : '')
                            : 'Selecciona'}
                        </p>
                      </div>
                      <svg className='chevron__down' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                    </div>
                    <div className={`content ${selectTypesProducts ? 'active' : ''}`} >
                      <ul className={`options ${selectTypesProducts ? 'active' : ''}`} style={{ opacity: selectTypesProducts ? '1' : '0' }}>
                        {products && products.map((product: any) => (
                          <li key={product.id} onClick={() => handleProductsChange(product)}>
                            <p>{stripHtml(product.nombre)}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <label>Nombre del porducto</label>

                </div>
                <div>
                  <label>Descripcion del producto</label>

                </div>
                <div>
                  <p>Imagen del producto</p>
                  <div className="container__change_banner" style={{ backgroundImage: `url(${imgProducts})` }}>
                    <label htmlFor="file-upload4" className="custom-file-upload">
                      <small> Seleccionar archivo</small>
                      <input id="file-upload4" type="file" onChange={handleImgProductsChange} />
                    </label>
                  </div>
                </div>
                <div className="container__btn">
                  <button className="btn__general-green-web" onClick={updateProducts}>Actualizar producto</button>
                </div>
              </div>
            </div>
            <div className={`links ${activeMenuIndex === 3 ? 'activeMenu' : ''}`}>
              <button className="link" style={sales} onClick={() => toggleSubMenu(3)}>
                <span>Eliminar productos</span>
                <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
              </button>
              <div className='sub__menu'>
                <div className='select__container'>
                  <label className='label__general'>Tipo de seccion</label>
                  <div className='select-btn__general'>
                    <div className={`select-btn ${selectTypesSections ? 'active' : ''}`} onClick={openSelectTypesSections}>
                      <div className='select__container_title'>
                        <p>
                          {selectedTypeSection ?
                            (web.secciones.find((s: { id: number }) => s.id === selectedTypeSection) ?
                              <p>{stripHtml(web.secciones.find((s: { id: number }) => s.id === selectedTypeSection)?.seccion)}</p>
                              : '')
                            : 'Selecciona'}
                        </p>
                      </div>
                      <svg className='chevron__down' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                    </div>
                    <div className={`content ${selectTypesSections ? 'active' : ''}`} >
                      <ul className={`options ${selectTypesSections ? 'active' : ''}`} style={{ opacity: selectTypesSections ? '1' : '0' }}>
                        {web.secciones && web.secciones.map((section: any) => (
                          <li key={section.id} onClick={() => handleTypesSectionsChange(section)}>
                            {section.seccion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='select__container'>
                  <label className='label__general'>Tipo de categoría</label>
                  <div className='select-btn__general'>
                    <div className={`select-btn ${selectTypesCategories ? 'active' : ''}`} onClick={openSelectCategories}>
                      <div className='select__container_title'>
                        <p>{selectedTypeCategory ? categories.find((s: { id: number }) => s.id === selectedTypeCategory)?.nombre : 'Selecciona'}</p>
                      </div>
                      <svg className='chevron__down' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                    </div>
                    <div className={`content ${selectTypesCategories ? 'active' : ''}`} >
                      <ul className={`options ${selectTypesCategories ? 'active' : ''}`} style={{ opacity: selectTypesCategories ? '1' : '0' }}>
                        {categories && categories.map((category: any) => (
                          <li key={category.id} onClick={() => handleCategoriesChange(category)}>
                            <p dangerouslySetInnerHTML={{ __html: category.nombre }}></p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='select__container'>
                  <label className='label__general'>Productos</label>
                  <div className='select-btn__general'>
                    <div className={`select-btn ${selectTypesProducts ? 'active' : ''}`} onClick={openSelectProducts}>
                      <div className='select__container_title'>
                        <p>{selectedTypeProduct ? products.find((s: { id: number }) => s.id === selectedTypeProduct)?.nombre : 'Selecciona'}</p>
                      </div>
                      <svg className='chevron__down' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                    </div>
                    <div className={`content ${selectTypesProducts ? 'active' : ''}`} >
                      <ul className={`options ${selectTypesProducts ? 'active' : ''}`} style={{ opacity: selectTypesProducts ? '1' : '0' }}>
                        {products && products.map((product: any) => (
                          <li key={product.id} onClick={() => handleProductsChange(product)}>
                            <p dangerouslySetInnerHTML={{ __html: product.nombre }}></p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <p>Imagen del producto</p>
                  <div className="container__change_banner" style={{ backgroundImage: `url(${imgProducts})` }}>
                    <label htmlFor="file-upload4" className="custom-file-upload">
                      <small> Seleccionar archivo</small>
                      <input id="file-upload4" type="file" onChange={handleImgProductsChange} />
                    </label>
                  </div>
                </div>
                <div className="container__btn">
                  <button className="btn__general-green-web" onClick={deleteProducts}>Eliminar producto</button>
                </div>
              </div>
            </div>
          </div>
        }

        {validateSection == 5 ?
         <ArticleCreationForm />
        :
        <div ref={mainWebpageRef} style={overFlow} className={`main__webpage ${stateResponse ? 'response' : ''} `} >
            <div className="hero__web-page-edit">
              <div className='hero__web-page_container'>
                <div className="logo_web-page" style={{ backgroundImage: `url(${logoImage})` }}>
                </div>
                <nav className='nav__hero_web-page'>
                  <ul className={`nav__links_web-page ${stateToggle ? 'active' : ''}`}>
                    {sections?.map((x: any, index: any) => (
                      <li key={index}>
                        <button dangerouslySetInnerHTML={{ __html: x.seccion }} style={{ color: x.imagen.color }} onClick={() => idConatinerHeader(x)}></button>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="toggle">
                  <button className={`toggle__botton ${stateToggle ? 'activo' : ''}`} onClick={toggleMenu}>
                    <span className="l1 span"></span>
                    <span className="l2 span"></span>
                    <span className="l3 span"></span>
                  </button>
                </div>
              </div>
            </div>

            <div className="section__one_web">
              <div className={`whatsapp__botton`}>
                {linkButtons && linkButtons.map((x: any) => (
                  <a href={x.link} target="_blank">
                    <img src={x.image} width='50' height='50' alt="" />
                  </a>
                ))}
              </div>
              <Reorder.Group axis="y" values={containers} onReorder={setContainers}>
                {containers.map((item: any, index: any) => (
                  <Reorder.Item value={item} key={item.id}>
                    <div className="container__section_container">
                      {item.tipo_contenedor === 1 &&
                        <div className="banner_web-page-u">
                          <Banner item={item} index={index} />
                          {index !== containers[index].orden ?
                            <button className="btn__general-purple btn_save_order_web" onClick={() => updateContainerOrder(item, index)}>Guardar orden</button>
                            :
                            ''
                          }
                          <div className="tools_edits">
                            <div className="tools_edits_container">
                              <div>
                                <svg className="icon_edit" xmlns="http://www.w3.org/2000/svg" width='18' onClick={() => containerEditor(item, index)} viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                              </div>
                              <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width='15' fill="#e61414" onClick={() => deleteContainer(item, index)} viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                      {item.tipo_contenedor == 2 &&
                        <div className="banner_web-page-u">
                          <Cards item={item} dataEditContainer={dataEditContainer} />
                          {index !== containers[index].orden ?
                            <button className="btn__general-purple btn_save_order_web" onClick={() => updateContainerOrder(item, index)}>Guardar orden</button>
                            :
                            ''
                          }
                          <div className="tools_edits">

                            <div className="tools_edits_container">
                              <div className="add__item" onClick={() => addServiceItem(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor"><path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z" /></svg>
                              </div>
                              <div>
                                <svg className="icon_edit" xmlns="http://www.w3.org/2000/svg" width='18' onClick={() => containerEditor(item, index)} viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                              </div>
                              <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width='15' fill="#e61414" onClick={() => deleteContainer(item, index)} viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                              </div>
                            </div>
                          </div>
                        </div>}
                      {item.tipo_contenedor === 3 &&
                        <div className="collections_web-page-u">
                          <Description item={item} banners={containers} index={index} />
                          {index !== containers[index].orden ?
                            <button className="btn__general-purple btn_save_order_web" onClick={() => updateContainerOrder(item, index)}>Guardar orden</button>
                            :
                            ''
                          }
                          <div className="tools_edits">
                            <div className="tools_edits_container">
                              <div>
                                <svg className="icon_edit" xmlns="http://www.w3.org/2000/svg" width='18' onClick={() => containerEditor(item, index)} viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                              </div>
                              <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width='15' fill="#e61414" onClick={() => deleteContainer(item, index)} viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                      {/* {item.tipo_contenedor === 4 &&
                        <div className="slider_web-page-u">
                          <Slider item={item} banners={containers} />
                          {index !== containers[index].orden ?
                            <button className="btn__general-purple btn_save_order_web" onClick={() => updateContainerOrder(item, index)}>Guardar orden</button>
                            :
                            ''
                          }
                          <div className="tools_edits">
                            <div className="tools_edits_container">
                              <div>
                                <svg className="icon_edit" xmlns="http://www.w3.org/2000/svg" width='18' onClick={() => containerEditor(item, index)} viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                              </div>
                              <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width='15' fill="#e61414" onClick={() => deleteContainer(item, index)} viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      } */}
                      {item.tipo_contenedor === 5 &&
                        <div className="carousel_web-page-u">
                          <ModernCarousel item={item} selectedTypeFamily={selectedTypeFamily} />
                          {index !== containers[index].orden ?
                            <button className="btn__general-purple btn_save_order_web" onClick={() => updateContainerOrder(item, index)}>Guardar orden</button>
                            :
                            ''
                          }
                          <div className="tools_edits">
                            <div className="tools_edits_container">
                              <div>
                                <svg className="icon_edit" xmlns="http://www.w3.org/2000/svg" width='18' onClick={() => containerEditor(item, index)} viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                              </div>
                              <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width='15' fill="#e61414" onClick={() => deleteContainer(item, index)} viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                      {item.tipo_contenedor === 6 &&
                        <div className="banner_web-page-u">
                          <SmallBanner item={item} banners={banners} index={index} />
                          {index !== containers[index].orden ?
                            <button className="btn__general-purple btn_save_order_web" onClick={() => updateContainerOrder(item, index)}>Guardar orden</button>
                            :
                            ''
                          }
                          <div className="tools_edits">
                            <div className="tools_edits_container">
                              <div>
                                <svg className="icon_edit" xmlns="http://www.w3.org/2000/svg" width='18' onClick={() => containerEditor(item, index)} viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                              </div>
                              <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width='15' fill="#e61414" onClick={() => deleteContainer(item, index)} viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                      {item.tipo_contenedor == 4 &&
                        <div className="banner_web-page-u">
                          <Slider item={item} />
                          {/* {index !== banners[index].orden ?
                            <button className="btn__general-purple btn_save_order_web" onClick={() => updateContainerOrder(item, index)}>Guardar orden</button>
                            :
                            ''
                          } */}
                          <div className="tools_edits">
                            <div className="tools_edits_container">
                              <div>
                                <svg className="icon_edit" xmlns="http://www.w3.org/2000/svg" width='18' onClick={() => containerEditor(item, index)} viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                              </div>
                              <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width='15' fill="#e61414" onClick={() => deleteContainer(item, index)} viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                      {item.tipo_contenedor == 8 &&
                        <div className="banner_web-page-u">
                          <Testimonials />
                          <div className="tools_edits">
                            <div className="tools_edits_container">
                              <div>
                                <svg className="icon_edit" xmlns="http://www.w3.org/2000/svg" width='18' onClick={() => containerEditor(item, index)} viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                              </div>
                              <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width='15' fill="#e61414" onClick={() => deleteContainer(item, index)} viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                      {item.tipo_contenedor === 7 &&
                        <div>
                          <Form />
                          <div className="tools_edits">
                            <div className="tools_edits_container">
                              <div>
                                <svg className="icon_edit" xmlns="http://www.w3.org/2000/svg" width='18' onClick={() => containerEditor(item, index)} viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                              </div>
                              <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width='15' fill="#e61414" onClick={() => deleteContainer(item)} viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      }

                      {item.tipo_contenedor === 9 &&
                        <div>
                          <ProductCatalog />
                          <div className="tools_edits">
                            <div className="tools_edits_container">
                              <div>
                                <svg className="icon_edit" xmlns="http://www.w3.org/2000/svg" width='18' onClick={() => containerEditor(item, index)} viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                              </div>
                              <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width='15' fill="#e61414" onClick={() => deleteContainer(item)} viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                      {item.tipo_contenedor === 10 &&
                        <div>
                          <Promotions />
                          <div className="tools_edits">
                            <div className="tools_edits_container">
                              <div>
                                <svg className="icon_edit" xmlns="http://www.w3.org/2000/svg" width='18' onClick={() => containerEditor(item, index)} viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                              </div>
                              <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width='15' fill="#e61414" onClick={() => deleteContainer(item)} viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                      {item.tipo_contenedor === 11 &&
                        <div>
                          <AboutUs />
                          <div className="tools_edits">
                            <div className="tools_edits_container">
                              <div>
                                <svg className="icon_edit" xmlns="http://www.w3.org/2000/svg" width='18' onClick={() => containerEditor(item, index)} viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                              </div>
                              <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width='15' fill="#e61414" onClick={() => deleteContainer(item)} viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                      {item.tipo_contenedor === 12 &&
                        <div>
                          <BranchSection />
                          {index !== containers[index].orden ?
                            <button className="btn__general-purple btn_save_order_web" onClick={() => updateContainerOrder(item, index)}>Guardar orden</button>
                            :
                            ''
                          }
                          <div className="tools_edits">
                            <div className="tools_edits_container">
                              <div>
                                <svg className="icon_edit" xmlns="http://www.w3.org/2000/svg" width='18' onClick={() => containerEditor(item, index)} viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                              </div>
                              <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width='15' fill="#e61414" onClick={() => deleteContainer(item)} viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    </div>

                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>
            <footer className="footer-web-page">
              <div className="footer-line"></div>
              <div className="footer-wrapper">
                {/* <section className="footer-top">
                      <div className="footer-headline">
                          <h3>Sign up to our newsletter</h3>
                          <p>
                              Stay up to date with our news and articles
                          </p>
                      </div>
                      <div className="footer-subscribe">
                          <input type="email" placeholder="Your Email"/>
                          <button>
                              Sign Up
                          </button>
                      </div>
                  </section>
                  <div className="footer-columns">
                      <section className="footer-logo">
                          <img src={headerAndFooter.logo} max-width='20' alt="logo" />
                      </section>
                      <section>
                        {titlesFooterOne.map((paragraph: any, index: any) => (
                          <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                        ))}
                      </section>
                      <section>
                        {titlesFooterTwo.map((paragraph: any, index: any) => (
                          <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                        ))}
                      </section>
                      <section>
                        {titlesFooterThree.map((paragraph: any, index: any) => (
                          <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                        ))}
                      </section>
                  </div> */}
                <div className="footer-bottom">
                  <small>© Desarrollado por Hiplot Business. <span id="year"></span>, Todos los derechos reservados</small>
                  {/* <span className='social-links'>
                          <a href="#" title="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width='20' viewBox="0 0 512 512"><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/></svg>                      
                          </a>
                          <a href="#" title="Linkedin">
                            <svg xmlns="http://www.w3.org/2000/svg" width='20' viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                          </a>
                          <a href="#" title="Twitter">
                            <svg xmlns="http://www.w3.org/2000/svg" width='20' viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
                          </a>
                      </span> */}
                </div>
              </div>
            </footer>
          </div>
        }
      </div>
    </div>
  );
}

export default WebNavigation;
