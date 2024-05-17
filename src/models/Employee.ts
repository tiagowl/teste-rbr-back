import mongoose from "mongoose";
import {Schema} from "mongoose";

const employeeSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    role: String,
    department: String,
    admissionDate: Date
})

export default employeeSchema;
