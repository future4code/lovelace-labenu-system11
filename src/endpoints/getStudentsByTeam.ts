import { Request, Response } from 'express'
import { connection } from '../data/connection'

export default async function getStudentsByTeam(req: Request, res: Response): Promise<any> {
    let errorCode: number = 400
    const team: string = req.query.team as string

    try {
        const teamId = await connection('labenu_sys_teams').where('name', 'like', `${team}%`)

    if (!teamId.length) {
        errorCode = 404
        throw new Error('Turma inválida')
    }

    const result = await connection('labenu_sys_students')
        .join('labenu_sys_teams', 'team_id', '=', 'labenu_sys_teams.id')
        .where({ team_id: teamId[0].id })
        .select(
            'labenu_sys_students.id', 
            'labenu_sys_students.name',
            'email',
            'birth_date as birthDate',
            'labenu_sys_teams.name as team'
        )

    res.status(200).send({students: result})
        
    } catch (error: any) {
        res.status(errorCode).send(error.sqlMessage || error.message)
    }
}