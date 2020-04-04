import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(new Date(Date.now()), `Server listening on ${PORT}`)
);
