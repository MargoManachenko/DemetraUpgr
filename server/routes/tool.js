const express = require('express');
const Equipment = require('mongoose').model('Equipment');
const router = new express.Router();

router.post('/addTool', (req, res) => {
    const userId = req.body.userId;
    const baseType = req.body.baseType;
    const specificType = req.body.specificType;
    const toolName = req.body.toolName;
    const toolInfo = req.body.toolInfo;
    const toolQuantity = req.body.toolQuantity;

    const newTool = new Equipment({
        ownerId: userId,
        baseType: baseType,
        specificType: specificType,
        toolName: toolName,
        toolInfo: toolInfo,
        toolQuantity: toolQuantity
    });

    newTool.save((err) => {
        if (err) {
            console.log(err);
            return res.send({
                success: false,
                error: err
            })
        }
        else {
            return res.send({
                success: true
            })
        }
    })

});

router.post('/getTools', (req, res) => {
    const userId = req.body.userId;
    Equipment.find({ownerId: userId}, (err, tools) => {
        if (err) {
            console.log(err);
            return res.send({
                success: false,
                error: err
            })
        }
        else {
            return res.send({
                listOfTools: tools
            })
        }
    });
});

router.post('/deleteTool', (req, res) => {
    const toolId = req.body.toolId;
    Equipment.findOneAndDelete(toolId, (err) => {
        if (err) {
            console.log(err);
            return res.send({
                success: false,
                error: err
            })
        }
        else {
            return res.send({
                success: true
            })
        }
    });
});

router.post('/editTool', (req, res) => {
    const toolId = req.body.toolId;
    Equipment.findByIdAndUpdate(toolId, req.body, {new: true}, (err, tool) => {
        if (err) {
            return res.send({
                success: false,
                error: err
            })
        }
        else {
            console.log(tool);
            return res.send({
                success: true,
                newTool: tool
            })
        }
    });
});

module.exports = router;