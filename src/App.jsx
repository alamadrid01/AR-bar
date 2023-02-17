import { useState, useEffect } from "react";
import "aframe";
import { Entity, Scene } from "aframe-react";
import "./App.css";
import axios from "axios";
import "aframe-lines";

function App() {
  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = [
    "https://api.weatherbit.io/v2.0/history/daily?postal_code=27601&country=US&start_date=2023-02-14&end_date=2023-02-15&key=1d06aefe85434743b0e0cfd37a7080c5",
    "https://api.weatherbit.io/v2.0/history/daily?postal_code=27601&country=US&start_date=2023-02-13&end_date=2023-02-14&key=1d06aefe85434743b0e0cfd37a7080c5",
    "https://api.weatherbit.io/v2.0/history/daily?postal_code=27601&country=US&start_date=2023-02-12&end_date=2023-02-13&key=1d06aefe85434743b0e0cfd37a7080c5",
    "https://api.weatherbit.io/v2.0/history/daily?postal_code=27601&country=US&start_date=2023-02-11&end_date=2023-02-12&key=1d06aefe85434743b0e0cfd37a7080c5",
    "https://api.weatherbit.io/v2.0/history/daily?postal_code=27601&country=US&start_date=2023-02-10&end_date=2023-02-11&key=1d06aefe85434743b0e0cfd37a7080c5",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const allData = await Promise.all(endpoint.map((end) => axios.get(end)));
      setData(allData.map((response) => response.data.data[0]));
      setLoading(false);
    };
    fetchData();

  }, []);

  // console.log(datas)

  const maxTemp = Math.max(...datas.map((data) => data.temp));

  const barColor = (temperature) => {
    if (temperature >= 15) {
      return "red";
    } else if (temperature >= 10) {
      return "orange";
    } else {
      return "gold";
    }
  };

const xHeight= [{
  label: 25,
  height: 1
},
{
  label: 20,
  height: 2
},
{
  label: 15,
  height: 3
},
{
  label: 10,
  height: 4
},
{
  label: 5,
  height: 5
}]
  return (
    <div className="App">
      <Scene>
        {/* <Entity camera position='0 1.6 0' look-controls /> */}

        {/* Add frame */}
        <Entity
          geometry={{ primitive: "box", width: 13, height: 13, depth: 0.1 }}
          material={{ color: "lightBlue" }}
          position={{ x: 0, y: 3, z: -5 }}
          // animation={{property: 'rotation', dur: 25000, loop:true, to: '0 360 0' }}
        />

        {loading && (
          <Entity position={{ x: -1.3, y: 2.0, z: 0 }}>
            <a-text
              value="Fetching data at the moment"
              color="red"
              width="3.5"
              height="3.5"
              font="https://cdn.aframe.io/fonts/Exo2Bold.fnt"
            />
            <Entity
              material={{ shader: "flat", color: "transparent" }}
              geometry={{ primitive: "plane", width: "auto", height: "auto" }}
              position="0 2.0 -0.1"
            ></Entity>
          </Entity>
        )}
        {/* <Entity geometry={{ primitive: 'line', start: '0 0 0', end: '0 15 0', lineWidth: '0.05' }}
      material={{ color: 'red' }}
      position={'-5 0 0'} /> */}
       <Entity position={{ x: -3.4, y: 4.9, z: 0 }}>
          <a-text
            value="Temp"
            color="red"
            width="4"
            height="4"
            font="https://cdn.aframe.io/fonts/Exo2Bold.fnt"
          />
          <a-text
            value="Temp"
            color="green"
            width="4"
            height="4"
            font="https://cdn.aframe.io/fonts/Exo2Bold.fnt"
          />
          <Entity
            material={{ shader: "flat", color: "transparent" }}
            geometry={{ primitive: "plane", width: "auto", height: "auto" }}
            position="0 2.0 -0.1"
          ></Entity>
        </Entity>
       {
        xHeight.map((space) => (
        <Entity key={space.label} position={{ x: -3, y: 5 - space.height/1.2, z: 0 }}>
          <a-text
            value={space.label}
            color="red"
            width="4"
            height="4"
            font="https://cdn.aframe.io/fonts/Exo2Bold.fnt"
          />
          <Entity
            material={{ shader: "flat", color: "transparent" }}
            geometry={{ primitive: "plane", width: "auto", height: "auto" }}
            position="0 2.0 -0.1"
          ></Entity>
        </Entity>

        ))
       }
          <Entity position={{ x: 2, y: 0, z: 0 }}>
          <a-text
            value="Date"
            color="red"
            width="4"
            height="4"
            font="https://cdn.aframe.io/fonts/Exo2Bold.fnt"
          />
          <Entity
            material={{ shader: "flat", color: "transparent" }}
            geometry={{ primitive: "plane", width: "auto", height: "auto" }}
            position="0 2.0 -0.1"
          ></Entity>
        </Entity>
        <Entity position="-2.5 -9.7 0">
          <a-entity lines="points: 0 15 0, 0 10 0, 5 10 0; color:grey"></a-entity>
        </Entity>

        {/* Add bars */}
        {datas.map((data, index) => {
          const color = barColor(data.temp);
          return (
            <Entity key={index}>
              <Entity
                geometry={{
                  primitive: "box",
                  width: 0.5,
                  height: data.temp / 2,
                  depth: 1,
                }}
                material={{ color }}
                position={`${index - datas.length / 1.5} ${
                  data.temp / 3 - data.max_temp / 15
                } -5`}
              >
                <Entity>
                  <a-text
                    value={data.datetime}
                    color="red"
                    width="4.5"
                    height="4.5"
                    font="https://cdn.aframe.io/fonts/Exo2Bold.fnt"
                    position="0 8 -1"
                  />
                </Entity>
              </Entity>
            </Entity>
          );
        })}
        {/* <Entity geometry={{ primitive: 'box', width: 1, height: 5, depth: 1 }}
              material={{ color: 'orange' }}
              position={{x: -2, y: 0, z: -5}} />
      <Entity geometry={{ primitive: 'box', width: 1, height: 3, depth: 1 }}
              material={{ color: 'pink' }}
              position={{x: 0 , y:0 , z:-5}}/>
      <Entity geometry={{ primitive: 'box', width: 1, height: 4, depth: 1 }}
              material={{ color: 'gold' }}
              position={{x: 2 , y:0 , z:-5}}/> */}
        <Entity primitive="a-camera" position={{ x: -0.6, y: 1.8, z: 6.2 }} />
      </Scene>
    </div>
  );
}

export default App;
