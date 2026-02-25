param (
    # รับค่า tag ที่ส่งเข้ามาตอนรันคำสั่ง (เช่น dev) และเก็บไว้ในตัวแปร $tag
    # เทียบได้กับ $1 ใน bash script
    [Parameter(Position=0)]
    [string]$tag
)

# ตั้งค่าตัวแปรสภาพแวดล้อม (Environment Variable)
$env:COMMON_CONFIG_FILE = "env/common.env"

# สั่งรันการทดสอบ (Cucumber) ด้วยตัวเลือก profile ตามชื่อ tag ที่รับมา
yarn run cucumber --profile $tag

# ตรวจสอบว่าคำสั่งก่อนหน้า (บรรทัดด้านบน) รันสำเร็จหรือไม่
# $LASTEXITCODE เป็นตัวบอกสถานะการทำงาน ถ้าไม่ใช่ 0 (-ne 0) แปลว่ารันเทสต์บางตัวไม่ผ่าน
if ($LASTEXITCODE -ne 0) {
    # หากเทสต์ตัวใดตัวหนึ่งไม่ผ่าน ให้สั่งรันสคริปต์ postcucumber เพื่อจัดการ หรือสร้าง report
    # เทียบได้กับการใช้ || (OR) ใน bash script ของเดิม
    yarn run postcucumber
}
