import express from 'express';
import * as financeManagerService from '../services/financeManager.service';
import { Reimbursement } from '../models/Reimbursement';
import { ReimbursementStatus } from '../models/ReimbursementStatus';


export const financeManagerRouter = express.Router();

// Retrieves an Array of all reimbursement tickets from all employess
financeManagerRouter.get('', async (request, response, next) => {
    let reimbursementRequests: Reimbursement[];

    try {
        reimbursementRequests = await financeManagerService.getAllReimbursements();
        response.json(reimbursementRequests);
    } catch (err) {
        response.sendStatus(500);
        return;
    }
    next();
});

// Retrieves an Array of all reimbursement tickets by status
financeManagerRouter.get('/:status', async (request, response, next) => {
    const status: string = request.params.status;
    let reimbursementRequests: Reimbursement[];

    try {
        reimbursementRequests = await financeManagerService.getAllReimbursementsByStatus(status);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if(!reimbursementRequests) {
        response.sendStatus(404);
    } else {
        response.json(reimbursementRequests);
    }
    next();
});

// Retrieves an Array of all reimbursement tickets sorted by input value
financeManagerRouter.get('sort/:sortValue', async (request, response, next) => {
    const sortValue: string = request.params.sortValue;
    let reimbursementRequests: Reimbursement[];

    try {
        reimbursementRequests = await financeManagerService.getAllReimbursementsSorted(sortValue);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if(!reimbursementRequests) {
        response.sendStatus(404);
    } else {
        response.json(reimbursementRequests);
    }
    next();
});

// !Should the reimb number be captured by the url and passed through? I don't think so. Look at previous patches
// Approves or denies a reimbursement request by Updating ticket status 
financeManagerRouter.patch('', async (request, response, next) => {
    const reimbursementStatus = request.body;
    let updatedReimbursementStatus: ReimbursementStatus;

    try {
        updatedReimbursementStatus = await financeManagerService.patchReimbursementStatus(reimbursementStatus);
    } catch (err) {
        response.sendStatus(500);
        return;
    }

    if (!updatedReimbursementStatus) {
        response.sendStatus(404);
    } else {
        response.status(200);
        response.json(updatedReimbursementStatus);
    }
    next();
});



/*

// Retrieves a single  object by ID
financeManagerRouter.get('/:id', async (request, response, next) => {
    const id: number = parseInt(request.params.id);
    let reimbursementRequests: Reimbursement;

    try {
        reimbursementRequests = await financeManagerService.getReimbursementById(id);
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

// Route for saving a new reimbursement request
financeManagerRouter.post('', async (request, response, next) => {
    const reimbursement = request.body;
    let newReimbursement: Reimbursement;

    try {
        newReimbursement = await financeManagerService.saveReimbursement(reimbursement);
        response.status(201);
        response.json(newReimbursement);
    } catch (err) {
        response.sendStatus(500);
        return;
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
