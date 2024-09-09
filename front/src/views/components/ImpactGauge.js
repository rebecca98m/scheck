import {Gauge, GaugeContainer, GaugeReferenceArc, GaugeValueArc} from "@mui/x-charts/Gauge";
import React from "react";

const ImpactGauge = ({reportDetails}) => {

    const getColor = (value, min, max) => {
        const percentage = (value - min) / (max - min) * 100;
        if(percentage < 33) {
            return "primary-color";
        }
        if(percentage < 66) {
            return "secondary-color";
        }
        return "error-color";

    };

    const color = getColor(reportDetails.result.impact, reportDetails.result.minimpact, reportDetails.result.maximpact);


    return (
        <Gauge
            cornerRadius="50%"
            width={150}
            height={80}
            valuemin={reportDetails.result.minimpact}
            valuemax={reportDetails.result.maximpact}
            value={Number(reportDetails.result.impact.toFixed(2))}
            startAngle={-100}
            endAngle={100}
        >
            <GaugeReferenceArc />
            <GaugeValueArc className={color} />
        </Gauge>
    );

}

export default ImpactGauge;

