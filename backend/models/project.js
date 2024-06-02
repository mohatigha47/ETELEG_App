const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    client: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'pending', 'completed'],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },

}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;