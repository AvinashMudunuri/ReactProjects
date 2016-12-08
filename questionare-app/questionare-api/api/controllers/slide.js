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
    db.find(function(slidesNode){
        res.json({
            slides: slidesNode
        });
    });
}

/**
 * /slides/{id}
 * Type: GET
 * operationId: getSlide
 * returns slingle slide
 */
function getSlide(req, res, next) {
    var id = req.swagger.params.id.value;
    db.find(function(slide){
        if(slide) {
            res.json(slide);
        }else {
            res.status(204).send();
        }
    }, id);
}

/**
 * /slides
 * Type: POST
 * operationId: saveSlide
 * returns: success message
 */
function saveSlide(req, res, next) {
    db.save(function(slide) {
        res.json({
            success: slide,
            description: "Slide Added Successfully"
        });
    }, req.body);
}