@echo off 
set site_path=%CD%
set config_file_path=C:\Users\manuel\projects\node_server\config.js
set server_path=C:\Users\manuel\projects\node_server\index.js
start node "%server_path%" config="%config_file_path%" p_path="%site_path%"