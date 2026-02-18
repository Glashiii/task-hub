import style from './ProgressBar.module.css'

const ProgressBar = (props) => {

    const {
        completedPart,
        color
    } = props

    const progressBarConfigureStyle = {
        backgroundColor: color,
        width: `${parseFloat(completedPart)*100}%`,
    }


    return (

        <div className={`${style['progress-bar-element']}`}>
            <span className={style['progress-bar-label']}>{(Math.round(parseFloat(completedPart)*100)).toString()}%</span>
            <div className={style['progress-bar-outer']}>
                <div style={progressBarConfigureStyle} className={style['progress-bar-inner']}>

                </div>
            </div>
        </div>
    )
}

export default ProgressBar;