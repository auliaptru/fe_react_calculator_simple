import { useEffect, useState } from 'react';
import { RiDeleteBack2Line } from 'react-icons/ri';

import './app.scss';

const btns = [
    ['C', '/', '*', 'CE'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '='],
    ['%', '0', '.'],
];

const num = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const operator = ['C', '/', '*', 'CE', '-', '+', '='];

function App() {
    const [input, setInput] = useState('0');
    const [result, setResult] = useState(0);
    const [prev, setPrev] = useState('');
    const [current, setCurrent] = useState('');
    const [isCalculated, setCalculated] = useState(false);

    const inputNum = (btn) => {
        if (isCalculated) {
            if (num.includes(btn)) {
                reset();
            }
        }

        current ? setCurrent((prev) => prev + btn) : setCurrent(btn);
        setCalculated(false);
    };

    const calculate = (btn) => {
        if (btn === '=') {
            setCalculated(true);

            let calculatedResult;
            calculatedResult = eval(current);

            setResult(calculatedResult);
        }

        result
            ? setPrev(result + current.slice(-2) + btn)
            : setPrev(current + btn);
    };

    const reset = () => {
        setInput('0');
        setPrev('');
        setResult(0);
        setCurrent('');
        setCalculated(false);
    };

    const deleteInput = () => {
        setCurrent(input.slice(0, current.length - 1));
    };

    useEffect(() => {
        setInput(current);
    }, [current]);

    useEffect(() => {
        setInput('0');
    }, []);

    const handleButtonClick = (btn) => {
        btn === '='
            ? calculate(btn)
            : btn === 'C'
            ? reset()
            : btn === 'CE'
            ? deleteInput()
            : inputNum(btn);
    };

    return (
        <div className='app'>
            <div className='wrapper__calculator'>
                <input
                    type='text'
                    value={prev}
                    className='userInput'
                    readOnly
                />
                <p>{isCalculated ? result : input}</p>
                <div className='buttons'>
                    {btns.flat().map((btn, i) => (
                        <button
                            key={i}
                            className={`btn-${i}`}
                            onClick={() => handleButtonClick(btn)}
                        >
                            {btn}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;

// let [calc, setCalc] = useState({
//   sign: '',
//   inputNum: 0,
//   res: 0,
// });

// const resetClickHandler = () => {
//   setCalc({
//       ...calc,
//       sign: '',
//       inputNum: 0,
//       res: 0,
//   });
// };

// const invertClickHandler = () => {};

// const percentClickHandler = () => {
//   let inputNum = calc.inputNum ? parseFloat(removeSpace(calc.inputNum)) : 0;
//   let res = calc.res ? parseFloat(removeSpace(calc.res)) : 0;

//   setCalc({
//       ...calc,
//       inputNum: (inputNum /= Math.pow(100, 1)),
//       res: (res /= Math.pow(100, 1)),
//       sign: '',
//   });
// };

// const equalsClickHandler = () => {
//   if (calc.sign && calc.inputNum) {
//       const math = (a, b, sign) => {
//           sign === '+'
//               ? a + b
//               : sign === '-'
//               ? a - b
//               : sign === 'x'
//               ? a * b
//               : a / b;
//       };

//       setCalc({
//           ...calc,
//           res:
//               calc.inputNum === '0' && calc.sign === '/'
//                   ? 'cant divide with 0'
//                   : toLocalString(
//                         math(
//                             inputNumber(removeSpace(calc.res)),
//                             inputNumber(removeSpace(calc.inputNum)),
//                             calc.sign
//                         )
//                     ),
//           sign: '',
//           inputNum: 0,
//       });
//   }
// };

// const signClickHandler = (e) => {
//   e.preventDefault();
//   const value = e.target.innerHtml;

//   setCalc({
//       ...calc,
//       sign: value,
//       res: !calc.res && calc.inputNum ? calc.inputNum : calc.res,
//       inputNum: 0,
//   });
// };

// const commaClickHandler = (e) => {
//   e.preventDefault();
//   const value = e.target.innerHtml;
//   setCalc({
//       ...calc,
//       inputNum: !calc.inputNum.toString().includes('.')
//           ? calc.inputNum + value
//           : calc.inputNum,
//   });
// };

// const inputNumClickHandler = (e) => {
//   e.preventDefault();
//   const value = e.target.innerHtml;
//   console.log(value);

//   if (removeSpace(calc.inputNum).length < 16) {
//       setCalc({
//           ...calc,
//           inputNum:
//               calc.inputNum === 0 && value === '0'
//                   ? '0'
//                   : removeSpace(calc.inputNum) % 1 === 0
//                   ? toLocalString(inputNumber(calc.inputNum + value))
//                   : toLocalString(calc.inputNum + value),
//           res: !calc.sign ? 0 : calc.res,
//       });
//   }
// };

// const toLocalString = (inputNum) =>
//   String(inputNum).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ');

// const removeSpace = (inputNum) => inputNum.toString().replace(/\s/g, '');

// const buttonClickHandler = (e, btn) => {
//   btn === 'c'
//       ? resetClickHandler
//       : btn === '%'
//       ? percentClickHandler
//       : btn === '='
//       ? equalsClickHandler
//       : btn === '/' || btn === 'x' || btn === '-' || btn === '+'
//       ? signClickHandler(e)
//       : btn === '.'
//       ? commaClickHandler(e)
//       : inputNumClickHandler(e);
// };
