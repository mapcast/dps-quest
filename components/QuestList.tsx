import React, { useState } from "react";
import QuestListPage from "./quest/QuestListPage";
import QuestRegisterPage from "./quest/QuestRegisterPage";



export default function QuestList() {
  
  const [createMode, setCreateMode] = useState(false);

  return (
    <div className="sm:ml-64 quest-grid">
      {createMode ? 
      <QuestRegisterPage/> : <QuestListPage/>}
      
      
      <div style={{position: 'absolute', bottom: 20, right: 20}}>
        {createMode ?
        <></> : <button style={{width: '50px', height: '50px'}} onClick={() => setCreateMode(true)}
        className="text-purple-400 pb-10 text-4xl shadow border-4 font-extrabold border-purple-500 hover:bg-purple-300 bg-white hover:text-white rounded-full text-center">+</button>}
        
      </div>
      <style jsx>{`
        .quest-grid {
          height: 94.5vh;
        }
        #accordion-collapse {
          min-width: 400px;
        }
        @media(max-width: 1100px) {
          .quest-grid {
           
          }
        }
        @media(min-width: 1100px) {
          .quest-grid {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
}