import { useState, useEffect } from 'react'
import "aframe"
import {Entity, Scene} from "aframe-react"
import './App.css'
import axios from "axios"

function App() {
  const [datas, setData] = useState([])
  const endpoint = [
    "https://api.weatherbit.io/v2.0/history/daily?postal_code=27601&country=US&start_date=2023-02-14&end_date=2023-02-15&key=1d06aefe85434743b0e0cfd37a7080c5",
    "https://api.weatherbit.io/v2.0/history/daily?postal_code=27601&country=US&start_date=2023-02-13&end_date=2023-02-14&key=1d06aefe85434743b0e0cfd37a7080c5",
    "https://api.weatherbit.io/v2.0/history/daily?postal_code=27601&country=US&start_date=2023-02-12&end_date=2023-02-13&key=1d06aefe85434743b0e0cfd37a7080c5",
    "https://api.weatherbit.io/v2.0/history/daily?postal_code=27601&country=US&start_date=2023-02-11&end_date=2023-02-12&key=1d06aefe85434743b0e0cfd37a7080c5",
    "https://api.weatherbit.io/v2.0/history/daily?postal_code=27601&country=US&start_date=2023-02-10&end_date=2023-02-11&key=1d06aefe85434743b0e0cfd37a7080c5"
  ]
  
  useEffect(() => {
     const fetchData = async () =>{
      const allData = await Promise.all(endpoint.map(end => axios.get(end)))
      setData(allData.map(response => response.data.data[0]))
     } 
     fetchData()
  }, [])

  console.log(datas)

  const maxTemp = Math.max(...datas.map(data => data.temp));

  return (
    <div className="App">
      <Scene>
      <Entity camera position='0 1.6 0' look-controls />

      {/* Add frame */}
      <Entity geometry={{ primitive: 'box', width: 10, height: 10, depth: 0.1 }}
              material={{ color: 'gray' }}
              position={{x: 0 , y:0 , z:-5}}/>

      {/* Add bars */}
      {
        datas.map((data, index) => (
          <Entity key={index}
          geometry={{ primitive: 'box', width: 0.5 , height: data.temp, depth: 1}}
          material={{color: 'red'}}
          position={`${index - (datas.length / 2)} ${data.temp / 2 - maxTemp / 2} -5`}>
            <Entity text={{value: data.datetime, align: 'center'}}
            position={{x: 0, y: 1.5, z:0}} />
          </Entity>
        ))
      }
      {/* <Entity geometry={{ primitive: 'box', width: 1, height: 5, depth: 1 }}
              material={{ color: 'orange' }}
              position={{x: -2, y: 0, z: -5}} />
      <Entity geometry={{ primitive: 'box', width: 1, height: 3, depth: 1 }}
              material={{ color: 'pink' }}
              position={{x: 0 , y:0 , z:-5}}/>
      <Entity geometry={{ primitive: 'box', width: 1, height: 4, depth: 1 }}
              material={{ color: 'gold' }}
              position={{x: 2 , y:0 , z:-5}}/> */}

        </Scene>
        
    </div>
  )
}

export default App
