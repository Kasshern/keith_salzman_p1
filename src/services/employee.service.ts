import { Reimbursement } from '../models/Reimbursement';
import * as employeeDao from '../daos/employee.dao';


export function getAllReimbursements(): Promise<Reimbursement[]> {
    return employeeDao.getAllReimbursements();
}

export function getReimbursementById(id: number): Promise<Reimbursement[]> {
    return employeeDao.getReimbursementById(id);
}

export function saveReimbursement(reimbursement: any): Promise<Reimbursement> {
    const newReimbursement = new Reimbursement(
        undefined,
        reimbursement.reimbAmount,
        new Date(reimbursement.reimbSubmitted),
        new Date (reimbursement.reimbResolved),
        reimbursement.reimbDescription,
        reimbursement.reimbReceipt,
        reimbursement.reimbAuthor,
        reimbursement.reimbResolver,
        reimbursement.reimbStatusId,
        reimbursement.reimbTypeId
    );
    // Validate new trainer properties
    if (reimbursement.reimbAmount && reimbursement.reimbSubmitted &&
        reimbursement.reimbResolved && reimbursement.reimbDescription &&
        reimbursement.reimbReceipt && reimbursement.reimbAuthor &&
        reimbursement.reimbResolver && reimbursement.reimbStatusId &&
        reimbursement.reimbAmount) {
        return employeeDao.saveReimbursement(newReimbursement);
    } else {
        return new Promise((resolve, reject) => reject(422));
    }
}