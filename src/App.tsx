import React, { useEffect, useState } from 'react';
import './App.css';
import Dropdown from './components/dropdown';

const dict = [
  {
    picture: "pic1",
    name: "Soham Newman",
    email:"soham.newman@example.com"
  },
  {
    picture: "pic2",
    name: "Ken Alvarez",
    email:"ken.alvarez@example.com"
  },
  {
    picture: "pic3",
    name: "Denise Hall",
    email:"deni.hall@example.com"
  },
  {
    picture: "pic4",
    name: "Tracy Bing",
    email:"tracky.bing@example.com"
  },
  {
    picture: "pic5",
    name: "Letitia George",
    email:"letitia.george@example.com"
  },
  {
    picture: "pic1",
    name: "Brad Grant",
    email:"brad.grant@example.com"
  },
  {
    picture: "pic2",
    name: "Calvin Jones",
    email:"calvin.jones@example.com"
  },
  {
    picture: "pic3",
    name: "Tim Hall",
    email:"tim.hall@example.com"
  },
  {
    picture: "pic4",
    name: "xyz",
    email:"xyz.mail@example.com"
  },
  {
    picture: "pic5",
    name: "abc",
    email:"abc.mail@example.com"
  },
]

export interface userObj{
  picture:string,
  name:string,
  email:string
}

function App(){
  const [inputValue, setInputValue] = useState<string>("");
  const [emails, setEmails] = useState<userObj[]>([]);
  const [error, setError] = useState<string>();
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [options, setOptions] = useState<userObj[]>([]);
  const [lastChipFocus, setLastChipFocus] = useState<boolean>(false);
  const [backspaceCount, setBackspaceCount] = useState<number>(1);

  function handleInputChange(e : React.ChangeEvent<HTMLInputElement>){
    setInputValue(e.target.value);
  }

  function handleOnClick(e : React.MouseEvent<HTMLInputElement>){
    setShowDropDown(true);
  }

  function deleteChip(e : React.KeyboardEvent<HTMLInputElement>){
    if(e.key === "Backspace" && !inputValue && emails.length>0){
      console.log(backspaceCount)
      if(backspaceCount%2 === 1){
        setLastChipFocus(true);
      }
      else if(backspaceCount%2 === 0 && backspaceCount !== 0){
        console.log(backspaceCount)
        setLastChipFocus(false);
        options.push(emails[emails.length-1]);
        emails.pop();
        emailChips.pop();
        setBackspaceCount(0);
      }
      setBackspaceCount(prevBackspaceCount=>prevBackspaceCount + 1);
    }
  }

  
  function addByDrop(value : userObj){
      if (value) {
        setEmails(emails => [...emails,value])
        setOptions(options.filter(i => i !== value))
        setInputValue("")
      }
  }

  
  
  function handleDelete(item: userObj){
    setEmails(emails.filter(email => email !== item));
    setLastChipFocus(false);
  };

  

  let emailChips : any = []

  for (let i of emails) {
    if(emails.indexOf(i) === emails.length-1 && lastChipFocus){
      emailChips.push(<div className="bg-gray-400 rounded-2xl pr-1 mx-2 flex items-center content-center border-2 border-blue-700" key={i.name}>
        <img src={`https://picsum.photos/200?random=` + i.picture} alt="pic" className="rounded-full h-8 w-8 mr-4"/>
        {i.name}
        <button onClick={()=>handleDelete(i)} className="ml-2">X</button>
      </div>);
    }
    else{
      emailChips.push(<div className="bg-gray-400 rounded-2xl pr-1 mx-2 flex items-center content-center" key={i.name}>
        <img src={`https://picsum.photos/200?random=` + i.picture} alt="pic" className="rounded-full h-8 w-8 mr-4"/>
        <div className="flex py-2">{i.name}</div>
        <button onClick={()=>handleDelete(i)} className="ml-2">X</button>
      </div>);
    }
  }

  useEffect(()=>{
    if(!inputValue) setOptions(dict);
    
    let newDict = [];
    for(let i in dict){
      if(dict[i].name.substring(0,inputValue?.length).toLowerCase() === inputValue.toLowerCase() && !emails.includes(dict[i])) {
        console.log(dict[i])
        newDict.push(dict[i])
      }
    }
    setOptions(newDict);
  }, [inputValue, emails])

  return (
    <div className="App">
      <p className="text-xl text-blue-700 font-bold" style={{ paddingTop: '34px' }}>Pick Users</p>
      <div className="flex m-6 p-4 border-b-4 border-blue-700 items-center">{emailChips}
        <div>
          <input
            placeholder="Add new user..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyUp={deleteChip}
            onClick={handleOnClick}
            className="focus:outline-none p-4 w-10/12 relative"
          />
          {showDropDown && <Dropdown data={options} addEmail={addByDrop} />}
        </div>
      </div>
      
      
      {error && <em>{error}</em>}
    </div>
  );
}

export default App;
