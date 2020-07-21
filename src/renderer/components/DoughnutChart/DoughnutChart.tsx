import * as React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js'

/* INTERFACE */
interface DoughnutChartProps {
    labels: Array<string>;
    colors?: Array<string>;
    values: Array<number>;
    focusedValue?: number
}

/* COMPONENT */
const DoughnutChart = (props: DoughnutChartProps) => {
    const total = props.values.reduce((a, b) => {
        return a + b;
    }, 0);
    const text = props.focusedValue !== undefined && total > 0 ? (props.focusedValue / total * 100).toFixed(0) + '%' : '0%';

    var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
    Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
        draw: function () {
            originalDoughnutDraw.apply(this, arguments);

            var chart = this.chart;
            var width = chart.chart.width,
                height = chart.chart.height,
                ctx = chart.chart.ctx;

            var fontSize = (height / 70).toFixed(2);
            ctx.font = fontSize + "em Open Sans";
            ctx.textBaseline = "middle";

            var text = chart.config.data.text,
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 1.9;

            ctx.fillText(text, textX, textY);
        }
    });
    const data = {
        datasets: [{
            data: props.values,
            backgroundColor: ['#F02929', '#54C77B', '#F69947'],
            borderWidth: 2
        }],
        labels: props.labels,
        text: text
    };
    const options = {
        responsive: true,
        legend: {
            display: false
        },
        cutoutPercentage: 80,
        maintainAspectRatio: false
    }

    return <>
        <Doughnut data={data} options={options} />
    </>
}

export default (DoughnutChart);