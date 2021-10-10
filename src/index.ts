import app  from "./app"
import changeStudentsTeam from "./endpoints/changeStudentsTeam"
import changeTeachersTeam from "./endpoints/changeTeachersTeam"
import createStudent from "./endpoints/createStudent"
import createTeacher from "./endpoints/createTeacher"
import createTeam from "./endpoints/createTeam"
import getAllTeams from "./endpoints/getAllTeams"
import getStudentAgeById from "./endpoints/getStudentAgeById"
import getStudentsByTeam from "./endpoints/getStudentsByTeam"
import getTeachersByTeam from "./endpoints/getTeachersByTeam"

app.post('/teams', createTeam)
app.post('/teachers', createTeacher)
app.put('/teachers', changeTeachersTeam)
app.post('/students', createStudent)
app.put('/students', changeStudentsTeam)
app.get('/students/', getStudentsByTeam)
app.get('/students/:id', getStudentAgeById)
app.get('/teachers/', getTeachersByTeam)
app.get('/teams/all', getAllTeams)