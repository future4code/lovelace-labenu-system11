import { Request, Response } from 'express'
import { connection } from '../data/connection'

export default async function createTeacher(req: Request, res: Response): Promise<any> {
    let errorCode = 400
    let { name, email, birthDate, team, specialties } = req.body

    try {
        if (!name || !email || !birthDate || !team) {
            throw new Error('Por favor cheque os campos')
        }

        if (!specialties.length) {
            throw new Error('Por favor insira ao menos uma especialidade')
        }
        
        const teamId = await connection('labenu_sys_teams').where('name', 'like', `${team}%`)

        if (!teamId.length) {
            errorCode = 404
            throw new Error('Turma inválida')
        }

        function formatDate(date: string): string {
            const day = date.split("/")[0];
            const month = date.split("/")[1];
            const year = date.split("/")[2];
            return year + '-' + ("0" + month).slice(-2) + '-' + ("0" + day).slice(-2);
        }

        const formattedBirthDate: string = formatDate(birthDate)

        const id: string = Date.now().toString().slice(4)

        let teacherSpecialties = []

        const allSpecialties = await connection('labenu_sys_specialties')

        const allSpecialtiesNames = allSpecialties.map(specialty => {
            return specialty.name
        })

        if (!specialties.every((elem: string) => allSpecialtiesNames.includes(elem))) {
            throw new Error('As especialidades devem ser escolhidas entre as seguintes: React, Redux, CSS, Testes, Typescript, Programação Orientada a Objetos e Backend.')
        }

        await connection('labenu_sys_teachers').insert({
                id: id,
                name,
                email,
                birth_date: formattedBirthDate,
                team_id: teamId[0].id
        })

        for (let object of allSpecialties) {
            if (specialties.some((specialty: string) => specialty === object.name)) {
                teacherSpecialties.push(object.id)
            }
        }

        for (let specialtyId of teacherSpecialties) {
            await connection('labenu_sys_teachers_specialties').insert({
                teacher_id: id,
                specialty_id: specialtyId
            })
        }

        res.status(200).send('Professor(a) inserido com sucesso')

    } catch (error: any) {
        res.status(errorCode).send(error.sqlMessage || error.message)
    }
}