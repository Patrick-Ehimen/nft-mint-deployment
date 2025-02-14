"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const winston_1 = __importDefault(require("winston"));
// Configure logger
const logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston_1.default.transports.File({ filename: "logs/database.log" }),
    ],
});
const connectMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }
        // MongoDB connection options
        const options = {
            autoIndex: true, // Build indexes automatically
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        };
        yield mongoose_1.default.connect(mongoURI, options);
        logger.info("MongoDB connected successfully");
        // Listen to connection events for better monitoring and debugging
        mongoose_1.default.connection.on("error", (error) => {
            logger.error("MongoDB connection error:", error);
        });
        mongoose_1.default.connection.on("disconnected", () => {
            logger.warn("MongoDB disconnected. Attempting to reconnect...");
        });
        mongoose_1.default.connection.on("reconnected", () => {
            logger.info("MongoDB reconnected successfully");
        });
    }
    catch (error) {
        logger.error("MongoDB connection error:", error);
        process.exit(1);
    }
});
exports.connectMongoDB = connectMongoDB;
