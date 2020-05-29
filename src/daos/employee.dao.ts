/* istanbul ignore file */
import { db } from '../daos/db';
import { Reimbursement, ReimbursementRow } from '../models/Reimbursement';


/**
 * Doc Notes
 */

 // Retrieves all Reimbursements and their statuses
export async function getAllReimbursements(): Promise<Reimbursement[]> {
    const sql = 'SELECT * FROM ers_reimbursement LEFT JOIN ers_reimbursement_status \
                ON ers_reimbursement.reimb_status_id = ers_reimbursement_status.reimb_status_id'
    const result = await db.query<ReimbursementRow>(sql, []);
    return result.rows.map(Reimbursement.from);
    }

// Retrieve all Reimbursements and their statuses according to employee id
export async function getReimbursementById(id: number): Promise<Reimbursement[]> {
    const sql = 'SELECT * FROM ers_reimbursement LEFT JOIN ers_reimbursement_status \
                ON ers_reimbursement.reimb_status_id = ers_reimbursement_status.reimb_status_id \
                WHERE ers_reimbursement.reimb_author = $1';

    const result = await db.query<ReimbursementRow>(sql, [id]);
        return result.rows.map(Reimbursement.from);
}

// Saves a new Reimbursement ticket
export async function saveReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
    const sql = `INSERT INTO ers_reimbursement (reimb_amount, reimb_submitted, reimb_resolved, \
                reimb_description, reimb_receipt, reimb_author, reimb_resolver, reimb_status_id, \
                reimb_type_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;

    const result = await db.query<ReimbursementRow>(sql, [
        reimbursement.reimbAmount,
        reimbursement.reimbSubmitted.toISOString(),
        reimbursement.reimbResolved.toISOString(),
        reimbursement.reimbDescription,
        reimbursement.reimbReceipt,
        reimbursement.reimbAuthor,
        reimbursement.reimbResolver,
        reimbursement.reimbStatusId,
        reimbursement.reimbTypeId
    ]);

    return result.rows.map(Reimbursement.from)[0];
}