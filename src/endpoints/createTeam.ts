import { Request, Response } from 'express'
import { connection } from '../data/connection'

export default async function createTeam(req: Request, res: Response): Promise<any> {

    let errorCode = 400
    let { name, beginDate, endDate, modulo, period } = req.body

    try {
        if (!name || !beginDate || !endDate || !modulo || !period) {
            throw new Error('Por favor preencha todos os campos')
        }

        function formatDate(date: string): string {
            const day = date.split("/")[0];
            const month = date.split("/")[1];
            const year = date.split("/")[2];
            return year + '-' + ("0" + month).slice(-2) + '-' + ("0" + day).slice(-2);
        }

        const formattedBeginDate: string = formatDate(beginDate)
        const formattedEndDate: string = formatDate(endDate)
        const timestamp: string = Date.now().toString().slice(4)

        if (period.toLowerCase() === 'noturno') {
            name = name + '-na-night'
        }

        console.log(timestamp)

        await connection('labenu_sys_teams').insert({
            id: Number(timestamp),
            name,
            begin_date: formattedBeginDate,
            end_date: formattedEndDate,
            modulo: Number(modulo)
        })

        res.status(200).send('Turma criada com sucesso')
        
    } catch (error: any) {
        res.status(errorCode).send(error.sqlMessage || error.message)    
    }
}