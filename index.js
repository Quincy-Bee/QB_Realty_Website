const neighborhoods = [
    { name: "Williamsburg", borough: "Brooklyn" },
    { name: "Bushwick", borough: "Brooklyn" },
    { name: "East New York", borough: "Brooklyn" },
    { name: "Bedford Stuyvesant", borough: "Brooklyn" },
];

app.get("/api/neighborhoods", (req, res) => {
    const q = req.query.q?.toLowerCase();

    const results = neighborhoods.filter(n =>
        n.name.toLowerCase().includes(q)
    );

    res.json(results);
});

function showText() {
  const input = document.getElementById("userInput").value;
  document.getElementById("output").innerText = input;
}