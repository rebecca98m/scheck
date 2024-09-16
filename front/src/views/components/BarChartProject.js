import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { useEffect, useState } from "react";

const chartSetting = {
    width: 700,
    height: 300,
    slotProps: {
        legend: {
            direction: 'row',
            position: { vertical: 'bottom', horizontal: 'middle' },
            padding: {bottom: 0, left: 0, right: 0, top: 100}
        },
    },
};

const seriesColors = [
    "#3C3F43",
    "#547348",
    "#44626b",
    "#6F3A32",
    "#CEA249",
    "#BFC7BE"
];

export default function BarChartProject({ reports }) {
    const [categories, setCategories] = useState([""]);
    const [seriesData, setSeriesData] = useState([]);

    useEffect(() => {

        if (reports && reports.length > 0) {
            let series = [];

            reports.forEach((report, index) => {
                series.push({
                    data: [report.Impatto],
                    label: report.title,
                    color: seriesColors[index % seriesColors.length]
                });
            });

            setSeriesData(series);
        }
    }, [reports]);

    return (
        <BarChart
            borderRadius={50}
            xAxis={[{ scaleType: 'band', data: categories }]}
            series={seriesData}
            {...chartSetting}

            sx={{m:2}}
        />
    );
}
