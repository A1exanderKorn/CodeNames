app.get("/api/words", (req, res) => {
  res.json(wordsList);
});

app.get("api/gameState", (req, res) => {
  res.json(gameState);
});
