use std::{fs::OpenOptions, io::Read};

use serde_json::Value;

use crate::Quest;

pub fn save_quest(quest: Quest)  {
  
}

pub fn get_quest_list() -> String {
  let file_path = "src/data.json";
  let mut file = OpenOptions::new().read(true).write(true).open(file_path).unwrap();
  let mut data = String::new();
  file.read_to_string(&mut data).unwrap();

  // JSON 데이터 파싱
  //let mut json_data: Value = serde_json::from_str(&data).unwrap_or_else(|_| Value::Object(Default::default()));
  data
}

pub fn load_quest(id: String) {

}

