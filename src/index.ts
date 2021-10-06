import app  from "./app"
import changeTeachersTeam from "./endpoints/changeTeachersTeam"
import createTeacher from "./endpoints/createTeacher"
import createTeam from "./endpoints/createTeam"

app.post('/teams', createTeam)
app.post('/teachers', createTeacher)
app.put('/teachers', changeTeachersTeam)