import express from "express";

const app = express();

app.get("/", (request, response) => {
  return response.json({ message: "initial configurations to the project" });
});

app.listen(3333, () => console.log("Server is running!"));
