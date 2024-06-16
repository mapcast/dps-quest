import { Gowun_Dodum } from 'next/font/google';
import { useState } from 'react';
import { invoke } from "@tauri-apps/api/tauri";

import uuid from 'react-uuid';

const gowonDodum = Gowun_Dodum({
  subsets: ["latin"], 
  weight: ["400"],
});

export default function QuestRegisterPage() {
 
  const [quest, setQuest] = useState<Quest>({
      id: '',
      title: '',
      c_day: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`,
      d_day: '2024-04-15',
      content: '',
      reward: ''
  });

  function addQuest() {
    let stringified = JSON.stringify(quest);
    invoke('add_quest', { stringified }).then((stringValue: any) => {
      console.log(stringValue);
    }).catch(error => {
      console.log('rust와의 통신에 실패했습니다...' + error);
    });
  }
  
  return (
    <div className={`quest-register bg-purple-100 border-purple-200 border-4 rounded-sm ${gowonDodum.className}`}>
      <h1>의뢰 등록</h1>
      <div style={{display: 'flex', gap: '10px', textAlign: 'center'}}>
        <div style={{flexGrow: 1}}>
          <span>{`등록일: ${quest.c_day}`}</span>
        </div>
        <div style={{flexGrow: 1}}>
          <span>기한: </span>
          <input type="date" className="bg-purple-100"/>
        </div>
      </div>
      <div className="title-content">
        <h3>내용</h3>
        <div style={{padding: '0px 20px'}}>
          <textarea className="rounded-sm"/>
        </div>
      </div>
      <div className="title-content">
        <h3>보상</h3>
        <div style={{padding: '0px 20px'}}>
          <textarea className="rounded-sm"/>
        </div>
      </div>
      <div style={{padding: '20px 40px', display: 'flex', gap: '10px', justifyContent: 'center'}}>
        <button className="bg-purple-400 hover:bg-purple-300 text-white font-bold py-1 px-4 rounded">취소</button>
        <button className="bg-purple-400 hover:bg-purple-300 text-white font-bold py-1 px-4 rounded">저장</button>
      </div>
      <style jsx>{`
      textarea {
        width: 100%;
        height: 100%;
        resize: none;
        text-align: center;
        padding: 5px;
        font-size: 14px;
      }
      textarea:focus {
        outline:none;
      }
      h1 {
        padding: 10px 0;
        font-size: 22px;
        font-weight: 800;
      }
      h3 {
        padding: 5px 0;
        font-size: 18px;
        font-weight: 800;
      }
      .quest-register {
        display: grid;
        text-align: center;
        width: 100%;
        height: 100%;
        grid-template-rows: auto auto 3fr 2fr auto;
      }
      .title-content {
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-rows: auto 1fr;
      }
      @media(max-width: 1100px) {
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
    </div>
  )
}