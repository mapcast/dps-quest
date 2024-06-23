import { Gowun_Dodum } from 'next/font/google';
import { useState } from 'react';
import { invoke } from "@tauri-apps/api/tauri";

import uuid from 'react-uuid';

const gowonDodum = Gowun_Dodum({
  subsets: ["latin"], 
  weight: ["400"],
});

export default function QuestRegisterPage({setCreateMode}: {setCreateMode: Function}) {
 
  const [postData, setPostData] = useState<Quest>({
      id: '',
      title: '',
      c_day: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`,
      d_day: '',
      content: '',
      reward: ''
  });

  function addQuest() {
    let quest = JSON.stringify(postData);
    invoke('add_quest', { quest }).then((boolValue: any) => {
      setCreateMode(false);
      setPostData({
        id: '',
        title: '',
        c_day: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`,
        d_day: '',
        content: '',
        reward: ''
      });
    }).catch(error => {
      console.log('rust와의 통신에 실패했습니다...' + error);
    });
  }

  function changeQuest(fieldName: string, value: string) {
    setPostData({...postData, [fieldName]: value});
  }
  
  return (
    <div style={{gridColumn: 'span 2', display: 'flex', justifyContent: 'center'}}>
      <div className={`quest-register bg-purple-100 border-purple-200 border-4 rounded-sm ${gowonDodum.className}`}>
        <div style={{padding: '10px 20px'}}>
          <input type="text" value={postData.title} onChange={(e) => changeQuest("title", e.target.value)} style={{fontSize: '18px', textAlign: 'center', width: '100%', padding: '5px', outline:'none', fontWeight: 800}}/>
        </div>
        <div style={{display: 'flex', gap: '10px', textAlign: 'center'}}>
          <div style={{flexGrow: 1}}>
            <span>{`등록일: ${postData.c_day}`}</span>
          </div>
          <div style={{flexGrow: 1}}>
            <span>기한: </span>
            <input type="date" value={postData.d_day} onChange={(e) => changeQuest("d_day", e.target.value)} className="bg-purple-100"/>
          </div>
        </div>
        <div className="title-content">
          <h3>내용</h3>
          <div style={{padding: '0px 20px'}}>
            <textarea className="rounded-sm" style={{resize: 'none'}} value={postData.content} onChange={(e) => changeQuest("content", e.target.value)}/>
          </div>
        </div>
        <div className="title-content">
          <h3>보상</h3>
          <div style={{padding: '0px 20px'}}>
            <textarea className="rounded-sm" style={{resize: 'none'}} value={postData.reward} onChange={(e) => changeQuest("reward", e.target.value)}/>
          </div>
        </div>
        <div style={{padding: '20px 40px', display: 'flex', gap: '10px', justifyContent: 'center'}}>
          <button onClick={() => setCreateMode(false)} className="bg-purple-400 hover:bg-purple-300 text-white font-bold py-1 px-4 rounded">취소</button>
          <button onClick={addQuest} className="bg-purple-400 hover:bg-purple-300 text-white font-bold py-1 px-4 rounded">저장</button>
        </div>
        
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
        max-width: 700px;
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