import "./App.css";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import { useEffect, useState } from "react";
import Select from "react-select";

function App() {
  const [trophyChartData, setTrophyChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Trophies",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Max",
        data: [],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        hidden: true,
      },
    ],
  });

  const [trophyChartOptions, setTrophyChartOptions] = useState({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Amount of trophies",
      },
    },
  });

  const [gamesTotalChartData, setGamesTotalChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Games",
        data: [],
        borderColor: "rgb(255, 206, 86)",
        backgroundColor: "rgba(255, 206, 86, 0.5)",
      },
    ],
  });

  const [gamesTotalChartOptions, setGamesTotalChartOptions] = useState({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Amount of games played",
      },
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        callbacks: {},
      },
    },
  });

  const [daysInArenaChartData, setDaysInArenaTotalChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Wins",
        data: [],
        // borderColor: "rgb(153, 102, 255)",
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 99, 132, 0.5)",
        ],
      },
    ],
  });

  const [daysInArenaChartOptions, setDaysInArenaTotalChartOptions] = useState({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Amount of games played",
      },
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        callbacks: {},
      },
    },
  });

  useEffect(() => {
    // fetch("https://gmc.io-jpt.nl/api/min_trophies.php")
    //   .then((res) => res.json())
    //   .then((result) => {
    //     console.log(result);
    //   });

    // fetch("https://gmc.io-jpt.nl/api/max_trophies.php")
    //   .then((res) => res.json())
    //   .then((result) => {
    //     console.log(result);
    //   });

    fetch("https://gmc.io-jpt.nl/api/get_best_of_each_day.php")
      .then((res) => res.json())
      .then((result) => {
        setTrophyChartData({
          labels: result.map((x) => x["created_at"]),
          datasets: [
            {
              label: "Trophies",
              data: result.map((x) => x["trophies"]),
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Max",
              data: result.map((x) => x["max_trophies"]),
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              hidden: true,
            },
          ],
        });
        const trophiesToolTip = (toolTipItems) => {
          if (toolTipItems.dataIndex !== 0) {
            var current_val = result[toolTipItems.dataIndex]["trophies"];
            var prev_val = result[toolTipItems.dataIndex - 1]["trophies"];

            var change = current_val - prev_val;

            return `${toolTipItems.formattedValue}, ${
              change < 0 ? "" : "+"
            }${change}`;
          } else {
            return `${toolTipItems.formattedValue}, +0`;
          }
        };
        setTrophyChartOptions({
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Amount of trophies",
            },
            tooltip: {
              displayColors: false,
              callbacks: {
                label: trophiesToolTip,
              },
              titleFont: {
                size: 14,
              },
              bodyFont: {
                size: 14,
                family: "sans-serif",
              },
            },
          },
        });

        setGamesTotalChartData({
          labels: result.map((x) => x["created_at"]),
          datasets: [
            {
              label: "Games",
              data: result.map((x) => x["total_games"]),
              borderColor: "rgb(255, 206, 86)",
              backgroundColor: "rgba(255, 206, 86, 0.5)",
              fill: true,
            },
            {
              label: "Wins",
              data: result.map((x) => x["total_wins"]),
              borderColor: "rgb(153, 102, 255)",
              backgroundColor: "rgba(153, 102, 255, 0.5)",
              fill: true,
              hidden: true,
            },
            {
              label: "Losses",
              data: result.map((x) => x["total_games"] - x["total_wins"]),
              borderColor: "rgb(153, 102, 255)",
              backgroundColor: "rgba(153, 102, 255, 0.5)",
              fill: true,
              hidden: true,
            },
          ],
        });
        const gamesTotalToolTip = (toolTipItems) => {
          if (toolTipItems.dataIndex !== 0) {
            var dataset = "total_losses";

            if (toolTipItems.datasetIndex === 0) {
              dataset = "total_games";
            } else if (toolTipItems.datasetIndex === 1) {
              dataset = "total_wins";
            } else {
            }

            var current_val = 0;
            var prev_val = 0;

            if (dataset === "total_losses") {
              current_val =
                result[toolTipItems.dataIndex]["total_games"] -
                result[toolTipItems.dataIndex]["total_wins"];
              prev_val =
                result[toolTipItems.dataIndex - 1]["total_games"] -
                result[toolTipItems.dataIndex - 1]["total_wins"];
            } else {
              current_val = result[toolTipItems.dataIndex][dataset];
              prev_val = result[toolTipItems.dataIndex - 1][dataset];
            }

            var change = current_val - prev_val;

            return `${toolTipItems.formattedValue}, +${change}`;
          } else {
            return `${toolTipItems.formattedValue}, +0`;
          }
        };
        setGamesTotalChartOptions({
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Amount of games played",
            },
            legend: {
              display: false,
            },
            tooltip: {
              displayColors: false,
              callbacks: {
                label: gamesTotalToolTip,
              },
              titleFont: {
                size: 14,
              },
              bodyFont: {
                size: 14,
                family: "sans-serif",
              },
            },
          },
        });
      });
    fetch("https://gmc.io-jpt.nl/api/days_in_arena.php")
      .then((res) => res.json())
      .then((result) => {
        setDaysInArenaTotalChartData({
          labels: result.map((x) => x["arena"]),
          datasets: [
            {
              label: "Days",
              data: result.map((x) => x["arena_days"]),
              // borderColor: "rgb(153, 102, 255)",
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 206, 86, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(153, 102, 255, 0.5)",
                "rgba(255, 159, 64, 0.5)",
                "rgba(255, 99, 132, 0.5)",
              ],
            },
          ],
        });
        setDaysInArenaTotalChartOptions({
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Amount of games played",
            },
            legend: {
              display: false,
            },
            tooltip: {
              displayColors: false,
              callbacks: {},
            },
          },
          scales: {
            y: {
              min: 0,
              max:
                Math.max.apply(
                  Math,
                  result.map((x) => parseInt(x.arena_days))
                ) + 2,
              ticks: {
                stepSize: 1,
              },
            },
          },
        });
      });
  }, []);

  const handleChange = (selectedOption) => {
    const mappedOptions = selectedOption.map((x) => x.value);
    console.log(mappedOptions);
    setGamesTotalChartData((prevState) => ({
      labels: prevState.labels,
      datasets: [
        {
          label: "Games",
          data: prevState.datasets[0].data,
          borderColor: "rgb(255, 206, 86)",
          backgroundColor: "rgba(255, 206, 86, 0.5)",
          fill: true,
          hidden: mappedOptions.includes("Games") ? false : true,
        },
        {
          label: "Wins",
          data: prevState.datasets[1].data,
          borderColor: "rgb(153, 102, 255)",
          backgroundColor: "rgba(153, 102, 255, 0.5)",
          fill: true,
          hidden: mappedOptions.includes("Wins") ? false : true,
        },
        {
          label: "Losses",
          data: prevState.datasets[2].data,
          borderColor: "rgb(153, 102, 255)",
          backgroundColor: "rgba(153, 102, 255, 0.5)",
          fill: true,
          hidden: mappedOptions.includes("Losses") ? false : true,
        },
      ],
    }));
  };

  return (
    <div className="App">
      <div className="container">
        <h1>stefstats</h1>
        <div className="chart-container">
          <LineChart
            data={trophyChartData}
            options={trophyChartOptions}
            className="chart"
          />
        </div>
        <Select
          defaultValue={{ value: "Games", label: "Games" }}
          options={[
            { value: "Games", label: "Games" },
            { value: "Wins", label: "Wins" },
            { value: "Losses", label: "Losses" },
          ]}
          onChange={handleChange}
          isMulti
        />
        <div className="chart-container">
          <LineChart
            data={gamesTotalChartData}
            options={gamesTotalChartOptions}
            className="chart"
          />
        </div>
        <div className="chart-container">
          <BarChart
            data={daysInArenaChartData}
            options={daysInArenaChartOptions}
            className="chart"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
