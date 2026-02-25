# กำหนดโปรแกรมที่ใช้รันสคริปต์นี้ (Bash)
#!/bin/bash

# รับค่า argument ตัวแรกที่ส่งเข้ามาตอนรัน (เช่น dev) เก็บไว้ในตัวแปร tag
# เทียบได้กับ Parameter(Position=0) ใน PowerShell
tag=$1

# ตั้งค่าตัวแปรสภาพแวดล้อม (Environment Variable)
export COMMON_CONFIG_FILE="env/common.env"

# สั่งรันการทดสอบ (Cucumber) ด้วยตัวเลือก profile ตามชื่อ tag ที่รับมา
# เครื่องหมาย || (OR) หมายถึง ถ้าคำสั่งแรก (run cucumber) ทำงาน *ไม่สำเร็จ* (มี error) ให้ทำคำสั่งที่สองต่อ
# เทียบได้กับการเช็ค if ($LASTEXITCODE -ne 0) ใน PowerShell
npm run cucumber -- --profile $tag || npm run postcucumber