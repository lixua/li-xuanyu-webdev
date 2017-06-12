/**
 * Created by xuanyuli on 6/10/17.
 */
var mongoose = require('mongoose');
var widgetSchema = mongoose.Schema({
    _page :  {type: mongoose.Schema.ObjectId, ref: "pageModel",require:true},
    widgetType: {type: String, enum:['HEADING','IMAGE','YOUTUBE','HTML','INPUT']},
    name : String,
    description: String,
    url: String,
    text: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    placeholder: String,
    position: Number,
    dateCreated:{type:Date, default: Date.now}
},{collection: "widget"});
module.exports = widgetSchema;