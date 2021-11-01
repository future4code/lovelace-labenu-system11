import { Request, Response } from 'express'
import { connection } from '../data/connection'

export default async function getStudentAgeById(req: Request, res: Response): Promise<any> {
    let errorCode: number = 400
    const id: string = req.params.id

    try {
        const student = await connection.raw(`
        SELECT name, TIMESTAMPDIFF(year, birth_date, CURDATE()) AS age
        FROM labenu_sys_students
        WHERE id = ${id};
        `)

        if (!student[0].length) {
            errorCode = 404
            throw new Error('Estudante não encontrado')
        }

        res.status(200).send(student[0][0])
        
    } catch (error: any) {
        res.status(errorCode).send(error.sqlMessage || error.message)
    }
}