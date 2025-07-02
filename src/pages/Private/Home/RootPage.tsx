import React, { useEffect, useState } from 'react';
import './RootPage.css'
import Banner from '../../../components/containers/Banner';
import APIs from '../../../services/services/APIs';
import Description from '../../../components/containers/Description';
import ModernCarousel from '../../../components/containers/Carousel';
import Footer from '../../../components/containers/Footer';
import Cards from '../../../components/containers/Cards';
import InfoBanner from '../../../components/containers/InfoBanner';
import Slider from '../../../components/containers/Slider';
import Testimonials from '../../../components/containers/Testimonials';
import ProductCatalog from '../../../components/containers/ProductCatalog';
import { storeWebPages } from '../../../zustand/WebPages';
import Form from '../../../components/containers/Form';
import Promotions from '../../../components/containers/Promotions';
import AboutUs from '../../../components/containers/AboutUs';
import { BranchSection } from '../webNavigation/containers/BranchSection';
import WhatsAppContact from '../../../components/containers/WhatsAppButton';

const RootHome: React.FC = () => {
    const { getContenedor }: any = storeWebPages();
    const [sections, setSections] = useState<any>([]);
    const [headerAndFooter, setHeaderAndFooter] = useState<any>([]);
    const [logoImage, setLogoImage] = useState<any>(null);
    const [containers, setContainers] = useState<any>([]);

    const safeJSONParse = (str: string, fallback: any = {}) => {
        try {
            if (!str || typeof str !== 'string') return fallback;
            return JSON.parse(str);
        } catch (error) {
            console.warn('JSON inválido:', str);
            return fallback;
        }
    };

    const fetch = async () => {
        try {
            const response: any = await APIs.getSectionsWeb(39);
            const parsedSections = response?.map((section: any) => ({
                ...section,
                imagen: JSON.parse(section.imagen),
            }));
            setSections(parsedSections);

            const responseC: any = await APIs.getContenedor(response[0].id);
            const responseContainer = responseC?.map((c: any) => ({
                ...c,
                contenido: safeJSONParse(c.contenido),
                style: safeJSONParse(c.style),
            }));

            // Eliminar duplicados por id
            const uniqueContainers = responseContainer.filter(
                (item: any, index: number, self: any[]) =>
                    index === self.findIndex(t => t.id === item.id)
            );

            setContainers(uniqueContainers);

            const result: any = await APIs.getHeaderAndFooter(39);
            if (result?.color_primario !== undefined) {
                document.documentElement.style.setProperty('--color-header-web-page', result.color_primario);
            }
            document.documentElement.style.setProperty('--secondary-color-web-page', result?.color_secundario || '#000000');
            setLogoImage(result?.logo);
            setHeaderAndFooter(result);
        } catch (error) {
            console.error("Error al cargar datos:", error);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    const section = async (x: any) => {
        const container = await getContenedor(x.id);
        const parsedContainer = container?.map((x: any) => ({
            ...x,
            contenido: safeJSONParse(x.contenido),
            style: safeJSONParse(x.style),
        }));
        setContainers(parsedContainer)
    }

    return (
        <div className='root__dashboard'>
            <div className='hero' style={{ backgroundColor: headerAndFooter?.color_primario }}>
                <div className='hero__container'>
                    <div className='logo' style={{ backgroundImage: `url(${logoImage})` }}></div>
                    <ul className='nav__items'>
                        {sections?.map((x: any, index: number) => (
                            <li key={index}>
                                <li onClick={() => section(x)}
                                    className='nav__item'
                                    dangerouslySetInnerHTML={{ __html: x.seccion }}
                                    style={{ color: x.imagen.color }}
                                ></li>
                            </li>
                        ))}
                  

                    </ul>
                </div>
            </div>
            <WhatsAppContact />
            {containers.map((item: any, index: number) => (
                <div key={item.id || index}>
                    {item.tipo_contenedor === 1 && <Banner item={item} />}
                    {item.tipo_contenedor === 2 && <Cards />}
                    {item.tipo_contenedor === 3 && <Description item={item} />}
                    {item.tipo_contenedor === 4 && <Slider />}
                    {item.tipo_contenedor === 5 && <ModernCarousel item={item} />}
                    {item.tipo_contenedor === 6 && <InfoBanner />}
                    {item.tipo_contenedor === 7 && <Form />}
                    {item.tipo_contenedor === 8 && <Testimonials />}
                    {item.tipo_contenedor === 9 && <ProductCatalog />}
                    {item.tipo_contenedor === 10 && <Promotions />}
                    {item.tipo_contenedor === 10 && <Promotions />}
                    {item.tipo_contenedor === 11 && <AboutUs />}
                    {item.tipo_contenedor === 12 && <BranchSection />}
                </div>
            ))}

            <Footer />
        </div>
    );
};

export default RootHome;
