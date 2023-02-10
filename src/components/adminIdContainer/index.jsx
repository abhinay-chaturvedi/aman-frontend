

const AdminIdContainer=(props)=>{
    return (
        <div className={props.div}>
        <p>1)</p>

        <p>{props.lockId}</p>
        <p>Status: <b>{!props.is_Available?"sold":"notSold"}</b> </p>
        {!props.is_Available && <button accessKey={props.btnpassword} id={props.btnId} onClick={props.onClick} className = {props.btn}> Change Password</button>}
        
    </div>
    )
}
export default AdminIdContainer;