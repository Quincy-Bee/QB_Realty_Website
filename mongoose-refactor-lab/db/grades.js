import mongoose from 'mongoose';

const grades = new mongoose.Schema({
    scores: [{
        type: String,
        score: Number
    }],
    class_id: {
        type: Number,
        required: true
    },
    learner_id: {
        type: Number,
        required: true
    }
})

export default mongoose.model("student_grades", grades, "grades")


