import { Request, Response } from 'express'
import { connection } from '../data/connection'

export default async function getAllTeams(req: Request, res: Response): Promise<any> {
    let errorCode: number = 400
    try {
        const result = await connection('labenu_sys_teams').select(
            "id",
            "name",
            "begin_date as beginDate",
            "end_date as endDate",
            "modulo"
        )

        const allTeams = result.map(team => {
            const newBeginDate: string = team.beginDate.toISOString().slice(0, 10).split('-')
            const newEndDate: string = team.endDate.toISOString().slice(0, 10).split('-')
            const formattedBeginDate: string = newBeginDate[2] + '/' + newBeginDate[1] + '/' + newBeginDate[0]
            const formattedEndDate: string = newEndDate[2] + '/' + newEndDate[1] + '/' + newEndDate[0]

            return {...team, beginDate: formattedBeginDate, endDate: formattedEndDate}
        })
        res.status(200).send({ teams: allTeams })
    } catch (error: any) {
        res.status(errorCode).send(error.sqlMessage || error.message)
    }
}