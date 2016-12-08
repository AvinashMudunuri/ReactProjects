'use strict';
var crypto = require('crypto');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/questionare';
var slides = [];
module.exports = function() {
    var insertSlides= function(db, callback) {
        var collection = db.collection('slides');
        collection.insertOne(db.data, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            assert.equal(1, result.ops.length);
            callback(1);
        });
    }
    var findSlides = function(db, callback) {
        var collection = db.collection('slides');
        collection.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs);
            callback(docs);
        });
    }

    var findSlide = function(db, callback) {
        var collection = db.collection('slides');
        collection.find({'id': db.data}).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs);
            callback(docs);
        });
    }

    return {

        save(callback, slide) {
            slide.id = crypto.randomBytes(20).toString('hex');
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                console.log("Connected successfully to server");
                db.data = slide;
                insertSlides(db, function(slide) {
                    db.close();
                    callback(slide);
                });
            });
        },
        find(callback, id) {
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                console.log("Connected successfully to server");
                if(id) {
                    db.data = id;
                    findSlide(db, function(slide) {
                        db.close();
                        callback(slide);
                    })
                } else {
                    findSlides(db, function(slides){
                        db.close();
                        callback(slides);
                    })
                }
            })
        }
    }
};