'use strict';
var crypto = require('crypto');

module.exports = function() {
    return {
        slides : [],
        save(slide) {
            slide.id = crypto.randomBytes(20).toString('hex');
            this.slides.push(slide);
            return 1;  
        },
        find(id) {
            if(id) {
                return this.slides.find(element => {
                        return element.id === id;
                    }); 
            }else {
                return this.slides;
            }
        }
    }
};