const mongoose = require('mongoose');

const CropConstantsSchema = mongoose.Schema({
    name: {
        type: String
    },
    normalTemperature: {
        type: String
    },
    normalHumidity: {
        type: String
    },
    seedsPricePerKg: {
        type: String
    },
    cropPricePerKg: {
        type: String
    },
    maturationTimeInMonths: {
        type: String
    }
});

CropConstantsSchema.statics.getCropNames = function getCropNames() {
    // return this.find({})
    //
    //     .exec()
    //     .then((names) => {
    //         if(names){
    //             return names.toJson();
    //         }
    //     })
    //     .catch((err) => {
    //         if(err){
    //             console.log(err + ' in getCropNames');
    //         }
    //     });



};

CropConstantsSchema.statics.getCropIdByName = function getCropNames(name) {
    let query = {name : name};
    this.findOne(query, (err, crop) => {
        if(err){
            console.log(err);
            return err;
        }

        if(crop){
            return crop._id;
        }
    })
};

CropConstantsSchema.statics.startNight = function startNight(callback){

    var newNight = new this({
        startDateOfNight: new Date().getTime(),
        endDateOfNight: null,
        duration: null,
        phases: []
    });


    newNight.save((err) => {
        if (err) { return err; }
        //else console.log(newNight);
    });
};
module.exports = mongoose.model('CropConstants', CropConstantsSchema);
