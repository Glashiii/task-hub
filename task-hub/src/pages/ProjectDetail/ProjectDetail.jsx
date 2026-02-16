import { useParams } from 'react-router-dom';

const ProjectDetail = () => {
    const { projectId } = useParams();
    return(
        <div>
            {projectId}
        </div>
    )
}

export default ProjectDetail
