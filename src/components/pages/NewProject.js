import { useNavigate } from 'react-router-dom'
import ProjectForm from '../project/ProjectForm'
import styles from './Newproject.module.css'

function NewProject() {

    const navigate = useNavigate()

    function createPost(project) {

        // Fetch para obter todos os projetos e determinar o próximo ID
        fetch('http://localhost:5000/projects')
            .then(resp => resp.json())
            .then(data => {
                // Encontrar o maior ID numérico
                const lastId = data.length > 0 ? Math.max(...data.map(p => parseInt(p.id, 10) || 0)) : 0;
                // Definir o próximo ID
                project.id = lastId + 1;

                // Inicializar custo e serviços
                project.cost = 0;
                project.services = [];

                return fetch('http://localhost:5000/projects', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(project),
                });
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                navigate("/projects", { state: { message: "Projeto criado com sucesso!" } });
            })
            .catch(err => console.log(err));
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os servicos</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
        </div>
    )
}

export default NewProject;