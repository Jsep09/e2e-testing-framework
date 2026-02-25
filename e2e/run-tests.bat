@echo off
REM กำหนดให้สคริปต์นี้ไม่แสดงคำสั่งที่รันอยู่ขึ้นมาบนหน้าจอ

REM รับค่า argument ตัวแรกที่ส่งเข้ามาตอนรัน (เช่น dev) เก็บไว้ในตัวแปร tag
REM %1 หมายถึง อาร์กิวเมนต์ตัวที่ 1 (เทียบเท่ากับ $1 ใน Bash หรือ Parameter(Position=0) ใน PowerShell)
set tag=%1

set COMMON_CONFIG_FILE=env/common.env

REM สั่งรันการทดสอบ (Cucumber) ด้วยตัวเลือก profile ตามชื่อ tag ที่รับมา
REM เครื่องหมาย || (OR) ใน Batch file หมายถึง "ถ้าคำสั่งก่อนหน้าทำงานล้มเหลวให้ทำคำสั่งถัดไป" 
REM ซึ่งทำงานเหมือนกับ || ใน Bash เลยครับ
yarn run cucumber --profile %tag% || yarn run postcucumber
