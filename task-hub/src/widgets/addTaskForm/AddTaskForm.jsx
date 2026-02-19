
import {addTask} from "../../features/tasks.js";

const AddTaskForm = ({projectId}) => {


    const addTaskFormSubmit = (formData) => {
        const title = formData.get("title");
        addTask(title, projectId);

    }

    return (
        <div>
            <form action={addTaskFormSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" id="title" required/>
                </div>
                <button type="submit">Add new task</button>
            </form>
        </div>
    )
}

export default AddTaskForm;