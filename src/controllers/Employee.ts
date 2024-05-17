import { Request, Response } from "express";
import mongoose from "mongoose";
import employeeSchema from "../models/Employee";

export default class EmployeeController{

    static async findById(req: Request, res: Response){

        const employees = mongoose.model("Employee", employeeSchema);

        try{
           const employee = await employees.findById(req.params.id);



            res.json(employee)
        }catch(error){
            res.json({error: error})
        }
    }

    static async delete(req: Request, res: Response){

        const employees = mongoose.model("Employee", employeeSchema);

        try{
            await employees.findByIdAndDelete(req.params.id);
            res.status(200);
            res.end();
        }catch(error){
            res.json({error: error})
        }
    }


    static async update(req: Request, res: Response){

        const employees = mongoose.model("Employee", employeeSchema);

        try{
            const updated = await employees.findByIdAndUpdate(req.params.id, req.body);

            res.json(updated);
        }catch(error){
            res.json({error: error});
        }

    }

    static async index(req: Request, res: Response) {

        const employees = mongoose.model("Employee", employeeSchema);

        if(typeof req.query.sort === "string"){

            const {sort} = req.query;

            const sortOptions: { [key: string]: 1 } = {};
            sortOptions[sort] = 1

            const employeesData = await employees.find().sort(sortOptions);

            res.status(200).json(employeesData);

        } else

        try{

            const employeesData = await employees.find();

            res.status(200).json(employeesData);
        }catch(error){
            res.status(300).json({error: error});
        }

    }

    static async store(req: Request, res: Response){
        
        const {name, role, department} = req.body;

        const Employee = mongoose.model("Employee", employeeSchema);

        const employee = new Employee({
            _id: new mongoose.Types.ObjectId(),
            name,
            role,
            department,
            admissionDate: new Date()
        })

        try{
            await employee.save();
            res.end();
        }catch(error){
            res.status(300).json({erro: error});
        }

    }

}