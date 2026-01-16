import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import "../../styles/EnvironmentIndicators.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set'];

const data = {
  labels: meses,
  datasets: [
    {
      label: 'Mudas Doadas',
      data: [2800, 3100, 3400, 3200, 3000, 3300, 3500, 3400, 2700],
      borderColor: '#4CAF50',
      backgroundColor: '#4CAF50',
      pointRadius: 4,
      pointBackgroundColor: '#fff',
      pointBorderWidth: 2,
      tension: 0.4,
    },
    {
      label: 'Mudas Plantadas',
      data: [600, 700, 650, 600, 650, 600, 550, 500, 450],
      borderColor: '#2196F3',
      backgroundColor: '#2196F3',
      pointRadius: 4,
      pointBackgroundColor: '#fff',
      pointBorderWidth: 2,
      tension: 0.4,
    }
  ]
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12
        }
      }
    },
    title: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#e0e0e0',
        drawBorder: false
      },
      ticks: {
        stepSize: 900
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
};

export default function EnvironmentIndicators() {
  return (
    <div className="environment-indicators">
      <div className="header">
        <h2>📈 Evolução Mensal dos Indicadores</h2>
        <p>Tendências ao longo de 2025</p>
      </div>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
