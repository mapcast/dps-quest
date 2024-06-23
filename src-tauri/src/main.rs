// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

//use util::{check_main_password_is_exist, save_main_password, check_main_password, get_password_names, get_password, save_password, delete_password};
use serde::{Serialize, Deserialize};
use tauri::{api::Result, CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem, SystemTray, SystemTrayEvent, Manager};
mod util;
use util::{get_quest_list, save_quest};

#[derive(Serialize, Deserialize)]
pub struct Quest {
  id: String,
  title: String,
  c_day: String,
  d_day: String,
  content: String,
  reward: String
}




fn main() {
  let open = CustomMenuItem::new("open".to_string(), "Open");
  let hide = CustomMenuItem::new("hide".to_string(), "Hide");
  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let tray_menu = SystemTrayMenu::new()
    .add_item(open)
    .add_native_item(SystemTrayMenuItem::Separator)
    .add_item(hide)
    .add_native_item(SystemTrayMenuItem::Separator)
    .add_item(quit);

  let tray = SystemTray::new().with_menu(tray_menu);
  
  tauri::Builder::default()
    .system_tray(tray)
    .on_system_tray_event(|app, event| match event {
      SystemTrayEvent::LeftClick {..} => {
        let window = app.get_window("main").unwrap();
        window.show().unwrap();
      },
      SystemTrayEvent::MenuItemClick { id, .. } => {
        match id.as_str() {
          "open" => {
            let window = app.get_window("main").unwrap();
            window.show().unwrap();
          },
          "hide" => {
            let window = app.get_window("main").unwrap();
            window.hide().unwrap();
          },
          "quit" => {
            std::process::exit(0);
          },
          _ => {}
        }
      },
      _ => {}
    })
    .invoke_handler(tauri::generate_handler![
      add_quest,
      load_quest_list
    ])
    .on_window_event(|event| match event.event() {
      tauri::WindowEvent::CloseRequested { api, .. } => {
        event.window().hide().unwrap();
        api.prevent_close();
      },
      _ => {}
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
async fn add_quest(quest: String) -> bool {
  save_quest(quest)
}

#[tauri::command]
async fn load_quest_list() -> String {
  get_quest_list()
}