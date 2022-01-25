// TODO 5: SETUP MODEL
//import db
const res = require("express/lib/response")
const db = require("../config/database")

//make model Patients for query database
// class Model Patient
class Patient {

    /**
     * Make method All for get all data
     */

    static all() {
        return new Promise((resolve, reject) => {
            //query select all
            const sql = "SELECT * FROM patients"
            db.query(sql, (err, results) => {
                resolve(results)
            })
        })
    }

    /**
     * make method create for insert data to database
     */

    static async create(data) {

        //promise 1 : for insert to 

        const id = await new Promise((resolve, reject) => {

            //query insert data to database

            const sql = 'INSERT INTO patients SET ?'
            db.query(sql, data, (err, results) => {
                resolve(results.insertId);
            })
        })

        //promise 2 : show new entered data based on id 
        const Patients = await this.find(id)
        return Patients;
    }

    /**
     * method Find for get data From id
     */
    static find(id) {
        return new Promise((resolve, reject) => {
            //query select by id
            const sql = "SELECT * FROM Patients WHERE id = ?"
            db.query(sql, id, (err, results) => {
                resolve(results[0])
            })
        })
    }


    /**
     * method status for get status patients
     */
    static status(status) {
        return new Promise((resolve, reject) => {
            //query select by name like status
            const sql = `SELECT * FROM Patients WHERE status LIKE '%${status}%'`
            db.query(sql, status, (err, results) => {
                resolve(results)
            })
        })
    }

    /**
     * method search for searching name of patients
     */
    static search(name) {
        return new Promise((resolve, reject) => {
            //query select by name like name
            const sql = `SELECT * FROM Patients WHERE name LIKE '%${name}%'`
            db.query(sql, name, (err, results) => {
                resolve(results)
            })
        })
    }

    /**
     * method update for update data patients
     */
    static async update(id, data) {
        await new Promise((resolve, reject) => {
            //query update data by id
            const sql = "UPDATE Patients SET ? WHERE id = ?"
            db.query(sql, [data, id], (err, results) => {
                resolve(results)
            })
        })
        //promise 2 : show new data 
        const Patients = await this.find(id)
        return Patients;
    }

    /**
     * method delete for delete data patient
     */
    static delete(id) {
        return new Promise((resolve, reject) => {
            //query delete data
            const sql = "DELETE FROM Patients WHERE id = ?"
            db.query(sql, id, (err, results) => {
                resolve(results)
            })
        })
    }

}

//export model
module.exports = Patient;