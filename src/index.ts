import app  from "./app"
import changeStudentsTeam from "./endpoints/changeStudentsTeam"
import changeTeachersTeam from "./endpoints/changeTeachersTeam"
import createStudent from "./endpoints/createStudent"
import createTeacher from "./endpoints/createTeacher"
import createTeam from "./endpoints/createTeam"
import getStudentAgeById from "./endpoints/getStudentAgeById"

app.post('/teams', createTeam)
app.post('/teachers', createTeacher)
app.put('/teachers', changeTeachersTeam)
app.post('/students', createStudent)
app.put('/students', changeStudentsTeam)
app.get('/students/:id', getStudentAgeById)