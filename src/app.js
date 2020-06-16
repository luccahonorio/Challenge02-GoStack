const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");


const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title,url,techs} = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes:0,
  };
  repositories.push(repository);
  return response.json(repositories);
});

app.put("/repositories/:id", (request, response) => {
  const {title,url,techs} = request.body;
  const {id} = request.params;

  const findIndex = repositories.findIndex(respository => respository.id === id);

  if(findIndex < 0){
    return response.status(400).json({error:"Repository not found"})
  }

  const repository = {
    id,
    title,
    url,
    techs,
    like: repositories[findIndex].likes,
  }
  repositories[findIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const findIndex = repositories.findIndex(respository => respository.id === id);
  if(findIndex < 0){
    return response.status(400).json({error:"Repository not found"})
  }
  repositories.splice(findIndex,1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const findRepository = repositories.find(respository => respository.id === id);
  if(findRepository < 0){
    return response.status(400).json({error:"Repository not found"})
  }
  findRepository.likes +=1;

  return response.json(findRepository);
});

module.exports = app;
