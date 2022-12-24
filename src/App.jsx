
import Slider from './Components/Slider.jsx';
import Checkbox from './Components/Checkbox.jsx';
import {useState} from 'react';
import './App.css'

function App() {
  
        const [password, setPassword] = useState({
          length:0,
          uppercase: false,
          lowercase: false,
          numbers: false,
          symbols: false,
        })

        var strength = Object.values(password).reduce((a, item) => a + (item === true ? 1 : 0), 0);
 
          const [genpassword, setGenPassword] = useState("");
          const [copied, setCopied] = useState(false);

          const setPasswordLength = (val) => {
            setPassword({
              ...password,
              length: parseInt(val),
            })
            }

          const handleChangeUppercase = () => {
            setPassword({
              ...password,
              uppercase: !password.uppercase,
            })
          }

          const handleChangeLowercase = () => {
            setPassword({
              ...password,
              lowercase: !password.lowercase,
            })
          }

          const handleChangeNumbers = () => {
            setPassword({
              ...password,
              numbers: !password.numbers,
            })
          }

      const handleChangeSymbols = () => {
        setPassword({
          ...password,
          symbols: !password.symbols,
        })
      }


      function generatePassword() {
        const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        const symbolsArray = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];
    
        const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
        const lowerCaseLetters = characterCodes.map((code) =>
          String.fromCharCode(code)
        );
        const upperCaseLetters = lowerCaseLetters.map((letter) =>
          letter.toUpperCase()
        );
    
        const { length, uppercase, lowercase, numbers, symbols } = password;
    
        const generateTheWord = (
          length,
          uppercase,
          lowercase,
          numbers,
          symbols
        ) => {
          const availableCharacters = [
            ...(lowercase ? lowerCaseLetters : []),
            ...(uppercase ? upperCaseLetters : []),
            ...(numbers ? numbersArray : []),
            ...(symbols ? symbolsArray : []),
          ];
          const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
          const characters = shuffleArray(availableCharacters).slice(0, length);
          setGenPassword(characters.join(''));
          

          return characters;
        };

        generateTheWord(length, uppercase, lowercase, numbers, symbols);
        setStreng(strength);

      }
        

      const isStrongPass = genpassword.length >= 12;

      const isMedium =  genpassword.length >= 8 && genpassword.length <= 12;
      
      const isWeak = genpassword.length >= 5 && genpassword.length <= 8;

      const isTooWeak =  genpassword.length <= 4 && genpassword.length >= 1;
          

          const copyFunc = () => {
            
            if (genpassword.length > 0) {
              navigator.clipboard.writeText(genpassword);
              setCopied(true)
              setInterval(() => {
                setCopied(false)
              },5000);

            }
            
          }
          
          const rangeInputs = document.querySelectorAll('input[type="range"]')

          
          function handleInputChange(e) {
            let target = e.target
            if (e.target.type !== 'range') {
              target = document.getElementById('range')
            } 
            const min = target.min
            const max = target.max
            const val = target.value
            
            target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
          }
          
          rangeInputs.forEach(input => {
            input.addEventListener('input', handleInputChange)
          })
          
          


  return (
    <div className="main-wrapper">
            <h1 className='title'>Password Generator</h1>
            <div className="pass-gen-wrapper">

              <input type="text" id="pass-gen-input" value={genpassword} placeholder="P4$5W0rD!" autoComplete='off' onChange={(e) => setGenPassword(e.target.value)} disabled/>
        
              <button className='copy-btn' onClick={copyFunc}></button> 

              {copied ? <h1 className='copy'>Copied</h1> : <h1 className='copy'></h1>} 
            </div>
          <div className='settings-wrapper'>
           <div className='char-length-wrapper'>
            
              <div className='char-length'>
                <p>Character Length</p>
                <h1 className='char-value'>{password.length}</h1>
              </div>
              <div className='slider'>
                <Slider value={password.length} onChange={(e) => setPasswordLength(e.target.value)}/> 
              </div>    
           </div>
           <div className="wrapper">
            <div className='checkbox-wrapper'>

             <div className="container">
              <Checkbox value={password.uppercase} onChange={handleChangeUppercase}/>
              <span className="checkmark"></span>
              <h1>Include Uppercase Letters</h1>
             </div>
             <div className="container">
              <Checkbox value={password.lowercase} onChange={handleChangeLowercase}/>
              <span className="checkmark"></span>
              <h1>Include Lowercase Letters</h1>
             </div>
             <div className="container">
              <Checkbox value={password.numbers} onChange={handleChangeNumbers}/>
              <span className="checkmark"></span>
              <h1>Include Numbers</h1>
             </div>
             <div className="container">
              <Checkbox  value={password.symbols} onChange={handleChangeSymbols}/>
              <span className="checkmark"></span>
              <h1>Include Symbols</h1>
             </div>
            </div>

              {(isStrongPass) ?  
             <div className='strength-wrapper'>
              <p className="description">STRENGTH</p>
               <div className='line-wrapper'>
                  <p>STRONG</p>
                  <div className="line strong">  
                  </div>
                  <div className="line strong">  
                  </div>
                  <div className="line strong">  
                  </div>
                  <div className="line strong">  
                  </div>
                </div>
              </div> : 
               ((isMedium) ? 
              <div className='strength-wrapper'>
               <p className="description">STRENGTH</p>
                <div className='line-wrapper'>
                  <p>MEDIUM</p>
                  <div className="line medium">  
                  </div>
                  <div className="line medium">  
                  </div>
                  <div className="line medium">  
                  </div>
                  <div className="line">  
                  </div>
                </div>   
             </div> : 
             ((isWeak) ?  
                <div className='strength-wrapper'>
                  <p className="description">STRENGTH</p>
                  <div className='line-wrapper'>
                    <p>WEAK</p>
                    <div className="line weak">  
                    </div>
                    <div className="line weak">  
                    </div>
                    <div className="line">  
                    </div>
                    <div className="line">  
                    </div>
                  </div>
                </div>  :
                
            ((isTooWeak) ?
              <div className='strength-wrapper'>
                <p className="description">STRENGTH</p>
                <div className='line-wrapper'>
                  <p>TOO WEAK</p>
                  <div className="line too-weak">  
                  </div>
                  <div className="line">  
                  </div>
                  <div className="line">  
                  </div>
                  <div className="line">  
                  </div>
                </div>
              </div> :  <div className='strength-wrapper'>
                <p className="description">STRENGTH</p>
                <p></p>
                <div className='line-wrapper'>
                  <div className="line">  
                  </div>
                  <div className="line">  
                  </div>
                  <div className="line">  
                  </div>
                  <div className="line">  
                  </div>
                </div>
              </div>)))
              
             
             }

             <button className="gen-btn" onClick={generatePassword}>
              GENERATE
              <div className="arrow"></div>
              </button>
           </div> 
          </div>   
    </div>
  )
}

export default App
