const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));

app.listen(port, () => {
  console.log(`server running on port:${port}...`);
});
