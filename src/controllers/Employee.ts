import { Request, Response } from "express";
import mongoose, { MongooseError } from "mongoose";
import employeeSchema from "../models/Employee";
import { object, string } from "yup";

export default class EmployeeController{

    static async findById(req: Request, res: Response){

        const employees = mongoose.model("Employee", employeeSchema);

        try{
           const employee = await employees.findById(req.params.id);



            res.status(200).json(employee)
        }catch(error){
            res.status(500).json({error: error})
        }
    }

    static async delete(req: Request, res: Response){

        const employees = mongoose.model("Employee", employeeSchema);

        try{
            await employees.findByIdAndDelete(req.params.id);
            res.status(200);
            res.end();
        }catch(error){
            res.status(500).json({error: error})
        }
    }


    static async update(req: Request, res: Response){

        const employees = mongoose.model("Employee", employeeSchema);

        let employeeSchemaObj = object({
            name: string().required("Nome não pode estar vazio.").typeError("Nome não pode ser um numero"),
            role: string().required("Cargo não pode estar vazio.").typeError("Cargo não pode ser um numero"),
            department: string().required("Departamento não pode estar vazio.").typeError("Departamento não pode ser um numero"),
            admissionDate: string().required("Data de admissão não pode estar vazia")
          });

          try{

            await employeeSchemaObj.validate(req.body);

          }catch(error: any){
            return res.status(400).json({error: error.errors})
          }

        try{
            const updated = await employees.findByIdAndUpdate(req.params.id, req.body);

            res.status(201).json(updated);
        }catch(error){
            res.status(500).json({error: error});
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
            res.status(500).json({error: error});
        }

    }

    static async store(req: Request, res: Response){
        
        const {name, role, department} = req.body;

        let employeeSchemaObj = object({
            name: string().required("Nome não pode estar vazio.").typeError("Nome não pode ser um numero"),
            role: string().required("Cargo não pode estar vazio.").typeError("Cargo não pode ser um numero"),
            department: string().required("Departamento não pode estar vazio.").typeError("Departamento não pode ser um numero"),
          });

          try{

            await employeeSchemaObj.validate(req.body);

          }catch(error: any){
            return res.status(400).json({error: error.errors})
          }

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
            res.status(201).end();
        }catch(error){
            res.status(500).json({erro: error});
        }

    }

}