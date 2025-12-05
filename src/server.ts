import app from "./app";
import connectDB from "./config/db";

const port = process.env.PORT || 3000;

// Start server only after DB connection
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`JobLink API listening at http://localhost:${port}`);
  });
});
