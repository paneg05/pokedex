import { IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar,IonItemDivider, IonLabel, IonList, IonItem, IonInput,IonSearchbar} from '@ionic/react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import './style.css';
import logo from '../image/logo.png'

import selecionado from './selecionado';
import { wait } from '@testing-library/react';


const Home = () => {

  const baseURL= 'https://pokeapi.co/api/v2/pokemon'
  const [id,setId]=useState(1)
  const [limite,setLimite]=useState(30)
  const [pokemon,setPokemon]=useState([])
  const [selecionado,setSelecionado] = useState()
  const [isLoading,setLoading]=useState(true)
  const [ busca, setBusca]=useState('')

  const buscaPokemon = async (busca)=>{
    await axios.get(`${baseURL}/${busca}`).then(response=>response.data).then(data=>{setSelecionado(data)})
  }


  const getPokemon= async ()=>{
    setLoading(true)
    let p = []
    for(let x =1;x<=limite;x++){
      // eslint-disable-next-line no-loop-func
      await axios.get(`${baseURL}/${x}`).then(response=>response.data).then(data=>{
        p=[...p,data]
      })
    }
    
    setPokemon([...p])
    setLoading(false)
  }
  useEffect(()=>{
      getPokemon()

  },[])

  useEffect(()=>{
    if(busca !==''){
      buscaPokemon(busca)
    }else{
      setSelecionado('')
    }
 
  },[busca])


  function clicou (el){


    setSelecionado(el)
    if(selecionado){
      setSelecionado()
    }
  }

  if(isLoading){
    return(
      <IonPage>
      <IonContent fullscreen>
      <div className='container-logo'>
          <IonImg className='logo' src={logo}/>
        </div>
        <div  className='carregando'>
          <h2 >Loading</h2>
        </div>

      </IonContent>
    </IonPage>
    )
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='container-logo'>
          <IonImg className='logo' src={logo}/>
        </div>
        <div className='pokemon-container'> 
          {
            pokemon.map((el)=>{
              return(
                <div key={el.id} onClick={()=> clicou(el)} className='pokemon'>
                  <IonImg className='image' src={el.sprites.front_default}/>
                  <h1>{el.name}</h1>
                  <div className='dados'>
                    <span>Altura: {el.height}</span>
                    <span>Peso: {el.weight}</span>
                    <span>Tipo: {el.types[0].type.name}</span>
                  </div>
                
                
                </div>
                    
                
              )
            })
          }

          {selecionado &&

              <div className='selecionado' onClick={clicou}>
                <div key={`${selecionado.id}_selecionado`}  className='pokemon'>

                  <div className='image-container'>
                    <IonImg className='image' src={selecionado.sprites.front_default}/>
                    <h1>{selecionado.name}</h1>
                  </div>
                  

                  <div className='dados'>
                    <span>Altura: {selecionado.height}</span>
                    <span>Peso: {selecionado.weight}</span>
                    <span>Tipo: {selecionado.types[0].type.name}</span>
                  </div>
                  <div className='stats-container'>
                    <h2>status</h2>
                    <div className='stats'>
                      {
                        selecionado.stats.map((el)=>{
                          return(
                            <span>{el.stat.name}: {el.base_stat}</span>
                          )
                        })
                      }
                    </div>
                    <div className='habilidades-container'>
                      <h2>habilidades</h2>
                      <div className='habilidades'>
                      {
                        selecionado.abilities.map((el)=>{
                            return(
                              <span>{el.ability.name}</span>
                            )
                        })
                      }
                      </div>
                     
                    </div>
                  </div>
                </div>
               
              </div>
          }


        </div>
        <div className='buscar-container'>
          <input className='buscar' type='search' value={busca} onChange={e=>setBusca(e.target.value.toLocaleLowerCase())} placeholder='buscar'/>
        </div>
          


      </IonContent>
    </IonPage>
  );
};

export default Home;
