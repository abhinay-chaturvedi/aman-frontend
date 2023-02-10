

const IdContainer=(props)=>{
    return (
        <div className={props.class.div}>
        <p>1)</p>
        <p><b>Status</b>:Available</p>
        {/* <p>Available</p> */}
        <button accessKey={props.password} id={props._id} onClick={props.onClick} className = {props.class.btn}> GetId and password</button>
        <span>Price:-20 <b>coins</b></span>
    </div>
    )
}
export default IdContainer;