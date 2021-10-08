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

    const students = await connection('labenu_sys_students')
        .join('labenu_sys_teams', 'team_id', '=', 'labenu_sys_teams.id')
        .where({ team_id: teamId[0].id })
        .select(
            'labenu_sys_students.id', 
            'labenu_sys_students.name',
            'email',
            'birth_date as birthDate',
            'labenu_sys_teams.name as team'
        )

        if (!students.length) {
            errorCode = 404
            throw new Error('Nenhum professor encontrado')
        }

        let result = []

        for (let student of students) {
            const hobbies = await connection('labenu_sys_students')
            .join('labenu_sys_student_hobbie', 'student_id', '=', 'labenu_sys_students.id')
            .join('labenu_sys_hobbies', 'labenu_sys_hobbies.id', '=', 'labenu_sys_student_hobbie.hobbie_id')
            .where({'labenu_sys_students.id': student.id})
            .select('labenu_sys_hobbies.name')

            const newDate: string = student.birthDate.toISOString().slice(0, 10).split('-')
            const formattedDate: string = newDate[2] + '/' + newDate[1] + '/' + newDate[0]

            const arrayHobbies = hobbies.map(object => object.name)            
            student = {...student, birthDate: formattedDate, hobbies: arrayHobbies}
            result.push(student)
        }

    res.status(200).send({students: result})
        
    } catch (error: any) {
        res.status(errorCode).send(error.sqlMessage || error.message)
    }
}