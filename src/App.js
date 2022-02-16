import "./App.css";
import MyChart from "./components/MyChart";
import { useEffect, useState } from "react";

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
    ],
  });

  const [trophyChartOptions, setTrophyChartOptions] = useState({
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Amount of trophies",
      },
    },
  });

  useEffect(() => {
    fetch("https://gmc.io-jpt.nl/api/days_in_arena.php")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });

    fetch("https://gmc.io-jpt.nl/api/min_trophies.php")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });

    fetch("https://gmc.io-jpt.nl/api/max_trophies.php")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });

    fetch("https://gmc.io-jpt.nl/api/get_best_of_each_day.php")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setTrophyChartData({
          labels: result.map((x) => x["created_at"]),
          datasets: [
            {
              label: "Trophies",
              data: result.map((x) => x["trophies"]),
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        });
      });

    fetch("https://gmc.io-jpt.nl/api/get_arenas.php")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  }, []);

  return (
    <div className="App">
      <MyChart data={trophyChartData} options={trophyChartOptions} />
    </div>
  );
}

export default App;
