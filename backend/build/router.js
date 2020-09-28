"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = function (app) {
    var apiRouter = express_1.Router();
    apiRouter.get('/', function (req, res) {
        return res.status(200).json({ message: 'Testing' });
    });
    app.use('/api/v1', apiRouter);
};
exports.default = router;
//# sourceMappingURL=router.js.map