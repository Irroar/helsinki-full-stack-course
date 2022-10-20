const PersonForm = ({onSubmit, newName, nameChangeHandler, newNumber, numberChangeHandler}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={nameChangeHandler}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={numberChangeHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
}

export default PersonForm;