// TODO 4: SETUP CONTROLLER
//import model patiens
const covid = require("../models/Patient")

//membuat controller patiens
class PatiensController {

    /**
     * method index for index data patients
     */
    async index(req, res) {
        //Method get all data
        const patients = await covid.all()
        //check data patient
        if (patients.length > 0) {
            //respons and show data patients
            const data = {
                message: "Get All Resource | SHOW ALL RESOURCE",
                data: patients
            }
            //send respons
            return res.status(200).json(data);
        }//else
        //response if data empty
        const data = {
            message: "Data is empty!!!!"
        }
        //send response data empty !!!
        return res.status(200).json(data)
    }

    /**
     * Method store to add data 
     */
    async store(req, res) {
        const { name, phone, alamat, status } = req.body
        //validate data patient
        if (!name || !phone || !alamat || !status) {
            //response if data not validate
            const data = {
                message: "All fields must be filled correctly"
            };
            //response if data  not validate
            return res.status(422).json(data)
            //validate phone as number   
        } else if (isNaN(phone)) {
            //response if data not validate
            const data = {
                message: "Phone must be number"
            }
            //response if data not validate
            return res.status(422).json(data)
        }//else
        //method create to add new data
        const patients = await covid.create(req.body)
        //response for data has add newly
        const data = {
            message: "Resource is added successfully",
            data: patients,
        }
        return res.status(201).json(data)
    }

    /**
     * method update data with id 
     */
    async update(req, res) {
        //take id from request
        const { id } = req.params;
        //method find(id) for seacrh id to update data
        const patients = await covid.find(id)
        //validate data, empty or not
        if (patients) {
            const { name, phone, alamat, status } = req.body
            //validate data must be in
            if (!name || !phone || !alamat || !status) {
                //response if data not validate
                const data = {
                    message: "All fields must be filled correctly !!"
                };
                //response if data not validate
                return res.status(422).json(data)
                //validate phone as number
            } else if (isNaN(phone)) {
                //response if data not validate
                const data = {
                    message: "Phone must be number"
                }
                //response if data not validate
                return res.status(422).json(data)
            }//else
            const patientsUpdated = await covid.update(id, req.body)
            //response for update data 
            const data = {
                message: "Resource is update successfully",
                data: patientsUpdated,
            }
            return res.status(200).json(data)
        }//else
        const data = {
            message: "data patients not found"
        }
        //response data not found
        return res.status(404).json(data)
    }

    /**
     * method destroy to delete data
     */
    async destroy(req, res) {
        //take id form request
        const { id } = req.params
        //method find(id) for delete data
        const patients = await covid.find(id)
        if (patients) {
            //if data found must be delete
            await covid.delete(id)
            //response data was deleted
            const data = {
                message: `patients no ${id} has deleted`
            }
            return res.status(200).json(data)
        }//else
        //response data was not found
        const data = {
            message: "Patients not found"
        }
        //response data was not found with data entry
        return res.status(404).json(data)
    }

    /**
     * method show for show data patients
     */
    async show(req, res) {
        const { id } = req.params;
        const patients = await covid.find(id)
        if (patients) {
            //response data found
            const data = {
                message: `Get Detail resource`,
                data: patients,
            }
            return res.status(200).json(data)
        }//else
        //response if data not found 
        const data = {
            message: "data patients not found"
        }
        return res.status(404).json(data)
    }

    /**
     * method search for search name of patients
     */
    async search(req, res) {
        const { name } = req.params;
        const patients = await covid.search(name)
        if (patients) {
            //response data found
            const data = {
                message: `Get ${name} resource`,
                data: patients,
            }
            return res.status(200).json(data)
        }//else
        //response if data not found
        const data = {
            message: "data patients not found"
        }
        return res.status(404).json(data)
    }

    /**
     * method status for search status patients like (dead,recovered,positive,negatife,etc)
     */
    async status(req, res) {
        const { status } = req.params;
        const patients = await covid.status(status)
        if (patients) {
            //response data found
            const data = {
                message: `Get ${status} resource`,
                data: patients
            }
            return res.status(200).json(data)
        }//else
        //response if data not found
        const data = {
            message: "data patients not found"
        }
        return res.status(404).json(data)
    }
}

//membuat object controller
const object = new PatiensController;

//export controller
module.exports = object;
