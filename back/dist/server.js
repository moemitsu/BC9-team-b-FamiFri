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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
let transfers = [];
app.post('/api/transfer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { amount, name, purpose } = req.body;
    try {
        // Sunabar APIでの振替処理（コメントアウトしておきます）
        /*
        const response = await axios.post(`${process.env.SUNABAR_API_URL}/transfers`, {
          amount,
          fromAccount,
          toAccount
        }, {
          headers: {
            'Authorization': `Bearer ${process.env.SUNABAR_API_KEY}`
          }
        });
        */
        // 振替データを保存
        transfers.push({ amount, name, purpose, date: new Date() });
        res.status(200).json({ message: 'Transfer successful', transfers });
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            res.status(((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) || 500).json({ error: (_b = error.response) === null || _b === void 0 ? void 0 : _b.data });
        }
        else {
            res.status(500).json({ error: 'Transfer failed' });
        }
    }
}));
app.get('/api/balance', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const { account } = req.query;
    try {
        const response = yield axios_1.default.get(`${process.env.SUNABAR_API_URL}/accounts/${account}/balance`, {
            headers: {
                'Authorization': `Bearer ${process.env.SUNABAR_API_KEY}`
            }
        });
        res.status(200).json(response.data);
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            res.status(((_c = error.response) === null || _c === void 0 ? void 0 : _c.status) || 500).json({ error: (_d = error.response) === null || _d === void 0 ? void 0 : _d.data });
        }
        else {
            res.status(500).json({ error: 'Balance check failed' });
        }
    }
}));
app.get('/api/transfers', (req, res) => {
    res.status(200).json(transfers);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
