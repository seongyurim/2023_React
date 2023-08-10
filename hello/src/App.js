import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props) {
  // console.log('props', props, props.title)
  return <header>
  <h1><a href="/" onClick={(event)=>{
    event.preventDefault(); // 기본동작을 방지(클릭해도 리로드가 발생하지 않음)
    props.onChangeMode();
  }}>{props.title}</a></h1>
  </header>
}

function Nav(props) {
  const lis = []
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/+t.id'} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
    </li>);
  }

  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value; // event.target = form 태그
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title"></input></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="Create"></input></p>
      {/* 코드 감싸기: 블록지정 > Ctrl+Shift+P > Emmit(Wrap wirh Abbreviation) */}
    </form>
  </article>
}

function Update(props) {
  // props로 들어온 title, body를 state로 환승시켰다.
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  // 우선 Create 코드를 그대로 복제해와서 수정한다.
  return <article>
    <h2>Update</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value; // event.target = form 태그
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title" value={title} onChange={event=>{
        // console.log(event.target.value);
        setTitle(event.target.value);
      }}></input></p>
      <p><textarea name="body" placeholder="body" value={body} onChange={event=>{
        // console.log(event.target.value);
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type="submit" value="Update"></input></p>
      {/* 코드 감싸기: 블록지정 > Ctrl+Shift+P > Emmit(Wrap wirh Abbreviation) */}
    </form>
  </article>
}

////////////////////////////////////////////////////////////////////////

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id: 1, title: 'HTML', body: 'HTML is...',},
    {id: 2, title: 'CSS', body: 'CSS is...'},
    {id: 3, title: 'Javascript', body: 'Javascript is...'}
  ])

  let content = null;
  let contextControl = null;

  // 인덱스 페이지
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  }

  // READ 페이지
  else if (mode === 'READ') {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl = <>
      <li><a href={'/update/'+id} onClick={event=>{
        event.preventDefault();
        setMode('UPDATE');
      }}>Update</a></li>
      <li><input type="button" value="Delete" onClick={()=>{
        const newTopics = [];
        for (let i = 0; i < topics.length; i++) {
          if (topics[i].id !== id) {
            newTopics.push(topics[i]);
          }
        }
        setTopics(newTopics);
        setMode('WELCOME');
      }}></input></li>
    </> // READ 상태일 때에만 Update 버튼이 나타난다.
  }

  // CREATE 페이지
  else if (mode === 'CREATE') {
    content = <Create onCreate={(_title, _body)=>{
      // 이곳에서 작업한 title, body를 topics에 추가해야 하므로 우선 topics를 useState로 승격시켰다.
      const newTopic = {id: nextId, title: _title, body: _body}
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics); // 데이터가 다르다면 컴포넌트를 다시 렌더링한다.
      setMode('READ'); // 글 반영이 완료되었으므로 해당 글의 상페페이지로 이동시킨다.
      setId(nextId);
      setNextId(nextId+1); // 이후에 글 생성할 것을 대비하여 id를 1 증가시킨다.
    }}></Create> // 여기서 바로 UI로 만들어도 되지만, CREATE는 복잡한 기능을 가지고 있다고 가정하므로, 컴포넌트화 한 것이다.
  }

  // UPDATE 페이지
  else if (mode === 'UPDATE') {
    // Upate 화면에서는 기존 글의 제목과 본문이 입력되어 있어야 하므로 아래 코드가 다시 필요해진다. 위에서 복제해왔다.
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      // console.log(title, body);
      const newTopics = [...topics];
      const updatedTopic = {id: id, title: title, body: body};
      // id값은 자동으로 만들어지므로 위의 코드 5줄을 복제해오지 않아도 된다.
      // READ에서 글(id값을 가짐)을 클릭해야 update가 가능하기 때문이다.
      for (let i = 0; i < newTopics.length; i++) { // id 일치여부를 먼저 확인해야 하므로
        if (newTopics[i].id === id) {
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
    }}></Update>
  }

  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
      <ul>
        <li>
          <a href="/create" onClick={event=>{
          event.preventDefault();
          setMode('CREATE');
          }}>Create</a>
        </li>
        {contextControl} {/* Update 버튼이 홈에서는 없고, 상페페이지에서만 나타나게 한다. */}
      </ul>
    </div>
  );
}

export default App;
