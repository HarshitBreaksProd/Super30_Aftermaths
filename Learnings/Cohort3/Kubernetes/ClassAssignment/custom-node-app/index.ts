import { PrismaClient } from "./generated/prisma";
import express from "express";

const prismaClient = new PrismaClient();
const app = express();

app.listen(3000, () => console.log("listening on 3000"));
