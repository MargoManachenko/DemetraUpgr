const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
    ownerId:{
        type: String
    },
    baseType: {
        type: String
    },
    specificType: {
        type: String
    },
    baseTypeNum: {
        type: String
    },
    specificTypeNum: {
        type: String
    },
    toolName: {
        type: String
    },
    toolInfo: {
        type: String
    },
    toolQuantity: {
        type: Number
    },
    toolPrice: {
        type: Number
    },
    image: {
        type: String
    }
});

EquipmentSchema.statics.GetAllUserEquipment = function GetAllUserEquipment(ownerId){
    let query = {ownerId: ownerId};
    return this.find(query);
};

module.exports = mongoose.model('Equipment', EquipmentSchema);