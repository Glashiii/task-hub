import ProgressBar from "../shared/progressBar/ProgressBar.jsx";


const ProjectProgressBar = ({completedPart}) => {

    return (
        <ProgressBar
            completedPart={completedPart}
            color={'green'}

        />
    )
}

export default ProjectProgressBar