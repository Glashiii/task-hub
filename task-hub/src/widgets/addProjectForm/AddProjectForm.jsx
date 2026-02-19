import {addProject} from "../../features/projects.js";


const AddProjectForm = (props) => {
    const {
        setPageCursors,
        setPageIndex,
    } = props;

    const addProjectFormSubmit = (formData) => {
        const title = formData.get("title");
        const info = formData.get("info");
        addProject(title, info);
        setPageCursors([null]);
        setPageIndex(0);
    }

    return (
        <div>
            <form action={addProjectFormSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" id="title" required/>
                </div>
                <div>
                    <label htmlFor="info">Info:</label>
                    <input type="text" name="info" id="info" required/>
                </div>
                <button type="submit">Add new project</button>
            </form>
        </div>
    )
}

export default AddProjectForm;