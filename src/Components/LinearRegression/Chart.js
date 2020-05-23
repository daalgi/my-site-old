import React from 'react'
import { Group } from '@vx/group'
import { Grid } from '@vx/grid'
import { scaleLinear } from '@vx/scale'
import { LinePath, Line } from '@vx/shape'
import { AxisLeft, AxisBottom } from '@vx/axis'
import { ParentSize, ScaleSVG } from '@vx/responsive'
import { curveLinear } from 'd3'
import { max, min } from 'd3-array'


const labelColor = 'hsl(0, 0%, 80%)'

const SvgChart = ({ data, curve = null, predictedPoint = null, width, height }) => {

    const xAccessor = d => d.x
    const yAccessor = d => d.y
    //console.log(data)
    const margin = {
        top: 16,
        bottom: 64,
        left: 64,
        right: 32,
    }
    const rangeXmin = 0//margin.left
    const rangeXmax = width - margin.left - margin.right
    const rangeYmin = 0//margin.bottom
    const rangeYmax = height - margin.top - margin.bottom

    const allPoints = data.length ? [...data, predictedPoint, { x: 0, y: 0 }] : []
    //console.log(data, curve, predictedPoint, allPoints)
    const xMin = allPoints.length ? min(allPoints, xAccessor) : 0
    const xMax = allPoints.length ? max(allPoints, xAccessor) : 1
    const yMin = allPoints.length ? min(allPoints, yAccessor) : 0
    const yMax = allPoints.length ? max(allPoints, yAccessor) : 1
    //console.log(xMin, xMax, yMin, yMax)
    //console.log(rangeXmin, rangeXmax, rangeYmin, rangeYmax)

    const xScale = scaleLinear({
        range: [rangeXmin, rangeXmax],
        domain: [xMin, xMax],
    })
    const yScale = scaleLinear({
        range: [rangeYmax, rangeYmin],
        domain: [yMin, yMax],
    })

    //console.log('render chart')
    return (

        <svg width={width} height={height}>
            <Group top={margin.top} left={margin.left}>

                <Grid
                    xScale={xScale}
                    yScale={yScale}
                    width={rangeXmax}
                    height={rangeYmax}
                    stroke="gray"
                    opacity="0.5"
                    strokeWidth="0.5"
                />
                <Line
                    //from={{ x: rangeXmin, y: rangeYmin }}
                    from={{ x: rangeXmin, y: yScale(0) }}
                    //to={{ x: rangeXmax, y: rangeYmin }}
                    to={{ x: rangeXmax, y: yScale(0) }}
                    stroke={labelColor}
                    strokeWidth={1}
                />
                <Line
                    //from={{ x: rangeXmax, y: rangeYmin }}
                    from={{ x: xScale(0), y: rangeYmin }}
                    //to={{ x: rangeXmax, y: rangeYmax }}
                    to={{ x: xScale(0), y: rangeYmax }}
                    stroke={labelColor}
                    strokeWidth={1}
                />

                {data.length > 1 &&
                    data.map((point, index) =>
                        <circle
                            key={index}
                            cx={xScale(point.x)}
                            cy={yScale(point.y)}
                            r={6}
                            fill="hsl(80,20%,50%)"
                        />
                    )
                }
                {curve &&
                    <LinePath
                        data={curve}
                        curve={curveLinear}
                        x={d => xScale(xAccessor(d))}
                        y={d => yScale(yAccessor(d))}
                        stroke="white"
                        strokeWidth="3"
                    />
                }
                {predictedPoint.x &&
                    <circle
                        cx={xScale(predictedPoint.x)}
                        cy={yScale(predictedPoint.y)}
                        r={8}
                        fill="hsl(0,40%,40%)"
                    />
                }

                <AxisLeft
                    scale={yScale}
                    hideZero
                    top={0}
                    left={0}
                    label="Y"
                    labelProps={{
                        fill: labelColor,
                        textAnchor: 'middle',
                        fontSize: 16,
                        fontFamily: "sans-serif"
                    }}
                    stroke={labelColor}
                    strokeWidth={1}
                    tickTextFill={labelColor}
                    tickStroke="none"
                    tickFormat={v => `${v}`}
                    //labelClassName={classes.axisLabel}
                    tickLabelProps={_ => ({ fill: labelColor, textAnchor: 'end' })}
                />

                <AxisBottom
                    scale={xScale}
                    top={rangeYmax}
                    label='X'
                    labelProps={{
                        fill: labelColor,
                        textAnchor: 'middle',
                        fontSize: 16,
                        fontFamily: "sans-serif"
                    }}
                    stroke={labelColor}
                    strokeWidth={1}
                    tickTextFill={labelColor}
                    tickStroke="none"
                    tickFormat={v => `${v}`}
                    numTicks={width / 86}
                    //labelClassName={classes.axisLabel}
                    tickLabelProps={_ => ({ fill: labelColor, textAnchor: 'middle' })}
                />
            </Group>
        </svg>
    )
}

const Chart = ({ data, curve = null, predictedPoint }) =>

    <ParentSize>
        {({ width, height }) => {
            return (
                <SvgChart
                    data={data}
                    curve={curve}
                    predictedPoint={predictedPoint}
                    width={width}
                    height={height}
                />
            )
        }}
    </ParentSize>


export default Chart