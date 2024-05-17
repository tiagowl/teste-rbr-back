import mongoose from "mongoose";

async function connect(){

    mongoose.set("strictQuery", true);

    await mongoose.connect("mongodb+srv://admin:19111996@rbr.mtvv8er.mongodb.net/?retryWrites=true&w=majority&appName=rbr")
}

export default connect;