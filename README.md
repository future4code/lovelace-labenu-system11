## LabenuSystem:

Você estuda na Labenu_ há tanto tempo que já parecem anos, não é? Então, hoje, vamos pedir para criar um sistema que represente o básico da nossa organização. 

Ele deve possuir, ao menos, as 3 entidades importantes:

1. Estudantes 

    Representa estudantes da nossa instituição. Eles devem possuir: id, nome, email, data de nascimento e os principais hobbies dele. 

2. Docente

    Representa docentes da nossa instituição. Eles devem possuir: id, nome, email, data de nascimento e todas as especialidades dele. Há 7 especialidades: React, Redux, CSS, Testes, Typescript, Programação Orientada a Objetos e Backend

3. Turma

    Toda turma é composta das seguintes características: id, nome, data de início, data de término, lista de professores responsáveis, uma lista de alunos e módulo atual em que a turma está.

    O módulo pode assumir os valores de 1 a 7 ou 0, indicando que as aulas dessa turma ainda não começaram. Para esse exercício, vamos considerar que existam dois tipos de turma: integral ou noturna. Há uma restrição para o nome das turmas noturnas: tem que terminar com `-na-night`.
    
### Integrantes

- Caíque Souto Lima
- Eunice Jesus Souza

### Tecnologias utilizadas

- NodetJS
- Express
- Knex
- MySQL
- Typescript
- JSON

### As funcionalidades básicas são:

&nbsp;

**BASE URL:** https://labenu-system-caique.herokuapp.com/

&nbsp;

→ Criar estudante;

**POST**

https://labenu-system-caique.herokuapp.com/students
    
Body:
    
    {
        "name": "Caíque",
        "email": "caique@email.com",
        "birthDate": "20/05/1994",
        "team": "lovelace",
        "hobbies": ['Jogar videogame', 'Ouvir música']
    }
    
#### Para inserir o aluno, deve-se passar o body onde todos os items são obrigatórios. De acordo com o enunciado, não entendemos que a lista de hobbies fosse pré definida, então foi criada uma lógica para que o aluno podesse passar qualquer hobbie que quisesse, sendo um ou mais de um. Caso o hobby já exista no banco, ele não será adicionado de novo, serão adicionados apenas os hobbies novos.
&nbsp;
---

→ Criar docente;

**POST**

https://labenu-system-caique.herokuapp.com/teachers
    
Body:
    
    {
        "name": "Matheus",
        "email": "matheus@email.com",
        "birthDate": "18/06/1990",
        "team": "lovelace",
        "specialties": ['Backend', 'Programação Orientada a Objetos', 'Typescript']
    }

#### Para inserir o professor, deve-se passar o body onde todos os items são obrigatórios. As especialidades devem ser escolhidas entre as seguintes: React, Redux, CSS, Testes, Typescript, Programação Orientada a Objetos e Backend.
&nbsp;
---

→ Criar turma;

**POST**

https://labenu-system-caique.herokuapp.com/teams
    
Body:
    
    {
        "name": "Cruz",
        "beginDate": "11/10/2021",
        "endDate": "25/04/2022",
        "modulo": 0,
        "period": "noturno"
    }

#### Para inserir uma turma, deve-se passar o body onde todos os items são obrigatórios. Caso o período seja noturno, adiciona-se "-na-night" ao nome da turma.
&nbsp;
---

→ Adicionar estudante na turma;

#### Como o exemplo de modelagem do banco estava com turma obirgatória tanto no estudante como no docente, criamos uma função para trocar o estudante de turma.

**PUT**

https://labenu-system-caique.herokuapp.com/students

Body:

    {
        "email": "caique@email.com",
        "team": "cruz"
    }

#### Para trocar o aluno de turma, é só passar o email do aluno com a turma desejada.
&nbsp;
---

→ Adicionar docente na turma;

#### Como o exemplo de modelagem do banco estava com turma obirgatória tanto no estudante como no docente, criamos uma função para trocar o professor de turma.

**PUT**

https://labenu-system-caique.herokuapp.com/students

Body:

    {
        "email": "matheus@email.com",
        "team": "cruz"
    }

#### Para trocar o professor de turma, é só passar o email do aluno com a turma desejada.
&nbsp;
---

→ Pegar a idade de algum estudante a partir do id;

**GET**

https://labenu-system-caique.herokuapp.com/students/:id

Response:

    {
        "name": "Caíque",
        "age": 27
    }

&nbsp;
---

→ Pegar todas as turmas;

**GET**

https://labenu-system-caique.herokuapp.com/teams/all

Response:

    {   "teams": 
        [
            {
                "id":542426837,
                "name":"Lovelace",
                "beginDate":"07/06/2021",
                "endDate":"03/12/2021",
                "modulo":4
            },
            {
                "id":634553405,
                "name":"Cruz-na-night",
                "beginDate":"11/10/2021",
                "endDate":"25/04/2022",
                "modulo":0
            }
        ]
    }

&nbsp;
---

→ Pegar todos os alunos de uma turma;

**GET**

https://labenu-system-caique.herokuapp.com/students?team="turma"

#### Substituir "turma" na URL pela turma desejada

Response:

    {   "students": 
        [
            {
                "id":625671143,
                "name":"Caíque",
                "email":"caique@email.com",
                "birthDate":"20/05/1994",
                "team":"Lovelace",
                "hobbies":["Jogar videogame","Ouvir música"]
            }
        ]
    }

&nbsp;
---

→ Pegar todos os professores de uma turma;

**GET**

https://labenu-system-caique.herokuapp.com/teachers?team="turma"

#### Substituir "turma" na URL pela turma desejada

Response:

    {   "teachers": 
        [
            {
                "id":634166884,
                "name":"Amanda",
                "email":"amanda@email.com",
                "birthDate":"23/01/1993",
                "team":"Lovelace",
                "specialties":["React","Backend"]
            },
            {
                "id":634408540,
                "name":"Chijo",
                "email":"chijo@email.com",
                "birthDate":"03/11/1994",
                "team":"Lovelace",
                "specialties":["React","Redux","CSS"]
            }
        ]
    }

&nbsp;
---
