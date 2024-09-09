import {PieChart} from "@mui/x-charts";

const ImpactPieChart = ({reportDetails}) => {
    const color = [
       "#3C3F43",
        "#5E8C98",
        "#6F3A32",
        "#CEA249",
        "#BFC7BE"
    ];
    let data = reportDetails.result.element_values.map(element => (
        {
            "value": element.impact,
            "label": element.element.name
        }
    ) );

    data = data.sort((a,b) => b.value - a.value);

    let otherData = data.slice(4,data.length);
    if(otherData.length >0) {
        otherData = otherData.reduce((sum, current) => ({"value": sum.value+current.value, "label": "Altri"}), {value: 0, label: "Altri"});
        data = data.slice(0,4);
        data = [...data, otherData];
    }

    data = data.map((value, index) => {
        if (typeof value === 'object' && value !== null) {
            value.color = color[index];
        }
        return value;
    });

    return (
        <PieChart
            series={[
                {
                    data: data,
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: 0,
                    endAngle: 360,
                    cx: 150,
                    cy: 150,
                }
            ]}
            width={500}
            height={300}
        />
    );

}

export default ImpactPieChart;

