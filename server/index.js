const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const Repository = require("./models.js");

app.use(cors())
app.use(express.json())

const connectDB = async () => {
  try {
    const connection = await mongoose.connect("mongodb://root:n439KeCuWv6Gt86Hz9lybfzhC1EW7BnoGU2qArZK5trSR57gmxbCV1WR7WQEyY4O@xg8wwso4cow8s4s8s0s8w4og:27017/?directConnection=true", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
connectDB();

app.get("/data", async (req, res) => {
  try {
    const { repository, color } = req.query;
    
    let normalizedRepository = repository;
    if (repository && repository.includes('github.com/')) {
      const match = repository.match(/github\.com\/([^\/]+\/[^\/]+)/);
      if (match) {
      normalizedRepository = match[1];
      }
    }
    
    console.log(normalizedRepository, color);

    let checkExists = await Repository.findOne({ repository: normalizedRepository });

    const data = {
      repository: normalizedRepository,
      color: color || "#FF0000",
      metrics: [],
    };

    if (!checkExists) {
      checkExists = new Repository(data);
      await checkExists.save();
    }
    const lastMetric = checkExists.metrics.length > 0 ? checkExists.metrics[checkExists.metrics.length - 1] : { date: Date.now(), value: 0 };
    const newValue = (typeof lastMetric.value === 'number' ? lastMetric.value : 0) + 1;

    checkExists.metrics.push({ date: Date.now(), value: newValue });
    await checkExists.save();
    res.status(200).json(checkExists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(9512, () => {
  console.log("Server is running on port 9512");
});
