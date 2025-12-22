import { useState, useEffect, useRef } from "react";
import './App.css';
import { Client, Frame, Message as StompMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Chatter from "./Chat/Chatter";
import RCar from "./RCar/RCar";

interface Message {
  id: number;
  sender: string;
  content: string;
}

export default function App() {
 

  return (
  <div>
<section className="app-section">
  <h1>Chatter App</h1>
  <div className="chatter-container">
    <Chatter />
  </div>
</section>

<section className="app-section">
  <h1>RCar App</h1>
  <RCar />
</section>

    </div>
  );
}
