import mqtt, { IClientOptions, MqttClient } from "mqtt";
import { useState, useEffect, useCallback } from "react";

type Payload = { topic: string; message: string };

export default function useMQTT() {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [connectStatus, setConnectStatus] = useState("Idle");
  const [payload, setPayload] = useState<string>("#ffffff");

  const mqttConnect = useCallback(
    (host: string, mqttOption?: IClientOptions) => {
      setConnectStatus("Connecting");
      setClient(mqtt.connect(host, mqttOption));
    },
    [setConnectStatus, setClient]
  );

  useEffect(() => {
    if (client) {
      console.log(client);
      client.on("connect", () => {
        setConnectStatus("Connected");
        client.publish("SYNC", "")
        client.subscribe("SYNC-ACC");
        client.subscribe("party/light_setting");
      });
      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        setConnectStatus("Reconnecting");
      });
      client.on("message", (topic, message) => {
        if(topic === "SYNC-ACC") return
        console.log(topic, message)

        const [r, g, b] = message.toString().split(",")
        setPayload("#" + Number(r).toString(16).padStart(2, "0") + Number(g).toString(16).padStart(2, "0") + Number(b).toString(16).padStart(2, "0"))
      });

      return () => {
        client.end();
      };
    }
  }, [client]);

  const sendColor = (color: string) => {
    if(!client) return console.log("Not connected")

      const [_, r1, r2, g1, g2, b1, b2] = color.split("")

      const r = parseInt(r1 + r2, 16)
      const g = parseInt(g1 + g2, 16)
      const b = parseInt(b1 + b2, 16)

    client.publish(
      "party/light_setting",
      `${r},${g},${b}`
    );
  }

  const sendAnimation = (variant: "disco" | "walla-animation") => {
    if(!client) return console.log("Not connected")
    client.publish(
      "party/light_setting",
      variant
    );
  }

  return { connectStatus, payload, mqttConnect, sendColor, sendAnimation };
}
