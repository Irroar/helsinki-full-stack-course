const Persons = ({persons}) => {
  return (
    <>
      <ul>
        {persons.map(person => 
          <Person key={person.id} name={person.name} number={person.number}/>  
        )}
      </ul>
    </>
  );
}

const Person = ({name, number}) => {
  return (
    <>
      <li>{name} {number}</li>
    </>
  );
}

export default Persons;