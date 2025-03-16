import React, { useEffect, useState } from "react";
import useMQTT from "../hooks/use-MQTT";
import { Button, Stack, Typography } from "@mui/material";

export default function Account() {
  const { connectStatus, payload, mqttConnect, sendColor, sendAnimation } = useMQTT();
  const [color, setColor] = useState("#ffffff")

  useEffect(() => {
    setColor(payload)
  }, [payload])
  
  console.log(color)

  useEffect(() => {
    mqttConnect("ws://peaceman.hopto.org", {
        host: "peaceman.hopto.org",
      username: "auramirror",
      password: "MonkeyMatrixKista24!",
      port: 8081,
      protocol: "ws",
    });
  }, []);

  
  return <Stack direction="row" spacing={2}>
    <Typography variant="h5">

    Account {connectStatus} 
    </Typography>
    <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
  <Button variant="contained" onClick={() => sendColor(color)}>Send to MQTT</Button>

  <Button variant="contained" onClick={() => sendAnimation("disco")}>Rainbow</Button>


  </Stack>;
}
