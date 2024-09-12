const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());  // JSON 형식의 요청을 처리

// 데이터 저장 경로
const dataFilePath = path.join(__dirname, 'zoneData.json');

// 구역 정보 저장 API
app.post('/save-zone', (req, res) => {
    const { zoneName, zoneFloor, zoneDetail } = req.body;
    
    // 입력된 구역 데이터를 JSON 파일로 저장
    const data = { zoneName, zoneFloor, zoneDetail };
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    res.send({ success: true, message: 'Zone data saved successfully', data });
});

// 저장된 구역 정보 불러오기 API
app.get('/get-zone', (req, res) => {
    if (fs.existsSync(dataFilePath)) {
        const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
        res.send({ success: true, data });
    } else {
        res.send({ success: false, message: 'No zone data found' });
    }
});

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
