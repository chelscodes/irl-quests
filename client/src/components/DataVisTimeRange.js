import React from "react"
import { ResponsiveTimeRange } from "@nivo/calendar"

const DataVisTimeRange = (props) => {
  
  return (
    <div className="chart-time-range">
      <ResponsiveTimeRange
          data={props.userStats}
          emptyColor="#eeeeee"
          colors={[ '#2E5BD1', '#A4BD97', '#FB8089', '#FABC3A' ]}
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
                  itemWidth: 40,
                  itemHeight: 36,
                  itemsSpacing: 5,
                  itemDirection: 'right-to-left',
                  translateX: -60,
                  translateY: -60,
                  symbolSize: 20
              }
          ]}
      />
    </div>
  )
}

export default DataVisTimeRange