import app  from "./app"
import createTeacher from "./endpoints/createTeacher"
import createTeam from "./endpoints/createTeam"

app.post('/teams', createTeam)
app.post('/teachers', createTeacher)