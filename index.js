import path from 'path';
import express from 'express';

const app = express();

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const todo = [];

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.get('/api/todo', (req, res) => {
  res.json(todo);
});

app.post('/api/todo', (req, res) => {
  const body = req.body;
  const name = body?.name;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const newTodo = {
    id: todo.length + 1,
    name,
  };

  todo.push(newTodo);

  res.status(201).json(newTodo);
});

app.delete('/api/todo/:id', (req, res) => {
  const id = +req.params.id;

  const index = todo.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todo.splice(index, 1);

  res.status(204).end();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
