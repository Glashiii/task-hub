import ProgressBar from "../shared/progressBar/ProgressBar.jsx";


const ProjectProgressBar = ({completedPart}) => {

    {console.log(completedPart)}
    return (
        <ProgressBar
            completedPart={completedPart}
            color={'green'}

        />
    )
}

export default ProjectProgressBar