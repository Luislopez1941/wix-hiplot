// RootPage.tsx
import React, { useEffect, useState } from 'react';
import './RootPage.css'
import Banner from '../../../components/containers/Banner';
import Services from '../../../components/services/Services';
import APIs from '../../../services/services/APIs';
import ClientsSlider from '../webNavigation/containers/Clients-slider';
import AutomaticSlider from '../../../components/containers/SliderProduct';

const RootHome: React.FC = () => {



    const [sections, setSections] = useState<any>([])
    const [headerAndFooter, setHeaderAndFooter] = useState<any>([])

    const [logoImage, setlogoImage] = useState<any>(null)

    const [containers, setContainers] = useState<any>([])

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
            const responseC: any = await APIs.getContenedor(response[0].id)
            const responseContainer = responseC?.map((c: any) => ({
                ...c,
                // titulo2: safeJSONParse(c?.titulo2),
                contenido: safeJSONParse(c.contenido),
                style: safeJSONParse(c.style),
            }));


            setContainers(responseContainer)
            const parsedSections = response?.map((section: any) => ({
                ...section,
                imagen: JSON.parse(section.imagen), // ← aquí puede lanzar error si no es JSON válido

            }));

            setSections(parsedSections);

            const result: any = await APIs.getHeaderAndFooter(39);

            if (result?.color_primario !== undefined) {
                document.documentElement.style.setProperty('--color-header-web-page', result.color_primario);
            }

            document.documentElement.style.setProperty('--secondary-color-web-page', result?.color_secundario || '#000000');
            setlogoImage(result?.logo);
            setHeaderAndFooter(result);



        } catch (error) {
            console.error("Error al cargar datos:", error);
        }
    };


    useEffect(() => {
        fetch()
    }, [])

    console.log('sections', sections)
    console.log('containers', containers)


    return (
        <div className='root__dashboard'>
            <div className='hero' style={{ backgroundColor: headerAndFooter?.color_primario }}>
                <div className='hero__container'>
                    <div className='logo' style={{ backgroundImage: `url(${logoImage})` }}></div>
                    <ul className='nav__items'>
                        {sections?.map((x: any, index: any) => (
                            <li key={index}>
                                <li className='nav__item' dangerouslySetInnerHTML={{ __html: x.seccion }} style={{ color: x.imagen.color }}></li>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {containers.map((item: any, index: any) => (
                <div>
                    {item.tipo_contenedor === 1 &&
                        <Banner banners={containers} item={item} index={index} />
                    }
                    {item.tipo_contenedor === 2 &&
                        <Services banners={containers} item={item} index={index} />
                    }
                    {item.tipo_contenedor === 3 &&
                        <ClientsSlider />
                    }
                    {item.tipo_contenedor === 8 &&
                        <AutomaticSlider />
                    }
                </div>
            ))}




        </div>
    );
};

export default RootHome;
