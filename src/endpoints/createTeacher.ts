import { Request, Response } from 'express'
import { connection } from '../data/connection'

export default async function createTeacher(req: Request, res: Response): Promise<any> {
    let errorCode = 400
    let { name, email, birthDate, team, specialty } = req.body

    try {
        if (!name || !email || !birthDate || !team || !specialty) {
            throw new Error('Por favor preencha todos os campos')
        }

        function formatDate(date: string): string {
            const day = date.split("/")[0];
            const month = date.split("/")[1];
            const year = date.split("/")[2];
            return year + '-' + ("0" + month).slice(-2) + '-' + ("0" + day).slice(-2);
        }

        const formattedBirthDate: string = formatDate(birthDate)
        const timestamp: string = Date.now().toString().slice(4)

        const teamId = await connection('labenu_sys_teams').where('name', 'like', `${team}`)

        if (specialty === 'back-end') {
            specialty = 'back_end'
        } else if (specialty === 'front-end') {
            specialty = 'front_end'
        } else {
            throw new Error('Especialidade deve ser ou "front-end" ou "back-end"')
        }

        const specialtyId = await connection('labenu_sys_specialties').where('name', '=', `${specialty}`)

        if (teamId.length) {
            await connection('labenu_sys_teachers').insert({
                id: timestamp,
                name,
                email,
                birth_date: formattedBirthDate,
                team_id: teamId[0].id
            })

            await connection('labenu_sys_teachers_specialties').insert({
                teacher_id: timestamp,
                specialty_id: specialtyId[0].id
            })

            res.status(200).send('Professor(a) inserido com sucesso')
        } else {
            throw new Error('Turma inválida')
        }

    } catch (error: any) {
        res.status(errorCode).send(error.sqlMessage || error.message)
    }
}