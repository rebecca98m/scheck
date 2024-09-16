import {Gauge, GaugeContainer, GaugeReferenceArc, GaugeValueArc} from "@mui/x-charts/Gauge";
import React from "react";

const ImpactGauge = ({impact, minImpact, maxImpact}) => {

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

    const color = getColor(impact, minImpact, maxImpact);


    return (
        <Gauge
            cornerRadius="50%"
            width={160}
            height={100}
            valuemin={minImpact}
            valuemax={maxImpact}
            value={Number(impact.toFixed(2))}
            startAngle={-100}
            endAngle={100}
        >
            <GaugeReferenceArc />
            <GaugeValueArc className={color} />
        </Gauge>
    );

}

export default ImpactGauge;

