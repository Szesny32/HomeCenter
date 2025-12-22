import { useEffect, useRef, useState } from 'react';
import './RCar.css'
import GamepadViewer from './Gamepad/Gamepad';

function RCar() {

  const [mode, setMode] = useState<ControlMode>("gamepad");
  const [controls, setControls] = useState<ControlPayload>({
    ENA: 0,
    ENB: 0,
    IN1: false,
    IN2: false,
    IN3: false,
    IN4: false,
  });

  const handleChange = (key: keyof ControlPayload) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    setControls(prev => ({
      ...prev,
      [key]: Number(e.target.value),
    }));
  };


const [direction, setDirection] = useState<Direction>("stop");
const [powerLeft, setPowerLeft] = useState<number>(180);
const [powerRight, setPowerRight] = useState<number>(180);

  useEffect(() => {
  if (mode !== "manual2") return;

  
  const mapped: ControlPayload = mapToMotors(
    direction,
    powerLeft,
    powerRight
  );

  setControls(mapped);
   sendRequest("http://192.168.0.11/", mapped);

}, [direction, powerLeft, powerRight, mode]);

  const sendRequest = async (url : string, bodyRaw : ControlPayload ) => {
    console.log("sendRequest " + url);
    try {
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyRaw),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      //const data = await response.json();
      //console.log('Response:', data);
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  const prevControls = useRef<ControlPayload>(controls);

    useEffect(() => {
      if (mode !== "manual") return;

      const changed = Object.keys(controls).some(
        key =>
          controls[key as keyof ControlPayload] !==
          prevControls.current[key as keyof ControlPayload]
      );

      if (!changed) return;

      prevControls.current = controls;

      
      sendRequest("http://192.168.0.11/", controls);

    }, [controls, mode]);


  type Direction = "stop" | "forward" | "backward" | "left" | "right";

  const mapToMotors = (dir: Direction, powerLeft: number, powerRight: number) => {
  switch (dir) {
    case "forward":
      return { ENA: powerLeft, ENB: powerRight, IN1: true, IN2: false, IN3: true, IN4: false };
    case "backward":
      return { ENA: powerLeft, ENB: powerRight, IN1: false, IN2: true, IN3: false, IN4: true };
    case "left":
      return { ENA: powerLeft, ENB: powerRight, IN1: false, IN2: true, IN3: true, IN4: false };
    case "right":
      return { ENA: powerLeft, ENB: powerRight, IN1: true, IN2: false, IN3: false, IN4: true };
    default:
      return { ENA: 0, ENB: 0, IN1: false, IN2: false, IN3: false, IN4: false };
  }
};

  return (
    <div>
     <select value={mode} onChange={e => setMode(e.target.value as ControlMode)}>
      <option value="gamepad">Gamepad</option>
      <option value="manual">Manual</option>
      <option value="manual2">Manual+</option>
    </select>
        
    {mode === "manual" && (
      <div>
        {(["ENA","ENB","IN1","IN2","IN3","IN4"] as const).map(key => (
          <div>
          <label>{key}:</label>
          <input
            key={key}
            type="number"
            value={controls[key] as number}
            onChange={handleChange(key)}
          />
          </div>
        ))}
      </div>
    )}

          
{mode === "manual2" && (
  <div>
    <div className="dpad">
      <button className="up" onClick={() => setDirection("forward")}>⬆️</button>
      <button className="left" onClick={() => setDirection("left")}>⬅️</button>
      <button className="center" onClick={() => setDirection("stop")}>🚫</button>
      <button className="right" onClick={() => setDirection("right")}>➡️</button>
      <button className="down" onClick={() => setDirection("backward")}>⬇️</button>
    </div>

    <div>
      <label>Moc Left: {powerLeft}</label>
      <input
        type="range"
        min={180}
        max={255}
        value={powerLeft}
        onChange={e => setPowerLeft(Number(e.target.value))}
      />
    </div>

    
    <div>
      <label>Moc Right: {powerRight}</label>
      <input
        type="range"
        min={180}
        max={255}
        value={powerRight}
        onChange={e => setPowerRight(Number(e.target.value))}
      />
    </div>
  </div>
)}

    {
      mode === "gamepad" && (
      <div>
        <h1>Gamepad Monitor</h1>
        <GamepadViewer />
      </div>
      )
    }

      
 

    </div>

  );
}

export type ControlPayload = {
  ENA: number;
  ENB: number;
  IN1: boolean;
  IN2: boolean;
  IN3: boolean;
  IN4: boolean;
};


export type ControlMode = "gamepad" | "manual" |"manual2" ;

export default RCar;
