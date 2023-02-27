import React from "react"
import { ResponsiveTimeRange } from "@nivo/calendar"

const DataVisTimeRange = (props) => {
  const { tasksTimeRange, totalTasks } = props

  return (
    <div className="chart-time-range grid-x">
      <div className="cell small-10 small-offset-2">
        <h6>{totalTasks} Tasks Completed in the Last 60 Days</h6>
      </div>
      <ResponsiveTimeRange
          theme={{
            textColor: "#000",
          }}
          data={tasksTimeRange}
          emptyColor="#eeeeee"
          colors={[ '#E8F1E4', '#CFE4C5', '#ACCE9B', '#7FAE69' ]}
          margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
          weekdayTicks={[0, 1, 2, 3, 4, 5, 6]}
          dayRadius={4}
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          legends={[
              {
                  anchor: 'bottom-right',
                  direction: 'row',
                  justify: false,
                  itemCount: 4,
                  itemWidth: 35,
                  itemHeight: 70,
                  itemsSpacing: 0,
                  itemDirection: 'top-to-bottom',
                  translateX: -60,
                  translateY: -60,
                  symbolSize: 15
              }
          ]}
      />
    </div>
  )
}

export default DataVisTimeRange