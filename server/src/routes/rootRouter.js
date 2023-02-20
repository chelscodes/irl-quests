import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import questsRouter from "./api/v1/questsRouter.js";
import clientRouter from "./clientRouter.js";
import tasksRouter from "./api/v1/tasksRouter.js"
import rewardsRouter from "./api/v1/rewardsRouter.js";

const rootRouter = new express.Router();

rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/quests", questsRouter)
rootRouter.use("/api/v1/tasks", tasksRouter)
rootRouter.use("/api/v1/rewards", rewardsRouter)

export default rootRouter;
