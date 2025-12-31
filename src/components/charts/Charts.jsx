
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import './chartRegistry'; // Import registry

export const LineChart = ({ data, options }) => {
    return <div className="chart-container relative w-full h-full"><Line data={data} options={options} /></div>;
};

export const BarChart = ({ data, options }) => {
    return <div className="chart-container relative w-full h-full"><Bar data={data} options={options} /></div>;
};

export const DoughnutChart = ({ data, options }) => {
    // Doughnut usually doesn't need the responsive height container in the same way, but let's keep consistent or custom
    return <div className="relative w-full h-full flex justify-center"><Doughnut data={data} options={options} /></div>;
};

export const RadarChart = ({ data, options }) => {
    return <div className="chart-container relative w-full h-full"><Radar data={data} options={options} /></div>;
};
