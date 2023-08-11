
import React, {useState} from "react";



function App() {

  // 상태값이 변했을 때 가져올 변수 설정
  let [newVisitor, setNewVisitor] = useState('');

  // 빈 배열 넣어주기
  let [visitors, setVisitors] = useState([]);

  // 함수명은 웬만하면 소문자로 시작하기 (컴포넌트와의 구분)
  const insertVisitorProc = () =>
  {
    // 확인하기
    // console.log("명단추가");

    // setVisitors에 [추가된 이름, 기존의 명단] 세팅해서 추가
    // 즉, 추가된 후 변경된 부분만 다시 그려지는 것
    setVisitors([newVisitor, ...visitors]);

    // setNewVisitors 초기화
    setNewVisitor('');
  }

  return (
    <div className="App">
      {/* input의 value에 newVisitor 설정해줌 */}
      <input type="text" value={newVisitor} onChange={(e)=>
      { setNewVisitor(e.target.value);
      // console.log(newVisitor);
      // input창 안에 글을 쓸 때 마다 console에 찍힘
      }}/>
      <button type="button" onClick={insertVisitorProc}>명단 추가</button>
      <hr></hr>
      {/* html처럼 보이지만 DOM 객체이기 떄문에 html과 다르게 표준을 지켜줘야함 */}

      {/* 여기에 들어온 명단 데이터가 그려져야 함 */}
      {/* <h3>정성훈</h3>
      <h3>홍길동</h3> */}
      {/* 여기에 들어갈 데이터가 배열으로 그려지도록 하고 배열이 바뀔 때 마다 state가 변화 */}

      {
        visitors.map((value, index)=>{
          return (
            // 랜더링을 위한 key,value
            <h3 key={index}>{value}</h3>
          );
        })
      }

    </div>
  );
}

export default App;
