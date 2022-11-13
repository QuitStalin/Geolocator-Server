getDatabase();
async function getDatabase() {
  const response = await fetch("/gimmeData");
  const data = await response.json();

  //lets make some html for this data

  //reset table
  document
    .getElementById("dataTable")
    .replaceChildren(document.getElementById("heading"));

  //creating table contents
  for (item of data) {
    const root = document.createElement("tr");
    root.id = "root";

    const mood = document.createElement("td");
    mood.textContent = item.mood;
    mood.id = "mood";
    const geo = document.createElement("td");
    geo.textContent = `${item.lat}°, ${item.lon}°`;
    const date = document.createElement("td");
    date.textContent = new Date(item.timestamp).toLocaleString();

    root.append(mood, geo, date);
    document.getElementById("dataTable").append(root);
  }

  console.log(data);
}
