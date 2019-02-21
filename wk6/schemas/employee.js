let mongoose = require("mongoose")

let employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    department: String,
    sartDate: Date,
    jobTitle: String,
    salary: Number
})

module.exports = mongoose.model("Employee", employeeSchema)