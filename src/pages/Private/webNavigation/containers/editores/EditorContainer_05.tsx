

import { Palette } from "lucide-react";
import { useWebStore } from "../../../../../zustand/web-page/StoreWebPage";
import { useState, useEffect } from "react";
import useUserStore from "../../../../../zustand/General";

const EditorContainer_05 = ({ indexContainer, families }: any) => {

  const { containers }: any = useWebStore();
  // const { dataEditContainer }: any = useEditorSliderStore();
  const setContainers = useWebStore(state => state.setContainers)
  const userState = useUserStore((state) => state.user)
  const user_id = userState.id
  
  const [selectTypesFamilies, setSelectTypesFamilies] = useState(false)
  const [selectedTypeFamily, setSelectedTypeFamily] = useState<any>(null)

  // Si families no viene por prop, puedes obtenerlo del store aquí si lo tienes
  // const families = useWebStore(state => state.families)

  const fetchFamilies = async () => {
    const families = await getFamilies(user_id)
    setFamilies(families)
  }

  useEffect(() => {
    // Inicializa el valor seleccionado desde containers
    const famId = containers[indexContainer]?.id_familia;
    if (famId && families) {
    
      const fam = families.find((f: any) => f.id === famId);
      setSelectedTypeFamily(fam || null);
    }
  }, [containers, indexContainer, families]);

  const openSelectFamilies = () => {
    setSelectTypesFamilies(!selectTypesFamilies)
  }

  const handleTypesFamiliesChange = (family: any) => {
    setSelectedTypeFamily(family)
    const data = containers?.map((x: any, index: number) => {
      if (index === indexContainer) {
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





  return (
    <div className="slider slider-editor">
      <div>
        <label>Color de fondo del contenedor</label>
        <input
          type="color"
          value={containers[indexContainer]?.style?.background || "#ffffff"}
          onChange={e => {
            const data = containers.map((x: any, i: number) => {
              if (i === indexContainer) {
                return {
                  ...x,
                  style: {
                    ...x.style,
                    background: e.target.value,
                  },
                };
              }
              return x;
            });
            setContainers(data);
          }}
        />
      </div>
      <div>
        <div className="item_web">
          <div className='select__container'>
            <label className='label__general'>Tipo de familia</label>
            <div className='select-btn__general'>
              <div className={`select-btn ${selectTypesFamilies ? 'active' : ''}`} onClick={openSelectFamilies}>
                <div className='select__container_title'>
                  <p>{selectedTypeFamily ? selectedTypeFamily.nombre : 'Selecciona'}</p>
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
    </div>
  );
};

export default EditorContainer_05;
