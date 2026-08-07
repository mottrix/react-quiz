function RestartBtn({dispatch}) {
    return (
        <div>
            <button className="btn btn-ui" onClick={()=>dispatch({type:"restart"})}>Restart</button>
        </div>
    )
}

export default RestartBtn
