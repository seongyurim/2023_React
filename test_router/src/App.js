import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './pages/Header';
import Nav from './pages/Nav';

import DescWeb from './pages/DescWeb';
import DescHtml from "./pages/DescHtml";
import DescCss from './pages/DescCss';
import DescJs from './pages/DescJs';

// Router Test ===========================================================================================
// function App() {
//   return (
//     <div className="App">
//       <Header />
//       <Nav />
//       <input type="password"></input>

//       <Routes>
//         <Route path="/" element={<DescWeb/>}/>
//         <Route path="/html" element={<DescHtml/>}/>
//         <Route path="/css" element={<DescCss/>}/>
//         <Route path="/js" element={<DescJs/>} />
//       </Routes>
//     </div>
//   );
// }

// State Test ===========================================================================================
// 체중을 표시하는 컴포넌트라고 가정
// function App() {

//   let weight = 45;
//     return (
//       <div className="App">
//           {/* span은 div와 거의 같지만 inline모드인 것 */}
//           <span>당신의 체중 : {weight}kg</span>

//           {/* 값 증가시키기 */}
//           <button onClick={()=>
//             {weight = weight + 1;
//             console.log(weight);}}>몸무게 증가</button>
//             {/* redrawing이 필요 없이 weight값만 증가시킴 */}
            
//       </div>
//     );
//   }

// useState 이용
// 즉, 버튼클릭시 값 증가 > 바뀐 값(state변화)을 가지고 app()다시 실행 (redrawing)
function App() {

  let [weight, setWeight] = useState(45);

  // 클릭하는 순간 이 App()함수가 다시 돌기 때문에 증가한 값으로 아래 콘솔이 찍힘
  // console.log("App Start");
  // console.log("weight = " + weight);

    return (
      <div className="App">
          {/* span은 div와 거의 같지만 inline모드인 것 */}
          <span>당신의 체중 : {weight}kg</span>

          {/* 값 증가시키기 */}
          <button onClick={()=>
          {setWeight(weight + 1);
          // console.log(weight);
          }}>체중 증가</button>
          {/* 랜더링하여 redrawing을 해주며 weight값 증가 */}
            
      </div>
    );
  }

export default App;
