const express = require('express');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
const Equipment = require('mongoose').model('Equipment');
const router = new express.Router();

const _baseType = {
    1: "Livestock equipment",
    2: "Equipment for crop production",
    3: "Equipment for growing and processing grain",
    4: "Sorting agricultural equipment",
    5: "Fisheries equipment"
};
const _spesificType = [

    {
        0: "Beekeeping equipment",
        1: "Feed Extruders",
        2: "Poultry equipment",
        3: "Equipment for pig breeding",
        4: "Drinkers and accessories",
        5: "Veterinary equipment",
        6: "Milk analyzer",
        7: "Feed Grades",
        8: "Livestock equipment, general"
    }
    ,
    {
        0: "Biomass Processing Equipment",
        1: "Greenhouses",
        2: "Greenhouses accessorise",
        3: "Automatic watering equipment",
        4: "Accessories and spare parts for sprayers",
        5: "Equipment for chemical protection and fertilization",
        6: "Equipment for crop production, general"
    }
    ,
    {
        0: "Vibropneumatic tables",
        1: "Grain loaders",
        2: "Grain Cleaning Machines",
        3: "Grain separators",
        4: "Laboratory equipment for the grain industry",
        5: "Equipment for growing and processing grain, general"
    }
    ,
    {
        0: "Photoseparator",
        1: "Cleaner",
        2: "Garden sieve",
        3: "Grain thrower",
        4: "Sorting table",
        5: "Equipment for growing and processing grain, general"
    }
    ,
    {
        0: "Water softeners",
        1: "PH meter",
        2: "Oxygenators",
        3: "Aerators for reservoirs",
        4: "Auto feeders, feeders for fisheries",
        5: "Fisheries equipment, general"
    }

];

router.post('/addTool', (req, res) => {
    const userId = req.body.userId;
    const baseTypeNum = req.body.baseTypeNum;
    const specificTypeNum = req.body.specificTypeNum;
    const baseType = req.body.baseType;
    const specificType = req.body.specificType;
    const toolName = req.body.toolName;
    const toolInfo = req.body.toolInfo;
    const toolQuantity = req.body.toolQuantity;
    const image = req.body.image;

    // const con = mongoose.connection;
    // let gfs = Grid(con.db);
    //
    // let writestream = gfs.createWriteStream({
    //
    // });

    // tool.specificTypeNum = tool.specificType;
    // tool.baseTypeNum = tool.baseType;

    // let specificType = _spesificType[baseTypeNum-1][specificTypeNum];
    // let baseType = _baseType[specificTypeNum];

    const newTool = new Equipment({
        ownerId: userId,
        baseTypeNum: baseTypeNum,
        specificTypeNum: specificTypeNum,
        specificType: specificType,
        baseType: baseType,
        toolName: toolName,
        toolInfo: toolInfo,
        toolQuantity: toolQuantity,
        image: image
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
                success: true,
                newTool: newTool
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
            // tools.map((tool) => {
            //     tool.specificTypeNum = tool.specificType;
            //     tool.baseTypeNum = tool.baseType;
            //
            //     tool.specificType = _spesificType[tool.baseType-1][tool.specificType];
            //     tool.baseType = _baseType[tool.baseType];
            // });
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

router.post('/search', (req, res) => {
    const baseTypeSearch = req.body.baseTypeSearch;
    const specificTypeSearch = req.body.specificTypeSearch;
    const specificTypeSting = req.body.specificTypeSting;
    const nameSearch = req.body.nameSearch;

    let query;
    let searchInfo = "Specify search request, please";

    if (baseTypeSearch !== "0") {
        query = {baseTypeNum: baseTypeSearch, specificTypeNum: specificTypeSearch};
        // const specificTypeSearchString = _spesificType[baseTypeSearch-1][specificTypeSearch];
        searchInfo = "Search result for: type - " + specificTypeSting;
    }
    if (nameSearch) {
        query = {toolName: {$regex: new RegExp(nameSearch)}};
        searchInfo = "Search result for: name - " + nameSearch;
    }
    if (baseTypeSearch !== "0" && nameSearch) {
        query = {baseTypeNum: baseTypeSearch, specificTypeNum: specificTypeSearch, toolName: {$regex: new RegExp(nameSearch)}};
        // const specificTypeSearchString = _spesificType[baseTypeSearch-1][specificTypeSearch];
        searchInfo = "Search result for: type - " + specificTypeSting + ", name - " + nameSearch;
    }


    Equipment.find(query, (err, list) => {
        if (err) {
            console.log(err);
            return res.send({
                success: false
            })
        }
        else {
            if (list.length === 0) searchInfo = "Nothing found, unfortunately";
            if (query === undefined) list = [];
            return res.send({
                success: true,
                searchList: list,
                searchInfo: searchInfo
            })
        }
    })
});

module.exports = router;