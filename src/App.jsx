import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FamilyImpactSection from "./FamilyImpactSection";
import glavaImage from "/Glava/Glava-RGB.png";
import bljesakImage from "/Bljesak/Bljesak-1-RGB.png";
import kapljicaImage from "/Kapljica/Kapljica-1-RGB.png";
import obrazImage from "/Obraz/Obraz-1-RGB.png";
import okoImage from "/Oko/Oko-1-RGB.png";
import rukaImage from "/Ruka/Ruka-1-RGB.png";
import ustaImage from "/Usta/Usta-1-RGB.png";

function App() {
  const [count, setCount] = useState(0);
  const canvasRef = useRef(null);

  const handleCanvasDraw = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // List of images to load
    const images = [
      { src: glavaImage, name: "Glava" },
      { src: bljesakImage, name: "Bljesak" },
      { src: kapljicaImage, name: "Kapljica" },
      { src: obrazImage, name: "Obraz" },
      { src: okoImage, name: "Oko" },
      { src: rukaImage, name: "Ruka" },
      { src: ustaImage, name: "Usta" },
    ];

    // Load all images
    Promise.all(
      images.map(
        ({ src, name }) =>
          new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            console.log(src);
            img.onload = () => resolve(img);
            img.onerror = () =>
              reject(new Error(`Failed to load image: ${name}`));
          })
      )
    )
      .then((loadedImages) => {
        // Clear the canvas before drawing
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw all images in order
        loadedImages.forEach((img) => {
          context.drawImage(img, 0, 0, 640, 720);
        });
        console.log(new Date().getTime());
        // Create a download link
        const link = document.createElement("a");
        link.download = "layered.png";
        link.href = canvas.toDataURL("image/png");
        // link.click();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(e);
          }}
        >
          <FamilyImpactSection />
        </form>
      </div>
      {/* <div className="bg-white">
        <canvas className="w-full h-full" ref={canvasRef} height={720} width={640}></canvas>
      </div>
        <button onClick={handleCanvasDraw}>Gumb</button> */}
    </>
  );
}

export default App;
