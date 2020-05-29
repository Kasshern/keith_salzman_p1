import express from 'express';
import * as employeeService from '../services/employee.service';
import { Reimbursement } from '../models/Reimbursement';


export const employeeRouter = express.Router();

// Retrieves an Array of all past reimbursement tickets
employeeRouter.get('', async (request, response, next) => {
    let reimbursements: Reimbursement[];

    try {
        reimbursements = await employeeService.getAllReimbursements();
        response.json(reimbursements);
    } catch (err) {
        response.sendStatus(500);
        return;
    }
    next();
});

// !Change this to match the correct status codes it should be returning.
// Retrieves an array of all past reimbursement ticket by employee ID
employeeRouter.get('/:id', async (request, response, next) => {
    const id: number = parseInt(request.params.id);
    let reimbursementRequests: Reimbursement[];

    try {
        reimbursementRequests = await employeeService.getReimbursementById(id);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!reimbursementRequests) {
        response.sendStatus(404);
    } else {
        response.json(reimbursementRequests);
    }
    next();
});

// Route for adding/saving a new reimbursement request 
employeeRouter.post('', async (request, response, next) => {
    const reimbursement = request.body;
    let newReimbursement: Reimbursement;

    try {
        newReimbursement = await employeeService.saveReimbursement(reimbursement);
        response.status(201);
        response.json(newReimbursement);
    } catch (err) {
        response.sendStatus(500);
        return;
    }
    next();
});


/*
// Retrieves a list of trainer's batches based on trainer ID
trainerRouter.get('/:id/batch', async (request, response, next) => {
    const id: number = parseInt(request.params.id);

    let batch: Batch[];

    try {
        batch = await trainerService.getBatchesByTrainerId(id);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    // Dao returns undefined for non-existent trainer
    if (!batch) {
        response.sendStatus(404);
    } else {
        response.json(batch);
    }
    next();
});

// Retrieves all projects belonging to a trainer/batch through via trainer ID
trainerRouter.get('/:id/batch/project', async (request, response, next) => {
    const id: number = parseInt(request.params.id);

    let project: Project[];

    try {
        project = await trainerService.getProjectsByTrainerId(id);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    // Dao returns undefined for non-existent trainer
    if (!project) {
        response.sendStatus(404);
    } else {
        response.json(project);
    }
    next();
});

// Retrieves all associates belonging to a trainer/batch via trainer ID
trainerRouter.get('/:id/batch/associate', async (request, response, next) => {
    const id: number = parseInt(request.params.id);

    let associate: Associate[];

    try {
        associate = await trainerService.getAssociatesByTrainerId(id);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    // Dao returns undefined for non-existent trainer
    if (!associate) {
        response.sendStatus(404);
    } else {
        response.json(associate);
    }
    next();
});

// Retrieves all teams on a specified project within a specificied batch via trainer and project ID
trainerRouter.get('/:id1/batch/project/:id2/team', async (request, response, next) => {
    const id1: number = parseInt(request.params.id1);
    const id2: number = parseInt(request.params.id2);
    let team: Team[];

    try {
        team = await trainerService.getTeamsByTrainerId(id1, id2);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    // Dao returns undefined for non-existent trainer or project
    if (!team) {
        response.sendStatus(404);
    } else {
        response.json(team);
    }
    next();
});
*/


/*
// Updates an existing trainer
trainerRouter.patch('', async (request, response, next) => {
    const trainer = request.body;
    let updatedTrainer: Trainer;

    try {
    updatedTrainer = await trainerService.patchTrainer(trainer);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!updatedTrainer) {
        response.sendStatus(404);
    } else {
        response.status(200);
        response.json(updatedTrainer);
    }
    next();
});

// Deletes an existing trainer
trainerRouter.delete('/:id', async (request, response, next) => {
    const id = parseInt(request.params.id);
    let deletedTrainer: Trainer;

    try {
        deletedTrainer = await trainerService.deleteTrainer(id);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!deletedTrainer) {
        response.sendStatus(404);
    } else {
        response.status(200);
        response.json(deletedTrainer);
    }
    next();
});
*/
