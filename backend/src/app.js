    const express = require("express");
    const cors    = require("cors");

    const userRoutes    = require("./routes/user.routes");
    const workoutRoutes = require("./routes/workout.routes");
    const historyRoutes = require("./routes/history.routes");
    const calorieRoutes = require("./routes/calorie.routes");
    const authRoutes    = require("./routes/auth.routes");    // 
    const { ragRouter } = require('./services/ragService');
    const { router: adminRoutes } = require('./routes/admin.routes')
    const chatRoutes = require('./routes/chat.routes')
    const favoritesRoutes = require('./routes/favorites.routes')
    const ragRoutes = require('./routes/ragRoutes')  // sesuaikan path


    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/api/auth",     authRoutes);                     // ← TAMBAHAN
    app.use("/api/users",    userRoutes);
    app.use("/api/workout",  workoutRoutes);
    app.use("/api/history",  historyRoutes);
    app.use("/api/calories", calorieRoutes);
    app.use("/api/rag", ragRouter);
    app.use('/api/admin', adminRoutes);
    app.use('/api/chat', chatRoutes);
    app.use('/api/favorites', favoritesRoutes);
    app.use('/api/rag', ragRoutes)

    module.exports = app;