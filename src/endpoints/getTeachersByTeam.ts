import { Request, Response } from 'express'
import { connection } from '../data/connection'

export default async function getTeachersByTeam(req: Request, res: Response): Promise<any> {
    let errorCode: number = 400
    const team: string = req.query.team as string

    try {
        const teamId = await connection('labenu_sys_teams').where('name', 'like', `${team}%`)

        if (!teamId.length) {
            errorCode = 404
            throw new Error('Turma inválida')
        }

        const teachers = await connection('labenu_sys_teachers')
        .join('labenu_sys_teams', 'team_id', '=', 'labenu_sys_teams.id')
        .where({ team_id: teamId[0].id })
        .select(
            'labenu_sys_teachers.id',
            'labenu_sys_teachers.name',
            'email',
            'birth_date as birthDate',
            'labenu_sys_teams.name as team',
        )

        if (!teachers.length) {
            errorCode = 404
            throw new Error('Nenhum professor encontrado')
        }

        let result = []

        for (let teacher of teachers) {
            const specialties = await connection('labenu_sys_teachers')
            .join('labenu_sys_teachers_specialties', 'teacher_id', '=', 'labenu_sys_teachers.id')
            .join('labenu_sys_specialties', 'labenu_sys_specialties.id', '=', 'labenu_sys_teachers_specialties.specialty_id')
            .where({'labenu_sys_teachers.id': teacher.id})
            .select('labenu_sys_specialties.name')

            const newDate: string = teacher.birthDate.toISOString().slice(0, 10).split('-')
            const formattedDate: string = newDate[2] + '/' + newDate[1] + '/' + newDate[0]

            const arraySpecialties = specialties.map(object => object.name)            
            teacher = {...teacher, birthDate: formattedDate, specialties: arraySpecialties}
            result.push(teacher)
        }

        res.status(200).send({ teachers: result })

    } catch (error: any) {
        res.status(errorCode).send(error.sqlMessage || error.message)
    }
}