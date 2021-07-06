import server from "./server";
import connectToDB from "./Db";

const { PORT } = process.env;

connectToDB()
  .then(() => {
    console.log("Connected to Database ");

    server.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to DB", error);
    process.exit(1);
  });
