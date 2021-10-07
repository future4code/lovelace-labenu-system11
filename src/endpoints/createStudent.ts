import { Request, Response } from 'express'
import { connection } from '../data/connection'

export default async function createStudent(req: Request, res: Response): Promise<any> {
    let errorCode = 400
    const { name, email, birthDate, team, hobbies } = req.body

    try {
        if (!name || !email || !birthDate || !team) {
            throw new Error('Por favor cheque os campos')
        }

        if (!hobbies.length) {
            throw new Error('Por favor insira ao menos um hobby')
        }

        function formatDate(date: string): string {
            const day = date.split("/")[0];
            const month = date.split("/")[1];
            const year = date.split("/")[2];
            return year + '-' + ("0" + month).slice(-2) + '-' + ("0" + day).slice(-2);
        }

        const formattedBirthDate: string = formatDate(birthDate)
        const id: string = Date.now().toString().slice(4)

        const teamId = await connection('labenu_sys_teams').where('name', 'like', `${team}`)

        const existingHobbies = await connection('labenu_sys_hobbies').select("name")

        let studentHobbiesIds = []

        async function insertHobby(id: number, name: string) {
            await connection('labenu_sys_hobbies').insert({
                id,
                name
            })
        }

        if (!teamId.length) {
            throw new Error('Turma inválida')
        }

        await connection('labenu_sys_students').insert({
            id,
            name,
            email,
            birth_date: formattedBirthDate,
            team_id: teamId[0].id
        })

        for (let hobby of hobbies) {
            if (!existingHobbies.some(object => object.name === hobby)) {
                const timeStamp: string = Date.now().toString().slice(4)
                const id: number = Number(timeStamp) + Math.floor(Math.random() * 100)
                insertHobby(id, hobby)
            }
        }

        const allHobbies = await connection('labenu_sys_hobbies')

        for (let object of allHobbies) {
            if (hobbies.some((hobby: string) => hobby === object.name)) {
                studentHobbiesIds.push(object.id)
            }
        }

        for (let hobbyId of studentHobbiesIds) {
            await connection('labenu_sys_student_hobbie').insert({
                student_id: id,
                hobbie_id: hobbyId
            })
        }

        res.status(200).send('Aluno(a) inserido com sucesso')

    } catch (error: any) {
        res.status(errorCode).send(error.sqlMessage || error.message)
    }
}