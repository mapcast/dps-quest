import React, { useEffect, useState } from "react";
import questboard from '@/public/img/questparchment.png';
import { invoke } from "@tauri-apps/api/tauri";
import { Gowun_Dodum } from "next/font/google";

const gowonDodum = Gowun_Dodum({
  subsets: ["latin"], 
  weight: ["400"],
});

export default function QuestListPage() {
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
      <div className={`big-restricted ${gowonDodum.className}`} style={{height: '95vh', padding: '0 5%'}}>
        <div style={{width: '100%', height:'100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <img src={questboard.src} style={{position: 'absolute', height:'100%', zIndex: 1}}/>
          {selected != null ? 
          <div className="quest-board rounded-md">
            <div className="quest-content text-xl text-center">
              <h1 className="text-3xl font-extrabold py-2">{selected.title}</h1>
              <h4 className="text-xl font-extrabold py-2">{`기한: ${selected.d_day} 까지`}</h4>
              <textarea value={selected.content} style={{background: 'rgba(0,0,0,0)', overflow: 'auto', width: '100%', height: '80%', resize: 'none', textAlign: 'center'}} disabled>
              </textarea>
              
            </div>
            <div className="quest-reward text-center">
              <h4 className="text-xl font-extrabold py-2">보수</h4>
              <textarea value={selected.reward} style={{background: 'rgba(0,0,0,0)', overflow: 'auto', width: '100%', height: '80%', resize: 'none', textAlign: 'center'}} disabled>
              </textarea>
            </div>
          </div> 
          : <></>}
        </div>
        
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
            grid-template-columns: 3vw 1fr 3.1vw;
            grid-template-rows: 5fr 3fr;
            padding: 20px 0;
            gap: 20px;
            color: #FAFAFA;
            z-index: 10;
            position: relative;
            padding-top: 10%;
            padding-bottom: 15%;
            width: 40vw;
            height: 100%;
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