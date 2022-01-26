/**
 * TODO 2: SETUP ROUTING (ROUTER)
 */

//import controller Patient
const PatientController = require("../controllers/PatientsController")

//import express
const express = require("express")

//membuat object router
const router = express.Router()

//buat routing home
router.get("/", (req, res) => {
    res.send("Semangat UAS Projectnya IRVANNNN YOU CAN DO IT.......")
})

//Routing untuk pasien
router.get("/patients", PatientController.index)
router.post("/patients", PatientController.store)
router.put("/patients/:id", PatientController.update)
router.delete("/patients/:id", PatientController.destroy)
router.get("/patients/:id", PatientController.show)
router.get("/patients/search/:name", PatientController.search)
/**
 * router.get("/patients/status/dead", PatientController.status)
 * router.get("/patients/status/recovered", PatientController.status)
 * router.get("/patients/status/negatif", PatientController.status)
 * untuk menggantikan ketiga nya aku ubah jadi satu kk seperti yang ada di bawah ini
 * lalu untuk melihat tinggal di isi aja status/dead, dan atau status/recovered, dan atau status/negatif
 */
router.get("/patients/status/:status", PatientController.status)

//export module routing
module.exports = router;
