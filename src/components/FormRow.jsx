const FromRow = ({ type, name, labelText, defaultValue }) => {
    return (

        <div className="form-row">
            <label htmlFor={name} className="form-label">{labelText || name}</label>
            <input type={type} name={name} id={name} className='form-input' placeholder='enter your name' required defaultValue={defaultValue || ''} />
        </div>
    )
}


export default FromRow;