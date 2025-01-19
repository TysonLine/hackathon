"use strict";
/** Supabase config */
// import { createClient } from "@supabase/supabase-js";
// import * as dotenv from 'dotenv';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var supabase_js_1 = require("@supabase/supabase-js");
var dotenv = require("dotenv");
// Load environment variables
dotenv.config();
var privateKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;
if (!privateKey)
    throw new Error("Expected env var SUPABASE_API_KEY");
var url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!url)
    throw new Error("Expected env var SUPABASE_URL");
var supabase = (0, supabase_js_1.createClient)(url, privateKey);
var jobs = [
    {
        id: "ddadda61-daa4-4e21-8b31-72ba3dd019f7",
        position: "Software Engineer",
        company: "TechCorp",
        description: "Develop and maintain web applications using modern frameworks.",
    },
    {
        id: "922c9b5a-8f68-45ef-b773-d296b12ddf66",
        position: "Data Scientist",
        company: "DataWorks",
        description: "Analyze large datasets to provide actionable insights.",
    },
    {
        id: "a013fcc9-d266-4070-aeb5-fe0300b5d06e",
        position: "UX Designer",
        company: "Designify",
        description: "Create user-centered designs for web and mobile platforms.",
    },
    {
        id: "05db1ad5-075e-4659-acbb-54146c8c2373",
        position: "Product Manager",
        company: "InnovateNow",
        description: "Lead product development teams and oversee project lifecycles.",
    },
    {
        id: "99233e49-8a2d-4482-9924-0c5f003d0f04",
        position: "DevOps Engineer",
        company: "Cloudify",
        description: "Implement and maintain CI/CD pipelines for cloud applications.",
    },
    {
        id: "8ba9c674-0f16-49a4-9a59-6a0bb08b47ff",
        position: "Mobile Developer",
        company: "AppMasters",
        description: "Develop and optimize mobile applications for iOS and Android.",
    },
    {
        id: "a7b09058-5ae2-4226-81d3-bc73fa777a61",
        position: "IT Support Specialist",
        company: "SupportPro",
        description: "Provide technical support and troubleshooting for clients.",
    },
    {
        id: "f4dd727d-083b-435a-ab78-b6511fab9a97",
        position: "Cybersecurity Analyst",
        company: "SecureNet",
        description: "Monitor and protect the company’s network against threats.",
    },
    {
        id: "f775a4d5-35d4-4bb2-acff-8b0ea5e6411a",
        position: "Marketing Specialist",
        company: "AdVentures",
        description: "Develop marketing strategies and campaigns to boost brand awareness.",
    },
    {
        id: "29b041c0-5718-4742-a77f-2c736520cc5b",
        position: "Backend Developer",
        company: "CodeBase",
        description: "Build and maintain server-side functionality for web applications.",
    },
];
function generateEmbedding(description) {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!description)
                        return [2 /*return*/, null]; // Skip jobs with no description
                    apiUrl = 'http://localhost:3000/api/generate-embeddings';
                    return [4 /*yield*/, fetch(apiUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ text: description }),
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.embeddings];
            }
        });
    });
}
function processJobs() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(jobs.map(function (j) { return __awaiter(_this, void 0, void 0, function () {
                        var jobEmbedding, _a, data, error, err_1;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    console.log("Processing job ID: ".concat(j.id));
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 6, , 7]);
                                    if (!j.description) return [3 /*break*/, 3];
                                    return [4 /*yield*/, generateEmbedding(j.description)];
                                case 2:
                                    _a = _b.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    _a = null;
                                    _b.label = 4;
                                case 4:
                                    jobEmbedding = _a;
                                    console.log("Embedding generated successfully.");
                                    data = {
                                        id: j.id,
                                        job_title: j.position,
                                        company: j.company,
                                        location: null,
                                        job_type: null,
                                        description: j.description,
                                        embedding: jobEmbedding,
                                    };
                                    return [4 /*yield*/, supabase.from("jobs").insert(data)];
                                case 5:
                                    error = (_b.sent()).error;
                                    if (error)
                                        console.error("Error inserting job ".concat(j.id, ":"), error);
                                    else
                                        console.log("Job ".concat(j.id, " inserted successfully."));
                                    return [3 /*break*/, 7];
                                case 6:
                                    err_1 = _b.sent();
                                    console.error("Error processing job ".concat(j.id, ":"), err_1);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
processJobs();
