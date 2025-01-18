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
/** Supabase config */
var createClient = require("@supabase/supabase-js").createClient;
var dotenv = require('dotenv');
// Load environment variables
dotenv.config();
var privateKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;
if (!privateKey)
    throw new Error("Expected env var SUPABASE_API_KEY");
var url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!url)
    throw new Error("Expected env var SUPABASE_URL");
var supabase = createClient(url, privateKey);
var jobs = [
    {
        id: '1',
        position: 'Software Engineer',
        company: 'TechCorp',
        description: 'Develop and maintain software applications.',
    },
    {
        id: '2',
        position: 'Product Manager',
        company: 'Innovatech',
        description: 'Lead product development and strategy.',
    },
    {
        id: '3',
        position: 'Data Scientist',
        company: 'DataGenix',
        description: 'Analyze complex datasets to drive business insights.',
    },
    {
        id: '4',
        position: 'Machine Learning Engineer',
        company: 'DataGenix',
        description: 'Tensorflow, machine Learning, Python, Computer Vision', // Explicitly set to null if there’s no description
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
                        var jobEmbedding, _a, data, _b, info, error;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    if (!j.description) return [3 /*break*/, 2];
                                    return [4 /*yield*/, generateEmbedding(j.description)];
                                case 1:
                                    _a = _c.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    _a = null;
                                    _c.label = 3;
                                case 3:
                                    jobEmbedding = _a;
                                    data = {
                                        id: j.id,
                                        job_title: j.position,
                                        company: j.company,
                                        location: null, // Optional
                                        job_type: null, // Optional
                                        description: j.description,
                                        embedding: jobEmbedding, // Embedding vector as an array
                                    };
                                    return [4 /*yield*/, supabase.from('jobs').insert(data)
                                        //Error Checking
                                    ];
                                case 4:
                                    _b = _c.sent(), info = _b.info, error = _b.error;
                                    //Error Checking
                                    if (error) {
                                        console.log(error);
                                    }
                                    else {
                                        //Double check information
                                        console.log("Info Added: ".concat(info));
                                        console.log('Embedding complete!');
                                    }
                                    return [2 /*return*/];
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
