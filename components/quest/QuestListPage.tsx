import React, { useEffect, useState } from "react";
import questboard from '@/public/img/questparchment.png';
import { invoke } from "@tauri-apps/api/tauri";
import { Gowun_Dodum } from "next/font/google";

const gowonDodum = Gowun_Dodum({
  subsets: ["latin"], 
  weight: ["400"],
});

export default function QuestListPage() {
  /*
  const [todolist, setTodolist] = useState<Quest[]>([
    {
      id: '1',
      title: '리스트 화면 만들기',
      c_day: '2024-04-14',
      d_day: '2024-04-15',
      content: <p>퀘스트 목록 화면을 만들어야 합니다.</p>,
      reward: <></>
    },
    {
      id: '2',
      title: '퀘스트 등록 화면 만들기',
      c_day: '2024-04-14',
      d_day: '2024-04-15',
      content: <p>의뢰를 등록합니다.</p>,
      reward: <></>
    },
    {
      id: '3',
      title: '75레벨 달성',
      c_day: '2024-04-14',
      d_day: '2024-04-15',
      content: <><p>메이플랜드 75레벨을 달성합니다.</p><p>라이칸스로프를 사냥합니다.</p></>,
      reward: <><p>지능이 5 오릅니다.</p><p>마법 가속 2단계를 획득 할 수 있습니다.</p></>
    },
  ]);
  */
  const [todolist, setTodolist] = useState<Quest[]>([]);
  const [selected, setSelected] = useState<Quest | null>(null);

  useEffect(() => {
    invoke('load_quest_list').then((stringValue: any) => {
      setTodolist(JSON.parse(stringValue));
    }).catch(error => {
      console.log('rust와의 통신에 실패했습니다...' + error);
    });
  }, []);
  return (
    <>
      <div id="accordion-collapse" style={{maxWidth: '480px'}} data-accordion="collapse">
        {todolist.map((todo: any, index: number) => 
        <React.Fragment key={todo.id}>
          <h2 id="accordion-collapse-heading-1" onClick={() => setSelected(todo)}>
            <button type="button" className={`flex items-center justify-between 
            w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 hover:bg-purple-400  
            ${index === 0 ? 'rounded-t-xl' : ''} ${index === todolist.length - 1 ? 'rounded-b-xl' : ''} 
            ${selected != null ? todo.id === selected.id ? 'bg-purple-400' : 'bg-purple-300' : 'bg-purple-300'}`}>
              <span>{todo.title}</span>
              <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0 small-restricted" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
              </svg>
            </button>
          </h2>
          {selected != null && todo.id === selected.id ?
          <div className="bg-gray-100 small-restricted">
            <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                {todo.content}
              </p>
            </div>
          </div> : <></>}
        </React.Fragment>)}
      </div>
      <div className={`big-restricted quest-board rounded-md ${gowonDodum.className}`} style={{height: '95vh', backgroundImage: `url(${questboard.src})`, aspectRatio: '19 / 20', backgroundSize: 'cover'}}>
        {selected != null ? 
        <>
          <div className="quest-content text-xl text-center">
            <h1 className="text-5xl font-extrabold py-5">{selected.title}</h1>
            <h4 className="text-xl font-extrabold py-5">{`기한: ${selected.d_day} 까지`}</h4>
            {selected.content}
          </div>
          <div className="quest-reward text-center">
            <h4 className="text-2xl font-extrabold py-5">보수</h4>
            {selected.reward}
          </div>
        </> 
        : <></>}
      </div>
      <style jsx>{`
        #accordion-collapse {
          min-width: 400px;
        }
        @media(min-width: 1100px) {
          .quest-board {
            display: grid;
            grid-template-areas:
            ". quest ."
            ". reward .";
            grid-template-columns: 12.1vw 1fr 12vw;
            grid-template-rows: 5fr 3fr;
            padding: 20px 0;
            gap: 20px;
            color: #FAFAFA;
          }
          .quest-content {
            grid-area: quest;
            padding: 5px;
          }
          .quest-reward {
            grid-area: reward;
            padding: 5px;
          }
        }
      `}</style>
    </>
  )
}