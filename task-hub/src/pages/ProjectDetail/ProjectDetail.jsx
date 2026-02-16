import {useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import {getProjectById} from '../../features/projects.js'

const ProjectDetail = () => {

    const {projectId} = useParams();
    const [projectData, setProjectData] = useState(null)
    // const [loading, setLoading] = useState(true);
    

    useEffect(() => {

        (async () => {
                try {
                    const project = await getProjectById(projectId)
                    setProjectData(project)
                } catch (e) {
                    console.error("getProjectById error:", e);
                } finally {
                    console.log('tried')
                }
            }
        )();

    }, [projectId]);

    if (projectData === null) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
            {projectId}
            <p> Information: </p>
            <div>
                <div>{projectData.title}</div>
                <div>{projectData.info}</div>
            </div>
        </div>
    )
}

export default ProjectDetail
