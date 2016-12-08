'use strict';
var db = require('../../config/db')();

module.exports = {getAllSlides, saveSlide, getSlide};

/**
 * /slides
 * Type: GET
 * operationId: getAllSlides
 * returns array of slides
*/
function getAllSlides(req, res, next) {
    res.json({slides: db.find()});
}

/**
 * /slides/{id}
 * Type: GET
 * operationId: getSlide
 * returns slingle slide
 */
function getSlide(req, res, next) {
    var id = req.swagger.params.id.value;
    var slide = db.find(id);
    if(slide) {
        res.json(slide);
    }else {
        res.status(204).send();
    }  
}

/**
 * /slides
 * Type: POST
 * operationId: saveSlide
 * returns: success message
 */
function saveSlide(req, res, next) {
    res.json({success: db.save(req.body), description: "Slide added to the list!"});
}