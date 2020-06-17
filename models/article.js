var mongoose = require ("mongoose");
var Schema = mongoose.Schema;
var articleSchema = new Schema ({
    Headline: {type: String, required: true}, 
    Summary: {type: String, required: true},
    URL: {type: String, required: true},
    Image: {type: String, required: true},
    Save: {type: Boolean, default: false},
    Comments: {type: String, required: false},
    Note: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
})

var Article = mongoose.model("Article", articleSchema)

module.exports = Article