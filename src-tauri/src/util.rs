use std::{fs::OpenOptions, io::{stdout, Read, Write}};

use crate::Quest;
use uuid::Uuid;


pub fn save_quest(quest: String) -> bool  {
  let file_path = "C:/tmp/data.json";
  let mut file = OpenOptions::new().read(true).write(true).open(file_path).unwrap();
  let mut data = String::new();
  file.read_to_string(&mut data).unwrap();
  //println!("{}", data);
  let mut quest_vector: Vec<Quest> = serde_json::from_str(&data).unwrap();
  let mut new_quest: Quest = serde_json::from_str(&quest).unwrap();
  new_quest.id = Uuid::new_v4().to_string();
  quest_vector.push(new_quest);
  let new_quest_data = serde_json::to_string_pretty(&quest_vector).unwrap();
  file = OpenOptions::new().write(true).truncate(true).open(file_path).unwrap();
  match file.write_all(new_quest_data.as_bytes()) {
    Ok(_) => true,
    Err(_) => false
  }
}

pub fn get_quest_list() -> String {
  let file_path = "C:/tmp/data.json";
  let mut file = OpenOptions::new().read(true).write(true).open(file_path).unwrap();
  let mut data = String::new();
  file.read_to_string(&mut data).unwrap();

  // JSON 데이터 파싱
  //let mut json_data: Value = serde_json::from_str(&data).unwrap_or_else(|_| Value::Object(Default::default()));
  data
}

pub fn load_quest(id: String) {
    
}

