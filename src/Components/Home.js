import React from 'react'
import { appleStock } from '@vx/mock-data'
import { Group } from '@vx/group'
import { Grid } from '@vx/grid'
import { scaleTime, scaleLinear } from '@vx/scale'
import { AreaClosed, LinePath } from '@vx/shape'
import { AxisLeft, AxisBottom } from '@vx/axis'
import { LinearGradient } from '@vx/gradient'
import { extent, max } from 'd3-array'
import { useTooltip, TooltipWithBounds } from '@vx/tooltip'
import { localPoint } from '@vx/event'

import { makeStyles } from '@material-ui/core/styles'
import { curveLinear } from 'd3'



const useStyles = makeStyles(theme => ({
    xTickLabel: {
        fill: "hsl(0,20%,80%)",
        textAnchor: "middle"
    },
    axisLabel: {
        fill: "hsl(0,20%,80%)",
        textAnchor: "end"
    },

}))


const data = appleStock
//console.log(data)
const width = 750
const height = 400

const x = d => new Date(d.date)
const y = d => d.close

// Bounds
const margin = {
    top: 60,
    bottom: 60,
    left: 380,
    right: 80,
}
const xMax = width - margin.left - margin.right
const yMax = height - margin.top - margin.bottom

const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x)
})
const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, max(data, y)],
})


export default () => {
    const {
        tooltipData,
        tooltipLeft,
        tooltipTop,
        tooltipOpen,
        showTooltip,
        hideTooltip,
    } = useTooltip()
    const classes = useStyles()
    console.log(classes)

    const handleMouseOver = (event, datum) => {
        const coords = localPoint(event.target.ownerSVGElement, event);
        console.log(coords)
        showTooltip({
            tooltipLeft: coords.x,
            tooltipTop: coords.y,
            tooltipData: datum
        })
    }

    return (
        <>
            <svg width={width} height={height}>
                <LinearGradient
                    from='green'
                    to='black'
                    id='gradient'
                />

                <Group top={margin.top} left={margin.left}>

                    <Grid
                        xScale={xScale}
                        yScale={yScale}
                        width={xMax}
                        height={yMax}
                        stroke="gray"
                        opacity="0.5"
                        strokeWidth="0.5"
                    //numTicksColumns={3}
                    />
                    <LinePath
                        data={data}
                        curve={curveLinear}
                        //xScale={xScale}
                        //yScale={yScale}
                        x={d => xScale(x(d))}
                        //x={x}
                        y={d => yScale(y(d))}
                        //fill={"url(#gradient)"}
                        stroke={"white"}
                        strokeWidth="2"
                        onTouchStart={handleMouseOver}
                        onMouseLeave={hideTooltip}
                    />

                    <AxisLeft
                        scale={yScale}
                        top={0}
                        left={0}
                        label={'Close Price ($)'}
                        stroke={'white'}
                        tickTextFill={'white'}
                        tickStroke="none"
                        labelClassName={classes.axisLabel}
                        tickLabelProps={_ => ({ fill: 'hsl(0, 20%, 90%)', textAnchor: 'end' })}
                    />

                    <AxisBottom
                        scale={xScale}
                        top={yMax}
                        label={'Years'}
                        //labelProps={({ fill: 'white' })}
                        stroke={'white'}
                        tickTextFill={'#1b1a1e'}
                        tickStroke="none"
                        labelClassName={classes.axisLabel}
                        tickLabelProps={_ => ({ fill: 'hsl(0, 20%, 90%)', textAnchor: 'middle' })}
                    />

                </Group>
            </svg>
            {tooltipOpen && (
                <TooltipWithBounds
                    // set this to random so it correctly updates with parent bounds
                    key={Math.random()}
                    top={tooltipTop}
                    left={tooltipLeft}
                >
                    Data value <strong>{tooltipData.year}</strong>
                </TooltipWithBounds>
            )}
        </>
    )
}