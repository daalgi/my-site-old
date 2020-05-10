import React, { useState, useRef, useEffect } from 'react'
import * as d3 from "d3"

import Chart from './Compounding/Chart'
import Axis from './Common/Chart/Axis'
import ScatterPlot from './Common/Chart/ScatterPlot'
import TimeLine from './Common/Chart/Timeline'
import { getTimelineData, getScatterData } from "./Common/Chart/dummyData"

//import './styles.css'

let temp = [{ x: 0, y: 1 }]//[{ x: 0, y: 0 }, { x: 1, y: 2 }]
for (let i = 1; i < 20; i++) {
    temp.push({
        x: i,
        y: temp[i - 1].y + (Math.random() - 0.5)
    })
}

//import "./styles.css"

const parseDate = d3.timeParse("%m/%d/%Y")
const dateAccessor = d => parseDate(d.date)
const temperatureAccessor = d => d.temperature
const humidityAccessor = d => d.humidity

const getData = () => ({
    timeline: getTimelineData(),
    scatter: getScatterData(),
})

export default props => {
    const [data, setData] = useState(getData())
    //console.log(data)

    /*useInterval(() => {
        setData(getData())
    }, 4000)*/

    //let plot = { width: 300, height: 300, origin: { x: 0, y: 0 } }
    return (
        <div>
            <TimeLine
                data={data.timeline}
                xAccessor={dateAccessor}
                yAccessor={temperatureAccessor}
                label="Temperature"
            />
            
        </div>
    )
}

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    });

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}