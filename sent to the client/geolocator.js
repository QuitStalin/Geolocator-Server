if ("geolocation" in navigator) {
  console.log("geolocation is available");

  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    document.getElementById("latitude").textContent = lat;
    document.getElementById("longitude").textContent = lon;

    let data;

    let options;

    document.getElementById("button").addEventListener("click", sendData);
    document.getElementById("button").addEventListener("click", getDatabase);

    async function sendData() {
      mood = document.getElementById("mood").value;

      data = { lat, lon, mood };

      if (data.mood == "") data.mood = "no mood";

      options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api", options);
      const json = await response.json();
      console.log(json);
    }

    //this code makes the map show using Leaflet
    var map = L.map("map").setView([lat, lon], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    var marker = L.marker([lat, lon]).addTo(map);
  });
} else {
  console.log("geolocation is not available");
}
