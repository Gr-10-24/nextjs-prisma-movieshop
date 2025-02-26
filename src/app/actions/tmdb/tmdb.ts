const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDkzNTEzYTUzNjBlZWRkZWRmMzU3NjI5MTE5ZDJhYiIsIm5iZiI6MTc0MDUwMDYwOC41MDQ5OTk5LCJzdWIiOiI2N2JkZWU4MDNhNTZiYmJlMTk1ZTljZTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tF_LJcUCcFj3IUw-hxZ5fe8yRaLwlsMGzkAPy_Xq07M",
  },
};

const test = fetch("https://api.themoviedb.org/3/authentication", options)
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

console.log(test);
