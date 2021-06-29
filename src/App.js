import React, { useRef, useState, useEffect } from "react";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand } from "./utilities";
import peace from "./assets/peace.png";
import thumbs_up from "./assets/thumbs_up.png";
import okay from "./assets/okay.png";
import raise from "./assets/raise.png";
import {
  _okGesture as okGesture,
  _peaceGesture as peaceGesture,
  _raiseGesture as raiseGesture,
} from "./gestures";

const images = {
  thumbs_up: thumbs_up,
  peace: peace,
  sure: okay,
  raise: raise,
};

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [conf, setConf] = useState(0.0);
  const [name, setName] = useState("none");
  const [emoji, setEmoji] = useState(null);

  const detect = async (net) => {
    try {
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4 &&
        !!net
      ) {
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        const hand = await net.estimateHands(video);

        if (hand.length > 0) {
          const GE = new fp.GestureEstimator([
            fp.Gestures.ThumbsUpGesture,
            peaceGesture,
            okGesture,
            raiseGesture,
          ]);
          const gesture = await GE.estimate(hand[0].landmarks, 5);
          if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
            const confidence = gesture.gestures.map(
              (prediction) => prediction.confidence
            );
            const maxConfidence = confidence.indexOf(
              Math.max.apply(null, confidence)
            );
            setEmoji(gesture.gestures[maxConfidence].name);
            setName(gesture.gestures[maxConfidence].name);
            setConf((Math.max.apply(null, confidence) * 10).toFixed(2));
          }
        } else {
          setEmoji(null);
          setConf(0);
          setName("none");
        }

        const ctx = canvasRef.current.getContext("2d");
        drawHand(hand, ctx);
      } else {
        console.log("Model Not ready");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let interval;
    (async () => {
      const net = await handpose.load();
      console.log("Handpose model loaded.");
      interval = setInterval(() => {
        detect(net);
      }, 5);
    })();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        {emoji !== null ? (
          <img
            alt="gesture"
            src={images[emoji]}
            style={{
              position: "absolute",
              marginRight: "auto",
              top: 110,
              left: 20,
              textAlign: "center",
              height: 100,
            }}
          />
        ) : (
          ""
        )}
        <h1
          style={{
            position: "absolute",
            marginRight: "auto",
            top: 10,
            left: 10,
            color: "#ffffff",
            fontSize: "24px",
          }}
        >
          Confidence: {conf}%
        </h1>
        <h1
          style={{
            position: "absolute",
            marginRight: "auto",
            top: 50,
            left: 10,
            color: "#ffffff",
            fontSize: "24px",
          }}
        >
          Gesture: {name}
        </h1>
      </header>
    </div>
  );
}

export default App;
