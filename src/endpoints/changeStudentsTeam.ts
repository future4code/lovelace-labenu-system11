import { Request, Response } from 'express'
import { connection } from '../data/connection'

export default async function changeStudentsTeam(req: Request, res: Response): Promise<any> {
    let errorCode = 400
    const { email, team } = req.body

    try {

        if (!email || !team) {
            throw new Error('Por favor preencha o email e turma')
        }

        const validEmail = await connection('labenu_sys_students').where("email", email)

        if (!validEmail.length) {
            throw new Error("Email inválido")
        }

        const validTeam = await connection('labenu_sys_teams').where("name", "like", `${team}%`)

        if (!validTeam.length) {
            throw new Error('Turma inválida')
        } else {
            await connection('labenu_sys_students').where("email", email).update('team_id', validTeam[0].id)
            res.status(200).send('Turma atualizada com sucesso')
        }

    } catch (error: any) {
        res.status(errorCode).send(error.sqlMessage || error.message)
    }
}