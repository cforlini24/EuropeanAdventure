import { useState } from "react";
import {
    ReactSketchCanvas,
} from "react-sketch-canvas";


const Styling = () => {
    const [strokeColor, setStrokeColor] = useState("255,0,255");


    const changeColor = (event) => {
        setStrokeColor(event.target.value);
      };

    return (
        <div className="d-flex flex-column gap-2 p-2">
            <div className="d-flex gap-2 align-items-center ">
                <label htmlFor="color">Stroke color</label>
                <input
                    type="color"
                    value={strokeColor}
                    onChange={changeColor}
                />
            </div>
            <h1>Canvas</h1>
            <ReactSketchCanvas
                strokeColor={strokeColor}
                canvasColor="black"
                height="800px"
            />
        </div>
    )
}

export default Styling;